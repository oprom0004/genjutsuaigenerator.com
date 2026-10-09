import crypto from 'node:crypto';
export const hash=txt=>crypto.createHash('sha256').update(txt).digest('hex');
export const random=()=>crypto.randomBytes(32).toString('hex');
export async function passwordHash(password,salt=random()){
  const key=await globalThis.crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await globalThis.crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:100000},key,256);
  return salt+':'+Buffer.from(bits).toString('hex');
}
export async function authenticate(db,token,email,password,signup,wallet){
  email=String(email||'').trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||typeof password!=='string'||password.length<12||password.length>128)throw Error('Choose a valid email and a password of 12–128 characters.');
  let a=db.prepare('SELECT * FROM accounts WHERE email=?').get(email);
  if(signup){
    if(a)throw Error('Account unavailable. Sign in or reset your password.');
    const digest=await passwordHash(password);a={id:crypto.randomUUID(),email,password:digest};
    // Recheck uniqueness after the asynchronous password hash.
    db.prepare('INSERT INTO accounts(id,email,password,created) VALUES(?,?,?,?)').run(a.id,email,a.password,Date.now());
  }else{
    const stored=a?.password||'missing:'+Buffer.alloc(32).toString('hex');const got=await passwordHash(password,stored.split(':')[0]);
    if(!a||!crypto.timingSafeEqual(Buffer.from(got.split(':')[1],'hex'),Buffer.from(stored.split(':')[1],'hex')))throw Error('Email or password did not match.');
  }
  db.prepare('INSERT OR REPLACE INTO account_sessions VALUES(?,?,?)').run(token,a.id,Date.now()+7*86400000);return wallet(a.id);
}
export function verifyWebhook(raw,signature,secret,now=Date.now()){
  const parts=String(signature||'').split(','),stamp=parts.find(p=>p.startsWith('t='))?.slice(2);
  if(!/^\d+$/.test(stamp||'')||Math.abs(now/1000-Number(stamp))>300)return false;
  const expected=crypto.createHmac('sha256',secret).update(`${stamp}.${raw}`).digest('hex');
  return parts.filter(p=>p.startsWith('v1=')).some(p=>/^[a-f0-9]{64}$/.test(p.slice(3))&&crypto.timingSafeEqual(Buffer.from(p.slice(3),'hex'),Buffer.from(expected,'hex')));
}
