// Explicit read projections: never return credentials, portraits or download URLs.
export const SECTIONS=['overview','users','purchases','subscriptions','credits','spends','tasks'];
export function initAdmin(db){db.exec(`
 CREATE TABLE IF NOT EXISTS site_events(id TEXT PRIMARY KEY,event TEXT NOT NULL,source TEXT NOT NULL,created INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS account_sources(account TEXT PRIMARY KEY,source TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS ops_state(id TEXT PRIMARY KEY,value INTEGER,checked INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS site_events_created ON site_events(created);`);
 db.prepare('INSERT OR IGNORE INTO ops_state VALUES(?,?,?)').run('tracking_started',Date.now(),Date.now());
}
export function sourceName(value){return ['google','bing','chatgpt','perplexity','youtube','tiktok','instagram','facebook','direct','other'].includes(value)?value:'other';}
export function readAdmin(app,params){
 const section=params.get('section')||'overview',q=(params.get('q')||'').trim(),pageText=params.get('page')||'1',days=Number(params.get('days')||30);
 if(!SECTIONS.includes(section)||q.length>150||!/^\d{1,5}$/.test(pageText)||Number(pageText)<1||![7,30,90].includes(days))throw Object.assign(Error('Invalid admin query.'),{status:400});
 const db=app.db,all=(sql,...args)=>db.prepare(sql).all(...args),one=(sql,...args)=>db.prepare(sql).get(...args),n=sql=>one(sql).n;
 const now=Date.now(),start=now-days*86400000;
 const summary={users:n('SELECT COUNT(*) n FROM accounts'),paidOrders:n("SELECT COUNT(*) n FROM credit_purchases WHERE state IN ('paid','active')"),tasks:n('SELECT COUNT(*) n FROM orders'),failed:n("SELECT COUNT(*) n FROM orders WHERE state='refunded'"),attention:n("SELECT COUNT(*) n FROM orders WHERE state IN ('submission_unknown','refund_pending') OR (state IN ('queued','preparing','rendering') AND updated < "+(now-3600000)+')'),stored:n("SELECT COUNT(*) n FROM orders WHERE state='success' AND output IS NOT NULL")};
 const health={ready:!!app.ready(),googleEnabled:!!(app.env.GOOGLE_AUTH_ENABLED==='true'&&app.env.GOOGLE_CLIENT_ID&&app.env.GOOGLE_CLIENT_SECRET),failedMail:n('SELECT COUNT(*) n FROM service_mail WHERE sent=0 AND attempts>=3'),ambiguous:n("SELECT COUNT(*) n FROM orders WHERE state='submission_unknown'"),stalled:n("SELECT COUNT(*) n FROM orders WHERE state IN ('queued','preparing','rendering') AND updated<"+(now-3600000)),callbackEvents:n('SELECT COUNT(*) n FROM credit_events')};
 let base,columns,order='id DESC',args=[];
 const idColumn=section==='spends'?'t.task':'t.id';
 const search=q?` WHERE (a.email LIKE ? ESCAPE \'\\\' OR ${idColumn} LIKE ? ESCAPE '\\')`:'';
 const escaped='%'+q.replace(/[\\%_]/g,'\\$&')+'%';if(q)args=[escaped,escaped];
 if(section==='users'){base='accounts t JOIN accounts a ON a.id=t.id';columns="t.id,a.email,t.created AS createdAt,t.blocked,COALESCE((SELECT SUM(remaining) FROM credit_grants WHERE owner=t.id AND (expires IS NULL OR expires>"+now+")),0) AS balance,COALESCE((SELECT source FROM account_sources WHERE account=t.id),'unrecorded') AS source";order='t.created DESC,t.id';}
 else if(section==='purchases'){base='credit_purchases t JOIN accounts a ON a.id=t.owner';columns="t.id,a.email,t.plan,t.amount,t.credits,t.type,t.state,t.checkout,t.subscription,(SELECT created FROM ledger_times WHERE kind='purchase' AND id=t.id) AS createdAt";order='t.rowid DESC';}
 else if(section==='subscriptions'){base='credit_subscriptions t JOIN accounts a ON a.id=t.owner';columns='t.id,a.email,t.status,t.cancel_at_end,t.purchase';order='t.rowid DESC';}
 else if(section==='spends'){base='credit_spends t JOIN accounts a ON a.id=t.owner';columns="t.task AS id,a.email,t.grant_id,t.returned,(SELECT created FROM ledger_times WHERE kind='spend' AND id=t.task) AS createdAt,(SELECT created FROM ledger_times WHERE kind='refund' AND id=t.task) AS returnedAt";order='t.rowid DESC';}
 else if(section==='credits'){base='credit_grants t JOIN accounts a ON a.id=t.owner';columns="t.id,a.email,t.kind,t.total,t.remaining,t.expires,t.purchase,(SELECT created FROM ledger_times WHERE kind='grant' AND id=t.id) AS createdAt";order='t.rowid DESC';}
 else {base='orders t JOIN accounts a ON a.id=t.owner';columns='t.id,a.email,t.world AS story,t.state,t.created AS createdAt,t.updated AS updatedAt,t.provider,CASE WHEN t.output IS NOT NULL THEN 1 ELSE 0 END AS archived,COALESCE((SELECT returned FROM credit_spends WHERE task=t.id),0) AS refunded';order='t.created DESC,t.id';}
 const where=section==='overview'?" WHERE (t.state IN ('submission_unknown','refund_pending') OR (t.state IN ('queued','preparing','rendering') AND t.updated<?))":search;
 if(section==='overview')args=[now-3600000];
 const total=one('SELECT COUNT(*) n FROM '+base+where,...args).n,pages=Math.max(1,Math.ceil(total/25)),page=Math.min(Number(pageText),pages);
 const rows=all('SELECT '+columns+' FROM '+base+where+' ORDER BY '+order+' LIMIT 25 OFFSET ?',...args,(page-1)*25);
 const receipts=one('SELECT COUNT(*) payments,COALESCE(SUM(amount),0) revenue FROM billing_receipts WHERE created>=?',start);
 const funnel=all('SELECT event,COUNT(*) count FROM site_events WHERE created>=? GROUP BY event',start);
 const stages={page_view:0,see_examples:0,select_photo:0,create_from_example:0,download_video:0,share_video:0,copy_caption:0};for(const r of funnel)stages[r.event]=r.count;
 stages.signup=one('SELECT COUNT(*) n FROM accounts WHERE created>=?',start).n;
 stages.checkout=one("SELECT COUNT(*) n FROM ledger_times WHERE kind='purchase' AND created>=?",start).n;
 stages.paid=receipts.payments;stages.generate=one('SELECT COUNT(*) n FROM orders WHERE created>=?',start).n;
 const capacity=one("SELECT value,checked FROM ops_state WHERE id='provider'");
 health.providerCredits=capacity?.value??null;health.providerChecked=capacity?.checked??null;
 return {site:'genjutsuaigenerator.com',readOnly:true,summary,health,rows,pagination:{page,pages,total,pageSize:25},analytics:{days,stages,revenueCents:receipts.revenue,modelCostCents:null,subscriptions:all('SELECT status,COUNT(*) count FROM credit_subscriptions GROUP BY status'),sources:all("SELECT COALESCE(s.source,'unrecorded') source,COUNT(*) users FROM accounts a LEFT JOIN account_sources s ON s.account=a.id WHERE a.created>=? GROUP BY COALESCE(s.source,'unrecorded')",start),daily:all("SELECT date(created/1000,'unixepoch','+8 hours') day,COUNT(*) payments,SUM(amount) revenueCents FROM billing_receipts WHERE created>=? GROUP BY day ORDER BY day DESC",start)}};
}
