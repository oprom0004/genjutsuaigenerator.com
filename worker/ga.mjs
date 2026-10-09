export const analyticsPath = '/_site-analytics.js';

export function analyticsScript(id) {
  if (!/^G-[A-Z0-9]+$/.test(id || '')) return '';
  return `(()=>{
if(window.__siteGA||navigator.globalPrivacyControl||navigator.doNotTrack==='1')return;
window.__siteGA=true;
const id=${JSON.stringify(id)};
const clean=(value)=>{if(!value)return '';try{const u=new URL(value,location.origin);return u.origin+u.pathname;}catch{return '';}};
const excluded=()=>/^\\/(api|admin)(\\/|$)/.test(location.pathname);
window.dataLayer=window.dataLayer||[];
window.gtag=function(){window.dataLayer.push(arguments);};
gtag('js',new Date());
gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:clean(location.href),page_referrer:clean(document.referrer)});
let last='';
const page=()=>{const url=clean(location.href);if(excluded()||url===last)return;last=url;gtag('event','page_view',{page_location:url,page_referrer:clean(document.referrer),page_title:document.title,send_to:id});};
page();
for(const name of ['pushState','replaceState']){const original=history[name];history[name]=function(...args){const result=original.apply(this,args);setTimeout(page,0);return result;};}
addEventListener('popstate',page);
const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(script);
})();`;
}

export function analyticsAsset(request, env) {
  if (new URL(request.url).pathname !== analyticsPath) return null;
  return new Response(analyticsScript(env.GA_MEASUREMENT_ID), {headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'public, max-age=300','X-Content-Type-Options':'nosniff'}});
}

export function withAnalytics(response, request, env) {
  if (!/^G-[A-Z0-9]+$/.test(env.GA_MEASUREMENT_ID || '') || response.status !== 200 ||
      !response.headers.get('Content-Type')?.includes('text/html') || /^\/(api|admin)(\/|$)/.test(new URL(request.url).pathname)) return response;
  const headers = new Headers(response.headers);
  const policy = headers.get('Content-Security-Policy');
  if (policy) headers.set('Content-Security-Policy',policy.split(';').map(part=>{
    if (/^\s*script-src\s/.test(part)) return part+' https://www.googletagmanager.com';
    if (/^\s*connect-src\s/.test(part)) return part+' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com';
    if (/^\s*img-src\s/.test(part)) return part+' https://www.google-analytics.com';
    return part;
  }).join(';'));
  headers.delete('Content-Length'); headers.delete('ETag');
  return new HTMLRewriter().on('head',{element(el){el.append(`<script defer src="${analyticsPath}"></script>`,{html:true});}}).transform(new Response(response.body,{status:response.status,headers}));
}
