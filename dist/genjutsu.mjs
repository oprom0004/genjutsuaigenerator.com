// ==========================================================================
// GENJUTSU AI GENERATOR — CLIENT APPLICATION
// ==========================================================================

const STORAGE_KEY = 'genjutsu_user_state_v1';

// Initial state
function getInitialState() {
  return {
    isLoggedIn: false,
    userName: 'Creator',
    userEmail: 'creator@example.com',
    credits: 3,
    videos: [
      {
        id: 'vid-demo-1',
        title: 'Street Dancer × Hip-hop groove',
        charImg: '/media/char-street.webp',
        videoUrl: '/media/out-street-hiphop.mp4',
        moveName: 'Hip-Hop Groove',
        date: '2026-10-06'
      }
    ],
    orders: [
      {
        id: 'ORD-7821',
        packName: '3 Videos Pack (Welcome Bonus)',
        price: '$17.99',
        date: '2026-10-06',
        status: 'Completed'
      }
    ]
  };
}

function loadUserState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user state from localStorage', e);
  }
  const init = getInitialState();
  saveUserState(init);
  return init;
}

function saveUserState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save user state to localStorage', e);
  }
}

// -------------------------------------------------------------
// Toast Notifications
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// Main Application Lifecycle
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  let userState = loadUserState();

  // Navigation & Dropdowns
  initNav();
  initAuthModal(userState);
  initPaymentModal(userState);
  updateUserUI(userState);

  // Hero Generator
  initGenerator(userState);

  // Showcase
  initShowcase();

  // Dashboard (if on dashboard page)
  if (document.getElementById('user-videos-grid')) {
    initDashboard(userState);
  }
});

// -------------------------------------------------------------
// Nav & Dropdowns
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// User Auth & State UI
// -------------------------------------------------------------
function updateUserUI(state) {
  const creditsBadge = document.getElementById('user-credits-badge');
  const headerCreditsCount = document.getElementById('header-credits-count');
  const btnAuthTrigger = document.getElementById('btn-auth-trigger');
  const btnUserDashboard = document.getElementById('btn-user-dashboard');
  const dashboardCreditsCount = document.getElementById('dashboard-credits-count');

  if (headerCreditsCount) headerCreditsCount.textContent = state.credits;
  if (dashboardCreditsCount) dashboardCreditsCount.textContent = state.credits;

  if (state.isLoggedIn) {
    if (creditsBadge) creditsBadge.style.display = 'inline-flex';
    if (btnAuthTrigger) btnAuthTrigger.style.display = 'none';
    if (btnUserDashboard) {
      btnUserDashboard.style.display = 'flex';
      btnUserDashboard.querySelector('.user-initial').textContent = (state.userName || 'U')[0].toUpperCase();
    }
  } else {
    if (creditsBadge) creditsBadge.style.display = 'none';
    if (btnAuthTrigger) btnAuthTrigger.style.display = 'inline-flex';
    if (btnUserDashboard) btnUserDashboard.style.display = 'none';
  }
}

function initAuthModal(state) {
  const modal = document.getElementById('auth-modal');
  const btnTrigger = document.getElementById('btn-auth-trigger');
  const btnClose = document.getElementById('btn-close-auth');
  const authForm = document.getElementById('auth-form');
  const btnGoogle = document.getElementById('btn-oauth-google');
  const btnToggleAuth = document.getElementById('btn-toggle-auth-mode');
  const fieldName = document.getElementById('field-name');
  const modalTitle = document.getElementById('auth-modal-title');
  const btnSubmit = document.getElementById('btn-submit-auth');
  const authToggleLabel = document.getElementById('auth-toggle-label');

  let isSignUpMode = false;

  function openAuth() {
    if (modal) modal.style.display = 'flex';
  }
  function closeAuth() {
    if (modal) modal.style.display = 'none';
  }

  if (btnTrigger) btnTrigger.addEventListener('click', openAuth);
  if (btnClose) btnClose.addEventListener('click', closeAuth);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAuth();
    });
  }

  if (btnToggleAuth) {
    btnToggleAuth.addEventListener('click', () => {
      isSignUpMode = !isSignUpMode;
      if (isSignUpMode) {
        if (fieldName) fieldName.style.display = 'flex';
        if (modalTitle) modalTitle.textContent = 'Create your account';
        if (btnSubmit) btnSubmit.textContent = 'Create account';
        if (authToggleLabel) authToggleLabel.textContent = 'Already have an account?';
        btnToggleAuth.textContent = 'Sign in';
      } else {
        if (fieldName) fieldName.style.display = 'none';
        if (modalTitle) modalTitle.textContent = 'Welcome back';
        if (btnSubmit) btnSubmit.textContent = 'Sign in';
        if (authToggleLabel) authToggleLabel.textContent = 'New here?';
        btnToggleAuth.textContent = 'Create account';
      }
    });
  }

  function handleLogin(email, name) {
    state.isLoggedIn = true;
    state.userEmail = email || 'creator@example.com';
    state.userName = name || 'Creator';
    saveUserState(state);
    updateUserUI(state);
    closeAuth();
    showToast(`Welcome back, ${state.userName}!`);
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('input-email')?.value;
      const name = document.getElementById('input-name')?.value;
      handleLogin(email, name);
    });
  }

  if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
      handleLogin('google.user@gmail.com', 'Google User');
    });
  }
}

// -------------------------------------------------------------
// Payment Modal & Purchase Simulation
// -------------------------------------------------------------
function initPaymentModal(state) {
  const modal = document.getElementById('payment-modal');
  const btnClose = document.getElementById('btn-close-payment');
  const itemName = document.getElementById('checkout-item-name');
  const itemPrice = document.getElementById('checkout-item-price');
  const packSubtitle = document.getElementById('payment-pack-subtitle');
  const btnConfirm = document.getElementById('btn-confirm-checkout');

  let currentPack = {
    name: '3 Videos Pack',
    price: '$17.99',
    credits: 3
  };

  function openPayment(name, price) {
    currentPack.name = name || '3 Videos Pack';
    currentPack.price = price || '$17.99';
    if (name.includes('1 Video')) currentPack.credits = 1;
    else if (name.includes('10 Videos')) currentPack.credits = 10;
    else currentPack.credits = 3;

    if (itemName) itemName.textContent = currentPack.name;
    if (itemPrice) itemPrice.textContent = currentPack.price;
    if (packSubtitle) packSubtitle.textContent = `${currentPack.name} · ${currentPack.price}`;
    if (btnConfirm) btnConfirm.innerHTML = `<span>Complete Payment (${currentPack.price})</span>`;

    if (modal) modal.style.display = 'flex';
  }

  function closePayment() {
    if (modal) modal.style.display = 'none';
  }

  document.querySelectorAll('.btn-buy-pack').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-pack-name');
      const price = btn.getAttribute('data-pack-price');
      openPayment(name, price);
    });
  });

  const btnDashboardAdd = document.getElementById('btn-dashboard-add-credits');
  if (btnDashboardAdd) {
    btnDashboardAdd.addEventListener('click', () => {
      openPayment('3 Videos Pack', '$17.99');
    });
  }

  if (btnClose) btnClose.addEventListener('click', closePayment);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePayment();
    });
  }

  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      btnConfirm.innerHTML = `<span>Processing Stripe Checkout…</span>`;
      btnConfirm.disabled = true;

      setTimeout(() => {
        state.credits += currentPack.credits;
        state.isLoggedIn = true;
        const newOrder = {
          id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
          packName: currentPack.name,
          price: currentPack.price,
          date: new Date().toISOString().split('T')[0],
          status: 'Completed'
        };
        state.orders.unshift(newOrder);
        saveUserState(state);
        updateUserUI(state);
        btnConfirm.disabled = false;
        closePayment();
        showToast(`Success! +${currentPack.credits} video credits added to your balance.`);

        if (document.getElementById('user-videos-grid')) {
          initDashboard(state);
        }
      }, 1200);
    });
  }
}

// -------------------------------------------------------------
// HERO GENERATOR STUDIO INTERACTION
// -------------------------------------------------------------
function initGenerator(state) {
  const workspace = document.getElementById('generator-workspace');
  const progressScreen = document.getElementById('generator-progress');
  const resultScreen = document.getElementById('generator-result');

  if (!workspace || !progressScreen || !resultScreen) return;

  const dropzone = document.getElementById('char-dropzone');
  const fileInput = document.getElementById('char-file-input');
  const dropzoneEmpty = document.getElementById('dropzone-empty');
  const dropzonePreview = document.getElementById('dropzone-preview');
  const previewCharImg = document.getElementById('preview-char-img');
  const previewCharLabel = document.getElementById('preview-char-label');

  const presetBtns = document.querySelectorAll('.preset-btn');
  const moveCards = document.querySelectorAll('.move-card');
  const btnStartGen = document.getElementById('btn-start-generate');

  const progressTitle = document.getElementById('progress-status-title');
  const progressSub = document.getElementById('progress-status-sub');
  const progressBar = document.getElementById('progress-bar-fill');
  const progressPercent = document.getElementById('progress-percent');

  const resultVideo = document.getElementById('result-video');
  const resultVideoSrc = document.getElementById('result-video-src');
  const btnToggleSound = document.getElementById('btn-toggle-sound');
  const tabShowOutput = document.getElementById('tab-show-output');
  const tabShowSource = document.getElementById('tab-show-source');
  const btnDownloadResult = document.getElementById('btn-download-result');
  const btnCopyCaption = document.getElementById('btn-copy-caption');
  const btnResetStudio = document.getElementById('btn-reset-studio');

  // Mapping of combinations to output files
  const renderPairings = {
    'char-street:src-hiphop': {
      outVideo: '/media/out-street-hiphop.mp4',
      outPoster: '/media/out-street-hiphop.webp',
      srcVideo: '/media/src-hiphop.mp4',
      title: 'Street Dancer × Hip-hop groove'
    },
    'char-ninja:src-kpop': {
      outVideo: '/media/out-ninja-kpop.mp4',
      outPoster: '/media/out-ninja-kpop.webp',
      srcVideo: '/media/src-kpop.mp4',
      title: 'Cyber Ninja × K-pop flow'
    },
    'char-anime:src-kpop': {
      outVideo: '/media/out-anime-kpop.mp4',
      outPoster: '/media/out-anime-kpop.webp',
      srcVideo: '/media/src-kpop.mp4',
      title: 'Anime Hero × K-pop flow'
    },
    'char-suit:src-hiphop': {
      outVideo: '/media/out-suit-hiphop.mp4',
      outPoster: '/media/out-suit-hiphop.webp',
      srcVideo: '/media/src-hiphop.mp4',
      title: 'Classic Suit × Hip-hop groove'
    }
  };

  // State
  let selectedChar = {
    id: 'char-street',
    name: 'Street Dancer',
    img: '/media/char-street.webp'
  };
  let selectedMove = {
    id: 'src-hiphop',
    name: 'Hip-Hop Groove',
    video: '/media/src-hiphop.mp4'
  };

  // Preset Selection
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedChar = {
        id: btn.getAttribute('data-char-id'),
        name: btn.getAttribute('data-char-name'),
        img: btn.getAttribute('data-char-img')
      };

      // Update dropzone preview
      if (dropzoneEmpty && dropzonePreview && previewCharImg && previewCharLabel) {
        previewCharImg.src = selectedChar.img;
        previewCharLabel.textContent = selectedChar.name;
        dropzoneEmpty.style.display = 'none';
        dropzonePreview.style.display = 'flex';
      }
    });
  });

  // Custom File Dropzone
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) handleCustomPhoto(file);
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('drag-over');
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) handleCustomPhoto(file);
    });
  }

  function handleCustomPhoto(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      selectedChar = {
        id: 'char-custom',
        name: file.name.replace(/\.[^/.]+$/, ''),
        img: ev.target.result
      };
      presetBtns.forEach(b => b.classList.remove('selected'));
      if (dropzoneEmpty && dropzonePreview && previewCharImg && previewCharLabel) {
        previewCharImg.src = selectedChar.img;
        previewCharLabel.textContent = selectedChar.name;
        dropzoneEmpty.style.display = 'none';
        dropzonePreview.style.display = 'flex';
      }
      showToast('Custom character photo loaded.');
    };
    reader.readAsDataURL(file);
  }

  // Move Selection
  moveCards.forEach(card => {
    card.addEventListener('click', () => {
      moveCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedMove = {
        id: card.getAttribute('data-move-id'),
        name: card.getAttribute('data-move-name'),
        video: card.getAttribute('data-move-video')
      };
    });
  });

  // Resolve best matching output video
  function resolveOutput() {
    const key = `${selectedChar.id}:${selectedMove.id}`;
    if (renderPairings[key]) return renderPairings[key];

    // Fallbacks
    if (selectedChar.id === 'char-ninja') return renderPairings['char-ninja:src-kpop'];
    if (selectedChar.id === 'char-anime') return renderPairings['char-anime:src-kpop'];
    if (selectedChar.id === 'char-suit') return renderPairings['char-suit:src-hiphop'];
    return renderPairings['char-street:src-hiphop'];
  }

  // Generation trigger
  btnStartGen.addEventListener('click', () => {
    if (state.credits < 1) {
      showToast('You have 0 credits left. Please add credits to continue.');
      const btnBuy = document.querySelector('.btn-buy-pack');
      if (btnBuy) btnBuy.click();
      return;
    }

    // Deduct credit
    state.credits -= 1;
    saveUserState(state);
    updateUserUI(state);

    // Switch view to progress
    workspace.style.display = 'none';
    progressScreen.style.display = 'block';
    resultScreen.style.display = 'none';

    // Step simulation
    const steps = [
      { pct: 20, title: 'Extracting 3D Pose Geometry…', sub: 'Analyzing full-body joints and facial landmarks' },
      { pct: 55, title: 'Synthesizing Full-Body Dynamics…', sub: 'Applying choreography timing and fluid clothing physics' },
      { pct: 85, title: 'Preserving Identity & Facial Mesh…', sub: 'Locking features across 360-degree rotations' },
      { pct: 100, title: 'Finalizing 9:16 HD Render…', sub: 'Packaging high-definition MP4 with audio sync' }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        const s = steps[currentStepIdx];
        if (progressBar) progressBar.style.width = `${s.pct}%`;
        if (progressPercent) progressPercent.textContent = `${s.pct}%`;
        if (progressTitle) progressTitle.textContent = s.title;
        if (progressSub) progressSub.textContent = s.sub;
      } else {
        clearInterval(interval);
        finishGeneration();
      }
    }, 700);
  });

  function finishGeneration() {
    const output = resolveOutput();

    // Save to user video history
    const newVideo = {
      id: 'vid-' + Date.now(),
      title: `${selectedChar.name} × ${selectedMove.name}`,
      charImg: selectedChar.img,
      videoUrl: output.outVideo,
      moveName: selectedMove.name,
      date: new Date().toISOString().split('T')[0]
    };
    state.videos.unshift(newVideo);
    saveUserState(state);

    // Setup result screen
    if (resultVideo && resultVideoSrc) {
      resultVideoSrc.src = output.outVideo;
      resultVideo.poster = output.outPoster;
      resultVideo.load();
      resultVideo.play().catch(() => {});
    }

    if (btnDownloadResult) {
      btnDownloadResult.href = output.outVideo;
      btnDownloadResult.setAttribute('download', `${selectedChar.id}-${selectedMove.id}.mp4`);
    }

    progressScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    showToast('Generation complete! 9:16 HD video is ready.');
  }

  // Sound toggle
  if (btnToggleSound && resultVideo) {
    btnToggleSound.addEventListener('click', () => {
      resultVideo.muted = !resultVideo.muted;
      btnToggleSound.textContent = resultVideo.muted ? '🔇' : '🔊';
    });
  }

  // Compare Tab Switcher
  if (tabShowOutput && tabShowSource && resultVideo && resultVideoSrc) {
    tabShowOutput.addEventListener('click', () => {
      tabShowOutput.classList.add('active');
      tabShowSource.classList.remove('active');
      const output = resolveOutput();
      resultVideoSrc.src = output.outVideo;
      resultVideo.load();
      resultVideo.play().catch(() => {});
    });

    tabShowSource.addEventListener('click', () => {
      tabShowSource.classList.add('active');
      tabShowOutput.classList.remove('active');
      const output = resolveOutput();
      resultVideoSrc.src = output.srcVideo;
      resultVideo.load();
      resultVideo.play().catch(() => {});
    });
  }

  // Copy caption
  if (btnCopyCaption) {
    btnCopyCaption.addEventListener('click', () => {
      const caption = `I brought this character to life using Genjutsu AI motion transfer! 🕺✨ #genjutsuai #aimotiontransfer #danceai #viral`;
      navigator.clipboard.writeText(caption).then(() => {
        showToast('Caption copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy caption.');
      });
    });
  }

  // Reset studio
  if (btnResetStudio) {
    btnResetStudio.addEventListener('click', () => {
      resultScreen.style.display = 'none';
      progressScreen.style.display = 'none';
      workspace.style.display = 'block';
    });
  }
}

// -------------------------------------------------------------
// SHOWCASE INTERACTIVITY
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// DASHBOARD VIEW
// -------------------------------------------------------------
function initDashboard(state) {
  const videosGrid = document.getElementById('user-videos-grid');
  const ordersBody = document.getElementById('user-orders-body');
  const emptyState = document.getElementById('empty-videos-state');

  if (videosGrid) {
    if (state.videos && state.videos.length > 0) {
      if (emptyState) emptyState.style.display = 'none';

      videosGrid.innerHTML = state.videos.map(v => `
        <div class="showcase-card user-video-card" data-video-id="${v.id}">
          <div class="showcase-video-box">
            <video class="showcase-video" loop muted playsinline autoplay controls>
              <source src="${v.videoUrl}" type="video/mp4">
            </video>
          </div>
          <div class="showcase-meta">
            <h4 class="showcase-title">${escapeHtml(v.title)}</h4>
            <p class="showcase-desc text-dim text-sm">${v.date} · 9:16 HD MP4</p>
            <div class="showcase-footer">
              <a href="${v.videoUrl}" download class="btn-primary btn-sm">Download</a>
              <button type="button" class="btn-ghost btn-sm btn-delete-video" data-video-id="${v.id}">Delete</button>
            </div>
          </div>
        </div>
      `).join('');

      // Delete handler
      videosGrid.querySelectorAll('.btn-delete-video').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-video-id');
          if (confirm('Delete this video from your account?')) {
            state.videos = state.videos.filter(item => item.id !== id);
            saveUserState(state);
            initDashboard(state);
            showToast('Video removed.');
          }
        });
      });
    } else {
      if (emptyState) emptyState.style.display = 'block';
    }
  }

  if (ordersBody) {
    if (state.orders && state.orders.length > 0) {
      ordersBody.innerHTML = state.orders.map(o => `
        <tr>
          <td><code>${o.id}</code></td>
          <td><strong>${escapeHtml(o.packName)}</strong></td>
          <td>${o.date}</td>
          <td>${o.price}</td>
          <td><span class="badge-success">${o.status}</span></td>
        </tr>
      `).join('');
    }
  }
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
