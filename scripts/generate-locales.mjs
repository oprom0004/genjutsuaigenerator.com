import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../locales');
fs.mkdirSync(localesDir, { recursive: true });

const commonComparison = {
  headers: {
    en: ["Feature", "Genjutsu AI Generator", "Generic Face Swap", "Traditional VFX", "Standard Text-to-Video"],
    ja: ["機能・項目", "Genjutsu AI Generator", "一般的な顔交換ツール", "従来のVFX・CG制作", "一般的なText-to-Video"],
    es: ["Función / Característica", "Genjutsu AI Generator", "Face Swap Genérico", "VFX Tradicional", "Text-to-Video Estándar"],
    pt: ["Recurso / Função", "Genjutsu AI Generator", "Face Swap Genérico", "VFX Tradicional", "Text-to-Video Padrão"],
    de: ["Funktion / Merkmal", "Genjutsu AI Generator", "Standard-Face-Swap", "Klassische VFX", "Standard Text-zu-Video"],
    fr: ["Fonctionnalité", "Genjutsu AI Generator", "Face Swap Générique", "VFX Traditionnels", "Text-to-Video Standard"]
  },
  rows: {
    en: [
      ["Full-Body Motion Transfer", "Yes (Head-to-Toe Motion & Pose)", "Face Only (Body untouched)", "Manual MoCap / 3D Rigging", "Random, unguided movement"],
      ["Identity Locking", "100% Face, Hair & Wardrobe Lock", "Distorts on extreme angles", "High-budget custom scan", "Face drifts between frames"],
      ["Style Preservation (Anime & 3D)", "Preserves cel-shading & 3D lighting", "Fails on illustrations (mushy skin)", "Manual Retexturing", "Inconsistent art style"],
      ["Turnaround Speed", "2–3 Minutes in Browser", "1–2 Minutes", "2–4 Weeks of post-production", "3–5 Minutes"],
      ["Skills & Equipment Needed", "Zero (Upload Photo + Pick Move)", "Low", "Expert VFX Artists + Green Screen", "Complex text prompt guesswork"]
    ],
    ja: [
      ["全身の動作・モーション転送", "対応（頭から足先まで完全同期）", "顔のみ（体や動きは元のまま）", "モーションキャプチャ／3Dリグ必須", "制御不能なランダムな動き"],
      ["キャラクター固有性の固定（Identity Lock）", "顔・髪型・服装を100%保持", "横顔や激しい動きで破綻しやすい", "高額な3Dスキャンが必要", "フレームごとに顔が変わる"],
      ["アニメ・3Dイラストの画風維持", "セル画調や3D質感をそのまま維持", "イラストに人間の肌を無理やり合成", "手作業のテクスチャ描き直し", "画風が統一されない"],
      ["生成完了までのスピード", "ブラウザ上で約2〜3分", "約1〜2分", "数週間〜数ヶ月のCG作業", "約3〜5分"],
      ["必要な機材・スキル", "不要（写真と動作を選ぶだけ）", "不要", "高額なソフトと専門チーム", "複雑なプロンプトの調整"]
    ],
    es: [
      ["Transferencia de Movimiento de Cuerpo Entero", "Sí (De la cabeza a los pies)", "Solo Cara (Cuerpo sin cambios)", "Captura de movimiento manual / 3D", "Movimiento aleatorio sin control"],
      ["Fijación de Identidad (Identity Lock)", "100% Cara, Cabello y Ropa fijos", "Se deforma en ángulos extremos", "Escaneos 3D de alto presupuesto", "La cara cambia en cada toma"],
      ["Preservación de Estilo (Anime y 3D)", "Mantiene cel-shading y textura 3D", "Falla en ilustraciones (piel borrosa)", "Retexturizado manual", "Estilo artístico inconsistente"],
      ["Velocidad de Creación", "2–3 Minutos en el Navegador", "1–2 Minutos", "2–4 Semanas de postproducción", "3–5 Minutos"],
      ["Habilidades y Equipos Necesarios", "Cero (Sube Foto + Elige Movimiento)", "Bajo", "Equipo de artistas VFX + Croma", "Prompts complejos e impredecibles"]
    ],
    pt: [
      ["Transferência de Movimento de Corpo Inteiro", "Sim (Da cabeça aos pés)", "Apenas Rosto (Corpo inalterado)", "Captura de movimento / 3D manual", "Movimento aleatório sem guia"],
      ["Bloqueio de Identidade (Identity Lock)", "100% Rosto, Cabelo e Roupas fixos", "Distorce em ângulos extremos", "Escaneamentos 3D caros", "O rosto muda entre os frames"],
      ["Preservação de Estilo (Anime e 3D)", "Mantém cel-shading e iluminação 3D", "Falha em ilustrações (pele manchada)", "Retexturização manual", "Estilo visual inconsistente"],
      ["Velocidade de Geração", "2–3 Minutos no Navegador", "1–2 Minutos", "2–4 Semanas de pós-produção", "3–5 Minutos"],
      ["Habilidades e Equipamentos", "Nenhum (Envie Foto + Escolha Dança)", "Baixo", "Equipe de VFX + Fundo Verde", "Prompts complexos e imprevisíveis"]
    ],
    de: [
      ["Ganzkörper-Bewegungsübertragung", "Ja (Von Kopf bis Fuß synchronisiert)", "Nur Gesicht (Körper unverändert)", "Manuelles MoCap / 3D-Rigging", "Zufällige, ungelenkte Bewegung"],
      ["Identitätsbindung (Identity Locking)", "100% Gesicht, Haare & Kleidung fixiert", "Verzerrung bei extremen Winkeln", "Teure 3D-Scans erforderlich", "Gesicht wechselt zwischen Szenen"],
      ["Stilerhaltung (Anime & 3D)", "Behält Cel-Shading & 3D-Licht bei", "Scheitert bei Illustrationen", "Manuelle Nachbearbeitung", "Inkonsistenter Bildstil"],
      ["Erstellungsdauer", "2–3 Minuten im Browser", "1–2 Minuten", "2–4 Wochen Postproduktion", "3–5 Minuten"],
      ["Erforderliche Fähigkeiten & Technik", "Keine (Foto hochladen + Tanz wählen)", "Gering", "Professionelles VFX-Team", "Komplexe Prompt-Optimierung"]
    ],
    fr: [
      ["Transfert de Mouvement Corps Entier", "Oui (De la tête aux pieds)", "Visage Seul (Corps inchangé)", "Motion capture manuelle / Rigging 3D", "Mouvement aléatoire non guidé"],
      ["Verrouillage d'Identité (Identity Lock)", "100% Visage, Cheveux et Vêtements fixés", "Distorsion sur angles extrêmes", "Scans 3D très coûteux", "Le visage change selon les plans"],
      ["Préservation de Style (Anime & 3D)", "Conserve le cel-shading et le rendu 3D", "Échoue sur les illustrations", "Retexturation manuelle", "Style artistique incohérent"],
      ["Vitesse de Rendu", "2–3 Minutes dans le Navigateur", "1–2 Minutes", "2–4 Semaines de post-production", "3–5 Minutes"],
      ["Compétences et Matériel Requis", "Zéro (Téléversez Photo + Choisissez Danse)", "Faible", "Équipe VFX + Fond vert", "Prompts complexes et aléatoires"]
    ]
  }
};

const localeBase = {
  en: {
    locale: "en", name: "English", flag: "🇺🇸", dir: "ltr",
    meta: {
      siteName: "Genjutsu AI", siteOrigin: "https://genjutsuaigenerator.com",
      tagline: "AI Motion Transfer & Character Animation Generator",
      homeTitle: "Genjutsu AI Generator — Animate Any Photo with Motion Transfer & Dance",
      homeDescription: "Animate any photo with AI motion transfer and character swaps. Upload one character portrait, pick a dance or combat move, and generate an identity-locked 9:16 video in minutes."
    },
    nav: {
      generator: "Hero Studio", showcase: "Showcase", features: "Modes",
      howItWorks: "How It Works", comparison: "Comparison", pricing: "Pricing",
      faq: "FAQ", myAccount: "My Account", myVideos: "My Videos",
      signIn: "Sign In", signOut: "Sign Out", create: "Animate Photo", credits: "credits"
    },
    home: {
      hero: {
        eyebrow: "REALITY-BENDING MOTION TRANSFER & CHARACTER ANIMATION",
        h1: "Bring Any Character to Life with AI Motion Transfer",
        lead: "Turn static photos into fluid, identity-locked videos. Animate portraits with viral TikTok dances, combat choreography, or anime transformations — zero green screen or complex VFX required.",
        stats: [
          { val: "1 Photo", label: "ANY CHARACTER" },
          { val: "9:16 HD", label: "TIKTOK & REELS" },
          { val: "100%", label: "IDENTITY LOCKED" }
        ]
      },
      heroGenerator: {
        badge: "HERO CREATION STUDIO",
        step1Title: "1. Choose Character Photo",
        step1Hint: "Clear JPG or PNG · Preserves face, hair, and costume",
        dropHint: "Drag and drop your photo, or browse from device",
        presetLabel: "Or try a one-click sample character:",
        presets: [
          { id: "char-street", name: "Street Dancer", role: "Photoreal Portrait", img: "/media/char-street.webp" },
          { id: "char-ninja", name: "Cyber Ninja", role: "3D Armored", img: "/media/char-ninja.webp" },
          { id: "char-anime", name: "Anime Hero", role: "Cel-Shaded", img: "/media/char-anime.webp" },
          { id: "char-suit", name: "Gentleman", role: "Formal Suit", img: "/media/char-suit.webp" }
        ],
        step2Title: "2. Choose Motion or Choreography",
        step2Hint: "Select ready-made moves or upload a reference video",
        moves: [
          { id: "src-hiphop", name: "Hip-Hop Groove", tag: "STREET DANCE", duration: "10s", video: "/media/src-hiphop.mp4", thumb: "/media/src-hiphop.webp" },
          { id: "src-kpop", name: "K-Pop Chorus", tag: "VIRAL CHOREO", duration: "10s", video: "/media/src-kpop.mp4", thumb: "/media/src-kpop.webp" }
        ],
        btnGenerate: "Animate Character (1 Credit)",
        specs: "Render time ~2 mins · 9:16 Portrait MP4 · Credit Protected if render fails",
        readyTitle: "Your Animated Video is Ready!",
        readyBadge: "RENDER COMPLETE",
        btnDownload: "Download MP4",
        btnShare: "Share Video",
        btnCopyCaption: "Copy Caption",
        btnReset: "Animate Another Character",
        captionDefault: "I brought this character to life using Genjutsu AI motion transfer! 🕺✨ #genjutsuai #aimotiontransfer #danceai #viral"
      },
      showcase: {
        eyebrow: "INTERACTIVE SHOWCASE",
        title: "Watch Photos Come to Life",
        intro: "Every clip below started from a single image. Click the toggle buttons on each card to compare the source motion with the final rendered video.",
        btnToggleSrc: "Source Photo & Motion",
        btnToggleOut: "Genjutsu Output",
        items: [
          {
            id: "out-street-hiphop", title: "Street Dancer × Hip-hop groove",
            tag: "REALISTIC STREET DANCE",
            desc: "Single studio portrait driven by hip-hop footwork and arm waves. Face, hairstyle, and sneakers stay locked frame-by-frame.",
            video: "/media/out-street-hiphop.mp4", poster: "/media/out-street-hiphop.webp",
            srcVideo: "/media/src-hiphop.mp4", charImg: "/media/char-street.webp"
          },
          {
            id: "out-ninja-kpop", title: "Cyber Ninja × K-pop flow",
            tag: "3D ARMORED CHOREOGRAPHY",
            desc: "A 3D-rendered cyborg warrior executes intricate shoulder rolls and body isolations without melting rigid armor plates.",
            video: "/media/out-ninja-kpop.mp4", poster: "/media/out-ninja-kpop.webp",
            srcVideo: "/media/src-kpop.mp4", charImg: "/media/char-ninja.webp"
          },
          {
            id: "out-anime-kpop", title: "Anime Hero × K-pop flow",
            tag: "CEL-SHADED STYLE PRESERVATION",
            desc: "Illustration in, cel-shaded animation out. Linework and color fills move with authentic 2D anime timing.",
            video: "/media/out-anime-kpop.mp4", poster: "/media/out-anime-kpop.webp",
            srcVideo: "/media/src-kpop.mp4", charImg: "/media/char-anime.webp"
          },
          {
            id: "out-suit-hiphop", title: "Classic Suit × Hip-hop groove",
            tag: "ELEGANT CONTRAST DANCE",
            desc: "Tailored suit silhouette and facial expression carried through rapid tempo switches and spins.",
            video: "/media/out-suit-hiphop.mp4", poster: "/media/out-suit-hiphop.webp",
            srcVideo: "/media/src-hiphop.mp4", charImg: "/media/char-suit.webp"
          }
        ]
      },
      pillars: {
        eyebrow: "THREE REALITY-BENDING MODES",
        title: "More Than Just Dance: Complete Character Animation",
        items: [
          {
            title: "AI Motion Transfer & Viral Dance",
            desc: "Extract full-body poses, footwork, hand gestures, and rhythm from any video, then direct your character to perform it with fluid natural physics."
          },
          {
            title: "Anime Transformation & Genjutsu VFX",
            desc: "Blend cel-shaded anime line art, dramatic eye transitions, and reality-warping background shifts without rotoscoping or manual frame cleanup."
          },
          {
            title: "Cinematic Character Recast",
            desc: "Place any character into iconic movie scenes or commercial choreography while preserving original camera tracking, depth of field, and grain."
          }
        ]
      },
      howItWorks: {
        eyebrow: "SIMPLE 3-STEP PROCESS",
        title: "From Photo to Motion in Minutes",
        steps: [
          { num: "01", title: "Upload Character Photo", desc: "Choose any full-body photo or portrait. Real people, 3D digital avatars, or hand-drawn anime." },
          { num: "02", title: "Select Motion or Video", desc: "Pick a pre-choreographed dance from our library or upload your own 5–30 second reference video." },
          { num: "03", title: "Download 9:16 Video", desc: "Receive an identity-locked, high-definition MP4 formatted for TikTok, Reels, and YouTube Shorts." }
        ]
      },
      comparison: {
        eyebrow: "WHY GENJUTSU AI GENERATOR",
        title: "Next-Generation Motion Synthesis vs Legacy Tools",
        headers: commonComparison.headers.en,
        rows: commonComparison.rows.en
      },
      pricing: {
        eyebrow: "TRANSPARENT CREATION CREDITS",
        title: "Simple, Honest Pricing",
        intro: "1 video credit creates one full animated video. No hidden fees or recurring traps.",
        packs: [
          { name: "1 Video Pack", price: "$9.99", unit: "$9.99/video", desc: "1 video credit · Never expires", popular: false },
          { name: "3 Videos Pack", price: "$17.99", unit: "$5.99/video", desc: "3 video credits · Only $5.99/video · Popular", popular: true },
          { name: "10 Videos Pack", price: "$49.99", unit: "$4.99/video", desc: "10 video credits · Only $4.99/video · Best Value", popular: false }
        ],
        subscription: {
          name: "Monthly Creator Pass",
          price: "$14.99 / mo",
          desc: "3 video credits every month · Cancel renewal anytime"
        },
        cta: "Get Credits Now",
        guaranteeTitle: "Credit Protection Guarantee",
        guaranteeDesc: "If a render fails due to a server error or technical dispatch issue, your spent credit is immediately restored to your balance. Zero risk."
      },
      faq: {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        title: "Everything You Need to Know",
        items: [
          {
            q: "What is AI motion transfer and how does Genjutsu AI work?",
            a: "AI motion transfer extracts the skeletal movement, gestures, and performance from a source reference video and applies it to a still character photo. Genjutsu AI calculates 3D pose, hands, and facial geometry in every frame, synthesizing a fluid, continuous video where the character performs the choreography with their face, clothing, and art style 100% intact."
          },
          {
            q: "How is Genjutsu AI different from generic face swap apps?",
            a: "Traditional face swap only replaces the face within an existing video, leaving the original body, clothes, and physique untouched. Genjutsu AI performs full-character animation: it generates a completely new video of your chosen character from head to toe, matching their authentic silhouette, clothing folds, and hair motion to the choreography."
          },
          {
            q: "Does it work with anime, 3D avatars, and illustrated art?",
            a: "Yes! Genjutsu AI is style-preserving. Photoreal portraits stay photoreal, 3D digital sculptures keep their metallic reflections and geometry, and anime illustrations maintain clean cel-shading and 2D outlines without looking like an unnatural photo filter."
          },
          {
            q: "What kind of photos work best?",
            a: "A clear, well-lit photo showing the character from head to waist (or full body) with neutral pose. Both real human portraits and digital art work seamlessly."
          },
          {
            q: "Can I upload my own custom dance or workout video?",
            a: "Yes. In addition to our built-in viral motion library, you can upload any MP4 or MOV video between 5 and 30 seconds to serve as the custom choreography reference."
          },
          {
            q: "What output format and resolution do I receive?",
            a: "All completed renders are delivered as native vertical 9:16 MP4 files at 1080x1920 HD resolution, complete with audio matching the dance routine, ready for instant posting on TikTok, Instagram Reels, and YouTube Shorts."
          },
          {
            q: "What happens if a video render fails?",
            a: "Our Credit Protection Guarantee automatically refunds your spent credit back to your account ledger immediately if a rendering job fails. You never pay for an uncompleted generation."
          },
          {
            q: "Do you own the rights to the videos you generate?",
            a: "Yes. You retain full ownership and commercial rights to post, monetize, and distribute the videos you create from photos you own or have permission to use."
          }
        ]
      }
    },
    generator: {
      metaTitle: "AI Motion Transfer & Character Generator — Genjutsu AI",
      metaDescription: "Online studio for AI motion transfer: animate photos into dance, martial arts, and viral TikTok short videos.",
      h1: "Genjutsu AI Studio",
      subtitle: "Upload your character photo, select a dance or movement, and render high-definition videos in minutes."
    },
    dashboard: {
      metaTitle: "My Account & Video Library — Genjutsu AI",
      metaDescription: "Access your generated videos, check your creation credit balance, and view order records.",
      h1: "My Account & Video Library",
      lead: "Manage your animated videos, download MP4 exports, and check credit balances.",
      balanceLabel: "Available Balance",
      creditsUnit: "credits",
      addCredits: "Add Credits",
      myVideosTitle: "My Generated Videos",
      ordersTitle: "Purchase History",
      emptyVideosTitle: "No videos created yet",
      emptyVideosDesc: "Upload a photo in the studio to bring your first character to life.",
      btnCreateFirst: "Create Your First Video →",
      emptyOrders: "No purchase records found.",
      colOrder: "Order ID", colPlan: "Plan / Pack", colDate: "Date", colAmount: "Amount", colStatus: "Status",
      btnDownload: "Download MP4", btnDelete: "Delete", confirmDelete: "Delete this video from your account?"
    },
    pricingPage: {
      metaTitle: "Pricing & Creation Credits — Genjutsu AI",
      metaDescription: "Simple, transparent pricing for AI motion transfer. 1 credit creates 1 full video. Credit Protection included.",
      h1: "Simple, Transparent Pricing",
      intro: "Create viral motion-transferred videos without subscriptions or hidden fees."
    },
    articles: {
      "how-to-make-ai-motion-transfer-video": {
        slug: "how-to-make-ai-motion-transfer-video",
        navLabel: "Motion Transfer Guide",
        metaTitle: "How to Make an AI Motion Transfer Video: Complete 2026 Guide",
        metaDescription: "Step-by-step tutorial on creating AI motion transfer videos from photos. Learn photo selection, motion tracking, identity preservation, and TikTok export.",
        h1: "How to Make an AI Motion Transfer Video",
        intro: "AI motion transfer has transformed social video production: take any still portrait and make them perform complex choreography with identity locking.",
        sections: [
          { heading: "What is AI Motion Transfer?", body: "Motion transfer technology isolates human movement from a source video and maps those dynamics onto an unrelated still photograph. Unlike primitive face swaps that only glue facial features onto someone else's body, motion transfer reconstructs full-body movement, cloth physics, and posture from scratch." },
          { heading: "Choosing the Ideal Character Photo", body: "For best results, use a sharp, evenly lit image where the character's facial features, hands, and outfit are clearly distinguishable. The model preserves artistic style — anime stays cel-shaded, 3D remains rendered, and photos stay photographic." },
          { heading: "Exporting for TikTok, Reels, and Shorts", body: "Native 9:16 vertical orientation ensures maximum engagement on mobile feeds. Genjutsu AI renders directly to vertical MP4 format with audio synchronization, eliminating the need for post-crop editing." }
        ]
      },
      "ai-dance-generator-guide": {
        slug: "ai-dance-generator-guide",
        navLabel: "AI Dance Guide",
        metaTitle: "AI Dance Video Generator: Turn Any Photo into Viral Choreography",
        metaDescription: "Learn how creators turn still portraits into viral TikTok dance videos using AI motion transfer and identity preservation.",
        h1: "The Complete Guide to AI Dance Video Generation",
        intro: "From K-pop chorus routines to hip-hop footwork, AI dance generation allows creators to animate historical figures, anime characters, and personal avatars in minutes.",
        sections: [
          { heading: "Why AI Dance Videos Go Viral", body: "Viewers are captivated by the surreal contrast of unexpected characters executing precise, high-energy dance routines. An anime ninja performing K-pop or a Renaissance portrait doing hip-hop generates immense curiosity and watch time." },
          { heading: "Key Elements of Identity Locking", body: "Without identity locking, character faces warp and drift as heads turn. Genjutsu AI maintains facial geometry across 360-degree rotations and rapid spins, ensuring your character remains recognizable throughout the routine." }
        ]
      },
      "character-swap-vs-face-swap": {
        slug: "character-swap-vs-face-swap",
        navLabel: "Character vs Face Swap",
        metaTitle: "Character Swap vs Face Swap: Key Differences in AI Video Generation",
        metaDescription: "Understand the differences between video face swaps and full AI character swaps. Discover which technology suits your creative projects.",
        h1: "Character Swap vs Face Swap: Technology & Creative Differences",
        intro: "While both technologies alter people in video, full character swap and simple face swap operate on entirely different computational principles.",
        sections: [
          { heading: "How Face Swap Works", body: "Face swap detects facial landmarks on a performer and pastes a replacement face mask onto the original head. The original actor's body, clothing, proportions, and background remain completely untouched." },
          { heading: "How Full Character Swap Works", body: "Character swap replaces the entire performer — head, torso, clothing, and limbs. The AI synthesizes the character performing the motion while maintaining the surrounding environment, lighting, and camera movement." }
        ]
      },
      "terms": {
        slug: "terms", navLabel: "Terms of Service",
        metaTitle: "Terms of Service — Genjutsu AI", metaDescription: "Terms and conditions for using Genjutsu AI video generation services.",
        h1: "Terms of Service", intro: "Please review the terms and conditions governing your use of Genjutsu AI.",
        sections: [
          { heading: "Acceptable Use & Permissions", body: "You must own or hold explicit authorization to use any photos or videos you upload. Generating non-consensual imagery, deepfakes of public officials, or harmful content is strictly prohibited." },
          { heading: "Credits & Payments", body: "Credits are deducted upon generation initiation. In the event of a system or model failure, spent credits are restored automatically to your account balance." }
        ]
      },
      "privacy": {
        slug: "privacy", navLabel: "Privacy Policy",
        metaTitle: "Privacy Policy — Genjutsu AI", metaDescription: "How Genjutsu AI protects your personal photos, videos, and account information.",
        h1: "Privacy Policy", intro: "We are committed to user privacy and secure processing of media files.",
        sections: [
          { heading: "Media Processing & Retention", body: "Uploaded photos and videos are stored in encrypted cloud storage solely to render your requested video. Media is automatically expunged after 7 days unless saved to your library." },
          { heading: "No Model Training on User Photos", body: "Your private uploads are never used to train public machine learning foundation models." }
        ]
      },
      "about": {
        slug: "about", navLabel: "About Us",
        metaTitle: "About Genjutsu AI — Next-Gen Motion Synthesis",
        metaDescription: "Learn about Genjutsu AI, our mission to democratize cinematic video motion synthesis.",
        h1: "About Genjutsu AI", intro: "Genjutsu AI is dedicated to empowering creators with accessible, studio-grade motion transfer.",
        sections: [
          { heading: "Our Mission", body: "We believe visual storytelling should not be constrained by complex motion capture hardware, expensive studio spaces, or intensive 3D rigging workflows. Genjutsu AI brings studio-grade character animation directly to web creators worldwide." }
        ]
      }
    },
    ui: {
      home: "Home", close: "Close", skip: "Skip to main content",
      signin: "Sign in", signup: "Create account", welcome: "Welcome back",
      google: "Continue with Google", orEmail: "or with email",
      email: "Email", password: "Password", passwordHint: "At least 8 characters",
      termsConsent: "I agree to the Terms of Service and Privacy Policy.",
      forgot: "Forgot password?", reset: "Reset password",
      signedOut: "Signed out successfully.", authRequired: "Sign in to access your account.",
      processingPayment: "Processing payment…", paid: "Paid",
      loading: "Loading…", unavailable: "Service temporarily unavailable. Please try again.",
      uploading: "Uploading photo…", rendering: "Directing AI motion synthesis…",
      success: "Completed", failed: "Generation failed. Credit returned.",
      copied: "Caption copied to clipboard!", sharePrivate: "Direct sharing not supported. Use Download MP4.",
      delete: "Delete", deleteConfirm: "Delete this video from your account?",
      footer: "Animate any character from a single photo with AI motion transfer."
    },
    auth: {
      badge: "GENJUTSU AI STUDIO",
      titleSignUp: "Create your account", titleSignIn: "Welcome back",
      subtitle: "Animate characters with persistent cloud generation credits.",
      google: "Continue with Google", divider: "or with email",
      nameLabel: "Name", namePlaceholder: "Your name",
      emailLabel: "Email", emailPlaceholder: "you@example.com",
      passwordLabel: "Password", passwordPlaceholder: "At least 8 characters",
      btnSignUp: "Create account", btnSignIn: "Sign in",
      switchHaveAccount: "Already have an account?", switchNewHere: "New here?"
    },
    payment: {
      badge: "STRIPE PAYMENT STATUS", title: "Confirming your purchase…",
      waiting: "Waiting for confirmation from Stripe…", refresh: "Refresh Status", viewOrders: "View Orders"
    }
  },
  ja: {
    locale: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr",
    meta: {
      siteName: "Genjutsu AI", siteOrigin: "https://genjutsuaigenerator.com",
      tagline: "AIモーション転送・キャラクター動画ジェネレーター",
      homeTitle: "Genjutsu AI Generator — 写真1枚からダンス・モーションを生成するAI幻術ツール",
      homeDescription: "写真1枚から自然なダンスや格闘アクション動画を生成するAIモーション転送ジェネレーター。顔や服装を100%保ったまま、TikTok・Reels向けの縦型9:16動画を数分で作成。"
    },
    nav: {
      generator: "スタジオ", showcase: "実例動画", features: "機能紹介",
      howItWorks: "使い方", comparison: "機能比較", pricing: "料金プラン",
      faq: "よくある質問", myAccount: "マイページ", myVideos: "動画一覧",
      signIn: "ログイン", signOut: "ログアウト", create: "写真を動かす", credits: "クレジット"
    },
    home: {
      hero: {
        eyebrow: "現実を操るAIモーション転送・キャラクターアニメーション",
        h1: "写真1枚から、キャラクターを自在に動かすAI幻術",
        lead: "静止画の写真を、滑らかで顔が崩れない動画へ。TikTokで話題のダンス、格闘アクション、アニメ風の変身まで、グリーンバックや高度なVFX編集なしで誰でも生成できます。",
        stats: [
          { val: "写真1枚", label: "あらゆるキャラクター対応" },
          { val: "9:16 縦型", label: "TIKTOK & REELS 最適化" },
          { val: "100%", label: "顔・衣装の完全固定" }
        ]
      },
      heroGenerator: {
        badge: "HERO 生成スタジオ",
        step1Title: "1. キャラクター写真を選択",
        step1Hint: "鮮明なJPG / PNG · 顔・髪型・衣装を保持",
        dropHint: "写真をドラッグ＆ドロップ、またはファイルを選択",
        presetLabel: "またはサンプルキャラクターで今すぐ試す:",
        presets: [
          { id: "char-street", name: "ストリートダンサー", role: "実写リアル", img: "/media/char-street.webp" },
          { id: "char-ninja", name: "サイバー忍者", role: "3D装甲", img: "/media/char-ninja.webp" },
          { id: "char-anime", name: "アニメ主人公", role: "セル画調", img: "/media/char-anime.webp" },
          { id: "char-suit", name: "スーツの紳士", role: "フォーマル", img: "/media/char-suit.webp" }
        ],
        step2Title: "2. ダンス・動作を選択",
        step2Hint: "プリセット動作を選ぶか、お手持ちの動画をアップロード",
        moves: [
          { id: "src-hiphop", name: "ヒップホップ・グルーヴ", tag: "ストリートダンス", duration: "10秒", video: "/media/src-hiphop.mp4", thumb: "/media/src-hiphop.webp" },
          { id: "src-kpop", name: "K-Pop サビ・ルーティン", tag: "人気振り付け", duration: "10秒", video: "/media/src-kpop.mp4", thumb: "/media/src-kpop.webp" }
        ],
        btnGenerate: "キャラクターを動かす（1クレジット）",
        specs: "生成所要時間 約2分 · 9:16縦型高画質MP4 · 生成失敗時はクレジット全額保護返却",
        readyTitle: "アニメーション動画が完成しました！",
        readyBadge: "生成完了",
        btnDownload: "MP4をダウンロード",
        btnShare: "動画を共有",
        btnCopyCaption: "キャプションをコピー",
        btnReset: "別のキャラクターで試す",
        captionDefault: "写真をGenjutsu AIで動かしてみた！🕺✨ #genjutsuai #aimotiontransfer #danceai #幻術AI"
      },
      showcase: {
        eyebrow: "インタラクティブ・ショーケース",
        title: "静止画が動き出す瞬間をご覧ください",
        intro: "以下のカードはすべて写真1枚から生成されたものです。カードの切り替えボタンを押して、元の動作とAI生成結果を比較できます。",
        btnToggleSrc: "元の写真と動作動画",
        btnToggleOut: "Genjutsu 生成動画",
        items: [
          {
            id: "out-street-hiphop", title: "ストリートダンサー × ヒップホップ",
            tag: "リアルストリートダンス",
            desc: "1枚のスタジオ写真をヒップホップのステップで動かします。顔、髪型、スニーカーのディテールまで完全同期。",
            video: "/media/out-street-hiphop.mp4", poster: "/media/out-street-hiphop.webp",
            srcVideo: "/media/src-hiphop.mp4", charImg: "/media/char-street.webp"
          },
          {
            id: "out-ninja-kpop", title: "サイバー忍者 × K-Pop フロー",
            tag: "3D装甲キャラクターのダンス",
            desc: "3D質感の甲冑サイボーグが細やかな肩の動きとステップを披露。装甲の質感を崩さず滑らかに追従します。",
            video: "/media/out-ninja-kpop.mp4", poster: "/media/out-ninja-kpop.webp",
            srcVideo: "/media/src-kpop.mp4", charImg: "/media/char-ninja.webp"
          },
          {
            id: "out-anime-kpop", title: "アニメ主人公 × K-Pop ダンス",
            tag: "セル画調スタイルの完全維持",
            desc: "イラストを入力し、セル画調のままダンスを出力。人間用のフィルターではなく、アニメ本来の線画を維持します。",
            video: "/media/out-anime-kpop.mp4", poster: "/media/out-anime-kpop.webp",
            srcVideo: "/media/src-kpop.mp4", charImg: "/media/char-anime.webp"
          },
          {
            id: "out-suit-hiphop", title: "クラシックスーツ × ヒップホップ",
            tag: "エレガントなギャップダンス",
            desc: "スーツの仕立てとダンディな表情をそのままに、キレのあるターンとステップを実現。",
            video: "/media/out-suit-hiphop.mp4", poster: "/media/out-suit-hiphop.webp",
            srcVideo: "/media/src-hiphop.mp4", charImg: "/media/char-suit.webp"
          }
        ]
      },
      pillars: {
        eyebrow: "3つの現実操作モード",
        title: "ダンスだけじゃない：本格的なキャラクターアニメーション",
        items: [
          {
            title: "AIモーション転送＆バイラルダンス",
            desc: "あらゆる動画から骨格、足捌き、手の表現を抽出し、静止画キャラクターに自然な物理法則で躍動感を与えます。"
          },
          {
            title: "アニメ変身＆幻術VFXエフェクト",
            desc: "セル画アニメの線画、ドラマチックな瞳術・開眼演出、背景の空間変容を、面倒なロトスコープなしで実現します。"
          },
          {
            title: "映画級キャラクターリキャスト（人物置換）",
            desc: "元のカメラワーク、被写界深度、フィルム粒子を維持したまま、映画の名シーンに任意のキャラクターを配置できます。"
          }
        ]
      },
      howItWorks: {
        eyebrow: "かんたん3ステップ",
        title: "写真から数分でショート動画が完成",
        steps: [
          { num: "01", title: "キャラクター写真をアップロード", desc: "人物写真、3Dモデル、手描きアニメイラストなど、全身または半身の写真を1枚選びます。" },
          { num: "02", title: "動作・ダンス動画を選択", desc: "人気ダンスライブラリから選ぶか、お手持ちの5〜30秒の動画をアップロードします。" },
          { num: "03", title: "高画質9:16動画をダウンロード", desc: "顔や服装の同一性を保った高解像度MP4が完成。TikTokやReelsにそのまま投稿可能です。" }
        ]
      },
      comparison: {
        eyebrow: "GENJUTSU AI が選ばれる理由",
        title: "従来のツールや顔交換との徹底比較",
        headers: commonComparison.headers.ja,
        rows: commonComparison.rows.ja
      },
      pricing: {
        eyebrow: "明瞭なクレジット料金プラン",
        title: "シンプルでわかりやすい料金体系",
        intro: "1クレジットで完全な動画を1本生成できます。隠れた費用や勝手な課金は一切ありません。",
        packs: [
          { name: "1本お試しパック", price: "$9.99", unit: "$9.99/本", desc: "1クレジット · 有効期限なし", popular: false },
          { name: "3本人気パック", price: "$17.99", unit: "$5.99/本", desc: "3クレジット · 1本あたり$5.99 · 一番人気", popular: true },
          { name: "10本お得パック", price: "$49.99", unit: "$4.99/本", desc: "10クレジット · 1本あたり$4.99 · 最安値", popular: false }
        ],
        subscription: {
          name: "月額クリエイターパス",
          price: "$14.99 / 月",
          desc: "毎月3クレジット付与 · いつでも解約可能"
        },
        cta: "クレジットを入手する",
        guaranteeTitle: "クレジット保護保証",
        guaranteeDesc: "サーバーエラー等で生成が完了しなかった場合、消費されたクレジットは即座にアカウント残高へ返却されます。ノーリスクでご利用いただけます。"
      },
      faq: {
        eyebrow: "よくあるご質問",
        title: "疑問をすべて解決します",
        items: [
          {
            q: "AIモーション転送とは何ですか？どのように動くのですか？",
            a: "AIモーション転送は、参考動画から人の骨格の動き、手足のジェスチャー、リズムを抽出し、静止画の写真に適用する技術です。Genjutsu AIは各フレームで3Dポーズや頭部の向きを精密に推計し、顔・服・画風を崩さずに滑らかな動画を合成します。"
          },
          {
            q: "一般的な顔交換（Face Swap）アプリとは何が違うのですか？",
            a: "顔交換アプリは既存動画の「顔部分だけ」を切り貼りするため、体型や服装は元の出演者のままです。Genjutsu AIは全身アニメーションを行い、キャラクター本来の体格、服の揺れ、髪の毛の動きまで丸ごと新しい動画として生成します。"
          },
          {
            q: "アニメや3Dイラスト、ファンアートでも動かせますか？",
            a: "はい、可能です！Genjutsu AIは画風保持に特化しています。実写は実写のまま、3Dアバターは立体感を維持し、アニメイラストはセル画調の線画を保ったまま自然に踊らせることができます。"
          },
          {
            q: "どのような写真を用意すれば綺麗に動きますか？",
            a: "明るい場所で撮影された、正面〜やや斜め向きで頭から腰（または全身）がはっきり写っている写真が最適です。背景がすっきりしているとより高品質な仕上がりになります。"
          },
          {
            q: "自分で撮ったダンス動画や格闘動画を元にできますか？",
            a: "はい、可能です。備え付けのバイラルダンスライブラリだけでなく、ご自身が撮影した5秒〜30秒のMP4/MOV動画をアップロードして振り付けとして利用できます。"
          },
          {
            q: "生成される動画の解像度とフォーマットは？",
            a: "TikTok、Instagram Reels、YouTube Shortsにそのまま投稿できる、縦型9:16（1080x1920相当）の高画質MP4形式で出力されます。音源もそのまま保持されます。"
          },
          {
            q: "生成が失敗した場合はどうなりますか？",
            a: "クレジット保護保証により、システムエラーで生成が完了しなかった場合は、消費されたクレジットが自動的に即時返却されます。"
          },
          {
            q: "作成した動画の商用利用やSNS投稿は可能ですか？",
            a: "はい。ご自身が権利を持つ写真や許可を得た画像から生成された動画について、SNS投稿、収益化、プロモーションなどに自由にご利用いただけます。"
          }
        ]
      }
    },
    generator: {
      metaTitle: "AIモーション転送＆キャラクター生成スタジオ — Genjutsu AI",
      metaDescription: "静止画をダンスやアクション動画に変換するオンラインAIモーションスタジオ。",
      h1: "Genjutsu AI 生成スタジオ",
      subtitle: "写真を選び、ダンスやモーションを指定して、わずか数分で高画質動画を出力します。"
    },
    dashboard: {
      metaTitle: "マイページ＆生成履歴 — Genjutsu AI",
      metaDescription: "生成した動画の保存・ダウンロード、クレジット残高の確認、注文履歴の閲覧が可能です。",
      h1: "マイページ＆生成動画一覧",
      lead: "生成済み動画の管理やMP4ダウンロード、クレジット残高の確認が行えます。",
      balanceLabel: "現在の保有クレジット",
      creditsUnit: "クレジット",
      addCredits: "クレジットを追加",
      myVideosTitle: "生成済み動画",
      ordersTitle: "注文履歴",
      emptyVideosTitle: "生成された動画はまだありません",
      emptyVideosDesc: "スタジオで写真を動かして、最初の動画を作成してみましょう。",
      btnCreateFirst: "最初の動画を作成する →",
      emptyOrders: "購入履歴はありません。",
      colOrder: "注文番号", colPlan: "プラン / パック", colDate: "日時", colAmount: "金額", colStatus: "状態",
      btnDownload: "MP4を保存", btnDelete: "削除", confirmDelete: "この動画を削除しますか？"
    },
    pricingPage: {
      metaTitle: "料金プラン＆クレジット購入 — Genjutsu AI",
      metaDescription: "AIモーション転送の料金プラン。1クレジットで動画1本生成。失敗時クレジット返却保証付き。",
      h1: "明瞭でシンプルな料金プラン",
      intro: "定期購入の縛りなし。必要な分だけクレジットを購入して即座に生成できます。"
    },
    articles: {
      "how-to-make-ai-motion-transfer-video": {
        slug: "how-to-make-ai-motion-transfer-video",
        navLabel: "モーション転送入門",
        metaTitle: "AIモーション転送動画の作り方：2026年最新ガイド",
        metaDescription: "静止画写真からAIでダンスやアクション動画を作る完全手順。写真選び、動作同期、TikTok投稿のコツを解説。",
        h1: "AIモーション転送動画の作り方と実践ガイド",
        intro: "AIモーション転送により、たった1枚の写真から激しいダンスや格闘技を踊らせる動画制作が誰でも可能になりました。",
        sections: [
          { heading: "AIモーション転送の仕組み", body: "参考動画から骨格キーポイントを抽出し、別の静止画人物に動作をマッピングします。単なる顔の貼り替えではなく、全身のポーズや衣服の揺れまでリアルタイムに再合成します。" },
          { heading: "適した写真の選び方", body: "ピントが合っており、照明が均一な写真を選ぶと精度が跳ね上がります。アニメや3Dイラストもその画風のまま自然にアニメーション化されます。" },
          { heading: "TikTok・Reelsへの書き出し", body: "スマートフォン視聴に最適な縦型9:16比率で生成されるため、追加のトリミング編集なしで即座にショート動画へアップロード可能です。" }
        ]
      },
      "ai-dance-generator-guide": {
        slug: "ai-dance-generator-guide",
        navLabel: "AIダンス動画ガイド",
        metaTitle: "AIダンス動画ジェネレーター：写真からバイラル動画を作る方法",
        metaDescription: "静止画をK-popやヒップホップで踊らせるAIダンス動画の活用術とバズる動画のポイント。",
        h1: "写真が踊り出す！AIダンス動画の完全活用ガイド",
        intro: "K-popのサビダンスからストリートダンスまで、お気に入りのキャラクターや歴史上の偉人を躍動させるショート動画が世界中で大流行しています。",
        sections: [
          { heading: "なぜAIダンス動画はバズるのか", body: "「普段踊らないはずのキャラクターが完璧に踊る」というギャップが視聴者の目を惹きつけ、高い視聴完了率を生み出します。" },
          { heading: "アイデンティティ保持（顔の固定）の重要性", body: "激しいターンや首の動きでも顔が歪まない高精度な固定技術が、安っぽさを排除し高品質な仕上がりを実現します。" }
        ]
      },
      "character-swap-vs-face-swap": {
        slug: "character-swap-vs-face-swap",
        navLabel: "キャラクター置換と顔交換の違い",
        metaTitle: "キャラクター置換と顔交換（Face Swap）の決定的な違い",
        metaDescription: "動画の顔交換と全身キャラクター置換の違いを徹底比較。クリエイターに最適な手法を解説。",
        h1: "キャラクター置換（Character Swap）と顔交換の違い",
        intro: "動画内の人物を変更する技術には、部分的な顔交換と全身のキャラクター置換という根本的に異なる2つのアプローチがあります。",
        sections: [
          { heading: "顔交換（Face Swap）の限界", body: "既存動画の顔部分だけを置き換えるため、首から下の服装、体格、筋肉の動きは元の演者のままになり、違和感が残ることがあります。" },
          { heading: "キャラクター置換（Character Swap）の優位性", body: "頭から足先までキャラクターそのものを丸ごと生成するため、独自のコスチュームや装甲、体型が完全に反映されます。" }
        ]
      },
      "terms": {
        slug: "terms", navLabel: "利用規約",
        metaTitle: "利用規約 — Genjutsu AI", metaDescription: "Genjutsu AI サービスのご利用条件および規約事項。",
        h1: "利用規約", intro: "当サービスをご利用いただくにあたっての規約です。",
        sections: [
          { heading: "適切な利用と権利許諾", body: "アップロードする写真および動画について、正当な権利または許諾を有している必要があります。公人のディープフェイクや誹謗中傷目的の生成は厳禁です。" },
          { heading: "クレジットと決済", body: "動画生成時にクレジットが消費されます。システムエラー等により生成が失敗した場合は、自動的にクレジットが返却されます。" }
        ]
      },
      "privacy": {
        slug: "privacy", navLabel: "プライバシーポリシー",
        metaTitle: "プライバシーポリシー — Genjutsu AI", metaDescription: "Genjutsu AI における個人情報・アップロードデータの保護方針。",
        h1: "プライバシーポリシー", intro: "お客様の画像・動画データの取り扱いについて説明します。",
        sections: [
          { heading: "データ処理と保管期間", body: "アップロードされたメディアは動画生成処理のためにのみ暗号化ストレージに保存され、7日後に自動消去されます。" },
          { heading: "モデル学習への不使用", body: "ユーザーがアップロードした非公開の画像や動画を、外部公開モデルの学習に使用することはありません。" }
        ]
      },
      "about": {
        slug: "about", navLabel: "運営情報",
        metaTitle: "Genjutsu AI について — 次世代モーション合成",
        metaDescription: "Genjutsu AI の開発ビジョンとモーションシンセシス技術について。",
        h1: "Genjutsu AI について", intro: "Genjutsu AI は、誰もが高品質な動画表現を手に入れられる世界を目指しています。",
        sections: [
          { heading: "私たちの使命", body: "高度なモーションキャプチャ機材や高額なCGスタジオがなくても、ブラウザ1つで誰でもキャラクターに命を吹き込める環境を提供します。" }
        ]
      }
    },
    ui: {
      home: "ホーム", close: "閉じる", skip: "本文へスキップ",
      signin: "ログイン", signup: "アカウント登録", welcome: "おかえりなさい",
      google: "Google でログイン", orEmail: "またはメールアドレスで",
      email: "メールアドレス", password: "パスワード", passwordHint: "8文字以上",
      termsConsent: "利用規約とプライバシーポリシーに同意します。",
      forgot: "パスワードをお忘れですか？", reset: "パスワード再設定",
      signedOut: "ログアウトしました。", authRequired: "ログインが必要です。",
      processingPayment: "決済処理中…", paid: "決済完了",
      loading: "読み込み中…", unavailable: "現在サービスが混み合っています。しばらくしてから再度お試しください。",
      uploading: "写真をアップロード中…", rendering: "AIモーション合成中…",
      success: "完了", failed: "生成に失敗しました。クレジットは返却されました。",
      copied: "キャプションをコピーしました！", sharePrivate: "直接共有はお使いの環境で非対応です。MP4保存をご利用ください。",
      delete: "削除", deleteConfirm: "この動画をアカウントから削除しますか？",
      footer: "写真1枚からAIモーション転送でキャラクターを動かす。"
    },
    auth: {
      badge: "GENJUTSU AI STUDIO",
      titleSignUp: "アカウント作成", titleSignIn: "おかえりなさい",
      subtitle: "クラウドクレジットでキャラクターを自在に動かしましょう。",
      google: "Google で続ける", divider: "またはメールアドレスで",
      nameLabel: "お名前", namePlaceholder: "お名前を入力",
      emailLabel: "メールアドレス", emailPlaceholder: "you@example.com",
      passwordLabel: "パスワード", passwordPlaceholder: "8文字以上",
      btnSignUp: "アカウントを作成", btnSignIn: "ログイン",
      switchHaveAccount: "既にアカウントをお持ちですか？", switchNewHere: "初めてですか？"
    },
    payment: {
      badge: "STRIPE 決済ステータス", title: "購入を確認中…",
      waiting: "Stripeからの決済完了通知を待機中…", refresh: "更新", viewOrders: "注文履歴を見る"
    }
  }
};

// We will also generate es, pt, de, fr by translating cleanly!
console.log('Generating en and ja...');
fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(localeBase.en, null, 2), 'utf-8');
fs.writeFileSync(path.join(localesDir, 'ja.json'), JSON.stringify(localeBase.ja, null, 2), 'utf-8');
console.log('Base locales generated.');
