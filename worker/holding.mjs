export default {
  async fetch(request, env) {
    const url=new URL(request.url);
    if(url.hostname==='www.genjutsuaigenerator.com'){
      url.hostname='genjutsuaigenerator.com';return Response.redirect(url.href,301);
    }
    if(url.pathname.startsWith('/api/')) return Response.json({error:'Personalized generation and payments are coming soon.'},{status:503,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
    const response=await env.ASSETS.fetch(request);
    const headers=new Headers(response.headers);
    headers.set('X-Content-Type-Options','nosniff');
    headers.set('Referrer-Policy','strict-origin-when-cross-origin');
    headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' blob: data:; media-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
    // Static asset responses may ignore Range; preserve seeking for hosted examples.
    if(url.pathname.endsWith('.mp4') && response.status===200){
      headers.set('Accept-Ranges','bytes');
      const range=request.headers.get('Range');
      if(range && request.method==='GET'){
        const data=await response.arrayBuffer(),size=data.byteLength;
        const match=/^bytes=(\d*)-(\d*)$/.exec(range);
        const suffix=match && !match[1] && match[2];
        const start=suffix?Math.max(0,size-Number(match[2])):Number(match?.[1]);
        const end=suffix?size-1:Math.min(match?.[2]?Number(match[2]):size-1,size-1);
        if(!match || (!match[1]&&!match[2]) || !Number.isSafeInteger(start) || start>=size || end<start){headers.set('Content-Range',`bytes */${size}`);headers.delete('Content-Length');return new Response(null,{status:416,headers});}
        headers.set('Content-Range',`bytes ${start}-${end}/${size}`);headers.set('Content-Length',String(end-start+1));headers.delete('Content-Encoding');
        return new Response(data.slice(start,end+1),{status:206,headers});
      }
    }
    if(url.hostname.endsWith('.workers.dev')||/\/(?:dashboard)(?:\/|$)/.test(url.pathname)||response.status===404)headers.set('X-Robots-Tag','noindex, nofollow');
    if(url.pathname==='/robots.txt'&&url.hostname.endsWith('.workers.dev'))return new Response('User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain','X-Robots-Tag':'noindex'}});
    return new Response(response.body,{status:response.status,headers});
  }
};
