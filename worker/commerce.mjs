import {motionPayload,MOTIONS} from './motion.mjs';
import {initAdmin,readAdmin,sourceName} from './admin.mjs';
import {createCredits} from '../lib/credits.mjs';
import {sqliteStore} from './store.mjs';
import {authenticate,hash,random,passwordHash,verifyWebhook} from './auth.mjs';
import {normalizeImage} from './images.mjs';
import {googleEnabled,googleStart,googleCallback} from './google.mjs';
const DAY=86400000,ORIGIN='https://genjutsuaigenerator.com';
const json=(data,status=200,extra={})=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex','X-Content-Type-Options':'nosniff',...extra}});
const fail=(message,status=400)=>Object.assign(Error(message),{status});
export class GenjutsuCommerce {
  constructor(ctx,env){
    this.ctx=ctx;this.env=env;this.db=sqliteStore(ctx.storage);
    this.db.exec(`CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,owner TEXT NOT NULL,request_key TEXT NOT NULL,world TEXT NOT NULL,human TEXT NOT NULL,zombie TEXT NOT NULL,state TEXT NOT NULL,provider TEXT,output TEXT,created INTEGER NOT NULL,updated INTEGER NOT NULL,error TEXT,UNIQUE(owner,request_key));
      CREATE TABLE IF NOT EXISTS images(id TEXT PRIMARY KEY,owner TEXT NOT NULL,role TEXT NOT NULL,key TEXT NOT NULL,created INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS verified_accounts(account TEXT PRIMARY KEY);
      CREATE TABLE IF NOT EXISTS mail_tokens(token TEXT PRIMARY KEY,account TEXT NOT NULL,purpose TEXT NOT NULL,expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS rate_limits(id TEXT PRIMARY KEY,start INTEGER NOT NULL,n INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS service_mail(id TEXT PRIMARY KEY,account TEXT NOT NULL,subject TEXT NOT NULL,body TEXT NOT NULL,attempts INTEGER NOT NULL DEFAULT 0,sent INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS google_identities(subject TEXT PRIMARY KEY,account TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS oauth_flows(state TEXT PRIMARY KEY,cookie TEXT NOT NULL,nonce TEXT NOT NULL,verifier TEXT NOT NULL,terms INTEGER NOT NULL,expires INTEGER NOT NULL,owner TEXT);
      CREATE INDEX IF NOT EXISTS orders_state ON orders(state,updated);
      CREATE INDEX IF NOT EXISTS images_owner ON images(owner,created);`);
    this.cfg={mode:'live',origin:ORIGIN,stripeKey:env.STRIPE_SECRET_KEY,stripeWebhook:env.STRIPE_WEBHOOK_SECRET,monthlyAmount:Number(env.MONTHLY_PRICE_CENTS||0),monthlyCredits:Number(env.MONTHLY_VIDEO_CREDITS||0),portalConfig:env.STRIPE_PORTAL_CONFIG_ID,stripePrices:{video_1:env.STRIPE_PRICE_VIDEO_1,video_3:env.STRIPE_PRICE_VIDEO_3,video_10:env.STRIPE_PRICE_VIDEO_10,monthly:env.STRIPE_PRICE_MONTHLY}};
    this.credits=createCredits(this.db,this.cfg,{authenticator:authenticate});initAdmin(this.db);
  }
  ready(){return this.env.COMMERCE_ENABLED==='true'&&this.env.KIE_API_KEY&&this.env.STRIPE_SECRET_KEY&&this.env.STRIPE_WEBHOOK_SECRET&&this.env.RESEND_API_KEY&&this.env.MAIL_FROM&&this.env.SUPPORT_EMAIL&&this.env.OPERATOR_NAME&&this.env.GENERATION_ACCEPTED==='true'&&this.env.MEDIA&&['STRIPE_PRICE_VIDEO_1','STRIPE_PRICE_VIDEO_3','STRIPE_PRICE_VIDEO_10'].every(k=>!!this.env[k])&&(!this.cfg.monthlyAmount||(this.cfg.monthlyCredits>0&&this.env.STRIPE_PRICE_MONTHLY&&this.env.STRIPE_PORTAL_CONFIG_ID));}
  row(query,...args){return this.db.prepare(query).get(...args);}
  run(query,...args){return this.db.prepare(query).run(...args);}
  limit(id,max){const now=Date.now(),r=this.row('SELECT * FROM rate_limits WHERE id=?',id);if(!r||now-r.start>3600000)this.run('INSERT OR REPLACE INTO rate_limits VALUES(?,?,?)',id,now,1);else{if(r.n>=max)throw fail('Too many requests. Please try again later.',429);this.run('UPDATE rate_limits SET n=n+1 WHERE id=?',id);}}
  verified(owner){return !!this.row('SELECT account FROM verified_accounts WHERE account=?',owner);}
  wallet(owner){return {...this.credits.wallet(owner),orders:this.db.prepare('SELECT id,state,created,world FROM orders WHERE owner=? ORDER BY created DESC LIMIT 20').all(owner),grants:this.db.prepare('SELECT id,kind,total,remaining,expires FROM credit_grants WHERE owner=? ORDER BY rowid DESC LIMIT 50').all(owner),purchases:this.db.prepare('SELECT p.id,p.state,p.amount,p.credits,t.created,EXISTS(SELECT 1 FROM credit_grants g WHERE g.purchase=p.id) AS fulfilled FROM credit_purchases p LEFT JOIN ledger_times t ON t.id=p.id AND t.kind=\'purchase\' WHERE owner=? ORDER BY p.rowid DESC LIMIT 10').all(owner),emailVerified:this.verified(owner),mailEnabled:!!this.env.RESEND_API_KEY};}
  mustAccount(owner,verified=true){const w=this.wallet(owner);if(!w.account)throw fail('Sign in first.',401);if(w.account.blocked)throw fail('Your account requires support review.',403);if(verified&&!w.emailVerified)throw fail('Verify your email before purchasing or generating.',403);return w;}
  async mail(account,purpose){
    const a=this.row('SELECT email FROM accounts WHERE id=?',account);if(!a)return;
    const token=random(),digest=hash(token),url=ORIGIN+'/dashboard/?'+purpose+'='+token;
    this.run('INSERT INTO mail_tokens VALUES(?,?,?,?)',digest,account,purpose,Date.now()+3600000);
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+this.env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':digest},body:JSON.stringify({from:this.env.MAIL_FROM,to:[a.email],reply_to:this.env.SUPPORT_EMAIL,subject:purpose==='verify'?'Verify your Genjutsu AI account':'Reset your Genjutsu AI password',text:(purpose==='verify'?'Verify your email':'Reset your password')+': '+url+'\nThis link expires in one hour. If you did not request it, ignore this email.'}),signal:AbortSignal.timeout(15000)});
    if(!response.ok){this.run('DELETE FROM mail_tokens WHERE token=?',digest);throw fail('Email could not be sent. Please try again or contact support.',503);}
  }
  async read(request){const length=Number(request.headers.get('content-length')||0);if(length>12*1024*1024)throw fail('Request too large.',413);const bytes=await request.arrayBuffer();if(bytes.byteLength>12*1024*1024)throw fail('Request too large.',413);return JSON.parse(new TextDecoder().decode(bytes));}
  async fetch(request){
    try{
      const url=new URL(request.url),path=url.pathname,method=request.method;
      if(['/api/internal/admin/data','/api/internal/admin/health'].includes(path)){
        if(method!=='GET'||!this.env.ADMIN_READ_TOKEN||request.headers.get('authorization')!=='Bearer '+this.env.ADMIN_READ_TOKEN)throw fail('Endpoint not found.',404);
        if(path.endsWith('/health')){let balance=null;try{const r=await fetch('https://api.kie.ai/api/v1/chat/credit',{headers:{Authorization:'Bearer '+this.env.KIE_API_KEY},signal:AbortSignal.timeout(10000)});const d=await r.json();if(r.ok&&d.code===200&&Number.isFinite(Number(d.data)))balance=Number(d.data);}catch{}
          this.run('INSERT OR REPLACE INTO ops_state VALUES(?,?,?)','provider',balance,Date.now());const h=readAdmin(this,new URLSearchParams()).health;return json({...h,providerCapacityOK:balance===null?null:balance>=Number(this.env.MIN_PROVIDER_CREDITS||281)});}
        return json(readAdmin(this,url.searchParams));
      }
      if(path.startsWith('/api/internal/')){
        if(!this.env.ADMIN_TOKEN||request.headers.get('authorization')!=='Bearer '+this.env.ADMIN_TOKEN)throw fail('Endpoint not found.',404);
        if(path==='/api/internal/maintenance'&&method==='POST'){
          if(url.searchParams.get('run')==='now')await this.alarm();
          else await this.ctx.storage.setAlarm(Date.now()+1000);
          return json({scheduled:true});
        }
        if(path==='/api/internal/status')return json({ready:!!this.ready(),googleEnabled:googleEnabled(this.env),payments:this.db.prepare('SELECT state,COUNT(*) AS count FROM credit_purchases GROUP BY state').all(),callbackEvents:this.row('SELECT COUNT(*) AS count FROM credit_events').count,failedServiceMail:this.row('SELECT COUNT(*) AS count FROM service_mail WHERE sent=0 AND attempts>=3').count,stalledRenders:this.db.prepare("SELECT id,state,updated FROM orders WHERE state='rendering' AND updated<? ORDER BY updated LIMIT 30").all(Date.now()-3600000),configured:Object.fromEntries(['COMMERCE_ENABLED','GENERATION_ACCEPTED','KIE_API_KEY','STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET','RESEND_API_KEY','MAIL_FROM','SUPPORT_EMAIL','OPERATOR_NAME'].map(k=>[k,k.endsWith('ENABLED')||k.endsWith('ACCEPTED')?this.env[k]==='true':!!this.env[k]])),states:this.db.prepare('SELECT state,COUNT(*) AS count FROM orders GROUP BY state').all(),review:this.db.prepare("SELECT id,state,provider,created FROM orders WHERE state='submission_unknown' ORDER BY created LIMIT 30").all()});
        if(path==='/api/internal/reconcile'&&method==='POST'){
          const b=await this.read(request),o=this.row('SELECT * FROM orders WHERE id=?',b.orderId);if(!o||o.state!=='submission_unknown')throw fail('Only an ambiguous submission can be reconciled.');
          if(b.providerId&&/^[a-zA-Z0-9_-]{5,100}$/.test(b.providerId)){await this.kie('jobs/recordInfo?taskId='+encodeURIComponent(b.providerId));this.run('UPDATE orders SET state=?,provider=?,updated=? WHERE id=?','rendering',b.providerId,Date.now(),o.id);}
          else if(b.confirmedNoProviderTask===true)this.run('UPDATE orders SET state=?,updated=?,error=? WHERE id=?','refund_pending',Date.now(),'Submission reviewed by support; credit returned.',o.id);
          else throw fail('Provide a confirmed provider task ID or confirm no task exists.');
          await this.ctx.storage.setAlarm(Date.now()+1000);return json({reconciled:true});
        }
        throw fail('Endpoint not found.',404);
      }
      if(path==='/api/health')return json({ready:!!this.ready(),model:'kling-2.6/motion-control',duration:10,paymentEnabled:!!this.ready()});
      if(path==='/api/payments/webhook'&&method==='POST'){
        if(!this.env.STRIPE_WEBHOOK_SECRET)throw fail('Payment webhook not configured.',503);
        const raw=await request.text();if(raw.length>1024*1024||!verifyWebhook(raw,request.headers.get('stripe-signature'),this.env.STRIPE_WEBHOOK_SECRET))throw fail('Invalid webhook signature.',400);
        const event=JSON.parse(raw);if(typeof event.id!=='string'||!event.data?.object)throw fail('Invalid payment event.');
        await this.credits.webhook(event);return json({received:true});
      }
      const ip=hash(request.headers.get('CF-Connecting-IP')||'unknown');this.limit('requests-'+ip,1000);
      if(['POST','DELETE'].includes(method)&&request.headers.get('origin')!==ORIGIN)throw fail('Request origin not allowed.',403);
      if(path==='/api/analytics/event'&&method==='POST'){
        this.limit('analytics-'+ip,120);if(Number(request.headers.get('content-length'))>512)throw fail('Request too large.',413);
        const reader=request.body?.getReader();if(!reader)throw fail('Invalid event.');let size=0;const chunks=[];
        for(;;){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>512){await reader.cancel();throw fail('Request too large.',413);}chunks.push(value);}
        const b=JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if(!['page_view','see_examples','select_photo','create_from_example','download_video','share_video','copy_caption'].includes(b.event)||!/^[a-f0-9-]{36}$/.test(b.id||''))throw fail('Invalid event.');
        this.run('INSERT OR IGNORE INTO site_events VALUES(?,?,?,?)',b.id,b.event,sourceName(b.source),Date.now());return json({recorded:true});
      }
      if(path==='/api/config')return json({mode:'live',creditMode:true,googleEnabled:googleEnabled(this.env),plans:this.credits.plans(),supportEmail:this.env.SUPPORT_EMAIL,operator:this.env.OPERATOR_NAME,retentionDays:7,worlds:Object.keys(MOTIONS),resolution:'720p',duration:10,model:'Kling 2.6 Motion Control',generationEnabled:!!this.ready(),paymentEnabled:!!this.ready()});
      const cookie=request.headers.get('cookie')?.match(/(?:^|;\s*)genjutsu_session=([a-f0-9]{64})(?:;|$)/)?.[1],token=hash(cookie||'anonymous'),owner=this.credits.resolve(token);
      if(path==='/api/auth/google/start'&&method==='POST'){this.limit('google-'+ip,20);const b=await this.read(request);return googleStart(this,request,{termsAccepted:b.termsAccepted,owner:this.wallet(owner).account?owner:null});}
      if(path==='/api/auth/google/callback'&&method==='GET'){this.limit('google-callback-'+ip,30);return googleCallback(this,request);}
      if(['/api/account','/api/user/credits'].includes(path)&&method==='GET'){const w=this.wallet(owner);if(w.account&&url.searchParams.has('source')&&url.searchParams.get('source')!=='unrecorded'&&this.row('SELECT created FROM accounts WHERE id=?',owner).created>=this.row("SELECT value FROM ops_state WHERE id='tracking_started'").value)this.run('INSERT OR IGNORE INTO account_sources VALUES(?,?)',owner,sourceName(url.searchParams.get('source')));return json({authenticated:!!w.account,user:w.account,credits:w.balance,...w});}
      if(['/api/dashboard/signup','/api/dashboard/login','/api/account/signup','/api/account/login','/api/auth/sign-up/email','/api/auth/sign-in/email'].includes(path)&&method==='POST'){
        if(!this.ready())throw fail('Account signup and payment are coming soon.',503);
        this.limit('auth-'+ip,30);const b=await this.read(request),session=random();
        const isSignup = path.endsWith('signup') || path.endsWith('sign-up/email');
        if(isSignup&&b.termsAccepted!==true)throw fail('Accept the terms and privacy policy to create an account.');
        const w=await this.credits.authenticate(hash(session),b.email,b.password,isSignup);
        this.credits.logout(token);let warning;
        if(!this.verified(this.credits.resolve(hash(session))))try{this.limit('verify-'+w.account.email,5);await this.mail(this.credits.resolve(hash(session)),'verify');}catch{warning='Please request a new verification email from your account.';}
        return json({authenticated:true,user:w.account,credits:w.balance,...this.wallet(this.credits.resolve(hash(session))),warning},200,{'Set-Cookie':`genjutsu_session=${session}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=604800`});
      }
      if(['/api/dashboard/logout','/api/account/logout','/api/auth/sign-out'].includes(path)&&method==='POST'){this.credits.logout(token);return json({signedOut:true},200,{'Set-Cookie':'genjutsu_session=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0'});}
      if(['/api/dashboard/request-reset','/api/account/request-reset'].includes(path)&&method==='POST'){
        if(!this.ready())throw fail('Password recovery is not configured.',503);this.limit('reset-'+ip,5);const b=await this.read(request),email=String(b.email||'').trim().toLowerCase();this.limit('reset-email-'+hash(email),3);
        const a=this.row('SELECT id FROM accounts WHERE email=?',email);if(a)try{await this.mail(a.id,'reset');}catch{/* Uniform reply prevents account enumeration. */}
        return json({message:'If an account exists, a reset link has been sent.'});
      }
      if(['/api/dashboard/verify','/api/account/verify'].includes(path)&&method==='POST'){
        const b=await this.read(request);if(!/^[a-f0-9]{64}$/.test(b.token||''))throw fail('Invalid or expired verification link.');
        this.db.transaction(()=>{const m=this.row('SELECT * FROM mail_tokens WHERE token=? AND purpose=? AND expires>?',hash(b.token),'verify',Date.now());if(!m)throw fail('Invalid or expired verification link.');this.run('INSERT OR IGNORE INTO verified_accounts VALUES(?)',m.account);this.run('DELETE FROM mail_tokens WHERE token=?',hash(b.token));});return json({verified:true});
      }
      if(['/api/dashboard/reset','/api/account/reset'].includes(path)&&method==='POST'){
        this.limit('reset-submit-'+ip,10);const b=await this.read(request);if(!/^[a-f0-9]{64}$/.test(b.token||'')||typeof b.password!=='string'||b.password.length<12||b.password.length>128)throw fail('Choose a valid reset link and a password of 12–128 characters.');
        const digest=await passwordHash(b.password);
        this.db.transaction(()=>{const m=this.row('SELECT * FROM mail_tokens WHERE token=? AND purpose=? AND expires>?',hash(b.token),'reset',Date.now());if(!m)throw fail('Invalid or expired reset link.');this.run('UPDATE accounts SET password=? WHERE id=?',digest,m.account);this.run('DELETE FROM account_sessions WHERE account=?',m.account);this.run('INSERT OR IGNORE INTO verified_accounts VALUES(?)',m.account);this.run('DELETE FROM mail_tokens WHERE account=?',m.account);});return json({message:'Password updated. Sign in with your new password.'});
      }
      if(['/api/dashboard/resend-verification','/api/account/resend-verification'].includes(path)&&method==='POST'){const w=this.mustAccount(owner,false);if(w.emailVerified)return json({verified:true});this.limit('verify-'+w.account.email,5);await this.mail(owner,'verify');return json({message:'Verification email sent.'});}
      if(!this.ready())throw fail('Personalized generation and payments are coming soon.',503);
      this.mustAccount(owner);
      if(['/api/credits/checkout','/api/payments/checkout'].includes(path)&&method==='POST'){this.limit('checkout-'+owner,20);const b=await this.read(request);return json(await this.credits.purchase(owner,b.planId,b.requestKey));}
      if(['/api/credits/portal','/api/payments/portal'].includes(path)&&method==='POST')return json(await this.credits.portal(owner));
      const unusedImage=/^\/api\/storage\/uploads\/([a-f0-9-]{36})$/.exec(path);
      if(unusedImage&&method==='DELETE'){
        const image=this.row('SELECT * FROM images WHERE id=? AND owner=?',unusedImage[1],owner);if(!image)throw fail('Upload not found.',404);
        if(this.row("SELECT id FROM orders WHERE (human=? OR zombie=?) AND state NOT IN ('deleted','expired','refunded')",image.id,image.id))throw fail('This portrait belongs to a video order.',409);
        await this.env.MEDIA.delete(image.key);this.run('DELETE FROM images WHERE id=? AND owner=?',image.id,owner);return json({deleted:true});
      }
      if(path==='/api/storage/upload'&&method==='POST'){
        this.limit('uploads-'+owner,40);if(this.row('SELECT COUNT(*) AS n FROM images WHERE owner=?',owner).n>=10)throw fail('Remove previous unused uploads before adding more.',429);
        const b=await this.read(request);if(b.role!=='human'||typeof b.data!=='string'||!/^[a-zA-Z0-9+/]+={0,2}$/.test(b.data))throw fail('Choose a valid portrait.');
        const bytes=normalizeImage(new Uint8Array(Buffer.from(b.data,'base64'))),id=crypto.randomUUID(),key='genjutsu/images/'+id+'.jpg';
        await this.env.MEDIA.put(key,bytes,{httpMetadata:{contentType:'image/jpeg'}});this.run('INSERT INTO images VALUES(?,?,?,?,?)',id,owner,b.role,key,Date.now());await this.ctx.storage.setAlarm(Date.now()+30000);return json({id},201);
      }
      if(path==='/api/video/generate'&&method==='POST'){
        this.limit('generate-'+owner,20);const b=await this.read(request);if(b.consent!==true||!Object.hasOwn(MOTIONS,b.world)||!/^[-a-zA-Z0-9]{16,80}$/.test(b.requestKey||''))throw fail('Confirm photo permission and choose an available story.');
        let order=this.row('SELECT * FROM orders WHERE owner=? AND request_key=?',owner,b.requestKey);
        if(order&&(order.world!==b.world||order.human!==b.humanId||order.zombie!==''))throw fail('This request already belongs to another video.',409);
        if(!order){const id=crypto.randomUUID();this.db.transaction(()=>{
          for(const [image,role] of [[b.humanId,'human']])if(!this.row('SELECT id FROM images WHERE id=? AND owner=? AND role=?',image,owner,role))throw fail('Choose a valid portrait for each role.');
          this.credits.reserve(id,owner);this.run('INSERT INTO orders(id,owner,request_key,world,human,zombie,state,created,updated) VALUES(?,?,?,?,?,?,?,?,?)',id,owner,b.requestKey,b.world,b.humanId,'','queued',Date.now(),Date.now());
        });order=this.row('SELECT * FROM orders WHERE id=?',id);}
        await this.ctx.storage.setAlarm(Date.now()+1000);return json(this.publicOrder(order),201);
      }
      const match=/^\/api\/video\/tasks\/([a-f0-9-]{36})(?:\/(download))?$/.exec(path);
      if(match){const o=this.row('SELECT * FROM orders WHERE id=? AND owner=?',match[1],owner);if(!o)throw fail('Order not found.',404);
        if(!match[2]&&method==='GET'){if(['queued','rendering','refund_pending'].includes(o.state))await this.ctx.storage.setAlarm(Date.now()+1000);return json(this.publicOrder(o));}
        if(match[2]&&['GET','HEAD'].includes(method))return this.download(request,o);
        if(!match[2]&&method==='DELETE'){
          if(!['success','expired','refunded'].includes(o.state))throw fail('Wait for generation to finish before deleting.');
          if(o.output)await this.env.MEDIA.delete(o.output);this.run('UPDATE orders SET state=?,output=NULL WHERE id=?','deleted',o.id);
          for(const id of [o.human,o.zombie]){const used=this.row("SELECT id FROM orders WHERE id<>? AND state NOT IN ('deleted','expired','refunded') AND (human=? OR zombie=?)",o.id,id,id),image=this.row('SELECT * FROM images WHERE id=?',id);if(image&&!used){await this.env.MEDIA.delete(image.key);this.run('DELETE FROM images WHERE id=?',id);}}
          return json({deleted:true});
        }
      }
      throw fail('Endpoint not found.',404);
    }catch(e){return json({error:e.status||/^(Choose|Sign in|Verify|Email or|Account |Too many|Wait|Password)/.test(e.message)?e.message:'Request could not be completed. Please try again or contact support.',...(['checkout_expired','no_subscription'].includes(e.code)?{code:e.code}:{})},e.status||400);}
  }
  publicOrder(o){return {id:o.id,state:o.state,created:o.created,world:o.world,demo:false,download:o.state==='success'?`/api/video/tasks/${o.id}/download`:null,error:o.error||null};}
  async download(request,o){
    if(o.state!=='success'||!o.output)throw fail('Video is not ready.',409);
    const head=await this.env.MEDIA.head(o.output);if(!head)throw fail('Video expired.',404);
    let start=0,end=head.size-1,status=200;const range=request.headers.get('Range');
    if(range){const m=/^bytes=(\d+)-(\d*)$/.exec(range);start=Number(m?.[1]);end=m?.[2]?Math.min(Number(m[2]),end):end;if(!m||!Number.isSafeInteger(start)||start>=head.size||end<start)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${head.size}`}});status=206;}
    const obj=request.method==='HEAD'?null:await this.env.MEDIA.get(o.output,{range:{offset:start,length:end-start+1}});
    return new Response(obj?.body||null,{status,headers:{'Content-Type':'video/mp4','Cache-Control':'private, no-store','X-Robots-Tag':'noindex','Content-Length':String(end-start+1),'Content-Disposition':`inline; filename="genjutsu-${o.id}.mp4"`,'Accept-Ranges':'bytes',...(status===206?{'Content-Range':`bytes ${start}-${end}/${head.size}`}:{})}});
  }
  async kie(endpoint,body){const response=await fetch('https://api.kie.ai/api/v1/'+endpoint,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+this.env.KIE_API_KEY,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(45000)});const d=await response.json();if(!response.ok||d.code!==200)throw Error('Provider request failed.');return d.data;}
  async tick(o){
    if(o.state==='refund_pending'){this.db.transaction(()=>{this.credits.refund(o.id);this.run('UPDATE orders SET state=?,updated=? WHERE id=?','refunded',Date.now(),o.id);});return;}
    if(o.state==='queued'){
      if(!this.ready())return;
      const claim=this.run('UPDATE orders SET state=?,updated=? WHERE id=? AND state=?','preparing',Date.now(),o.id,'queued');if(!claim.changes)return;
      try{
        const urls=[];
        for(const id of [o.human]){const image=this.row('SELECT * FROM images WHERE id=?',id),stored=image&&await this.env.MEDIA.get(image.key);if(!stored)throw Error('Portrait expired.');const form=new FormData();form.append('file',new Blob([await stored.arrayBuffer()],{type:'image/jpeg'}),id+'.jpg');form.append('uploadPath','genjutsu-orders');const response=await fetch('https://kieai.redpandaai.co/api/file-stream-upload',{method:'POST',headers:{Authorization:'Bearer '+this.env.KIE_API_KEY},body:form,signal:AbortSignal.timeout(30000)});const d=await response.json(),u=d.data?.downloadUrl||d.data?.fileUrl;if(!response.ok||d.code!==200||!u||new URL(u).protocol!=='https:')throw Error('Reference preparation failed.');urls.push(u);}
        const source=await this.env.ASSETS.fetch(new Request(ORIGIN+MOTIONS[o.world]));
        if(!source.ok)throw Error('Motion reference unavailable.');
        const motionBytes=await source.arrayBuffer();if(motionBytes.byteLength>10*1024*1024)throw Error('Motion reference too large.');
        const form=new FormData();form.append('file',new Blob([motionBytes],{type:'video/mp4'}),o.world+'.mp4');form.append('uploadPath','genjutsu-orders');
        const response=await fetch('https://kieai.redpandaai.co/api/file-stream-upload',{method:'POST',headers:{Authorization:'Bearer '+this.env.KIE_API_KEY},body:form,signal:AbortSignal.timeout(30000)});
        const uploaded=await response.json(),motionURL=uploaded.data?.downloadUrl||uploaded.data?.fileUrl;
        if(!response.ok||uploaded.code!==200||!motionURL||new URL(motionURL).protocol!=='https:')throw Error('Motion preparation failed.');
        const balance=await this.kie('chat/credit');if(Number(balance)<Number(this.env.MIN_PROVIDER_CREDITS||121))throw Error('Provider capacity unavailable.');
        this.run('UPDATE orders SET state=?,updated=? WHERE id=?','submission_unknown',Date.now(),o.id);
        const r=await this.kie('jobs/createTask',motionPayload(urls[0],motionURL));
        if(!r.taskId)throw Error('No confirmed task.');this.run('UPDATE orders SET state=?,provider=?,updated=? WHERE id=?','rendering',r.taskId,Date.now(),o.id);
      }catch{if(this.row('SELECT state FROM orders WHERE id=?',o.id)?.state==='preparing')this.run('UPDATE orders SET state=?,updated=?,error=? WHERE id=?','refund_pending',Date.now(),'Portrait preparation or provider capacity failed. Your credit will be returned.',o.id);}
      return;
    }
    if(o.state==='rendering'&&o.provider){
      let stage='query';
      try{const task=await this.kie('jobs/recordInfo?taskId='+encodeURIComponent(o.provider));
        if(task.state==='fail')this.run('UPDATE orders SET state=?,error=?,updated=? WHERE id=?','refund_pending','Generation failed. Your video credit will be returned.',Date.now(),o.id);
        else if(task.state==='success'){
          stage='validate';
          const result=typeof task.resultJson==='string'?JSON.parse(task.resultJson):task.resultJson,u=new URL(result.resultUrls[0]),hosts=(this.env.VIDEO_SOURCE_HOSTS||'tempfile.aiquickdraw.com').split(',');
          if(u.protocol!=='https:'||!hosts.includes(u.hostname))throw Error('Unapproved output host.');
          stage='download';
          // Workers supports manual/follow only. Reject redirects to preserve the output-host boundary.
          const response=await fetch(u,{redirect:'manual',signal:AbortSignal.timeout(45000)});if(!response.ok||Number(response.headers.get('content-length'))>100*1024*1024)throw Error('Archive failed.');
          stage='buffer';
          const reader=response.body.getReader(),chunks=[];let size=0;for(;;){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>100*1024*1024){await reader.cancel();throw Error('Oversized video.');}chunks.push(value);}
          const data=new Uint8Array(size);let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.byteLength;}if(String.fromCharCode(...data.slice(4,8))!=='ftyp')throw Error('Invalid MP4.');
          stage='store';
          const key='genjutsu/outputs/'+o.id+'.mp4';await this.env.MEDIA.put(key,data,{httpMetadata:{contentType:'video/mp4'}});this.run('UPDATE orders SET state=?,output=?,updated=? WHERE id=? AND state=?','success',key,Date.now(),o.id,'rendering');
          this.run('INSERT OR IGNORE INTO service_mail(id,account,subject,body) VALUES(?,?,?,?)','ready-'+o.id,o.owner,'Your Genjutsu AI video is ready','Your video is ready: '+ORIGIN+'/generator/?order='+o.id+'\nSign in to preview and download it within 7 days. Order: '+o.id);
        }
      }catch(e){
        // Diagnostics stay in operator logs; omit URLs and configured secret values.
        let detail=String(e.message||e.name||'Archive error');
        for(const value of Object.values(this.env))if(typeof value==='string'&&value.length>12)detail=detail.split(value).join('[redacted]');
        console.warn('Video archive retry',o.id,stage,detail.replace(/https?:\/\/\S+/g,'[URL]').slice(0,200));
        // A known provider task is polled again, never recreated.
      }
    }
  }
  async alarm(){
    try{
      this.run("UPDATE orders SET state='refund_pending',error='Preparation was interrupted.',updated=? WHERE state='preparing' AND updated<?",Date.now(),Date.now()-180000);
      const tasks=this.db.prepare("SELECT * FROM orders WHERE state IN ('queued','rendering','refund_pending') ORDER BY created LIMIT 10").all();for(const task of tasks)await this.tick(task);
      for(const o of this.db.prepare("SELECT * FROM orders WHERE state IN ('submission_unknown','refunded') ORDER BY updated DESC LIMIT 30").all())this.run('INSERT OR IGNORE INTO service_mail(id,account,subject,body) VALUES(?,?,?,?)',o.state+'-'+o.id,o.owner,o.state==='refunded'?'Your video credit has been returned':'Your video submission needs review',o.state==='refunded'?'Generation failed and one credit was returned to its original balance. Sign in at '+ORIGIN+'/dashboard/':('Your order '+o.id+' needs review. We will not submit it twice. Contact '+this.env.SUPPORT_EMAIL));
      for(const m of this.db.prepare('SELECT * FROM service_mail WHERE sent=0 AND attempts<3 LIMIT 10').all()){
        const a=this.row('SELECT email FROM accounts WHERE id=?',m.account);this.run('UPDATE service_mail SET attempts=attempts+1 WHERE id=?',m.id);
        try{const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+this.env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':m.id},body:JSON.stringify({from:this.env.MAIL_FROM,to:[a.email],reply_to:this.env.SUPPORT_EMAIL,subject:m.subject,text:m.body}),signal:AbortSignal.timeout(15000)});if(r.ok)this.run('UPDATE service_mail SET sent=1 WHERE id=?',m.id);}catch{/* Limited retries; generation state stays final. */}
      }
      const cutoff=Date.now()-7*DAY;
      for(const o of this.db.prepare("SELECT * FROM orders WHERE updated<? AND state IN ('success','refunded') LIMIT 50").all(cutoff)){if(o.output)await this.env.MEDIA.delete(o.output);this.run('UPDATE orders SET state=?,output=NULL WHERE id=?','expired',o.id);}
      for(const image of this.db.prepare("SELECT * FROM images WHERE created<? AND id NOT IN (SELECT human FROM orders WHERE state IN ('queued','preparing','rendering','submission_unknown','refund_pending') UNION SELECT zombie FROM orders WHERE state IN ('queued','preparing','rendering','submission_unknown','refund_pending')) LIMIT 50").all(cutoff)){await this.env.MEDIA.delete(image.key);this.run('DELETE FROM images WHERE id=?',image.id);}
      this.run('DELETE FROM mail_tokens WHERE expires<?',Date.now());this.run('DELETE FROM account_sessions WHERE expires<?',Date.now());this.run('DELETE FROM rate_limits WHERE start<?',Date.now()-DAY);
      this.run('DELETE FROM oauth_flows WHERE expires<?',Date.now());this.run('DELETE FROM site_events WHERE created<?',Date.now()-90*DAY);
    }finally{const active=this.row("SELECT COUNT(*) AS n FROM orders WHERE state IN ('queued','preparing','rendering','refund_pending')").n;await this.ctx.storage.setAlarm(Date.now()+(active?30000:300000));}
  }
}
