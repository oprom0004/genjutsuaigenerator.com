const $=id=>document.getElementById(id),on=(id,event,fn)=>$(id)?.addEventListener(event,fn);
let account=null,config={},signup=false,charURL='/media/char-street.webp',charFile=null,motion='src-hiphop',activeOrder=null,pollTimer,uploadId=null,generationKey=null;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const trackingAllowed=()=>navigator.doNotTrack!=='1'&&!navigator.globalPrivacyControl;
let trafficSource='unrecorded';
if(trackingAllowed())try{
 const q=new URLSearchParams(location.search),ref=document.referrer?new URL(document.referrer).hostname:'';
 const raw=(q.get('utm_source')||ref).toLowerCase();
 const known=['chatgpt','perplexity','google','bing','youtube','tiktok','instagram','facebook'];
 trafficSource=sessionStorage.getItem('genjutsu-source')||known.find(s=>raw.includes(s))||(raw?'other':'direct');
 sessionStorage.setItem('genjutsu-source',trafficSource);
}catch{}
function track(event){if(!trackingAllowed())return;let id=crypto.randomUUID();try{const key='genjutsu-event:'+location.pathname+':'+event;id=sessionStorage.getItem(key)||id;sessionStorage.setItem(key,id);}catch{}fetch('/api/analytics/event',{method:'POST',credentials:'same-origin',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({id,event,source:trafficSource})}).catch(()=>{});}
async function api(path,body,method=body?'POST':'GET'){
 const r=await fetch(path,{method,credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:{},...(body?{body:JSON.stringify(body)}:{})});
 const d=await r.json();if(!r.ok)throw Object.assign(Error(d.error||'Request failed.'),{status:r.status});return d;
}
function busy(fn){return async e=>{const b=e?.currentTarget;b?.setAttribute('aria-busy','true');if(b)b.disabled=true;try{await fn(e);}catch(error){showToast(error.message,7000);}finally{b?.removeAttribute('aria-busy');if(b)b.disabled=false;}};}
function modal(open){if($('auth-modal'))$('auth-modal').style.display=open?'flex':'none';}
async function refresh(){account=await api('/api/account?source='+encodeURIComponent(trafficSource));const logged=account.authenticated;
 if($('btn-signout'))$('btn-signout').hidden=!logged;
 if($('btn-manage-subscription'))$('btn-manage-subscription').hidden=!logged||!(account.subscriptions||[]).length;
 for(const id of ['header-credits-count','dashboard-credits-count'])if($(id))$(id).textContent=account.credits||0;
 if($('btn-auth-trigger'))$('btn-auth-trigger').style.display=logged?'none':'inline-flex';
 if($('user-credits-badge'))$('user-credits-badge').style.display=logged?'inline-flex':'none';
 if($('btn-user-dashboard')){$('btn-user-dashboard').style.display=logged?'flex':'none';$('btn-user-dashboard').title=account.user?.email||'My account';}
 if($('account-status'))$('account-status').textContent=logged?(account.user.email+(account.emailVerified?'':' — Verify your email to continue.')):'Sign in to view your videos and purchases.';
 if($('btn-resend-verification'))$('btn-resend-verification').hidden=!logged||account.emailVerified;
 const grid=$('user-videos-grid');if(grid){grid.replaceChildren();for(const order of account.orders||[]){const card=document.createElement('div');card.className='showcase-card';const title=document.createElement('p');title.textContent=(({'src-hiphop':'Hip-hop','src-kpop':'K-pop'})[order.world]||order.world)+' · '+(({'success':'Ready','rendering':'Generating','queued':'Queued','expired':'Expired','refunded':'Credit returned'})[order.state]||order.state);card.append(title);if(order.state==='success'){const video=document.createElement('video');video.src='/api/video/tasks/'+order.id+'/download';video.controls=true;video.playsInline=true;video.style.width='100%';card.append(video);const link=document.createElement('a');link.href=video.src;link.download='genjutsu-'+order.id+'.mp4';link.textContent='Download';link.className='btn-primary';card.append(link);}else if(['queued','preparing','rendering','refund_pending','submission_unknown'].includes(order.state)){const b=document.createElement('button');b.className='btn-secondary';b.textContent='View status';b.addEventListener('click',busy(()=>watch(order.id)));card.append(b);}if(['success','expired','refunded'].includes(order.state)){const b=document.createElement('button');b.className='btn-secondary';b.textContent='Delete';b.addEventListener('click',busy(async()=>{await api('/api/video/tasks/'+order.id,null,'DELETE');await refresh();}));card.append(b);}grid.append(card);}if(!grid.childNodes.length)grid.textContent=logged?'No videos yet.':'Sign in to view your videos.';}
 if($('user-orders-body'))$('user-orders-body').innerHTML=(account.purchases||[]).map(p=>`<tr><td>${esc(p.id)}</td><td>${p.credits} videos</td><td>${p.created?esc(new Date(p.created).toLocaleDateString()):'—'}</td><td>$${(p.amount/100).toFixed(2)}</td><td>${esc(p.state)}</td></tr>`).join('')||'<tr><td colspan="5">No purchases yet.</td></tr>';
 if($('subscription-status'))$('subscription-status').textContent=(account.subscriptions||[]).map(s=>s.status+(s.cancel_at_end?' — Renewal cancelled':'')).join(', ')||'No monthly subscription.';
 return account;
}
async function checkout(planId){await refresh();if(!account.authenticated){modal(true);return;}const d=await api('/api/credits/checkout',{planId,requestKey:crypto.randomUUID()});if(!/^https:\/\/checkout\.stripe\.com\//.test(d.url))throw Error('Invalid checkout URL.');location.assign(d.url);}
function setCharacter(url,file=null){charURL=url;charFile=file;uploadId=null;generationKey=null;if($('preview-char-img'))$('preview-char-img').src=url;if($('dropzone-empty'))$('dropzone-empty').style.display='none';if($('dropzone-preview'))$('dropzone-preview').style.display='flex';if($('preview-char-label'))$('preview-char-label').textContent=file?.name||'Selected character';}
function chooseFile(file){if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024)throw Error('Choose a JPEG, PNG or WebP image up to 8 MB.');if(charURL.startsWith('blob:'))URL.revokeObjectURL(charURL);setCharacter(URL.createObjectURL(file),file);track('select_photo');}
async function generate(){await refresh();if(!account.authenticated){modal(true);return;}if(!$('photo-consent')?.checked)throw Error('Confirm you have permission to use this character image.');if(!account.emailVerified)throw Error('Verify your email from your account first.');if(!account.credits){location.assign('/pricing/');return;}
 if(!config.generationEnabled)throw Error('Generation is temporarily unavailable.');
 if(!uploadId){const blob=charFile||await(await fetch(charURL)).blob();const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.onerror=reject;reader.readAsDataURL(blob);});uploadId=(await api('/api/storage/upload',{role:'human',data})).id;}
 generationKey||=crypto.randomUUID();const result=await api('/api/video/generate',{humanId:uploadId,world:motion,consent:true,requestKey:generationKey});activeOrder=result.id;await watch(result.id);await refresh();
}
async function watch(id){clearTimeout(pollTimer);const order=await api('/api/video/tasks/'+id);activeOrder=id;
 if(!$('generator-workspace')){showToast(order.error||'Video status: '+order.state);return;}
 if($('generator-workspace'))$('generator-workspace').style.display='none';if($('generator-progress'))$('generator-progress').style.display='block';
 if($('progress-status-title'))$('progress-status-title').textContent=({queued:'Queued',preparing:'Preparing your references',rendering:'Generating your video',submission_unknown:'Submission under review',refunded:'Credit returned',refund_pending:'Returning your credit',expired:'Video expired',success:'Video ready'})[order.state]||order.state;
 if($('progress-status-sub'))$('progress-status-sub').textContent=order.error||'Your task is saved. You can return to your account to check it later.';
 if($('progress-percent'))$('progress-percent').textContent='';if($('progress-bar-fill'))$('progress-bar-fill').style.width='100%';
 if(order.state==='success'&&$('result-video')){if($('generator-progress'))$('generator-progress').style.display='none';$('generator-result').style.display='block';$('result-video-src').src=order.download;$('result-video').removeAttribute('poster');$('result-video').load();$('btn-download-result').href=order.download;}
 else if(['queued','preparing','rendering','refund_pending'].includes(order.state))pollTimer=setTimeout(()=>watch(id).catch(e=>showToast(e.message)),12000);
}
document.addEventListener('DOMContentLoaded',async()=>{
 track('page_view');
 document.addEventListener('click',e=>{const a=e.target.closest('a');if(a?.hash==='#showcase')track('see_examples');if(a?.href.includes('/download'))track('download_video');if(e.target.closest('#btn-copy-caption'))track('copy_caption');});
 initNav();initShowcase();on('btn-auth-trigger','click',()=>modal(true));on('btn-close-auth','click',()=>modal(false));on('auth-modal','click',e=>{if(e.target===$('auth-modal'))modal(false);});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal(false);});
 on('btn-toggle-auth-mode','click',()=>{signup=!signup;$('auth-modal-title').textContent=signup?'Create your account':'Welcome back';$('btn-submit-auth').textContent=signup?'Create account':'Sign in';$('btn-toggle-auth-mode').textContent=signup?'Sign in':'Create account';$('input-password').autocomplete=signup?'new-password':'current-password';});
 on('auth-form','submit',busy(async e=>{e.preventDefault();await api('/api/account/'+(signup?'signup':'login'),{email:$('input-email').value,password:$('input-password').value,termsAccepted:$('terms-consent').checked});modal(false);await refresh();showToast(account.emailVerified?'Signed in.':'Check your inbox to verify your email.',7000);}));
 on('btn-oauth-google','click',busy(async()=>{const d=await api('/api/auth/google/start',{termsAccepted:$('terms-consent').checked});location.assign(d.url);}));
 on('btn-forgot-password','click',busy(async()=>{const d=await api('/api/account/request-reset',{email:$('input-email').value});showToast(d.message,7000);}));
 on('btn-resend-verification','click',busy(async()=>{const d=await api('/api/account/resend-verification',{});showToast(d.message||'Verified');}));
 on('btn-signout','click',busy(async()=>{await api('/api/account/logout',{});await refresh();}));on('btn-manage-subscription','click',busy(async()=>{const d=await api('/api/credits/portal',{});if(!/^https:\/\/billing\.stripe\.com\//.test(d.url))throw Error('Invalid billing URL');location.assign(d.url);}));
 document.querySelectorAll('.btn-buy-pack').forEach((b,i)=>b.addEventListener('click',busy(()=>checkout(b.dataset.planId||['video_1','video_3','video_10'][i]))));on('btn-dashboard-add-credits','click',()=>location.assign('/pricing/'));
 document.querySelectorAll('.preset-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.preset-btn').forEach(a=>a.classList.remove('selected'));b.classList.add('selected');setCharacter(b.dataset.charImg);}));document.querySelectorAll('.move-card').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.move-card').forEach(a=>a.classList.remove('selected'));b.classList.add('selected');motion=b.dataset.moveId;generationKey=null;}));
 on('char-dropzone','click',()=>$('char-file-input').click());on('char-file-input','change',busy(e=>chooseFile(e.target.files[0])));on('char-dropzone','dragover',e=>e.preventDefault());on('char-dropzone','drop',busy(e=>{e.preventDefault();chooseFile(e.dataTransfer.files[0]);}));
 on('btn-start-generate','click',busy(generate));on('btn-reset-studio','click',()=>{clearTimeout(pollTimer);$('generator-result').style.display='none';$('generator-progress').style.display='none';$('generator-workspace').style.display='block';uploadId=null;generationKey=null;});on('btn-toggle-sound','click',()=>{$('result-video').muted=!$('result-video').muted;});
 on('tab-show-output','click',()=>{if(activeOrder){$('result-video-src').src='/api/video/tasks/'+activeOrder+'/download';$('result-video').load();}});on('tab-show-source','click',()=>{$('result-video-src').src='/media/'+motion+'.mp4';$('result-video').load();});
 on('btn-copy-caption','click',busy(async()=>{await navigator.clipboard.writeText('Made with Genjutsu AI #AIDance #MotionTransfer');showToast('Caption copied.');}));
 try{config=await api('/api/config');if($('btn-oauth-google'))$('btn-oauth-google').hidden=!config.googleEnabled;await refresh();const q=new URLSearchParams(location.search);if(q.has('verify')){await api('/api/account/verify',{token:q.get('verify')});history.replaceState(null,'',location.pathname);await refresh();showToast('Email verified.');}if(q.has('reset')){const form=document.createElement('form');form.innerHTML='<label>New password (12–128 characters)<input type="password" minlength="12" maxlength="128" required autocomplete="new-password"></label><button type="submit" class="btn-primary">Update password</button>';form.addEventListener('submit',busy(async e=>{e.preventDefault();const d=await api('/api/account/reset',{token:q.get('reset'),password:form.querySelector('input').value});history.replaceState(null,'',location.pathname);form.remove();showToast(d.message);modal(true);}));$('account-status')?.after(form);}if(q.has('order')&&account.authenticated)await watch(q.get('order'));if(q.has('oauth_error')||q.has('google_error'))showToast('Google sign-in could not finish. Please try again.');if(q.get('billing')==='success')showToast('Your balance updates after payment confirmation.');if(q.get('billing')==='cancelled')showToast('Checkout cancelled. No new credits were added.');}catch(e){showToast(e.message,7000);}
});

function initNav() {
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = langBtn?.closest('.lang-dropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
      const expanded = langDropdown.classList.contains('open');
      langBtn.setAttribute('aria-expanded', expanded);
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const expanded = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}


function initShowcase() {
  const showcaseCards = document.querySelectorAll('.showcase-card');

  showcaseCards.forEach(card => {
    const video = card.querySelector('.showcase-video');
    const viewBtns = card.querySelectorAll('.view-btn');
    const btnTryStyle = card.querySelector('.btn-try-style');

    const outVideo = card.getAttribute('data-out-video');
    const srcVideo = card.getAttribute('data-src-video');
    const charImg = card.getAttribute('data-char-img');
    const showcaseId = card.getAttribute('data-showcase-id');

    // Autoplay when card enters viewport
    if (window.IntersectionObserver && video) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });
      observer.observe(card);
    }

    // Toggle View Buttons (Output vs Source Motion)
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-view');
        if (mode === 'src') {
          video.src = srcVideo;
        } else {
          video.src = outVideo;
        }
        video.load();
        video.play().catch(() => {});
      });
    });

    // Try Style Button
    if (btnTryStyle) {
      btnTryStyle.addEventListener('click', () => {
        // Map showcaseId to preset button in Hero Studio
        let targetCharId = 'char-street';
        let targetMoveId = 'src-hiphop';

        if (showcaseId.includes('ninja')) {
          targetCharId = 'char-ninja';
          targetMoveId = 'src-kpop';
        } else if (showcaseId.includes('anime')) {
          targetCharId = 'char-anime';
          targetMoveId = 'src-kpop';
        } else if (showcaseId.includes('suit')) {
          targetCharId = 'char-suit';
          targetMoveId = 'src-hiphop';
        }

        const presetBtn = document.querySelector(`.preset-btn[data-char-id="${targetCharId}"]`);
        if (presetBtn) presetBtn.click();

        const moveCard = document.querySelector(`.move-card[data-move-id="${targetMoveId}"]`);
        if (moveCard) moveCard.click();

        const studioElem = document.getElementById('studio');
        if (studioElem) {
          studioElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          showToast('Loaded preset style into Hero Studio!');
        }
      });
    }
  });
}


export function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
