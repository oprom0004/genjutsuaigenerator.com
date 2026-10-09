import assets from './holding.mjs';
import { analyticsAsset, withAnalytics } from './ga.mjs';
export {GenjutsuCommerce} from './commerce.mjs';
export default {
 async fetch(request,env,ctx){
  const gaResponse=analyticsAsset(request,env); if(gaResponse)return gaResponse;
  const url=new URL(request.url);
  if(url.protocol!=='https:'){url.protocol='https:';return Response.redirect(url.href,301);}
  if(url.hostname==='www.genjutsuaigenerator.com'){url.hostname='genjutsuaigenerator.com';return Response.redirect(url.href,301);}
  if(url.pathname==='/account'||url.pathname==='/account/'){url.pathname='/dashboard/';return Response.redirect(url.href,302);}
  if(url.pathname.startsWith('/api/')){
   if(url.hostname!=='genjutsuaigenerator.com')return Response.json({error:'Use the official website.'},{status:403,headers:{'X-Robots-Tag':'noindex'}});
   return env.COMMERCE.get(env.COMMERCE.idFromName('genjutsu-ledger-v1')).fetch(request);
  }
  return withAnalytics(await assets.fetch(request,env,ctx),request,env);
 },
 async scheduled(controller,env,ctx){ctx.waitUntil(env.COMMERCE.get(env.COMMERCE.idFromName('genjutsu-ledger-v1')).fetch(new Request('https://genjutsuaigenerator.com/api/internal/maintenance',{method:'POST',headers:{Authorization:'Bearer '+env.ADMIN_TOKEN}})));}
};
