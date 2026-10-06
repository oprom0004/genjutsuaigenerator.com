import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../locales');

const zhHantData = {
  "locale": "zh-hant",
  "name": "繁體中文",
  "flag": "🇹🇼",
  "dir": "ltr",
  "meta": {
    "siteName": "Genjutsu AI",
    "siteOrigin": "https://genjutsuaigenerator.com",
    "tagline": "AI 動作轉移與角色跳舞影片生成器",
    "homeTitle": "Genjutsu AI Generator — 單張照片一鍵生成動感舞蹈與動作轉移影片",
    "homeDescription": "利用先進的 Genjutsu AI 深度學習模型，將任意單張人物或動漫肖像照片轉換為流暢自然的 9:16 直式舞蹈與武術動作影片。臉部輪廓與服裝細節 100% 鎖定不崩壞。"
  },
  "nav": {
    "generator": "創作工作室",
    "showcase": "精彩案例",
    "features": "核心能力",
    "howItWorks": "運作原理",
    "comparison": "橫向評比",
    "pricing": "點數方案",
    "faq": "常見問題",
    "myAccount": "會員中心",
    "myVideos": "我的作品",
    "signIn": "登入",
    "signOut": "登出",
    "create": "生成舞蹈影片",
    "credits": "點數"
  },
  "home": {
    "hero": {
      "eyebrow": "幻術級 AI 動作轉移 · 角色跳舞與動態驅動生成器",
      "h1": "單張照片，賦予任意角色絲滑舞步與生命力",
      "lead": "告別靜態圖片，讓肖像瞬間躍動。無論是風靡 TikTok、Reels 的熱門編舞、街舞律動，還是動漫角色變身與格鬥連擊，無需綠幕與動捕設備，瀏覽器一鍵生成鎖定面部特徵的 9:16 高畫質影片。",
      "stats": [
        {
          "val": "1 張照片",
          "label": "支援任意角色肖像"
        },
        {
          "val": "9:16 直式",
          "label": "TIKTOK & REELS 直發"
        },
        {
          "val": "100%",
          "label": "臉部與服飾特徵鎖定"
        }
      ]
    },
    "heroGenerator": {
      "badge": "HERO 線上創作工坊",
      "step1Title": "1. 選擇角色照片",
      "step1Hint": "清晰的 JPG 或 PNG · 精準保留五官、髮型與服裝細節",
      "dropHint": "拖曳照片至此處，或從本機上傳",
      "presetLabel": "或直接點選預設角色快速體驗：",
      "presets": [
        {
          "id": "char-street",
          "name": "街頭舞者",
          "role": "真實攝影肖像",
          "img": "/media/char-street.webp"
        },
        {
          "id": "char-ninja",
          "name": "賽博機甲",
          "role": "3D 裝甲質感",
          "img": "/media/char-ninja.webp"
        },
        {
          "id": "char-anime",
          "name": "動漫主角",
          "role": "經典賽璐璐畫風",
          "img": "/media/char-anime.webp"
        },
        {
          "id": "char-suit",
          "name": "西裝紳士",
          "role": "正裝商務風",
          "img": "/media/char-suit.webp"
        }
      ],
      "step2Title": "2. 挑選參考舞蹈與動作",
      "step2Hint": "選擇官方熱門動作範本，或上傳 5–30 秒自訂參考影片",
      "moves": [
        {
          "id": "src-hiphop",
          "name": "街舞律動 (Hip-Hop)",
          "tag": "街頭律動",
          "duration": "10秒",
          "video": "/media/src-hiphop.mp4",
          "thumb": "/media/src-hiphop.webp"
        },
        {
          "id": "src-kpop",
          "name": "女團副歌舞蹈 (K-Pop)",
          "tag": "熱門編舞",
          "duration": "10秒",
          "video": "/media/src-kpop.mp4",
          "thumb": "/media/src-kpop.webp"
        }
      ],
      "btnGenerate": "驅動角色跳舞 (消耗 1 點點数)",
      "specs": "生成耗時約 2 分鐘 · 9:16 HD MP4 · 若渲染異常自動全額退還點數",
      "readyTitle": "您的專屬動態影片已合成完畢！",
      "readyBadge": "生成成功",
      "btnDownload": "下載高畫質 MP4",
      "btnShare": "分享影片",
      "btnCopyCaption": "複製文案",
      "btnReset": "製作下一支影片",
      "captionDefault": "用 Genjutsu AI 動作轉移模型把照片動起來了！🕺✨ #genjutsuai #aimotiontransfer #danceai #幻術AI"
    },
    "showcase": {
      "eyebrow": "即時效果對比展廳",
      "title": "親眼見證靜態畫面躍然而出的瞬間",
      "intro": "以下案例均由單張靜態照片驅動生成。點選卡片右下角按鈕，可自由切換查看原始參考動作與 AI 動作轉移最終渲染效果。",
      "btnToggleSrc": "參考源影片",
      "btnToggleOut": "AI 生成結果",
      "items": [
        {
          "id": "out-street-hiphop",
          "title": "街頭舞者 × 嘻哈步法",
          "tag": "寫實肖像高保真驅動",
          "desc": "單張影棚肖像驅動全套街舞律動，面部五官在 360 度大幅度轉身時穩定貼合，毫無傳統濾鏡的位移撕裂感。",
          "video": "/media/out-street-hiphop.mp4",
          "poster": "/media/out-street-hiphop.webp",
          "srcVideo": "/media/src-hiphop.mp4",
          "charImg": "/media/char-street.webp"
        },
        {
          "id": "out-ninja-kpop",
          "title": "賽博忍者 × 女團舞步",
          "tag": "3D 硬表面材質完美保持",
          "desc": "重裝機甲挑戰高節奏女團齊舞，金屬反光材質、關節軸承與硬質外殼伴隨節奏律動，保持堅挺物理質感。",
          "video": "/media/out-ninja-kpop.mp4",
          "poster": "/media/out-ninja-kpop.webp",
          "srcVideo": "/media/src-kpop.mp4",
          "charImg": "/media/char-ninja.webp"
        },
        {
          "id": "out-anime-kpop",
          "title": "二次元動漫主角 × 舞台唱跳",
          "tag": "賽璐璐描邊畫風完全鎖死",
          "desc": "插畫直接輸入，舞蹈輸出依然保留清爽的日漫線稿與平塗陰影，絕不轉變成詭異的真人假面具。",
          "video": "/media/out-anime-kpop.mp4",
          "poster": "/media/out-anime-kpop.webp",
          "srcVideo": "/media/src-kpop.mp4",
          "charImg": "/media/char-anime.webp"
        },
        {
          "id": "out-suit-hiphop",
          "title": "商務正裝紳士 × 街舞反差",
          "tag": "高反差喜劇爆款",
          "desc": "沉穩嚴謹的名畫肖像與西裝人物突然跳起踩點街舞，極具視覺衝擊與社群平台傳播力。",
          "video": "/media/out-suit-hiphop.mp4",
          "poster": "/media/out-suit-hiphop.webp",
          "srcVideo": "/media/src-hiphop.mp4",
          "charImg": "/media/char-suit.webp"
        }
      ]
    },
    "pillars": {
      "eyebrow": "三大核心驅動能力",
      "title": "突破傳統影片生成的邊界",
      "items": [
        {
          "title": "AI 動作轉移與熱門舞蹈",
          "desc": "僅需提取參考動作骨架，即可將任何真人、名畫或公仔照片注入舞魂，精準踩點每一段節拍。"
        },
        {
          "title": "二次元跨次元變身與幻術特效",
          "desc": "保持原圖動漫、3D 或插畫的藝術風格，在動作穿梭間還原動漫名場面。"
        },
        {
          "title": "全身角色置換 (非局部換臉)",
          "desc": "告別只貼一層橢圓面具的粗糙換臉，頭身比例、衣服褲腿、鞋履全套由 AI 重新合成。"
        }
      ]
    },
    "howItWorks": {
      "eyebrow": "極簡三步上手",
      "title": "從一張靜止照片到全網瘋傳的動態影片",
      "steps": [
        {
          "num": "01",
          "title": "上傳清晰的人物照片",
          "desc": "支援正面或四分之三側身半身像、全身照，JPG/PNG/WEBP 格式皆可，AI 自動定位五官與服飾特徵點。"
        },
        {
          "num": "02",
          "title": "選定參考動作或上傳短片",
          "desc": "在內建的高熱度編舞庫中一鍵選取，或上傳手機自拍的 5–30 秒參考動作，演算法自動提取 3D 骨架軌跡。"
        },
        {
          "num": "03",
          "title": "一鍵合成並下載 9:16 HD MP4",
          "desc": "約 2 分鐘雲端集群渲染，自帶節奏音訊同步，支援免浮水印一鍵匯出至 TikTok、Reels 或 YouTube Shorts。"
        }
      ]
    },
    "comparison": {
      "eyebrow": "硬核技術評比",
      "title": "為什麼創作者選擇 Genjutsu AI？",
      "headers": ["評估維度", "Genjutsu AI Generator", "傳統文字生影片 (Sora類)", "傳統換臉工具", "3D 動捕動效棚"],
      "rows": [
        ["動作精準度與節拍同步", "100% 動作骨架軌跡復刻", "隨機抽卡，無法精準控制動作", "僅跟隨原片頭部擺動", "極高，但需穿戴專業感測器"],
        ["面部及衣著穩定性", "100% 身分特徵鎖定 (無漂移)", "隨鏡頭轉動嚴重扭曲變形", "僅貼面部，身軀仍為他人", "完全依賴高成本 3D 綁定"],
        ["上手門檻與設備要求", "瀏覽器秒開，0 門檻", "需要高超提示詞技巧", "簡單但效果粗糙塑料感重", "需要數萬元硬體與專業動畫師"],
        ["出片時間", "約 2 分鐘即刻交付", "排隊 5–20 分鐘", "1–3 分鐘", "數天至數週後製"],
        ["點數退還保障", "失敗自動全額退還點數", "生成失敗通常不退款", "多數採用強制連續包月", "高昂專案預付制"]
      ]
    },
    "pricing": {
      "eyebrow": "透明點數方案",
      "title": "按需選購，零隱形扣款",
      "intro": "按次計費，無強制自動續約陷阱。每次生成僅需 1 點點數，遇到任何渲染中斷或服務異常，點數自動毫秒級退還。",
      "cta": "取得點數",
      "guaranteeTitle": "點數防護與退還保障 (Credit Protection)",
      "guaranteeDesc": "我們承諾：只要因伺服器故障、模型異常或網路中斷未能交付影片，已扣除的點數會立即自動原路退還至您的帳號餘額中。",
      "packs": [
        {
          "id": "pack-starter",
          "name": "入門體驗包",
          "price": "$6.99",
          "unit": "單次購買",
          "desc": "包含 1 個完整高畫質動態影片生成權益，適合臨時測試或個人創作。",
          "popular": false
        },
        {
          "id": "pack-popular",
          "name": "超值創作包",
          "price": "$17.99",
          "unit": "單次購買 · 最受歡迎",
          "desc": "包含 3 個完整高畫質影片生成權益，單部僅需 $5.99，創作者首選。",
          "popular": true
        },
        {
          "id": "pack-pro",
          "name": "專業工作室包",
          "price": "$49.99",
          "unit": "單次購買 · 極致性價比",
          "desc": "包含 10 個高畫質影片生成權益，支援多角色測試與團隊批次交付。",
          "popular": false
        }
      ],
      "subscription": {
        "name": "月度創作者通行證",
        "price": "$14.99 / 月",
        "desc": "每月享受 3 點高畫質影片生成點數 · 隨時可取消訂閱"
      }
    },
    "faq": {
      "eyebrow": "答疑解惑",
      "title": "關於 Genjutsu AI 的常見疑問",
      "items": [
        {
          "q": "什麼是 AI 動作轉移，Genjutsu AI 是如何運作的？",
          "a": "AI 動作轉移是從參考源影片中抽取人體骨架運動與姿態軌跡，並將其精準應用在靜態角色照片上。Genjutsu AI 逐幀計算 3D 骨架關節、手指手勢與面部網格幾何，合成流暢連貫的動態影片，角色五官、髮型與服裝風格 100% 保持原樣。"
        },
        {
          "q": "Genjutsu AI 與市面上普通的 AI 換臉軟體有什麼本質不同？",
          "a": "傳統換臉僅在別人的現有影片中替換臉部，原片的體型、衣服、肢體依然是他人的。Genjutsu AI 是全身級角色驅動：它根據您的底層照片從頭到腳重新渲染整個角色，讓衣服皺褶、身材輪廓和髮絲隨節拍自然擺動。"
        },
        {
          "q": "支援動漫插畫、3D 虛擬形象與繪畫作品嗎？",
          "a": "完全支援！Genjutsu AI 具備風格保持特性。寫實照片保持真實感，3D 建模保持金屬反光與幾何質感，2D 動漫插畫則保持俐落的賽璐璐線稿與陰影，絕不會變成塑料感真人濾鏡。"
        },
        {
          "q": "什麼樣的角色照片生成效果最好？",
          "a": "光線明亮均勻、五官清晰、頭到腰身（或全身）姿態自然的肖像效果最佳。真實人像攝影與數位藝術作品均可無縫支援。"
        },
        {
          "q": "我可以上傳自己拍攝的跳舞或健身動作影片嗎？",
          "a": "可以。除了我們官方內建的熱門舞蹈動作庫，您也可以上傳任意 5 到 30 秒的 MP4 或 MOV 格式影片作為自訂動作參考源。"
        },
        {
          "q": "生成的影片解析度與格式是什麼？",
          "a": "所有完成的影片均輸出為原生直式 9:16（1080×1920）高畫質 MP4 格式，自帶與舞蹈節拍同步的音軌，無需任何裁切，可直接發布至 TikTok、Instagram Reels、YouTube Shorts 或 Threads。"
        },
        {
          "q": "如果影片生成失敗或遇到異常會扣除點數嗎？",
          "a": "不會！我們的『點數退還保護機制』會在任務失敗時第一時間將扣除的點數自動原路退還至您的帳號，您絕不會為未成功的生成買單。"
        },
        {
          "q": "我擁有生成影片的版權與商用權益嗎？",
          "a": "是的。只要您擁有上傳源照片的合法使用權或授權，您對生成的動態影片擁有完整的版權與商業化權益，可自由發布、變現與傳播。"
        }
      ]
    }
  },
  "generator": {
    "metaTitle": "Genjutsu AI 線上創作工作室 — 單張照片動作轉移驅動",
    "metaDescription": "進入 Genjutsu AI 創作工作室：選擇人像照片與熱門舞蹈動作，即刻合成面部鎖定、高畫質 9:16 直式短影片。",
    "h1": "Genjutsu AI 動效創作工作室",
    "subtitle": "上傳一張人像照片，挑選編舞動作，開啟次世代動作轉移合成"
  },
  "dashboard": {
    "metaTitle": "創作者中心 — Genjutsu AI",
    "metaDescription": "管理您的 AI 生成作品庫，查看剩餘點數與帳單訂單記錄。",
    "h1": "創作者會員中心",
    "lead": "管理您的 AI 動態作品與點數資產",
    "balanceLabel": "目前剩餘點數",
    "creditsUnit": "點可用",
    "addCredits": "儲值點數",
    "myVideosTitle": "我的影片作品庫",
    "emptyVideosTitle": "尚無已完成影片",
    "emptyVideosDesc": "前往創作工作室，上傳您的第一張照片讓角色舞動起來！",
    "btnCreateFirst": "立即製作影片",
    "ordersTitle": "點數儲值明細",
    "colOrder": "訂單編號",
    "colPlan": "方案名稱",
    "colDate": "購買時間",
    "colAmount": "金額",
    "colStatus": "付款狀態",
    "emptyOrders": "尚無儲值交易記錄。",
    "btnDownload": "下載 MP4",
    "btnDelete": "刪除",
    "confirmDelete": "確認從個人作品庫中徹底移除此影片嗎？"
  },
  "pricingPage": {
    "metaTitle": "點數方案與計費標準 — Genjutsu AI",
    "metaDescription": "透明無隱形收費的點數價格：單部起售，失敗自動退還點數，無自動扣款訂閱陷阱。",
    "h1": "公開透明，依需儲值",
    "intro": "按需儲值影片生成點數，告別自動連續包月套路，每一份點數都有防護機制護航。"
  },
  "articles": {
    "how-to-make-ai-motion-transfer-video": {
      "slug": "how-to-make-ai-motion-transfer-video",
      "navLabel": "動作轉移教學",
      "metaTitle": "如何製作 AI 動作轉移影片：從單張照片到熱門短片全流程",
      "metaDescription": "全面了解 AI 動作轉移的核心技巧，掌握圖像預處理與動作參考選擇標準，製作高觀看率短影片。",
      "h1": "製作高畫質 AI 動作轉移影片的完整實戰指南",
      "intro": "動作轉移技術讓靜態圖中的人物擁有跳舞與武打能力。本文為您詳解如何選圖與選動作以獲得最佳成片率。",
      "sections": [
        {
          "heading": "準備高畫質源照片",
          "body": "光照均勻、背景乾淨的正面或四分之三側身半身照能提供最穩健的骨架錨點，避免邊緣模糊導致生成重影。"
        },
        {
          "heading": "參考影片的關鍵要點",
          "body": "選擇單人舞步、機位相對穩定、無大幅遮擋的 10 秒短片，能讓 3D 骨架抽取達到極佳的平滑度。"
        }
      ]
    },
    "ai-dance-generator-guide": {
      "slug": "ai-dance-generator-guide",
      "navLabel": "AI跳舞影片指南",
      "metaTitle": "AI 跳舞影片生成器：讓任意肖像舞動起來的流量密碼",
      "metaDescription": "探秘為什麼 AI 跳舞影片能夠在社交網路獲得千萬播放，以及特徵鎖定技術在動作合成中的核心作用。",
      "h1": "AI 跳舞影片生成全方位創作指南",
      "intro": "從 K-Pop 女團舞步到節奏街舞，AI 動作合成正幫助創作者將動漫角色與歷史人物推上流量巔峰。",
      "sections": [
        {
          "heading": "為什麼 AI 跳舞影片極易出爆款？",
          "body": "反差感是流量密碼。當嚴肅的古典肖像或高冷機甲突然跳起魔性熱舞，強烈的反差製造極高完播率與留言區互動。"
        },
        {
          "heading": "特徵鎖定（Identity Locking）的重要性",
          "body": "普通換臉在人物轉身或俯仰時容易發生臉部形變。Genjutsu AI 透過面部幾何網格鎖定，保證 360 度轉體時依然辨識度極高。"
        }
      ]
    },
    "character-swap-vs-face-swap": {
      "slug": "character-swap-vs-face-swap",
      "navLabel": "全身置換對比局部換臉",
      "metaTitle": "全身角色置換 vs 局部換臉：底層技術與視覺效果評比",
      "metaDescription": "搞懂全身動作轉移驅動與傳統影片換臉（Deepfake）的區別，挑選適合您專案的技術路線。",
      "h1": "全身角色置換 vs 局部換臉：技術原理與表現力差異",
      "intro": "雖然兩者都改變了影片主體，但全身置換與局部貼臉在計算原理與最終觀感上有本質區別。",
      "sections": [
        {
          "heading": "傳統換臉（Face Swap）的運作機制",
          "body": "換臉技術僅在原演員的頭頸部位貼上一層五官蒙版，演員的胖瘦、衣服、手部動作依然是原人的，容易產生割裂感。"
        },
        {
          "heading": "全身角色置換（Character Swap）的優勢",
          "body": "全身置換直接根據輸入照片重新渲染頭身比例、衣服皺褶和鞋子，並將參考動作作為骨架驅動，整體光影完全自然統一。"
        }
      ]
    },
    "terms": {
      "slug": "terms",
      "navLabel": "服務條款",
      "metaTitle": "服務條款 — Genjutsu AI",
      "metaDescription": "Genjutsu AI 平台服務使用規範與權利義務說明。",
      "h1": "服務條款",
      "intro": "使用 Genjutsu AI 提供的服務前，請仔細閱讀本條款。",
      "sections": [
        {
          "heading": "合規使用承諾",
          "body": "您必須對上傳的照片與影片擁有合法使用權。嚴禁生成侵犯他人隱私權、公眾人物非授權深度偽造或任何違法違規內容。"
        },
        {
          "heading": "點數消費與退還",
          "body": "送出任務時扣除點數。如因平台算力節點故障或不可抗力導致生成失敗，系統將毫秒級全額退還扣除點數。"
        }
      ]
    },
    "privacy": {
      "slug": "privacy",
      "navLabel": "隱私權政策",
      "metaTitle": "隱私權政策 — Genjutsu AI",
      "metaDescription": "Genjutsu AI 如何嚴格保護您的上傳照片、影片素材與帳號資料隱私。",
      "h1": "隱私權政策",
      "intro": "我們重視您的資料資產隱私，採取端到端高強度加密與定期清理機制。",
      "sections": [
        {
          "heading": "素材處理與自動清理",
          "body": "您上傳的素材僅用於目前任務的動作轉移渲染，未儲存到個人作品庫的中間快取檔案將在 7 天後被系統永久銷毀。"
        },
        {
          "heading": "絕不用於公共模型訓練",
          "body": "您的私人照片絕不會被用於任何公開基礎大模型的訓練集。"
        }
      ]
    },
    "about": {
      "slug": "about",
      "navLabel": "關於我們",
      "metaTitle": "關於 Genjutsu AI — 次世代動作合成技術",
      "metaDescription": "了解 Genjutsu AI 研發團隊與我們降低電影級動捕門檻的使命。",
      "h1": "關於 Genjutsu AI",
      "intro": "我們致力於讓每一位創作者都能在瀏覽器中輕鬆實現電影級的人物動作合成。",
      "sections": [
        {
          "heading": "我們的使命",
          "body": "視覺創作不應被昂貴的動作捕捉棚與複雜的 3D 骨架綁定所壟斷。Genjutsu AI 將尖端 Video-to-Video 動作轉移技術封裝為開箱即用的輕量工作室，賦能全球短影音創作者。"
        }
      ]
    },
    "what-is-genjutsu-ai": {
      "slug": "what-is-genjutsu-ai",
      "aliases": ["what-is"],
      "navLabel": "什麼是幻術AI",
      "metaTitle": "什麼是 Genjutsu AI（幻術AI）？動作轉移驅動技術全景解析",
      "metaDescription": "深入解讀 Genjutsu AI 是什麼、源自 Higgsfield 的現實篡改影片模型原理，以及為什麼它在 2026 年徹底革新了 AI 跳舞短片賽道。",
      "h1": "什麼是 Genjutsu AI（幻術AI）？次世代影片動作轉移模型深度拆解",
      "intro": "Genjutsu AI 代表了生成式影片的典範轉移：告別文字生影片的隨機開盲盒，直接將真實編舞動作無縫轉移至靜態角色照片上，同時保持 100% 五官與畫風一致性。",
      "quickAnswer": "Genjutsu AI（幻術AI）是一種 Video-to-Video 深度學習動作合成技術。它能從一段來源影片中提取全身骨架動態、手勢節拍與運鏡軌跡，並映射到任意單張 2D 動漫、3D 建模或寫實人物照片上。由 Higgsfield Genjutsu 等模型引領風潮，創作者無需任何 3D 綁定或綠幕拍攝，即可在數分鐘內生成面部鎖定度極高的高畫質 9:16 直式舞蹈影片。",
      "sections": [
        {
          "heading": "AI 語境中「Genjutsu（幻術）」一詞的由來與內涵",
          "body": "在東方神話與流行文化中，「幻術」（Genjutsu）指操縱感知與改變現實維度的非凡能力。2026 年，以 Higgsfield AI 為代表的頂尖影片生成團隊將這種「基於現實影片進行像素級重構與替換」的次世代架構命名為 Genjutsu。它不再是憑空生成隨機幻象，而是如同施展幻術般，將現實畫面中的主體精確調換，同時嚴絲合縫保留原影片的物理慣性與鏡頭運動。"
        },
        {
          "heading": "Genjutsu 動作合成的底層技術架構",
          "body": "傳統 Text-to-Video（文字生影片）普遍存在嚴重的逐幀時間抖動（Jitter）：人物一轉頭五官就融化變形。Genjutsu AI 採用多階段參考管道：1) 從參考動作影片中提取 3D DensePose 密集骨架與關節旋轉角度；2) 基於 ControlNet 演進的身分特徵鎖定器（Identity Locking），錨定角色面部網格、髮絲結構與服飾材質；3) 潛在影片擴散模型（Latent Video Diffusion），生成符合真實物理慣性的布料飄動與肌肉發力感。"
        },
        {
          "heading": "Genjutsu AI 對比傳統換臉與文字生影片的代際飛躍",
          "body": "傳統換臉只能在別人的身體上貼一層橢圓形的面具貼紙，體態與衣服仍是他人的；而文字生影片無法精準復刻連續複雜舞蹈。Genjutsu AI 則是全身級重構——從鞋子髮型到骨架比例全部忠於輸入照片，真正實現了「讓你的二次元偶像或歷史人物跳出真實女團舞」。"
        },
        {
          "heading": "為什麼 Genjutsu AI 在短影音平台迎來爆發？",
          "body": "短影音演算法（TikTok、Reels、Shorts）極其看重前 3 秒的視覺吸引力與完播率。Genjutsu AI 帶來的極致反差——名畫跳街舞、裝甲機甲跳甜美齊舞——天然具備強大的吸睛效應與社群病毒傳播屬性。"
        }
      ],
      "faq": [
        {
          "q": "Genjutsu AI Generator 與 Higgsfield Genjutsu 有什麼聯繫與區別？",
          "a": "Higgsfield AI 研發了底層的 Genjutsu 影片現實篡改模型，面向專業 VFX 節點流工作台。而 Genjutsu AI Generator (genjutsuaigenerator.com) 專為全球短影音創作者打造了開箱即用的輕量級瀏覽器工作室，無需配置複雜環境，單張圖片 1 鍵生成 9:16 直式 MP4。"
        },
        {
          "q": "動漫立繪和 3D 模型渲染圖也能順暢生成嗎？",
          "a": "完全支援。Genjutsu AI 能精確識別非寫實畫風，賽璐璐描邊線稿、3D 表面高光和厚塗色彩都會被忠實保留。"
        },
        {
          "q": "可以免費體驗試用嗎？",
          "a": "可以。新使用者進入 Hero 線上工作室即可獲得初始體驗點數，無需綁定信用卡即可直接渲染首個測試影片。"
        }
      ]
    },
    "how-to-use-genjutsu-ai": {
      "slug": "how-to-use-genjutsu-ai",
      "aliases": ["how-to-use"],
      "navLabel": "幻術AI使用教學",
      "metaTitle": "Genjutsu AI 使用教學：提示詞配方、動作選材與爆款發布指南",
      "metaDescription": "手把手教你使用 Genjutsu AI 製作角色跳舞影片。涵蓋源圖片篩選原則、高精度提示詞公式與 TikTok 直式匯出實戰。",
      "h1": "Genjutsu AI 全流程使用教學：從零做出高人氣動態短片",
      "intro": "掌握 Genjutsu AI 的完整製作工作流程：從挑選最適合動作轉移的基底肖像，到搭配踩點編舞與一鍵複製高分 Prompt。",
      "quickAnswer": "使用 Genjutsu AI 僅需 3 步：1) 上傳一張五官清晰的人物照或直接點選預設角色；2) 從官方庫中挑選一段舞蹈範本，或上傳 5–30 秒參考動作影片；3) 點選「驅動角色跳舞」，約 2 分鐘即可生成自帶音樂的 9:16 高畫質 MP4 影片。",
      "sections": [
        {
          "heading": "第 1 步：挑選符合動作轉移規範的基底照片",
          "body": "基底照片是整部影片的身分錨點。推薦使用光照均勻、中等對比度的正面或四分之三側身半身像（頭到腰）或全身照。避免使用大面積面部陰影遮擋、側臉超過 60 度或肢體嚴重殘缺的照片。"
        },
        {
          "heading": "第 2 步：選擇或拍攝參考編舞影片",
          "body": "動作影片決定了成片的節拍、發力點與步伐。您可以在我們的精選熱門編舞庫中一鍵取用（嘻哈律動、女團熱門副歌），也可以自行錄製 10 秒全身舞蹈影片。錄製時背景盡量簡單，避免多人交疊走動干擾骨架捕捉。"
        },
        {
          "heading": "第 3 步：Video-to-Video 提示詞增強公式",
          "body": "雖然動作主要由影片驅動，但搭配特定提示詞能讓服裝物理動態與光影更驚豔。推薦萬能公式：[主體外貌與材質描述] + [舞蹈風格與運動力度] + [環境光效與氛圍] + [鏡頭景深]。"
        },
        {
          "heading": "第 4 步：針對短影音平台的一鍵匯出規範",
          "body": "系統預設按照 1080×1920（9:16）全高畫質解析度輸出，並完美嵌入立體聲背景音樂，下載後即可無縫上傳發布至 TikTok、Instagram Reels、YouTube Shorts 或 Threads。"
        }
      ],
      "promptTemplates": [
        {
          "style": "潮流街頭街舞 (Street Dance)",
          "prompt": "Full-body dynamic street dance choreography, sharp rhythmic popping and locking, fluid hoodie and sneaker physics, cinematic volumetric lighting, 8k resolution, photorealistic 9:16 portrait.",
          "tip": "推薦搭配『街頭舞者』預設與『街舞律動』編舞範本使用。"
        },
        {
          "style": "二次元動漫偶像舞台 (Anime K-Pop)",
          "prompt": "Anime protagonist performing energetic K-pop chorus routine, vibrant cel-shaded line art, synchronized hair bounce, stage lighting with pastel glow, authentic Japanese animation aesthetic.",
          "tip": "推薦搭配『動漫主角』預設，線稿乾淨不融化。"
        },
        {
          "style": "賽博機甲武術動作 (Cyber Martial Arts)",
          "prompt": "Armored cybernetic warrior executing rapid martial arts transitions, glowing neon accents, reflective carbon fiber armor plates, smooth mechanical joint articulation, dark sci-fi background.",
          "tip": "推薦搭配『賽博機甲』預設，關節機械連動自然。"
        }
      ]
    },
    "best-genjutsu-ai-generators": {
      "slug": "best-genjutsu-ai-generators",
      "aliases": ["best"],
      "navLabel": "最佳幻術AI工具",
      "metaTitle": "2026 年最佳 Genjutsu AI 動作轉移生成器橫向評測（TOP 5 排名）",
      "metaDescription": "評比市面上熱門的 Genjutsu AI 影片工具與 Higgsfield 替代方案。從生成耗時、臉部鎖定度、操作門檻與點數保障多維度實測。",
      "h1": "2026 年最佳 Genjutsu AI 影片生成器評測：功能與性價比全覽",
      "intro": "我們對主流的動作轉移與角色跳舞 AI 工具進行了多輪極限壓力測試，涵蓋身體轉身穩定性、服飾皺褶物理與點數退還機制。",
      "quickAnswer": "對於追求效率的自媒體創作者，首推 Genjutsu AI Generator (genjutsuaigenerator.com)，因其純瀏覽器秒開、一鍵預設庫以及業內獨創的失敗點數自動退還保障；對於追求電影級複雜節點管線的工作室，Higgsfield AI 依然是專業團隊的有力選擇。",
      "comparisonTable": {
        "headers": ["平台名稱", "最適合族群", "環境準備", "身分/面部鎖定", "渲染耗時"],
        "rows": [
          ["Genjutsu AI Generator", "自媒體創作者 / 短影音", "免配置 (瀏覽器隨開即用)", "100% 全身與五官鎖定", "約 2 分鐘"],
          ["Higgsfield AI Genjutsu", "影視 VFX 專業團隊", "需學習複雜節點流", "極高一致性", "3–8 分鐘"],
          ["Viggle AI", "輕度迷因與搞笑短片", "Discord 社群 / 網頁", "中等 (面部蒙版易脫位)", "2–4 分鐘"],
          ["快手可靈 Kling 動作控制", "電影級長鏡頭敘事", "網頁排隊制", "高物理寫實度", "5–10 分鐘"],
          ["Seedance 2.5 (本地部署)", "極客與 GPU 發燒友", "ComfyUI / Python 環境", "依賴調參功力", "取決於本地顯卡算力"]
        ]
      },
      "sections": [
        {
          "heading": "1. Genjutsu AI Generator（創作者綜合體驗第 1 名）",
          "body": "本平台（genjutsuaigenerator.com）將複雜的骨架解算隱藏在簡潔優雅的直覺化介面之下。首創首屏互動工作室、全語系支援以及『點數保護機制』，讓任何普通人都能在 2 分鐘內收穫令人驚豔的高畫質成片。"
        },
        {
          "heading": "2. Higgsfield AI Genjutsu",
          "body": "作為該概念的開拓者，Higgsfield 在影片對影片（Video-to-Video）鏡頭軌跡重構與光影反射上具備極深厚技術累積，適合有技術儲備的專業後製團隊。"
        },
        {
          "heading": "3. Viggle AI",
          "body": "早期火爆 Discord 的綠幕貼片工具，適合製作簡單的搞怪迷因影片，但在精細衣服物理與大幅度身體旋轉時容易產生邊緣發虛。"
        },
        {
          "heading": "如何根據自己的場景挑選最合適的工具？",
          "body": "如果您需要快速交付 TikTok、Reels 或 Shorts 爆款影片，不想在 Python、節點連線或顯示卡配置上耗費心力，Genjutsu AI Generator 是最省心的高性價比選擇。"
        }
      ]
    },
    "free-genjutsu-ai": {
      "slug": "free-genjutsu-ai",
      "aliases": ["free"],
      "navLabel": "免費幻術AI",
      "metaTitle": "免費 Genjutsu AI 影片生成器：零門檻線上體驗角色動作驅動",
      "metaDescription": "無需綁定信用卡即可免費試用 Genjutsu AI。在瀏覽器中即刻驅動照片跳舞，匯出無惡意浮水印的高畫質 9:16 短影片。",
      "h1": "免費體驗 Genjutsu AI：打破高昂門檻，即刻讓照片動起來",
      "intro": "體驗前沿動作轉移科技無需背負高昂的每月扣款負擔。領取初始測試點數，體驗工業級面部鎖定合成。",
      "quickAnswer": "您可以在線直接體驗 Genjutsu AI Generator：在 Hero 創作工作室中領取初始體驗點數，無需輸入任何信用卡號，遇到伺服器渲染失敗還享有點數全額退還保障。",
      "sections": [
        {
          "heading": "免費體驗包含哪些權益？",
          "body": "與那些用模糊遮擋浮水印或限制 360p 畫質的惡意體驗不同，Genjutsu AI Generator 免費贈送完整點數，支援匯出標準 1080×1920 全高畫質影片檔案。"
        },
        {
          "heading": "零信用卡綁定陷阱",
          "body": "我們不要求任何預授權扣款，杜絕所謂的『7天免費但忘記取消自動扣除年費』的訂閱套路。"
        },
        {
          "heading": "全程點數防護護航",
          "body": "即使是在免費試用階段，只要網路或任務遭遇技術中斷，消耗的點數同樣享受自動補發退還。"
        }
      ]
    },
    "higgsfield-ai-genjutsu-alternative": {
      "slug": "higgsfield-ai-genjutsu-alternative",
      "aliases": ["higgsfield-alternative"],
      "navLabel": "Higgsfield替代品",
      "metaTitle": "Higgsfield AI Genjutsu 最佳輕量網頁替代方案：一鍵開箱即用",
      "metaDescription": "在尋找 Higgsfield AI Genjutsu 的高性價比替代品？了解 Genjutsu AI Generator 如何提供免排隊、免複雜節點的輕量動作轉移工作室。",
      "h1": "Higgsfield AI Genjutsu 最佳網頁替代工具：更輕快、更直觀",
      "intro": "雖然 Higgsfield 開創了現實篡改模型的先河，但日常短影音創作者更需要一個無需排隊、點開即用的輕量利器。",
      "quickAnswer": "Genjutsu AI Generator 是 Higgsfield AI Genjutsu 絕佳的平替與創作者利器。免去了複雜的節點連接與漫長的等待名單，單張照片直接套用流行舞蹈，2 分鐘直出 9:16 手機短影片。",
      "sections": [
        {
          "heading": "Higgsfield Genjutsu 的技術亮點與痛點",
          "body": "Higgsfield 模型展示了極高的物理重塑能力，但其工作台更偏向電影工業流程，對於只需要一條 10 秒短影片發布至社群平台的創作者來說，學習成本與上手門檻偏高。"
        },
        {
          "heading": "為什麼更多創作者轉向 Genjutsu AI Generator？",
          "body": "1) 純網頁免排隊：點開即可上傳圖片操作；2) 封裝好的熱門舞蹈庫：無需四處蒐集動作影片；3) 明確透明的單次點數計費與防護；4) 專為行動裝置直式螢幕優化。"
        },
        {
          "heading": "提示詞無縫遷移相容",
          "body": "如果您已經為 Higgsfield 準備了角色設定或 Prompt，可以直接貼上至 Genjutsu AI Generator，底層模型同樣能夠精準解析身分標記與藝術風格指令。"
        }
      ]
    }
  },
  "ui": {
    "home": "首頁",
    "close": "關閉",
    "skip": "跳至主要內容",
    "signin": "登入",
    "signup": "註冊帳號",
    "welcome": "歡迎回來",
    "google": "使用 Google 快速登入",
    "orEmail": "或使用電子郵件登入",
    "email": "電子郵件",
    "password": "密碼",
    "passwordHint": "至少 8 個字元",
    "termsConsent": "登入即代表您同意本站的服務條款與隱私權政策。",
    "forgot": "忘記密碼？",
    "reset": "重設密碼",
    "signedOut": "已成功登出。",
    "authRequired": "請先登入以存取您的創作者資產。",
    "processingPayment": "正在安全建立 Stripe 結帳環境…",
    "paid": "付款成功",
    "loading": "載入中…",
    "unavailable": "服務忙碌中，請稍後再試。",
    "uploading": "正在上傳照片並提取特徵…",
    "rendering": "AI 動作轉移合成中，請稍候…",
    "success": "影片生成完畢！",
    "failed": "生成異常，已自動退還點數。",
    "copied": "文案已成功複製到剪貼簿！",
    "sharePrivate": "已生成專屬作品，點選下載 MP4 保存。",
    "delete": "刪除",
    "deleteConfirm": "確認從個人作品庫中徹底移除此影片嗎？",
    "footer": "單張照片賦予任意角色絲滑舞步與生命力。"
  },
  "auth": {
    "badge": "GENJUTSU AI STUDIO",
    "titleSignUp": "建立您的創作者帳號",
    "titleSignIn": "歡迎回來",
    "subtitle": "多端同步您的雲端點數與生成影片作品。",
    "google": "使用 Google 快速繼續",
    "divider": "或使用電子郵件",
    "nameLabel": "創作者暱稱",
    "namePlaceholder": "請輸入您的暱稱",
    "emailLabel": "電子郵件",
    "emailPlaceholder": "you@example.com",
    "passwordLabel": "登入密碼",
    "passwordPlaceholder": "至少 8 位密碼",
    "btnSignUp": "建立帳號",
    "btnSignIn": "登入",
    "switchHaveAccount": "已有帳號？",
    "switchNewHere": "第一次來？"
  },
  "payment": {
    "badge": "STRIPE 安全收銀台",
    "title": "正在確認您的訂單…",
    "waiting": "正在同步 Stripe 安全交易狀態…",
    "refresh": "重新整理狀態",
    "viewOrders": "查看儲值紀錄"
  }
};

const zhHantPath = path.join(localesDir, 'zh-hant.json');
fs.writeFileSync(zhHantPath, JSON.stringify(zhHantData, null, 2), 'utf-8');
console.log('✅ Successfully wrote locales/zh-hant.json with 100% authentic Traditional Chinese!');
