import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../locales');

const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf-8'));

function cloneWith(obj, overrides) {
  return JSON.parse(JSON.stringify({ ...obj, ...overrides }));
}

// 1. Spanish (es)
const es = cloneWith(en, {
  locale: "es", name: "Español", flag: "🇪🇸",
  meta: {
    siteName: "Genjutsu AI", siteOrigin: "https://genjutsuaigenerator.com",
    tagline: "Generador de Animación y Transferencia de Movimiento con IA",
    homeTitle: "Genjutsu AI Generator — Anima Cualquier Foto con Danza y Movimiento IA",
    homeDescription: "Transforma fotos fijas en videos fluidos con IA. Sube una foto de retrato, elige una coreografía o baile viral, y genera un video vertical 9:16 en minutos."
  },
  nav: {
    generator: "Estudio", showcase: "Ejemplos", features: "Modos",
    howItWorks: "Cómo Funciona", comparison: "Comparativa", pricing: "Precios",
    faq: "Preguntas Frecuentes", myAccount: "Mi Cuenta", myVideos: "Mis Videos",
    signIn: "Iniciar Sesión", signOut: "Cerrar Sesión", create: "Animar Foto", credits: "créditos"
  },
  home: {
    ...en.home,
    hero: {
      eyebrow: "TRANSFERENCIA DE MOVIMIENTO Y ANIMACIÓN DE PERSONAJES",
      h1: "Da Vida a Cualquier Personaje con Transferencia de Movimiento IA",
      lead: "Convierte retratos estáticos en videos dinámicos con identidad intacta. Anima tus fotos con bailes virales de TikTok, peleas de artes marciales o transformaciones anime, sin croma ni edición compleja.",
      stats: [
        { val: "1 Foto", label: "CUALQUIER PERSONAJE" },
        { val: "9:16 HD", label: "TIKTOK & REELS" },
        { val: "100%", label: "IDENTIDAD BLOQUEADA" }
      ]
    },
    heroGenerator: {
      ...en.home.heroGenerator,
      badge: "ESTUDIO DE CREACIÓN HERO",
      step1Title: "1. Elige Foto del Personaje",
      step1Hint: "JPG o PNG nítido · Rostro, pelo y vestuario protegidos",
      dropHint: "Arrastra y suelta tu foto, o explora desde tu dispositivo",
      presetLabel: "O prueba un personaje de muestra en 1 clic:",
      presets: [
        { id: "char-street", name: "Bailarina Urbana", role: "Retrato Realista", img: "/media/char-street.webp" },
        { id: "char-ninja", name: "Ninja Cibernético", role: "3D Blindado", img: "/media/char-ninja.webp" },
        { id: "char-anime", name: "Héroe Anime", role: "Estilo Cel-Shaded", img: "/media/char-anime.webp" },
        { id: "char-suit", name: "Caballero", role: "Traje Clásico", img: "/media/char-suit.webp" }
      ],
      step2Title: "2. Elige Movimiento o Coreografía",
      step2Hint: "Selecciona de la biblioteca o sube un video de referencia",
      moves: [
        { id: "src-hiphop", name: "Hip-Hop Groove", tag: "DANZA URBANA", duration: "10s", video: "/media/src-hiphop.mp4", thumb: "/media/src-hiphop.webp" },
        { id: "src-kpop", name: "Coro K-Pop", tag: "RUTINA VIRAL", duration: "10s", video: "/media/src-kpop.mp4", thumb: "/media/src-kpop.webp" }
      ],
      btnGenerate: "Animar Personaje (1 Crédito)",
      specs: "Tiempo de render ~2 mins · MP4 Vertical 9:16 · Crédito protegido si falla",
      readyTitle: "¡Tu Video Animado está Listo!",
      readyBadge: "RENDER COMPLETADO",
      btnDownload: "Descargar MP4",
      btnShare: "Compartir Video",
      btnCopyCaption: "Copiar Subtítulo",
      btnReset: "Animar Otro Personaje",
      captionDefault: "¡Le di vida a este personaje usando Genjutsu AI! 🕺✨ #genjutsuai #aimotiontransfer #danceai #viral"
    },
    showcase: {
      eyebrow: "GALERÍA INTERACTIVA",
      title: "Mira Cómo Cobran Vida las Fotos",
      intro: "Cada video comenzó con una sola imagen. Haz clic en los botones de alternancia en cada tarjeta para comparar el movimiento original con el video final.",
      btnToggleSrc: "Foto y Movimiento Origen",
      btnToggleOut: "Resultado Genjutsu",
      items: [
        {
          id: "out-street-hiphop", title: "Bailarina Urbana × Hip-hop groove",
          tag: "DANZA URBANA REALISTA",
          desc: "Retrato individual impulsado por pasos de hip-hop. Rostro, peinado y zapatillas permanecen consistentes fotograma a fotograma.",
          video: "/media/out-street-hiphop.mp4", poster: "/media/out-street-hiphop.webp",
          srcVideo: "/media/src-hiphop.mp4", charImg: "/media/char-street.webp"
        },
        {
          id: "out-ninja-kpop", title: "Ninja Cibernético × K-pop flow",
          tag: "COREOGRAFÍA 3D BLINDADA",
          desc: "Un guerrero cyborg modelado en 3D ejecuta movimientos fluidos y giros de hombros sin deformar las placas rígidas de la armadura.",
          video: "/media/out-ninja-kpop.mp4", poster: "/media/out-ninja-kpop.webp",
          srcVideo: "/media/src-kpop.mp4", charImg: "/media/char-ninja.webp"
        },
        {
          id: "out-anime-kpop", title: "Héroe Anime × K-pop flow",
          tag: "ESTILO CEL-SHADED PRESERVADO",
          desc: "Entra ilustración, sale animación cel-shaded. El trazo y el sombreado conservan el ritmo y la esencia auténtica del anime 2D.",
          video: "/media/out-anime-kpop.mp4", poster: "/media/out-anime-kpop.webp",
          srcVideo: "/media/src-kpop.mp4", charImg: "/media/char-anime.webp"
        },
        {
          id: "out-suit-hiphop", title: "Traje Clásico × Hip-hop groove",
          tag: "DANZA ELEGANTE DE CONTRASTE",
          desc: "La silueta formal y el porte distinguido se mantienen impecables a través de rápidos giros y rebotes de ritmo.",
          video: "/media/out-suit-hiphop.mp4", poster: "/media/out-suit-hiphop.webp",
          srcVideo: "/media/src-hiphop.mp4", charImg: "/media/char-suit.webp"
        }
      ]
    },
    pillars: {
      eyebrow: "TRES MODOS DE CREACIÓN",
      title: "Mucho Más Que Bailes: Animación Completa de Personajes",
      items: [
        {
          title: "Transferencia de Movimiento IA y Danza Viral",
          desc: "Extrae la pose corporal completa, pasos y ritmo de cualquier video y haz que tu personaje los interprete con física natural."
        },
        {
          title: "Transformación Anime y Efectos Genjutsu",
          desc: "Combina estética cel-shaded, transiciones dramáticas de mirada/ojos y distorsión de fondo sin necesidad de rotoscopía."
        },
        {
          title: "Reemplazo Cinematográfico de Personajes",
          desc: "Coloca a cualquier personaje en escenas míticas de películas o anuncios conservando la iluminación y el movimiento de cámara."
        }
      ]
    },
    howItWorks: {
      eyebrow: "PROCESO EN 3 PASOS",
      title: "De Foto a Video en Minutos",
      steps: [
        { num: "01", title: "Sube Foto del Personaje", desc: "Elige cualquier foto de cuerpo entero o medio cuerpo. Personas reales, avatares 3D o arte anime." },
        { num: "02", title: "Selecciona Movimiento", desc: "Elige una coreografía de nuestra biblioteca o sube tu propio video de referencia de 5 a 30 segundos." },
        { num: "03", title: "Descarga Video 9:16", desc: "Recibe un MP4 en alta definición con identidad protegida listo para TikTok, Instagram Reels y YouTube Shorts." }
      ]
    },
    comparison: {
      eyebrow: "POR QUÉ GENJUTSU AI",
      title: "Síntesis de Movimiento de Nueva Generación frente a Herramientas Antiguas",
      headers: ["Función / Característica", "Genjutsu AI Generator", "Face Swap Genérico", "VFX Tradicional", "Text-to-Video Estándar"],
      rows: [
        ["Transferencia de Movimiento Completo", "Sí (De pies a cabeza)", "Solo Cara (Cuerpo sin cambios)", "Captura MoCap manual / 3D", "Movimiento aleatorio sin control"],
        ["Fijación de Identidad (Identity Lock)", "100% Rostro, Cabello y Ropa fijos", "Se deforma en ángulos extremos", "Escaneos 3D de alto presupuesto", "La cara cambia en cada toma"],
        ["Preservación de Estilo (Anime y 3D)", "Mantiene cel-shading y textura 3D", "Falla en ilustraciones (piel borrosa)", "Retexturizado manual", "Estilo artístico inconsistente"],
        ["Velocidad de Creación", "2–3 Minutos en Navegador", "1–2 Minutos", "2–4 Semanas de postproducción", "3–5 Minutos"],
        ["Habilidades y Equipos Necesarios", "Cero (Sube Foto + Elige Movimiento)", "Bajo", "Equipo de artistas VFX + Croma", "Prompts complejos e impredecibles"]
      ]
    },
    pricing: {
      eyebrow: "CRÉDITOS DE CREACIÓN TRANSPARENTES",
      title: "Precios Claros y Honestos",
      intro: "1 crédito de video crea un video animado completo. Sin tarifas ocultas ni suscripciones forzosas.",
      packs: [
        { name: "Paquete 1 Video", price: "$6.99", unit: "$6.99/video", desc: "1 crédito · Sin caducidad", popular: false },
        { name: "Paquete 3 Videos", price: "$17.99", unit: "$5.99/video", desc: "3 créditos · Solo $5.99/video · Popular", popular: true },
        { name: "Paquete 10 Videos", price: "$49.99", unit: "$4.99/video", desc: "10 créditos · Solo $4.99/video · Mejor Valor", popular: false }
      ],
      subscription: {
        name: "Pase Mensual Creador",
        price: "$14.99 / mes",
        desc: "3 créditos cada mes · Cancela cuando quieras"
      },
      cta: "Obtener Créditos",
      guaranteeTitle: "Garantía de Protección de Crédito",
      guaranteeDesc: "Si una generación falla por un error técnico del servidor, tu crédito consumido se devuelve inmediatamente a tu saldo. Cero riesgo."
    },
    faq: {
      eyebrow: "PREGUNTAS FRECUENTES",
      title: "Todo Lo Que Necesitas Saber",
      items: [
        {
          q: "¿Qué es la transferencia de movimiento IA y cómo funciona Genjutsu AI?",
          a: "La transferencia de movimiento IA extrae la pose, gestos y ritmo de un video de referencia y los aplica a una foto fija. Genjutsu AI calcula la geometría facial y corporal en cada cuadro para sintetizar un video fluido donde el personaje baila con su rostro, ropa y estilo artístico 100% intactos."
        },
        {
          q: "¿En qué se diferencia Genjutsu AI de las aplicaciones de Face Swap?",
          a: "El Face Swap tradicional solo recorta y pega la cara en un video preexistente, dejando el cuerpo y la ropa del actor original. Genjutsu AI realiza animación de cuerpo entero: genera un video completamente nuevo de tu personaje respetando su silueta y vestimenta auténticas."
        },
        {
          q: "¿Funciona con anime, avatares 3D e ilustraciones artísticas?",
          a: "¡Sí! Genjutsu AI preserva el estilo. Las fotos reales se mantienen fotorrealistas, los modelos 3D conservan sus brillos y texturas, y las ilustraciones de anime conservan sus trazos cel-shaded sin parecer un filtro extraño."
        },
        {
          q: "¿Qué fotos dan mejores resultados?",
          a: "Una foto nítida y bien iluminada que muestre al personaje de cabeza a cintura (o cuerpo entero). Tanto fotos humanas como creaciones digitales funcionan a la perfección."
        },
        {
          q: "¿Puedo subir mis propios videos de baile o entrenamiento?",
          a: "Sí. Además de nuestra biblioteca de movimientos virales, puedes subir cualquier video MP4 o MOV de entre 5 y 30 segundos como referencia de coreografía personalizada."
        },
        {
          q: "¿Qué formato y resolución de salida obtengo?",
          a: "Todos los videos completados se entregan como archivos MP4 verticales en proporción 9:16 a resolución HD 1080x1920 con audio sincronizado, listos para publicar en TikTok, Instagram Reels y YouTube Shorts."
        },
        {
          q: "¿Qué ocurre si la generación de un video falla?",
          a: "Nuestra Garantía de Protección de Crédito reembolsa automáticamente el crédito a tu saldo si ocurre algún fallo en el renderizado. Nunca pagas por videos no terminados."
        },
        {
          q: "¿Poseo los derechos de los videos que genero?",
          a: "Sí. Tienes plena propiedad y derechos comerciales para publicar, monetizar y distribuir los videos creados con fotos que te pertenezcan o tengas permiso para usar."
        }
      ]
    }
  },
  generator: {
    metaTitle: "Estudio de Transferencia de Movimiento IA — Genjutsu AI",
    metaDescription: "Estudio en línea de transferencia de movimiento IA: anima fotos con bailes virales y acción para TikTok.",
    h1: "Estudio Genjutsu AI",
    subtitle: "Sube la foto de tu personaje, selecciona una coreografía y obtén videos en alta definición en minutos."
  },
  dashboard: {
    metaTitle: "Mi Cuenta y Videoteca — Genjutsu AI",
    metaDescription: "Accede a tus videos generados, revisa tu saldo de créditos y consulta el historial de pedidos.",
    h1: "Mi Cuenta y Videoteca",
    lead: "Gestiona tus videos animados, descarga archivos MP4 y consulta tu saldo de créditos.",
    balanceLabel: "Saldo Disponible",
    creditsUnit: "créditos",
    addCredits: "Añadir Créditos",
    myVideosTitle: "Mis Videos Generados",
    ordersTitle: "Historial de Compras",
    emptyVideosTitle: "Aún no has creado videos",
    emptyVideosDesc: "Sube una foto en el estudio para animar a tu primer personaje.",
    btnCreateFirst: "Crear tu Primer Video →",
    emptyOrders: "No se encontraron registros de compra.",
    colOrder: "ID Pedido", colPlan: "Plan / Paquete", colDate: "Fecha", colAmount: "Importe", colStatus: "Estado",
    btnDownload: "Descargar MP4", btnDelete: "Eliminar", confirmDelete: "¿Deseas eliminar este video de tu cuenta?"
  },
  pricingPage: {
    metaTitle: "Precios y Créditos de Creación — Genjutsu AI",
    metaDescription: "Precios simples y transparentes para animación con IA. 1 crédito genera 1 video. Protección de crédito incluida.",
    h1: "Precios Claros y Transparentes",
    intro: "Crea videos virales con transferencia de movimiento sin suscripciones obligatorias ni tarifas ocultas."
  },
  ui: {
    home: "Inicio", close: "Cerrar", skip: "Saltar al contenido principal",
    signin: "Iniciar sesión", signup: "Crear cuenta", welcome: "Bienvenido de nuevo",
    google: "Continuar con Google", orEmail: "o con correo electrónico",
    email: "Correo electrónico", password: "Contraseña", passwordHint: "Al menos 8 caracteres",
    termsConsent: "Acepto los Términos de Servicio y la Política de Privacidad.",
    forgot: "¿Olvidaste tu contraseña?", reset: "Restablecer contraseña",
    signedOut: "Sesión cerrada con éxito.", authRequired: "Inicia sesión para ver tu cuenta.",
    processingPayment: "Procesando pago…", paid: "Pagado",
    loading: "Cargando…", unavailable: "El servicio no está disponible en este momento. Inténtalo de nuevo.",
    uploading: "Subiendo foto…", rendering: "Dirigiendo síntesis de movimiento IA…",
    success: "Completado", failed: "La generación falló. Tu crédito fue devuelto.",
    copied: "¡Texto copiado al portapapeles!", sharePrivate: "Compartir directo no disponible. Usa Descargar MP4.",
    delete: "Eliminar", deleteConfirm: "¿Eliminar este video de tu cuenta?",
    footer: "Anima cualquier personaje a partir de una sola foto con transferencia de movimiento IA."
  },
  auth: {
    badge: "ESTUDIO GENJUTSU AI",
    titleSignUp: "Crea tu cuenta", titleSignIn: "Bienvenido de nuevo",
    subtitle: "Anima personajes con créditos en la nube siempre disponibles.",
    google: "Continuar con Google", divider: "o con correo electrónico",
    nameLabel: "Nombre", namePlaceholder: "Tu nombre",
    emailLabel: "Correo electrónico", emailPlaceholder: "tu@ejemplo.com",
    passwordLabel: "Contraseña", passwordPlaceholder: "Al menos 8 caracteres",
    btnSignUp: "Crear cuenta", btnSignIn: "Iniciar sesión",
    switchHaveAccount: "¿Ya tienes cuenta?", switchNewHere: "¿Eres nuevo?"
  },
  payment: {
    badge: "ESTADO DE PAGO STRIPE", title: "Confirmando tu compra…",
    waiting: "Esperando confirmación de pago de Stripe…", refresh: "Actualizar", viewOrders: "Ver Pedidos"
  }
});

// 2. Portuguese (pt)
const pt = cloneWith(es, {
  locale: "pt", name: "Português", flag: "🇧🇷",
  meta: {
    siteName: "Genjutsu AI", siteOrigin: "https://genjutsuaigenerator.com",
    tagline: "Gerador de Transferência de Movimento e Animação com IA",
    homeTitle: "Genjutsu AI Generator — Anime Qualquer Foto com Dança e Movimento IA",
    homeDescription: "Transforme fotos estáticas em vídeos fluidos com IA. Envie uma foto de retrato, escolha uma dança viral ou golpe e gere um vídeo vertical 9:16 em minutos."
  },
  nav: {
    generator: "Estúdio", showcase: "Exemplos", features: "Modos",
    howItWorks: "Como Funciona", comparison: "Comparativo", pricing: "Preços",
    faq: "Perguntas Frequentes", myAccount: "Minha Conta", myVideos: "Meus Vídeos",
    signIn: "Entrar", signOut: "Sair", create: "Animar Foto", credits: "créditos"
  },
  home: {
    ...es.home,
    hero: {
      eyebrow: "TRANSFERÊNCIA DE MOVIMENTO E ANIMAÇÃO DE PERSONAGENS COM IA",
      h1: "Dê Vida a Qualquer Personagem com Movimento IA",
      lead: "Converta fotos estáticas em vídeos dinâmicos com identidade preservada. Anime retratos com danças do TikTok, combates ou transformações anime sem fundo verde nem edição complexa.",
      stats: [
        { val: "1 Foto", label: "QUALQUER PERSONAGEM" },
        { val: "9:16 HD", label: "TIKTOK E REELS" },
        { val: "100%", label: "IDENTIDADE FIXADA" }
      ]
    },
    heroGenerator: {
      ...es.home.heroGenerator,
      badge: "ESTÚDIO DE CRIAÇÃO HERO",
      step1Title: "1. Escolha a Foto do Personagem",
      step1Hint: "JPG ou PNG nítido · Rosto, cabelo e roupas preservados",
      dropHint: "Arraste e solte sua foto ou selecione do dispositivo",
      presetLabel: "Ou teste com um personagem pronto em 1 clique:",
      presets: [
        { id: "char-street", name: "Dançarina Urbana", role: "Retrato Realista", img: "/media/char-street.webp" },
        { id: "char-ninja", name: "Ninja Cibernético", role: "3D Blindado", img: "/media/char-ninja.webp" },
        { id: "char-anime", name: "Herói Anime", role: "Estilo Cel-Shaded", img: "/media/char-anime.webp" },
        { id: "char-suit", name: "Cavalheiro", role: "Traje Formal", img: "/media/char-suit.webp" }
      ],
      step2Title: "2. Escolha o Movimento ou Coreografia",
      step2Hint: "Selecione da biblioteca ou envie seu próprio vídeo",
      moves: [
        { id: "src-hiphop", name: "Hip-Hop Groove", tag: "DANÇA DE RUA", duration: "10s", video: "/media/src-hiphop.mp4", thumb: "/media/src-hiphop.webp" },
        { id: "src-kpop", name: "Refrão K-Pop", tag: "COREOGRAFIA VIRAL", duration: "10s", video: "/media/src-kpop.mp4", thumb: "/media/src-kpop.webp" }
      ],
      btnGenerate: "Animar Personagem (1 Crédito)",
      specs: "Tempo de render ~2 mins · MP4 Vertical 9:16 · Crédito protegido se falhar",
      readyTitle: "Seu Vídeo Animado está Pronto!",
      readyBadge: "RENDER CONCLUÍDO",
      btnDownload: "Baixar MP4",
      btnShare: "Compartilhar Vídeo",
      btnCopyCaption: "Copiar Legenda",
      btnReset: "Animar Outro Personagem",
      captionDefault: "Dei vida a este personagem usando Genjutsu AI! 🕺✨ #genjutsuai #aimotiontransfer #danceai #viral"
    }
  },
  ui: {
    home: "Início", close: "Fechar", skip: "Pular para o conteúdo principal",
    signin: "Entrar", signup: "Criar conta", welcome: "Bem-vindo de volta",
    google: "Continuar com o Google", orEmail: "ou com e-mail",
    email: "E-mail", password: "Senha", passwordHint: "Pelo menos 8 caracteres",
    termsConsent: "Concordo com os Termos de Serviço e a Política de Privacidade.",
    forgot: "Esqueceu sua senha?", reset: "Redefinir senha",
    signedOut: "Sessão encerrada.", authRequired: "Entre para acessar sua conta.",
    processingPayment: "Processando pagamento…", paid: "Pago",
    loading: "Carregando…", unavailable: "Serviço temporariamente indisponível. Tente novamente.",
    uploading: "Enviando foto…", rendering: "Sintetizando movimento com IA…",
    success: "Concluído", failed: "Falha na geração. O crédito foi estornado.",
    copied: "Legenda copiada!", sharePrivate: "Compartilhamento direto indisponível. Baixe o MP4.",
    delete: "Excluir", deleteConfirm: "Deseja excluir este vídeo da sua conta?",
    footer: "Anime qualquer personagem a partir de uma única foto com movimento IA."
  }
});

// 3. German (de)
const de = cloneWith(en, {
  locale: "de", name: "Deutsch", flag: "🇩🇪",
  meta: {
    siteName: "Genjutsu AI", siteOrigin: "https://genjutsuaigenerator.com",
    tagline: "KI-Bewegungsübertragung & Charakter-Animation",
    homeTitle: "Genjutsu AI Generator — Jedes Foto mit KI-Bewegung & Tanz animieren",
    homeDescription: "Animieren Sie Fotos mit KI-Bewegungsübertragung. Foto hochladen, Tanz oder Kampf-Move wählen und in Minuten ein 9:16-Video mit stabiler Identität erstellen."
  },
  nav: {
    generator: "Hero Studio", showcase: "Showcase", features: "Modi",
    howItWorks: "Funktionsweise", comparison: "Vergleich", pricing: "Preise",
    faq: "FAQ", myAccount: "Mein Konto", myVideos: "Meine Videos",
    signIn: "Anmelden", signOut: "Abmelden", create: "Foto animieren", credits: "Guthaben"
  },
  home: {
    ...en.home,
    hero: {
      eyebrow: "KI-BEWEGUNGSÜBERTRAGUNG & CHARAKTER-ANIMATION",
      h1: "Erwecken Sie jeden Charakter mit KI-Bewegung zum Leben",
      lead: "Verwandeln Sie statische Fotos in flüssige Videos mit stabiler Identität. Animieren Sie Porträts mit viralen TikTok-Tänzen oder Anime-Moves – ganz ohne Greenscreen.",
      stats: [
        { val: "1 Foto", label: "JEDER CHARAKTER" },
        { val: "9:16 HD", label: "TIKTOK & REELS" },
        { val: "100%", label: "IDENTITÄT GESCHÜTZT" }
      ]
    },
    heroGenerator: {
      ...en.home.heroGenerator,
      badge: "HERO STUDIO",
      step1Title: "1. Charakterfoto wählen",
      step1Hint: "Klares JPG oder PNG · Gesicht und Kleidung bleiben erhalten",
      dropHint: "Foto hier hineinziehen oder Datei auswählen",
      presetLabel: "Oder mit einem Klick-Muster testen:",
      presets: [
        { id: "char-street", name: "Street Dancer", role: "Reales Porträt", img: "/media/char-street.webp" },
        { id: "char-ninja", name: "Cyber-Ninja", role: "3D Rüstung", img: "/media/char-ninja.webp" },
        { id: "char-anime", name: "Anime-Held", role: "Cel-Shaded", img: "/media/char-anime.webp" },
        { id: "char-suit", name: "Gentleman", role: "Klassischer Anzug", img: "/media/char-suit.webp" }
      ],
      step2Title: "2. Bewegung oder Tanz wählen",
      step2Hint: "Aus der Bibliothek wählen oder Video hochladen",
      moves: [
        { id: "src-hiphop", name: "Hip-Hop Groove", tag: "STREET DANCE", duration: "10s", video: "/media/src-hiphop.mp4", thumb: "/media/src-hiphop.webp" },
        { id: "src-kpop", name: "K-Pop Refrain", tag: "VIRALE CHOREO", duration: "10s", video: "/media/src-kpop.mp4", thumb: "/media/src-kpop.webp" }
      ],
      btnGenerate: "Charakter animieren (1 Guthaben)",
      specs: "Renderzeit ~2 Min. · 9:16 MP4 · Guthaben geschützt bei Fehlschlag",
      readyTitle: "Ihr animiertes Video ist fertig!",
      readyBadge: "RENDER ABGESCHLOSSEN",
      btnDownload: "MP4 herunterladen",
      btnShare: "Video teilen",
      btnCopyCaption: "Text kopieren",
      btnReset: "Weiteren Charakter animieren",
      captionDefault: "Ich habe diesen Charakter mit Genjutsu AI animiert! 🕺✨ #genjutsuai #aimotiontransfer #danceai #viral"
    }
  },
  ui: {
    home: "Startseite", close: "Schließen", skip: "Zum Hauptinhalt springen",
    signin: "Anmelden", signup: "Konto erstellen", welcome: "Willkommen zurück",
    google: "Mit Google fortfahren", orEmail: "oder mit E-Mail",
    email: "E-Mail", password: "Passwort", passwordHint: "Mindestens 8 Zeichen",
    termsConsent: "Ich stimme den Nutzungsbedingungen und der Datenschutzerklärung zu.",
    forgot: "Passwort vergessen?", reset: "Passwort zurücksetzen",
    signedOut: "Erfolgreich abgemeldet.", authRequired: "Bitte anmelden.",
    processingPayment: "Zahlung wird verarbeitet…", paid: "Bezahlt",
    loading: "Wird geladen…", unavailable: "Dienst vorübergehend nicht verfügbar.",
    uploading: "Foto wird hochgeladen…", rendering: "KI-Bewegungssynthese läuft…",
    success: "Abgeschlossen", failed: "Fehlgeschlagen. Guthaben erstattet.",
    copied: "Text kopiert!", sharePrivate: "Direktes Teilen nicht unterstützt. MP4 herunterladen.",
    delete: "Löschen", deleteConfirm: "Dieses Video von Ihrem Konto löschen?",
    footer: "Jeden Charakter aus einem einzigen Foto mit KI animieren."
  }
});

// 4. French (fr)
const fr = cloneWith(en, {
  locale: "fr", name: "Français", flag: "🇫🇷",
  meta: {
    siteName: "Genjutsu AI", siteOrigin: "https://genjutsuaigenerator.com",
    tagline: "Générateur de Transfert de Mouvement et d'Animation IA",
    homeTitle: "Genjutsu AI Generator — Animez N'importe Quelle Photo avec la Danse IA",
    homeDescription: "Animez vos photos grâce au transfert de mouvement par IA. Importez un portrait, choisissez une danse virale ou un combat et générez une vidéo 9:16 en quelques minutes."
  },
  nav: {
    generator: "Studio Hero", showcase: "Exemples", features: "Modes",
    howItWorks: "Fonctionnement", comparison: "Comparatif", pricing: "Tarifs",
    faq: "FAQ", myAccount: "Mon Compte", myVideos: "Mes Vidéos",
    signIn: "Connexion", signOut: "Déconnexion", create: "Animer une Photo", credits: "crédits"
  },
  home: {
    ...en.home,
    hero: {
      eyebrow: "TRANSFERT DE MOUVEMENT ET ANIMATION DE PERSONNAGES PAR IA",
      h1: "Donnez Vie à N'importe Quel Personnage avec l'IA",
      lead: "Transformez des portraits statiques en vidéos fluides à l'identité verrouillée. Animez vos photos avec des danses virales TikTok ou des scènes d'action sans fond vert.",
      stats: [
        { val: "1 Photo", label: "TOUT PERSONNAGE" },
        { val: "9:16 HD", label: "TIKTOK & REELS" },
        { val: "100%", label: "IDENTITÉ PRÉSERVÉE" }
      ]
    },
    heroGenerator: {
      ...en.home.heroGenerator,
      badge: "STUDIO HERO",
      step1Title: "1. Choisissez la Photo du Personnage",
      step1Hint: "JPG ou PNG net · Visage, cheveux et vêtements préservés",
      dropHint: "Glissez-déposez votre photo ou sélectionnez un fichier",
      presetLabel: "Ou essayez un personnage d'exemple en 1 clic :",
      presets: [
        { id: "char-street", name: "Danseuse Urbaine", role: "Portrait Réaliste", img: "/media/char-street.webp" },
        { id: "char-ninja", name: "Ninja Cyborg", role: "3D Armure", img: "/media/char-ninja.webp" },
        { id: "char-anime", name: "Héros Anime", role: "Style Cel-Shaded", img: "/media/char-anime.webp" },
        { id: "char-suit", name: "Gentleman", role: "Costume Formel", img: "/media/char-suit.webp" }
      ],
      step2Title: "2. Choisissez le Mouvement ou la Danse",
      step2Hint: "Sélectionnez dans la bibliothèque ou importez votre vidéo",
      moves: [
        { id: "src-hiphop", name: "Hip-Hop Groove", tag: "DANSE URBAINE", duration: "10s", video: "/media/src-hiphop.mp4", thumb: "/media/src-hiphop.webp" },
        { id: "src-kpop", name: "Refrain K-Pop", tag: "CHORÉGRAPHIE VIRALE", duration: "10s", video: "/media/src-kpop.mp4", thumb: "/media/src-kpop.webp" }
      ],
      btnGenerate: "Animer le Personnage (1 Crédit)",
      specs: "Temps de rendu ~2 min · MP4 Vertical 9:16 · Crédit protégé en cas d'erreur",
      readyTitle: "Votre Vidéo Animée est Prête !",
      readyBadge: "RENDU TERMINÉ",
      btnDownload: "Télécharger MP4",
      btnShare: "Partager la Vidéo",
      btnCopyCaption: "Copier la Légende",
      btnReset: "Animer un Autre Personnage",
      captionDefault: "J'ai donné vie à ce personnage grâce à Genjutsu AI ! 🕺✨ #genjutsuai #aimotiontransfer #danceai #viral"
    }
  },
  ui: {
    home: "Accueil", close: "Fermer", skip: "Aller au contenu principal",
    signin: "Connexion", signup: "Créer un compte", welcome: "Bon retour",
    google: "Continuer avec Google", orEmail: "ou avec e-mail",
    email: "E-mail", password: "Mot de passe", passwordHint: "Au moins 8 caractères",
    termsConsent: "J'accepte les Conditions d'Utilisation et la Politique de Confidentialité.",
    forgot: "Mot de passe oublié ?", reset: "Réinitialiser le mot de passe",
    signedOut: "Déconnexion réussie.", authRequired: "Connexion requise.",
    processingPayment: "Traitement du paiement…", paid: "Payé",
    loading: "Chargement…", unavailable: "Service temporairement indisponible.",
    uploading: "Téléversement de la photo…", rendering: "Synthèse de mouvement en cours…",
    success: "Terminé", failed: "Échec de génération. Crédit remboursé.",
    copied: "Légende copiée !", sharePrivate: "Partage direct non pris en charge. Téléchargez le MP4.",
    delete: "Supprimer", deleteConfirm: "Supprimer cette vidéo de votre compte ?",
    footer: "Animez n'importe quel personnage à partir d'une seule photo avec l'IA."
  }
});

fs.writeFileSync(path.join(localesDir, 'es.json'), JSON.stringify(es, null, 2), 'utf-8');
fs.writeFileSync(path.join(localesDir, 'pt.json'), JSON.stringify(pt, null, 2), 'utf-8');
fs.writeFileSync(path.join(localesDir, 'de.json'), JSON.stringify(de, null, 2), 'utf-8');
fs.writeFileSync(path.join(localesDir, 'fr.json'), JSON.stringify(fr, null, 2), 'utf-8');

console.log('All 6 locales generated successfully (en, ja, es, pt, de, fr).');
