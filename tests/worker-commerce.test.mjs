import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {GenjutsuCommerce} from '../worker/commerce.mjs';
const ORIGIN='https://genjutsuaigenerator.com';
function fixture(t){
 const db=new DatabaseSync(':memory:');let latestMail,latestPayload,subscription,creates=0,state='success',denySubmit=false,redirectOutput=false;const objects=new Map(),priorFetch=globalThis.fetch;
 const response=data=>Response.json(data);
 globalThis.fetch=async(url,opt={})=>{
  const u=String(url);
  if(u==='https://api.resend.com/emails'){latestMail=JSON.parse(opt.body);return response({id:'mail_test'});}
  if(u.includes('/subscriptions/sub_monthly'))return response(subscription);
  if(u.includes('stripe.com/v1/checkout/sessions'))return response({id:'cs_test',url:'https://checkout.stripe.com/mock'});
  if(u.includes('file-stream-upload'))return response({code:200,data:{downloadUrl:'https://input.example/portrait.jpg'}});
  if(u.includes('chat/credit'))return response({code:200,data:10000});
  if(u.includes('jobs/createTask')){creates++;latestPayload=JSON.parse(opt.body);assert.equal(latestPayload.model,'kling-2.6/motion-control');assert.equal(latestPayload.input.mode,'720p');assert.equal(latestPayload.input.input_urls.length,1);assert.equal(latestPayload.input.video_urls.length,1);if(denySubmit)throw Error('Ambiguous network failure');return response({code:200,data:{taskId:'provider_1'}});}
  if(u.includes('recordInfo'))return response({code:200,data:{state,resultJson:JSON.stringify({resultUrls:['https://tempfile.aiquickdraw.com/out.mp4']})}});
  if(u==='https://tempfile.aiquickdraw.com/out.mp4'){
   assert.equal(opt.redirect,'manual','Cloudflare Workers requires manual redirect handling; output-host boundaries must remain enforced');
   if(redirectOutput)return new Response(null,{status:302,headers:{Location:'https://unapproved.example/video.mp4'}});
   return new Response(Buffer.from('0000ftypMOCK-VIDEO'));
  }
  throw Error('Unexpected external request '+u);
 };
 const storage={sql:{exec(query,...args){let rows;if(query.includes(';')){db.exec(query);rows=[];}else{const statement=db.prepare(query);rows=statement.columns().length?statement.all(...args):(statement.run(...args),[]);}return {toArray:()=>rows,one:()=>rows[0]};}},transactionSync(fn){db.exec('BEGIN IMMEDIATE');try{const r=fn();db.exec('COMMIT');return r;}catch(e){db.exec('ROLLBACK');throw e;}},setAlarm:async()=>{}};
 const env={COMMERCE_ENABLED:'true',GENERATION_ACCEPTED:'true',SUPPORT_EMAIL:'contact@genjutsuaigenerator.com',OPERATOR_NAME:'KirooAI',KIE_API_KEY:'mock',STRIPE_SECRET_KEY:'mock',STRIPE_PRICE_VIDEO_1:'price_1',STRIPE_PRICE_VIDEO_3:'price_3',STRIPE_PRICE_VIDEO_10:'price_10',STRIPE_PRICE_MONTHLY:'price_monthly',STRIPE_PORTAL_CONFIG_ID:'bpc_mock',STRIPE_WEBHOOK_SECRET:'whsec_mock',RESEND_API_KEY:'mock',MAIL_FROM:'test@example.com',ASSETS:{fetch:async()=>new Response(new Uint8Array([1,2,3]))},MONTHLY_PRICE_CENTS:'1499',MONTHLY_VIDEO_CREDITS:'3',MEDIA:{put:async(k,data)=>objects.set(k,new Uint8Array(data)),get:async(k,{range}={})=>{const d=objects.get(k);if(!d)return null;const bytes=range?d.slice(range.offset,range.offset+range.length):d;return {arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),body:bytes};},head:async k=>objects.has(k)?{size:objects.get(k).length}:null,delete:async k=>objects.delete(k)}};
 const app=new GenjutsuCommerce({storage},env);let cookie='';
 const api=async(path,body,method=body?'POST':'GET',extra={})=>{const r=await app.fetch(new Request(ORIGIN+path,{method,headers:{origin:ORIGIN,cookie,...extra},...(body?{body:JSON.stringify(body)}:{})}));if(r.headers.get('set-cookie'))cookie=r.headers.get('set-cookie').split(';')[0];return {r,d:await r.json()};};
 const signUp=async()=>{const {r,d}=await api('/api/account/signup',{email:'owner@example.com',password:'long-test-password-123',termsAccepted:true});assert.equal(r.status,200);assert.equal(d.emailVerified,false);const code=latestMail.text.match(/verify=([a-f0-9]{64})/)[1];assert.equal((await api('/api/account/verify',{token:code})).r.status,200);return app.credits.resolve(crypto.createHash('sha256').update(cookie.split('=')[1]).digest('hex'));};
 const pack=async owner=>{const checkout=await api('/api/credits/checkout',{planId:'video_3',requestKey:crypto.randomUUID()});assert.equal(checkout.r.status,200);assert.equal(checkout.d.url,'https://checkout.stripe.com/mock');const p=app.row('SELECT * FROM credit_purchases WHERE owner=?',owner);assert.equal(p.checkout,'cs_test');const event={id:'evt_test',type:'checkout.session.completed',data:{object:{id:p.checkout,client_reference_id:p.id,metadata:{appId:'genjutsuaigenerator.com',purchaseId:p.id},payment_status:'paid',currency:'usd',amount_total:1799,mode:'payment',payment_intent:'pi_test'}}};await app.credits.webhook(event);await app.credits.webhook({...event,id:'evt_replay'});assert.equal(app.wallet(owner).balance,3);};
 t.after(()=>{globalThis.fetch=priorFetch;db.close();});return {app,api,signUp,pack,objects,getMail:()=>latestMail,getPayload:()=>latestPayload,getCreates:()=>creates,setFail:()=>{state='fail';},setUnknown:()=>{denySubmit=true;},setOutputRedirect:value=>{redirectOutput=value;},setSubscription:value=>{subscription=value;}};
}

test('Operator maintenance retries archive safely without following redirects or recreating a paid task',async t=>{
 const f=fixture(t),owner=await f.signUp();await f.pack(owner);f.app.env.ADMIN_TOKEN='operator-test';
 for(const [id,role] of [['human-photo','human'],['partner-photo','zombie']]){f.app.run('INSERT INTO images VALUES(?,?,?,?,?)',id,owner,role,id,Date.now());f.objects.set(id,new Uint8Array([1]));}
 const first=await f.api('/api/video/generate',{humanId:'human-photo',zombieId:'partner-photo',world:'src-hiphop',consent:true,requestKey:crypto.randomUUID()});
 const maintain=()=>f.api('/api/internal/maintenance?run=now',{},'POST',{authorization:'Bearer operator-test'});
 assert.equal((await f.api('/api/internal/maintenance?run=now',{})).r.status,404);
 assert.equal((await maintain()).r.status,200);f.setOutputRedirect(true);await maintain();
 assert.equal(f.app.row('SELECT state FROM orders WHERE id=?',first.d.id).state,'rendering');assert.equal(f.getCreates(),1);assert.equal(f.app.wallet(owner).balance,2);
 f.setOutputRedirect(false);await maintain();assert.equal(f.app.row('SELECT state FROM orders WHERE id=?',first.d.id).state,'success');assert.equal(f.getCreates(),1);assert.equal(f.app.wallet(owner).balance,2);
});
 test('Read-only administration isolates credentials, rejects mutation and binds searches',async t=>{
 const f=fixture(t);f.app.env.ADMIN_READ_TOKEN='reader-test';f.app.env.ADMIN_TOKEN='operator-test';
 const owner=await f.signUp();await f.pack(owner);
 const headers={authorization:'Bearer reader-test'};
 assert.equal((await f.api('/api/internal/admin/data')).r.status,404);
 assert.equal((await f.api('/api/internal/admin/data',{},'POST',headers)).r.status,404);
 assert.equal((await f.api('/api/internal/reconcile',{orderId:'x'},'POST',headers)).r.status,404);
 for(const section of ['overview','users','purchases','subscriptions','credits','spends','tasks']){
  const {r,d}=await f.api('/api/internal/admin/data?section='+section,undefined,'GET',headers);
  assert.equal(r.status,200);assert.equal(d.readOnly,true);assert.equal(d.summary.users,1);
  const raw=JSON.stringify(d);for(const key of ['password','request_key','human','genjutsu_session','RESEND_API_KEY'])assert.equal(raw.includes('"'+key+'"'),false);
  assert.equal(d.analytics.revenueCents,1799);assert.equal(d.analytics.stages.paid,1);
 }
 assert.equal((await f.api('/api/internal/admin/data?section=users&q=%25',undefined,'GET',headers)).d.pagination.total,0);
 assert.equal((await f.api('/api/internal/admin/data?section=users&page=99999',undefined,'GET',headers)).d.pagination.page,1);
 assert.equal((await f.api('/api/internal/admin/data?section=users&page=0',undefined,'GET',headers)).r.status,400);
 const health=await f.api('/api/internal/admin/health',undefined,'GET',headers);assert.equal(health.d.providerCapacityOK,true);assert.equal(health.d.providerCredits,10000);assert.equal(health.d.rows,undefined);
});
test('Optional analytics is bounded, deduplicated, cannot fabricate payment and attributes once',async t=>{
 const f=fixture(t),id=crypto.randomUUID();
 const body={id,event:'see_examples',source:'google'};
 assert.equal((await f.api('/api/analytics/event',body)).r.status,200);await f.api('/api/analytics/event',body);
 assert.equal(f.app.row('SELECT COUNT(*) n FROM site_events').n,1);
 assert.equal((await f.api('/api/analytics/event',{...body,id:crypto.randomUUID(),event:'paid'})).r.status,400);
 assert.equal((await f.api('/api/analytics/event',{...body,id:crypto.randomUUID()},'POST',{origin:'https://bad.example'})).r.status,403);
 assert.equal((await f.api('/api/analytics/event',{...body,padding:'x'.repeat(600)})).r.status,413);
 const owner=await f.signUp();await f.api('/api/account?source=chatgpt');await f.api('/api/account?source=google');
 assert.equal(f.app.row('SELECT source FROM account_sources WHERE account=?',owner).source,'chatgpt');
 f.app.run('DELETE FROM account_sources WHERE account=?',owner);f.app.run('UPDATE accounts SET created=? WHERE id=?',1,owner);await f.api('/api/account?source=google');assert.equal(f.app.row('SELECT source FROM account_sources WHERE account=?',owner),undefined);
});
test('Signed successful Stripe callbacks fulfill once and leave unsigned or unpaid events without credits',async t=>{
 const f=fixture(t),owner=await f.signUp();await f.api('/api/credits/checkout',{planId:'video_1',requestKey:crypto.randomUUID()});const p=f.app.row('SELECT * FROM credit_purchases WHERE owner=?',owner);
 const event={id:'evt_signed_success',type:'checkout.session.completed',data:{object:{id:p.checkout,client_reference_id:p.id,metadata:{appId:'genjutsuaigenerator.com',purchaseId:p.id},payment_status:'unpaid',currency:'usd',amount_total:699,mode:'payment',payment_intent:'pi_signed'}}};
 const send=async(e,signed=true)=>{const raw=JSON.stringify(e),time=Math.floor(Date.now()/1000),signature=crypto.createHmac('sha256','whsec_mock').update(time+'.'+raw).digest('hex');return f.app.fetch(new Request(ORIGIN+'/api/payments/webhook',{method:'POST',headers:signed?{'stripe-signature':`t=${time},v1=${signature}`}:{},body:raw}));};
 assert.equal((await send(event,false)).status,400);assert.equal(f.app.wallet(owner).balance,0);
 assert.equal((await send(event)).status,200);assert.equal(f.app.wallet(owner).balance,0);
 event.id='evt_signed_paid';event.data.object.payment_status='paid';assert.equal((await send(event)).status,200);assert.equal(f.app.wallet(owner).balance,1);
 assert.equal((await send(event)).status,200);assert.equal(f.app.wallet(owner).balance,1);assert.equal(f.app.row('SELECT COUNT(*) n FROM billing_receipts').n,1);
});

test('Monthly invoices grant once, reject wrong amounts and expire without affecting purchased packs',async t=>{
 const f=fixture(t),owner=await f.signUp();
 await f.api('/api/credits/checkout',{planId:'monthly',requestKey:crypto.randomUUID()});
 const p=f.app.row('SELECT * FROM credit_purchases WHERE owner=?',owner);
 const subscription={id:'sub_monthly',customer:'cus_monthly',status:'active',cancel_at_period_end:false,metadata:{appId:'genjutsuaigenerator.com',purchaseId:p.id}};
 f.setSubscription(subscription);
 await f.app.credits.webhook({id:'evt_monthly_checkout',type:'checkout.session.completed',data:{object:{id:p.checkout,client_reference_id:p.id,metadata:subscription.metadata,payment_status:'paid',currency:'usd',amount_total:1499,mode:'subscription',customer:subscription.customer,subscription:subscription.id}}});
 assert.equal(f.app.wallet(owner).balance,0,'Checkout alone must not fabricate monthly credits');
 const invoice={id:'in_monthly',subscription:subscription.id,customer:subscription.customer,currency:'usd',amount_paid:1499,billing_reason:'subscription_create',lines:{data:[{subscription:subscription.id,proration:false,price:{unit_amount:1499},period:{start:Math.floor(Date.now()/1000),end:Math.floor(Date.now()/1000)+86400}}]}};
 const event={id:'evt_monthly_invoice',type:'invoice.paid',data:{object:invoice}};
 await f.app.credits.webhook(event);await f.app.credits.webhook({...event,id:'evt_monthly_duplicate'});
 assert.equal(f.app.wallet(owner).balance,3);
 await assert.rejects(f.app.credits.webhook({id:'evt_bad_invoice',type:'invoice.paid',data:{object:{...invoice,id:'in_wrong',amount_paid:1}}}),/requires review/);
 assert.equal(f.app.wallet(owner).balance,3);
 subscription.cancel_at_period_end=true;
 await f.app.credits.webhook({id:'evt_cancel_renewal',type:'customer.subscription.updated',data:{object:subscription}});
 assert.equal(f.app.row('SELECT cancel_at_end FROM credit_subscriptions WHERE id=?',subscription.id).cancel_at_end,1);
 assert.equal(f.app.wallet(owner).balance,3,'Cancelling renewal preserves current period credits');
 f.app.run('UPDATE credit_grants SET expires=? WHERE kind=?',Date.now()-1,'subscription');
 assert.equal(f.app.wallet(owner).balance,0);
 f.app.run('INSERT INTO credit_grants VALUES(?,?,?,?,?,?,?)','permanent-pack',owner,'pack',1,1,null,'test-pack');
 assert.equal(f.app.wallet(owner).balance,1);
});

test('Worker verifies email, isolates purchases, reserves once, archives motion output and enforces download ownership',async t=>{
 const f=fixture(t),owner=await f.signUp();await f.pack(owner);
 const jpeg=await sharp({create:{width:512,height:512,channels:3,background:'#aaa'}}).jpeg().toBuffer();const human=(await f.api('/api/storage/upload',{role:'human',data:jpeg.toString('base64')})).d.id,zombie='' ;
 const body={humanId:human,zombieId:zombie,world:'src-hiphop',consent:true,requestKey:crypto.randomUUID()},first=await f.api('/api/video/generate',body),again=await f.api('/api/video/generate',body);assert.equal(first.r.status,201);assert.equal(first.d.id,again.d.id);assert.equal(f.app.wallet(owner).balance,2);
 await f.app.alarm();await f.app.alarm();assert.equal(f.getCreates(),1);const order=f.app.row('SELECT * FROM orders WHERE id=?',first.d.id);assert.equal(order.state,'success');assert.ok(f.objects.has(order.output));
 const other=await f.app.fetch(new Request(ORIGIN+`/api/video/tasks/${order.id}/download`));assert.equal(other.status,401);
 const reset=await f.api('/api/account/request-reset',{email:'owner@example.com'});assert.equal(reset.r.status,200);const code=f.getMail().text.match(/reset=([a-f0-9]{64})/)[1];assert.equal((await f.api('/api/account/reset',{token:code,password:'updated-password-12345'})).r.status,200);assert.equal((await f.api('/api/account')).d.account,null);assert.equal((await f.api('/api/account/reset',{token:code,password:'updated-password-12345'})).r.status,400);
});
test('Worker returns failed credit once and never resubmits an ambiguous paid call',async t=>{
 const f=fixture(t),owner=await f.signUp();await f.pack(owner);
 for(const [id,role] of [['h','human'],['z','zombie']]){f.app.run('INSERT INTO images VALUES(?,?,?,?,?)',id,owner,role,id,Date.now());f.objects.set(id,new Uint8Array([1]));}
 const make=()=>f.api('/api/video/generate',{humanId:'h',zombieId:'z',world:'src-hiphop',consent:true,requestKey:crypto.randomUUID()});
 const first=(await make()).d;await f.app.alarm();f.setFail();await f.app.alarm();await f.app.alarm();await f.app.alarm();assert.equal(f.app.wallet(owner).balance,3);assert.equal(f.app.row('SELECT state FROM orders WHERE id=?',first.id).state,'refunded');
 f.setUnknown();const second=(await make()).d;await f.app.alarm();await f.app.alarm();assert.equal(f.app.row('SELECT state FROM orders WHERE id=?',second.id).state,'submission_unknown');assert.equal(f.getCreates(),2);assert.equal(f.app.wallet(owner).balance,2);
});
test('Worker refuses unverified purchases, forged billing webhooks and cross-origin mutations',async t=>{
 const f=fixture(t);
 assert.equal((await f.api('/api/account/signup',{email:'owner@example.com',password:'long-test-password-123'})).r.status,400);
 assert.equal(f.app.row('SELECT COUNT(*) AS n FROM accounts').n,0);
 const registration=await f.api('/api/account/signup',{email:'owner@example.com',password:'long-test-password-123',termsAccepted:true});assert.equal(registration.r.status,200);
 assert.equal((await f.api('/api/credits/checkout',{planId:'video_1',requestKey:crypto.randomUUID()})).r.status,403);
 assert.equal((await f.api('/api/payments/webhook',{id:'forged',data:{object:{}}})).r.status,400);
 assert.equal((await f.api('/api/account/logout',{},'POST',{origin:'https://bad.example'})).r.status,403);
});
test('Unused uploads can be deleted only by their owner and order portraits are protected',async t=>{
 const f=fixture(t),owner=await f.signUp(),id=crypto.randomUUID();f.app.run('INSERT INTO images VALUES(?,?,?,?,?)',id,owner,'human',id,Date.now());f.objects.set(id,new Uint8Array([1]));
 const other=await f.app.fetch(new Request(ORIGIN+'/api/storage/uploads/'+id,{method:'DELETE',headers:{origin:ORIGIN}}));assert.equal(other.status,401);
 f.app.run('INSERT INTO orders(id,owner,request_key,world,human,zombie,state,created,updated) VALUES(?,?,?,?,?,?,?,?,?)',crypto.randomUUID(),owner,crypto.randomUUID(),'cabin',id,'other','queued',Date.now(),Date.now());
 assert.equal((await f.api('/api/storage/uploads/'+id,null,'DELETE')).r.status,409);assert.ok(f.objects.has(id));
 f.app.run("UPDATE orders SET state='refunded'");assert.equal((await f.api('/api/storage/uploads/'+id,null,'DELETE')).r.status,200);assert.equal(f.objects.has(id),false);
});
test('Production readiness fails closed when billing configuration is incomplete',async t=>{
 const f=fixture(t);assert.equal(!!f.app.ready(),true);delete f.app.env.STRIPE_PRICE_VIDEO_1;
 const health=await f.api('/api/health');assert.equal(health.d.ready,false);assert.equal((await f.api('/api/config')).d.paymentEnabled,false);
});
