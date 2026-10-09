import crypto from 'node:crypto';
import {createRemoteJWKSet,jwtVerify,customFetch} from 'jose';
import {hash,random,passwordHash} from './auth.mjs';
const ORIGIN='https://genjutsuaigenerator.com',CALLBACK=ORIGIN+'/api/auth/google/callback';
const keys=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'),{[customFetch]:(...args)=>fetch(...args),timeoutDuration:10000});
export const googleEnabled=env=>env.GOOGLE_AUTH_ENABLED==='true'&&!!(env.GOOGLE_CLIENT_ID&&env.GOOGLE_CLIENT_SECRET);
const error=message=>Object.assign(Error(message),{status:400});
export async function googleStart(app,request,body){
 if(!app.ready()||!googleEnabled(app.env))throw Object.assign(Error('Google sign-in is not configured.'),{status:503});
 const state=random(),cookie=random(),nonce=random(),verifier=random();
 app.run('INSERT INTO oauth_flows VALUES(?,?,?,?,?,?,?)',hash(state),hash(cookie),nonce,verifier,body.termsAccepted===true?1:0,Date.now()+600000,body.owner||null);
 const params=new URLSearchParams({client_id:app.env.GOOGLE_CLIENT_ID,redirect_uri:CALLBACK,response_type:'code',scope:'openid email',state,nonce,code_challenge:crypto.createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'S256',prompt:'select_account'});
 return Response.json({url:'https://accounts.google.com/o/oauth2/v2/auth?'+params},{headers:{'Cache-Control':'no-store','Set-Cookie':`__Host-genjutsu_oauth=${cookie}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=600`,'X-Robots-Tag':'noindex'}});
}
export async function googleCallback(app,request){
 const headers=new Headers({'Cache-Control':'no-store','X-Robots-Tag':'noindex','Referrer-Policy':'no-referrer'});
 headers.append('Set-Cookie','__Host-genjutsu_oauth=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0');
 let outcome='failed';
 try{
  if(!app.ready()||!googleEnabled(app.env))throw error('Google sign-in not configured');
  const u=new URL(request.url),state=u.searchParams.get('state'),cookie=request.headers.get('cookie')?.match(/(?:^|;\s*)__Host-genjutsu_oauth=([a-f0-9]{64})(?:;|$)/)?.[1];
  if(!/^[a-f0-9]{64}$/.test(state||'')||!cookie)throw error('Invalid sign-in state');
  const flow=app.row('SELECT * FROM oauth_flows WHERE state=? AND cookie=? AND expires>?',hash(state),hash(cookie),Date.now());
  if(!flow)throw error('Expired sign-in state');
  app.run('DELETE FROM oauth_flows WHERE state=?',hash(state));
  if(u.searchParams.has('error')){outcome='cancelled';throw error('Cancelled');}
  const code=u.searchParams.get('code');if(!code||code.length>2048)throw error('Missing authorization code');
  const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',code,redirect_uri:CALLBACK,client_id:app.env.GOOGLE_CLIENT_ID,client_secret:app.env.GOOGLE_CLIENT_SECRET,code_verifier:flow.verifier}),signal:AbortSignal.timeout(15000)});
  const tokens=await response.json();if(!response.ok||!tokens.id_token)throw error('Google authorization failed');
  const {payload}=await jwtVerify(tokens.id_token,keys,{issuer:['https://accounts.google.com','accounts.google.com'],audience:app.env.GOOGLE_CLIENT_ID,algorithms:['RS256'],maxTokenAge:'10m',clockTolerance:30});
  if(payload.nonce!==flow.nonce||!payload.sub||typeof payload.sub!=='string'||payload.email_verified!==true||typeof payload.email!=='string'||!Number.isFinite(payload.exp))throw error('Invalid Google identity');
  const email=payload.email.toLowerCase();if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw error('Invalid email');
  const authoritative=email.endsWith('@gmail.com')||!!payload.hd;
  let identity=app.row('SELECT account FROM google_identities WHERE subject=?',payload.sub),account=identity&&app.row('SELECT * FROM accounts WHERE id=?',identity.account);
  if(!identity){
   account=app.row('SELECT * FROM accounts WHERE email=?',email);
   if(account&&!authoritative&&flow.owner!==account.id){outcome='link_required';throw error('Sign in with your password before linking this Google account');}
   if(!account&&!flow.terms){outcome='terms_required';throw error('Accept terms before creating an account');}
   // OAuth-only accounts have a random inaccessible password; email recovery can establish one.
   const digest=(!account||(authoritative&&!app.verified(account.id)))?await passwordHash(random()):null;
   app.db.transaction(()=>{
    identity=app.row('SELECT account FROM google_identities WHERE subject=?',payload.sub);
    if(identity){account=app.row('SELECT * FROM accounts WHERE id=?',identity.account);return;}
    const existing=app.row('SELECT * FROM accounts WHERE email=?',email);
    if(existing&&!authoritative&&flow.owner!==existing.id){outcome='link_required';throw error('Existing account requires password sign-in');}
    account=existing||{id:crypto.randomUUID(),email,blocked:0};
    if(!existing)app.run('INSERT INTO accounts(id,email,password,created) VALUES(?,?,?,?)',account.id,email,digest,Date.now());
    else if(authoritative&&!app.verified(existing.id)){
     // A preregistered unverified password must not survive Google's proof of email ownership.
     app.run('UPDATE accounts SET password=? WHERE id=?',digest,existing.id);
     app.run('DELETE FROM account_sessions WHERE account=?',existing.id);
    }
    app.run('INSERT INTO google_identities VALUES(?,?)',payload.sub,account.id);
   });
  }
  if(!account||account.blocked)throw error('Account unavailable');
  if(authoritative)app.run('INSERT OR IGNORE INTO verified_accounts VALUES(?)',account.id);
  const session=random();app.run('INSERT INTO account_sessions VALUES(?,?,?)',hash(session),account.id,Date.now()+604800000);
  headers.append('Set-Cookie',`genjutsu_session=${session}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=604800`);
  if(!app.verified(account.id))try{app.limit('verify-'+account.email,5);await app.mail(account.id,'verify');}catch{/* Account can resend verification. */}
  headers.set('Location',ORIGIN+'/dashboard/?google=success');return new Response(null,{status:303,headers});
 }catch{headers.set('Location',ORIGIN+'/dashboard/?google_error='+outcome);return new Response(null,{status:303,headers});}
}
