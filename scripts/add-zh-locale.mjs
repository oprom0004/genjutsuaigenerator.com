import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../locales');

const zhData = {
  "locale": "zh",
  "name": "简体中文",
  "flag": "🇨🇳",
  "dir": "ltr",
  "meta": {
    "siteName": "Genjutsu AI",
    "siteOrigin": "https://genjutsuaigenerator.com",
    "tagline": "AI 动作迁移与角色跳舞视频生成器",
    "homeTitle": "Genjutsu AI Generator — 单张照片一键生成动感舞蹈与动作迁移视频",
    "homeDescription": "利用先进的 Genjutsu AI 深度学习模型，将任意单张人物或动漫肖像照片转换为流畅自然的 9:16 竖屏舞蹈与武术动作视频。脸部轮廓与服装细节 100% 锁定不崩坏。"
  },
  "nav": {
    "generator": "创作工作台",
    "showcase": "精彩案例",
    "features": "核心能力",
    "howItWorks": "运作原理",
    "comparison": "横向对比",
    "pricing": "算力套餐",
    "faq": "常见问题",
    "myAccount": "个人中心",
    "myVideos": "我的作品",
    "signIn": "登录",
    "signOut": "退出",
    "create": "动起来",
    "credits": "算力"
  },
  "home": {
    "hero": {
      "eyebrow": "幻术级 AI 动作迁移 · 角色跳舞与动作驱动生成器",
      "h1": "单张照片，赋予任意角色丝滑动作与生命力",
      "lead": "告别静态图片，让人像瞬间跃动。无论是风靡 TikTok 的洗脑编舞、街舞律动，还是动漫角色变身与格斗连击，无需绿幕与动捕设备，浏览器一键生成锁定面部特征的 9:16 高清视频。",
      "stats": [
        {
          "val": "1 张照片",
          "label": "支持任意角色人像"
        },
        {
          "val": "9:16 竖屏",
          "label": "TIKTOK & 视频号直发"
        },
        {
          "val": "100%",
          "label": "面部与服饰特征锁定"
        }
      ]
    },
    "heroGenerator": {
      "badge": "HERO 在线创作工坊",
      "step1Title": "1. 选择角色照片",
      "step1Hint": "清晰的 JPG 或 PNG · 精准保留五官、发型与服装细节",
      "dropHint": "拖拽照片至此处，或从本地上传",
      "presetLabel": "或直接点击预设角色快速体验：",
      "presets": [
        {
          "id": "char-street",
          "name": "街头舞者",
          "role": "真实摄影人像",
          "img": "/media/char-street.webp"
        },
        {
          "id": "char-ninja",
          "name": "赛博机甲",
          "role": "3D 装甲质感",
          "img": "/media/char-ninja.webp"
        },
        {
          "id": "char-anime",
          "name": "动漫主角",
          "role": "经典赛璐珞画风",
          "img": "/media/char-anime.webp"
        },
        {
          "id": "char-suit",
          "name": "西装绅士",
          "role": "正装商务风",
          "img": "/media/char-suit.webp"
        }
      ],
      "step2Title": "2. 挑选参考舞蹈与动作",
      "step2Hint": "选择官方流行动作模板，或上传 5–30 秒自定义参考视频",
      "moves": [
        {
          "id": "src-hiphop",
          "name": "街舞律动 (Hip-Hop)",
          "tag": "街头律动",
          "duration": "10秒",
          "video": "/media/src-hiphop.mp4",
          "thumb": "/media/src-hiphop.webp"
        },
        {
          "id": "src-kpop",
          "name": "女团副歌舞蹈 (K-Pop)",
          "tag": "爆款编舞",
          "duration": "10秒",
          "video": "/media/src-kpop.mp4",
          "thumb": "/media/src-kpop.webp"
        }
      ],
      "btnGenerate": "驱动角色跳舞 (消耗 1 点算力)",
      "specs": "生成耗时约 2 分钟 · 9:16 HD MP4 · 若渲染异常自动全额退还算力",
      "readyTitle": "您的专属动态视频已合成完毕！",
      "readyBadge": "生成成功",
      "btnDownload": "下载高清 MP4",
      "btnShare": "分享视频",
      "btnCopyCaption": "复制文案",
      "btnReset": "制作下一个视频",
      "captionDefault": "用 Genjutsu AI 动作迁移模型把照片动起来了！🕺✨ #genjutsuai #aimotiontransfer #danceai #幻术AI"
    },
    "showcase": {
      "eyebrow": "实时效果对比展厅",
      "title": "亲眼见证静态画面跃然而出的瞬间",
      "intro": "以下案例均由单张静态照片驱动生成。点击卡片右下角按钮，可自由切换查看原始参考动作与 AI 动作迁移最终渲染效果。",
      "btnToggleSrc": "参考源视频",
      "btnToggleOut": "AI 生成结果",
      "items": [
        {
          "id": "out-street-hiphop",
          "title": "街头舞者 × 嘻哈步法",
          "tag": "写实人像高保真驱动",
          "desc": "单张影棚肖像驱动全套街舞律动，面部五官在 360 度大幅度转身时稳定贴合，毫无传统滤镜的位移撕裂感。",
          "video": "/media/out-street-hiphop.mp4",
          "poster": "/media/out-street-hiphop.webp",
          "srcVideo": "/media/src-hiphop.mp4",
          "charImg": "/media/char-street.webp"
        },
        {
          "id": "out-ninja-kpop",
          "title": "赛博忍者 × 女团舞步",
          "tag": "3D 硬表面材质完美保持",
          "desc": "重装机甲挑战高节奏女团齐舞，金属反光材质、关节轴承与硬质外壳伴随节奏律动，保持坚挺物理质感。",
          "video": "/media/out-ninja-kpop.mp4",
          "poster": "/media/out-ninja-kpop.webp",
          "srcVideo": "/media/src-kpop.mp4",
          "charImg": "/media/char-ninja.webp"
        },
        {
          "id": "out-anime-kpop",
          "title": "二次元动漫主角 × 舞台唱跳",
          "tag": "赛璐珞描边画风完全锁死",
          "desc": "插画直接输入，舞蹈输出依然保留清爽的日漫勾线与平涂阴影，绝不转变成诡异的真人假脸面具。",
          "video": "/media/out-anime-kpop.mp4",
          "poster": "/media/out-anime-kpop.webp",
          "srcVideo": "/media/src-kpop.mp4",
          "charImg": "/media/char-anime.webp"
        },
        {
          "id": "out-suit-hiphop",
          "title": "商务正装绅士 × 街舞反差",
          "tag": "高反差喜剧爆款",
          "desc": "沉稳严谨的名画肖像与西装人物突然跳起卡点街舞，极具视觉冲击与社交平台传播力。",
          "video": "/media/out-suit-hiphop.mp4",
          "poster": "/media/out-suit-hiphop.webp",
          "srcVideo": "/media/src-hiphop.mp4",
          "charImg": "/media/char-suit.webp"
        }
      ]
    },
    "pillars": {
      "eyebrow": "三大核心驱动能力",
      "title": "突破传统视频生成的边界",
      "items": [
        {
          "title": "AI 动作迁移与爆款舞蹈",
          "desc": "仅需提取参考动作骨架，即可将任何真人、名画或手办照片注入舞魂，精准卡点每一段节拍。"
        },
        {
          "title": "二次元跨次元变身与幻术特效",
          "desc": "保持原图动漫、3D 或插画的艺术风格，在动作穿梭间还原动漫名场面。"
        },
        {
          "title": "全身角色置换 (非换脸)",
          "desc": "告别只贴一层椭圆面具的粗糙换脸，头身比例、衣服裤腿、鞋履全套由 AI 重新合成。"
        }
      ]
    },
    "howItWorks": {
      "eyebrow": "极简三步上手",
      "title": "从一张静止照片到全网疯传的动态视频",
      "steps": [
        {
          "num": "01",
          "title": "上传清晰的人物照片",
          "desc": "支持正面或四分之三侧身半身像、全身照，JPG/PNG/WEBP 格式皆可，AI 自动定位五官与服饰特征点。"
        },
        {
          "num": "02",
          "title": "选定参考动作或上传短片",
          "desc": "在内置的高热度编舞库中一键选取，或上传手机自拍的 5–30 秒参考动作，算法自动提取 3D 骨骼轨迹。"
        },
        {
          "num": "03",
          "title": "一键合成并下载 9:16 HD MP4",
          "desc": "约 2 分钟云端集群渲染，自带节奏音频同步，支持免水印一键导出至 TikTok、Reels 或小红书。"
        }
      ]
    },
    "comparison": {
      "eyebrow": "硬核技术对比",
      "title": "为什么创作者选择 Genjutsu AI？",
      "headers": ["评估维度", "Genjutsu AI Generator", "传统文本生视频 (Sora类)", "传统换脸工具", "3D 动捕动效棚"],
      "rows": [
        ["动作精准度与节拍同步", "100% 动作骨骼轨迹复刻", "随机抽卡，无法精准控制动作", "仅跟随原片头部摆动", "极高，但需穿戴专业传感器"],
        ["面部及衣着稳定性", "100% 身份特征锁定 (无漂移)", "随镜头转动严重扭曲变形", "仅贴面部，身躯仍为他人", "完全依赖高成本 3D 绑定"],
        ["上手门槛与设备要求", "浏览器秒开，0 门槛", "需要高超提示词工程技巧", "简单但效果粗糙塑料感重", "需要数万元硬件与专业动画师"],
        ["出片时间", "约 2 分钟即刻交付", "排队 5–20 分钟", "1–3 分钟", "数天至数周后期制作"],
        ["算力退还保障", "失败自动全额返还点数", "生成废片通常不退款", "多数采用强制连续包月", "高昂项目预付制"]
      ]
    },
    "pricing": {
      "eyebrow": "透明算力方案",
      "title": "按需选购，零隐形扣费",
      "intro": "按次计费，无强制自动续费陷阱。每次生成仅需 1 点算力，遇到任何渲染中断或服务异常，点数自动毫秒级返还。",
      "cta": "获取算力",
      "guaranteeTitle": "算力防护与返还保障 (Credit Protection)",
      "guaranteeDesc": "我们承诺：只要因服务器故障、模型异常或网络中断未能交付视频，已扣除的算力会立即自动原路退还至您的账户余额中。",
      "packs": [
        {
          "id": "pack-starter",
          "name": "尝鲜体验包",
          "price": "$6.99",
          "unit": "单次购买",
          "desc": "包含 1 个完整高清动态视频生成权益，适合临时测试或个人创作。",
          "popular": false
        },
        {
          "id": "pack-popular",
          "name": "超值创作包",
          "price": "$17.99",
          "unit": "单次购买 · 最受欢迎",
          "desc": "包含 3 个完整高清视频生成权益，单片仅需 $5.99，创作者首选。",
          "popular": true
        },
        {
          "id": "pack-pro",
          "name": "高阶工作室包",
          "price": "$49.99",
          "unit": "单次购买 · 极致性价比",
          "desc": "包含 10 个高清视频生成权益，支持多角色测试与团队批量交付。",
          "popular": false
        }
      ],
      "subscription": {
        "name": "月度创作者通行证",
        "price": "$14.99 / 月",
        "desc": "每月享受 3 点高清视频生成算力 · 随时可取消续费"
      }
    },
    "faq": {
      "eyebrow": "答疑解惑",
      "title": "关于 Genjutsu AI 的常见疑问",
      "items": [
        {
          "q": "什么是 AI 动作迁移，Genjutsu AI 是如何工作的？",
          "a": "AI 动作迁移是从参考源视频中抽取人体骨骼运动与姿态轨迹，并将其精准应用在静态角色照片上。Genjutsu AI 逐帧计算 3D 骨骼关节、手指手势与面部网格几何，合成流畅连贯的动态视频，角色五官、发型与服装风格 100% 保持原样。"
        },
        {
          "q": "Genjutsu AI 与市面上普通的 AI 换脸软件有什么本质不同？",
          "a": "传统换脸仅在别人的现有视频中替换脸部，原片的体型、衣服、肢体依然是他人的。Genjutsu AI 是全身级角色驱动：它根据您的基底照片从头到脚重新渲染整个角色，让衣服褶皱、身材轮廓和发丝随节拍自然摆动。"
        },
        {
          "q": "支持动漫插画、3D 虚拟形象与绘画作品吗？",
          "a": "完全支持！Genjutsu AI 具备风格保持特性。写实照片保持真实感，3D 建模保持金属反光与几何质感，2D 动漫插画则保持利落的赛璐珞线稿与阴影，绝不会变成塑料感真人滤镜。"
        },
        {
          "q": "什么样的角色照片生成效果最好？",
          "a": "光线明亮均匀、五官清晰、头到腰身（或全身）姿态自然的肖像效果最佳。真实人像摄影与数字艺术作品均可无缝支持。"
        },
        {
          "q": "我可以上传自己拍摄的跳舞或健身动作视频吗？",
          "a": "可以。除了我们官方内置的热门舞蹈动作库，您也可以上传任意 5 到 30 秒的 MP4 或 MOV 格式视频作为自定义动作参考源。"
        },
        {
          "q": "生成的视频分辨率与格式是什么？",
          "a": "所有完成的视频均输出为原生竖屏 9:16（1080×1920）高清 MP4 格式，自带与舞蹈节拍同步的音轨，无需任何裁剪，可直接发布至 TikTok、Instagram Reels、B站或视频号。"
        },
        {
          "q": "如果视频生成失败或遇到异常会扣除算力吗？",
          "a": "不会！我们的『算力返还保护机制』会在任务失败时第一时间将扣除的算力自动原路退还至您的账户，您绝不会为未成功的生成买单。"
        },
        {
          "q": "我拥有所生成视频的版权与商用权益吗？",
          "a": "是的。只要您拥有上传源照片的合法使用权或授权，您对所生成的动态视频拥有完整的版权与商业化权益，可自由发布、变现与传播。"
        }
      ]
    }
  },
  "generator": {
    "metaTitle": "Genjutsu AI 在线创作工坊 — 单张照片动作迁移驱动",
    "metaDescription": "进入 Genjutsu AI 创作工坊：选择人像照片与流行舞蹈动作，即刻合成面部锁定、高清 9:16 竖屏短视频。",
    "h1": "Genjutsu AI 动效创作工坊",
    "subtitle": "上传一张人像照片，挑选编舞动作，开启次世代动作迁移合成"
  },
  "dashboard": {
    "metaTitle": "创作者中心 — Genjutsu AI",
    "metaDescription": "管理您的 AI 生成作品库，查看剩余算力点数与账单订单记录。",
    "h1": "创作者个人中心",
    "lead": "管理您的 AI 动态作品与算力资产",
    "balanceLabel": "当前剩余算力",
    "creditsUnit": "点可用",
    "addCredits": "充值算力",
    "myVideosTitle": "我的视频作品库",
    "emptyVideosTitle": "暂无已完成视频",
    "emptyVideosDesc": "前往创作工坊，上传您的第一张照片让角色舞动起来！",
    "btnCreateFirst": "立即制作视频",
    "ordersTitle": "算力充值明细",
    "colOrder": "订单编号",
    "colPlan": "套餐名称",
    "colDate": "购买时间",
    "colAmount": "金额",
    "colStatus": "支付状态",
    "emptyOrders": "暂无充值交易记录。",
    "btnDownload": "下载 MP4",
    "btnDelete": "删除",
    "confirmDelete": "确认从个人作品库中彻底移除此视频吗？"
  },
  "pricingPage": {
    "metaTitle": "算力套餐与计费标准 — Genjutsu AI",
    "metaDescription": "透明无隐形收费的算力价格：单片起售，失败自动退还算力，无自动扣款订阅陷阱。",
    "h1": "明码标价，按需充值",
    "intro": "按需充值视频生成算力，告别自动连续包月套路，每一份算力都有防护机制护航。"
  },
  "articles": {
    "how-to-make-ai-motion-transfer-video": {
      "slug": "how-to-make-ai-motion-transfer-video",
      "navLabel": "动作迁移教学",
      "metaTitle": "如何制作 AI 动作迁移视频：从单张照片到爆款短视频全流程",
      "metaDescription": "全面了解 AI 动作迁移的核心技巧，掌握图像预处理与动作参考选择标准，制作高完播率短视频。",
      "h1": "制作高画质 AI 动作迁移视频的完整实战指南",
      "intro": "动作迁移技术让静态图中的人物拥有跳舞与武打能力。本文为您详解如何选图与选动作以获得最佳成片率。",
      "sections": [
        {
          "heading": "准备高质量源照片",
          "body": "光照均匀、背景干净的正面或四分之三侧身半身照能提供最稳健的骨架锚点，避免边缘模糊导致生成重影。"
        },
        {
          "heading": "参考视频的关键要点",
          "body": "选择单人舞步、机位相对稳定、无大幅遮挡的 10 秒短片，能让 3D 骨骼抽取达到极佳的平滑度。"
        }
      ]
    },
    "ai-dance-generator-guide": {
      "slug": "ai-dance-generator-guide",
      "navLabel": "AI跳舞视频指南",
      "metaTitle": "AI 跳舞视频生成器：让任意肖像舞动起来的爆款密码",
      "metaDescription": "探秘为什么 AI 跳舞视频能够在社交网络获得千万播放，以及特征锁定技术在动作合成中的核心作用。",
      "h1": "AI 跳舞视频生成全方位创作指南",
      "intro": "从 K-Pop 女团舞步到节奏街舞，AI 动作合成正帮助创作者将二次元角色与历史人物推上流量巅峰。",
      "sections": [
        {
          "heading": "为什么 AI 跳舞视频极易出爆款？",
          "body": "反差感是流量密码。当严肃的古典肖像或高冷机甲突然跳起魔性热舞，强烈的反差制造极高完播率与评论区互动。"
        },
        {
          "heading": "特征锁定（Identity Locking）的重要性",
          "body": "普通换脸在人物转身或俯仰时容易发生脸部形变。Genjutsu AI 通过面部几何网格锁定，保证 360 度转体时依然辨识度极高。"
        }
      ]
    },
    "character-swap-vs-face-swap": {
      "slug": "character-swap-vs-face-swap",
      "navLabel": "全身置换对比换脸",
      "metaTitle": "全身角色置换 vs 局部换脸：底层技术与视觉效果对比",
      "metaDescription": "搞懂全身动作迁移驱动与传统视频换脸（Deepfake）的区别，挑选适合您项目的技术路线。",
      "h1": "全身角色置换 vs 局部换脸：技术原理与表现力差异",
      "intro": "虽然两者都改变了视频主体，但全身置换与局部贴脸在计算原理与最终观感上有本质区别。",
      "sections": [
        {
          "heading": "传统换脸（Face Swap）的工作机制",
          "body": "换脸技术仅在原演员的头颈部位贴上一层五官蒙版，演员的胖瘦、衣服、手部动作依然是原人的，容易产生割裂感。"
        },
        {
          "heading": "全身角色置换（Character Swap）的优势",
          "body": "全身置换直接根据输入照片重新渲染头身比例、衣服褶皱和鞋子，并将参考动作作为骨骼驱动，整体光影完全自然统一。"
        }
      ]
    },
    "terms": {
      "slug": "terms",
      "navLabel": "服务条款",
      "metaTitle": "服务条款 — Genjutsu AI",
      "metaDescription": "Genjutsu AI 平台服务使用规范与权利义务说明。",
      "h1": "服务条款",
      "intro": "使用 Genjutsu AI 提供的服务前，请仔细阅读本条款。",
      "sections": [
        {
          "heading": "合规使用承诺",
          "body": "您必须对上传的照片与视频拥有合法使用权。严禁生成侵犯他人隐私权、公众人物非授权深度伪造或任何违法违规内容。"
        },
        {
          "heading": "算力消费与退还",
          "body": "提交任务时扣除算力。如因平台算力节点故障或不可抗力导致生成失败，系统将毫秒级全额返还扣除点数。"
        }
      ]
    },
    "privacy": {
      "slug": "privacy",
      "navLabel": "隐私政策",
      "metaTitle": "隐私政策 — Genjutsu AI",
      "metaDescription": "Genjutsu AI 如何严格保护您的上传照片、视频素材与账户数据隐私。",
      "h1": "隐私政策",
      "intro": "我们重视您的数据资产隐私，采取端到端高强度加密与定期清理机制。",
      "sections": [
        {
          "heading": "素材处理与自动清理",
          "body": "您上传的素材仅用于当前任务的动作迁移渲染，未保存到个人作品库的中间缓存文件将在 7 天后被系统永久粉碎销毁。"
        },
        {
          "heading": "绝不用作公共模型训练",
          "body": "您的私人照片绝不会被用于任何公开基础大模型的训练集。"
        }
      ]
    },
    "about": {
      "slug": "about",
      "navLabel": "关于我们",
      "metaTitle": "关于 Genjutsu AI — 新一代次世代动作合成技术",
      "metaDescription": "了解 Genjutsu AI 研发团队与我们降低电影级动捕门槛的使命。",
      "h1": "关于 Genjutsu AI",
      "intro": "我们致力于让每一位创作者都能在浏览器中轻松实现电影级的人物动作合成。",
      "sections": [
        {
          "heading": "我们的使命",
          "body": "视觉创作不应被昂贵的动作捕捉棚与复杂的 3D 骨骼绑定所垄断。Genjutsu AI 将前沿 Video-to-Video 动作迁移技术封装为开箱即用的轻量工坊，赋能全球短视频创作者。"
        }
      ]
    },
    "what-is-genjutsu-ai": {
      "slug": "what-is-genjutsu-ai",
      "aliases": ["what-is"],
      "navLabel": "什么是幻术AI",
      "metaTitle": "什么是 Genjutsu AI（幻术AI）？动作迁移驱动技术全景解析",
      "metaDescription": "深入解读 Genjutsu AI 是什么、源自 Higgsfield 的现实篡改视频模型原理，以及为什么它在 2026 年彻底革新了 AI 跳舞短视频赛道。",
      "h1": "什么是 Genjutsu AI（幻术AI）？次世代视频动作迁移模型深度拆解",
      "intro": "Genjutsu AI 代表了生成式视频的范式转移：告别文本生视频的随机开盲盒，直接将真实编舞动作无缝迁移至静态角色照片上，同时保持 100% 五官与画风一致性。",
      "quickAnswer": "Genjutsu AI（幻术AI）是一种 Video-to-Video 深度学习动作合成技术。它能从一段源视频中提取全身骨骼动态、手势节拍与运镜轨迹，并映射到任意单张 2D 动漫、3D 建模或写实人物照片上。由 Higgsfield Genjutsu 等模型引领风潮，创作者无需任何 3D 绑定或绿幕拍摄，即可在数分钟内生成面部锁死的高清 9:16 竖屏舞蹈视频。",
      "sections": [
        {
          "heading": "AI 语境中“Genjutsu（幻术）”一词的由来与内涵",
          "body": "在东方神话与流行文化中，“幻术”（Genjutsu）指操纵感知与改变现实维度的非凡能力。2026 年，以 Higgsfield AI 为代表的头部视频生成团队将这种“基于现实视频进行像素级重构与替换”的次世代架构命名为 Genjutsu。它不再是从无到有地生成随机幻觉，而是如同施展幻术般，将现实画面中的主体精确调换，同时严丝合缝保留原视频的物理惯性与镜头运动。"
        },
        {
          "heading": "Genjutsu 动作合成的底层技术架构",
          "body": "传统 Text-to-Video（如文生视频）普遍存在严重的逐帧时间抖动（Jitter）：人物一转头五官就融化变形。Genjutsu AI 采用多阶段参考管道：1) 从参考动作视频中提取 3D DensePose 密集骨骼与关节旋转角度；2) 基于 ControlNet 演进的身份特征锁定器（Identity Locking），锚定角色面部网格、发丝结构与服饰材质；3) 潜在视频扩散模型（Latent Video Diffusion），生成符合真实物理惯性的布料飘动与肌肉发力感。"
        },
        {
          "heading": "Genjutsu AI 对比传统换脸与文生视频的代际飞跃",
          "body": "传统换脸只能在别人的身体上糊一层椭圆形的面具贴纸，体态与衣服仍是他人的；而文生视频无法精准复刻连续复杂舞蹈。Genjutsu AI 则是全身级重构——从鞋子发型到骨架比例全部忠于输入照片，真正实现了“让你的二次元老婆或历史人物跳出真实女团舞”。"
        },
        {
          "heading": "为什么 Genjutsu AI 在短视频平台迎来爆发？",
          "body": "短视频算法（TikTok、小红书、Reels、视频号）极其看重前 3 秒的视觉吸引力与完播率。Genjutsu AI 带来的极致反差——名画跳街舞、装甲机甲跳甜美齐舞——天然具备强大的吸睛效应与社交病毒传播属性。"
        }
      ],
      "faq": [
        {
          "q": "Genjutsu AI Generator 与 Higgsfield Genjutsu 有什么联系与区别？",
          "a": "Higgsfield AI 研发了底层的 Genjutsu 视频现实篡改模型，面向专业 VFX 节点流工作台。而 Genjutsu AI Generator (genjutsuaigenerator.com) 专为全球短视频创作者打造了开箱即用的轻量级浏览器工坊，无需配置复杂环境，单张图片 1 键生成 9:16 竖屏 MP4。"
        },
        {
          "q": "动漫立绘和 3D 模型渲染图也能跑通吗？",
          "a": "完全支持。Genjutsu AI 能精确识别非写实画风，赛璐珞描边线稿、3D 表面高光和厚涂色彩都会被忠实保留。"
        },
        {
          "q": "可以免费体验试用吗？",
          "a": "可以。新用户进入 Hero 在线工坊即可获得初始体验算力，无需绑定信用卡即可直接渲染首个测试视频。"
        }
      ]
    },
    "how-to-use-genjutsu-ai": {
      "slug": "how-to-use-genjutsu-ai",
      "aliases": ["how-to-use"],
      "navLabel": "幻术AI使用教程",
      "metaTitle": "Genjutsu AI 使用教程：提示词配方、动作选材与爆款发布指南",
      "metaDescription": "手把手教你使用 Genjutsu AI 制作角色跳舞视频。涵盖源图片筛选原则、高精度提示词公式与 TikTok 竖屏导出实战。",
      "h1": "Genjutsu AI 全流程使用教学：从零做出爆款动效短视频",
      "intro": "掌握 Genjutsu AI 的完整制作工作流：从挑选最适合动作迁移的基底人像，到搭配卡点编舞与一键复制高分 Prompt。",
      "quickAnswer": "使用 Genjutsu AI 仅需 3 步：1) 上传一张五官清晰的人物照或直接点选预设角色；2) 从官方库中挑选一段舞蹈模板，或上传 5–30 秒参考动作视频；3) 点击“驱动角色跳舞”，约 2 分钟即可生成自带音乐的 9:16 高清 MP4 视频。",
      "sections": [
        {
          "heading": "第 1 步：挑选符合动作迁移规范的基底照片",
          "body": "基底照片是整部视频的身份锚点。推荐使用光照均匀、中等对比度的正面或四分之三侧身半身像（头到腰）或全身照。避免使用大面积面部阴影遮挡、侧脸超过 60 度或肢体严重残缺的照片。"
        },
        {
          "heading": "第 2 步：选择或拍摄参考编舞视频",
          "body": "动作视频决定了成片的节拍、发力点与步伐。您可以在我们的精选流行编舞库中一键取用（嘻哈律动、女团热门副歌），也可以自行录制 10 秒全身舞蹈视频。录制时背景尽量简单，避免多人交叠走动干扰骨骼捕捉。"
        },
        {
          "heading": "第 3 步：Video-to-Video 提示词增强公式",
          "body": "虽然动作主要由视频驱动，但搭配特定提示词能让服装物理动态与光影更惊艳。推荐万能公式：[主体外貌与材质描述] + [舞蹈风格与运动力度] + [环境光效与氛围] + [镜头景深]。"
        },
        {
          "heading": "第 4 步：针对短视频平台的一键导出规范",
          "body": "系统默认按照 1080×1920（9:16）全高清分辨率输出，并完美嵌入立体声背景音乐，下载后即可无缝上传发布至 TikTok、Instagram Reels、B站或视频号。"
        }
      ],
      "promptTemplates": [
        {
          "style": "潮流街头街舞 (Street Dance)",
          "prompt": "Full-body dynamic street dance choreography, sharp rhythmic popping and locking, fluid hoodie and sneaker physics, cinematic volumetric lighting, 8k resolution, photorealistic 9:16 portrait.",
          "tip": "推荐搭配『街头舞者』预设与『街舞律动』编舞模板使用。"
        },
        {
          "style": "二次元动漫偶像舞台 (Anime K-Pop)",
          "prompt": "Anime protagonist performing energetic K-pop chorus routine, vibrant cel-shaded line art, synchronized hair bounce, stage lighting with pastel glow, authentic Japanese animation aesthetic.",
          "tip": "推荐搭配『动漫主角』预设，线稿干净不融化。"
        },
        {
          "style": "赛博机甲武术动作 (Cyber Martial Arts)",
          "prompt": "Armored cybernetic warrior executing rapid martial arts transitions, glowing neon accents, reflective carbon fiber armor plates, smooth mechanical joint articulation, dark sci-fi background.",
          "tip": "推荐搭配『赛博机甲』预设，关节机械联动自然。"
        }
      ]
    },
    "best-genjutsu-ai-generators": {
      "slug": "best-genjutsu-ai-generators",
      "aliases": ["best"],
      "navLabel": "最佳幻术AI工具",
      "metaTitle": "2026 年最佳 Genjutsu AI 动作迁移生成器横向评测（TOP 5 排名）",
      "metaDescription": "对比市面上热门的 Genjutsu AI 视频工具与 Higgsfield 替代方案。从生成耗时、脸部锁定度、操作门槛与算力保障多维度实测。",
      "h1": "2026 年最佳 Genjutsu AI 视频生成器评测：功能与性价比全览",
      "intro": "我们对主流的动作迁移与角色跳舞 AI 工具进行了多轮极限压力测试，涵盖身体转身稳定性、服饰褶皱物理与算力退还机制。",
      "quickAnswer": "对于追求效率的自媒体创作者，首推 Genjutsu AI Generator (genjutsuaigenerator.com)，因其纯浏览器秒开、一键预设库以及业内独创的失败算力自动返还保障；对于追求电影级复杂节点管线的工作室，Higgsfield AI 依然是专业团队的有力选择。",
      "comparisonTable": {
        "headers": ["平台名称", "最适合人群", "环境准备", "身份/面部锁定", "渲染耗时"],
        "rows": [
          ["Genjutsu AI Generator", "自媒体创作者 / 短视频", "免配置 (浏览器即开即用)", "100% 全身与五官锁定", "约 2 分钟"],
          ["Higgsfield AI Genjutsu", "影视 VFX 专业团队", "需学习复杂节点流", "极高一致性", "3–8 分钟"],
          ["Viggle AI", "轻度鬼畜与表情包制作", "Discord 社区 / 网页", "中等 (面部蒙版易脱位)", "2–4 分钟"],
          ["快手可灵 Kling 动作控制", "电影级长镜头叙事", "网页排队制", "高物理写实度", "5–10 分钟"],
          ["Seedance 2.5 (本地部署)", "极客与 GPU 极速发烧友", "ComfyUI / Python 环境", "依赖调参功底", "取决于本地显卡算力"]
        ]
      },
      "sections": [
        {
          "heading": "1. Genjutsu AI Generator（创作者综合体验第 1 名）",
          "body": "本平台（genjutsuaigenerator.com）将复杂的骨骼解算隐藏在简洁优雅的直觉化界面之下。首创首屏交互工坊、全语种支持以及『算力保护机制』，让任何普通人都能在 2 分钟内收获令人惊叹的高清成片。"
        },
        {
          "heading": "2. Higgsfield AI Genjutsu",
          "body": "作为该概念的开创者，Higgsfield 在视频对视频（Video-to-Video）镜头轨迹重构与光影反射上具备极深厚的技术积累，适合有技术储备的专业后期团队。"
        },
        {
          "heading": "3. Viggle AI",
          "body": "早期火爆 Discord 的绿幕贴片工具，适合制作简单的搞怪鬼畜视频，但在精细衣服物理与大幅度身体旋转时容易产生边缘发虚。"
        },
        {
          "heading": "如何根据自己的场景挑选最合适的工具？",
          "body": "如果您需要快速交付小红书、TikTok 或视频号爆款视频，不想在 Python、节点连线或显卡配置上耗费心力，Genjutsu AI Generator 是最省心的高性价比选择。"
        }
      ]
    },
    "free-genjutsu-ai": {
      "slug": "free-genjutsu-ai",
      "aliases": ["free"],
      "navLabel": "免费幻术AI",
      "metaTitle": "免费 Genjutsu AI 视频生成器：零门槛在线体验角色动作驱动",
      "metaDescription": "无需绑定信用卡即可免费试用 Genjutsu AI。在浏览器中即刻驱动照片跳舞，导出无恶意水印的高清 9:16 短视频。",
      "h1": "免费体验 Genjutsu AI：打破高昂门槛，即刻让照片动起来",
      "intro": "体验前沿动作迁移科技无需背负高昂的每月扣款负担。领取初始测试算力，体验工业级面部锁定合成。",
      "quickAnswer": "您可以在线直接体验 Genjutsu AI Generator：在 Hero 创作工坊中领取初始体验点数，无需输入任何银行卡号，遇到服务器渲染失败还享有算力全额返还保障。",
      "sections": [
        {
          "heading": "免费体验包含哪些权益？",
          "body": "与那些用模糊遮挡水印或限制 360p 画质的恶性体验不同，Genjutsu AI Generator 免费赠送完整算力，支持导出标准 1080×1920 全高清视频文件。"
        },
        {
          "heading": "零信用卡绑定陷阱",
          "body": "我们不要求任何预授权扣款，杜绝所谓的『7天免费但忘记取消自动扣除年费』的流氓套路。"
        },
        {
          "heading": "全程算力防护护航",
          "body": "即使是在免费试用阶段，只要网络或任务遭遇技术中断，消耗的点数同样享受自动补发返还。"
        }
      ]
    },
    "higgsfield-ai-genjutsu-alternative": {
      "slug": "higgsfield-ai-genjutsu-alternative",
      "aliases": ["higgsfield-alternative"],
      "navLabel": "Higgsfield替代品",
      "metaTitle": "Higgsfield AI Genjutsu 最佳轻量网页替代方案：一键开箱即用",
      "metaDescription": "在寻找 Higgsfield AI Genjutsu 的高性价比替代品？了解 Genjutsu AI Generator 如何提供免排队、免复杂节点的轻量动作迁移工作台。",
      "h1": "Higgsfield AI Genjutsu 最佳网页替代工具：更轻快、更直观",
      "intro": "虽然 Higgsfield 开创了现实篡改模型的先河，但日常短视频创作者更需要一个无需排队、点开即用的轻量利器。",
      "quickAnswer": "Genjutsu AI Generator 是 Higgsfield AI Genjutsu 绝佳的平替与创作者利器。免去了复杂的节点连接与漫长的等待名单，单张照片直接套用流行舞蹈，2 分钟直出 9:16 手机短视频。",
      "sections": [
        {
          "heading": "Higgsfield Genjutsu 的技术亮点与痛点",
          "body": "Higgsfield 模型展示了极高的物理重塑能力，但其工作台更偏向电影工业流程，对于只需要一条 10 秒短视频去发 TikTok 的创作者来说，学习成本与上手门槛偏高。"
        },
        {
          "heading": "为什么更多创作者转向 Genjutsu AI Generator？",
          "body": "1) 纯网页免排队：点开即可上传图片操作；2) 封装好的爆款舞蹈库：无需四处搜集动作视频；3) 明确透明的单次算力计费与防护；4) 专为移动竖屏优化。"
        },
        {
          "heading": "提示词无缝迁移兼容",
          "body": "如果您已经为 Higgsfield 准备了角色设定或 Prompt，可以直接粘贴至 Genjutsu AI Generator，底层模型同样能够精准解析身份标记与艺术风格指令。"
        }
      ]
    }
  },
  "ui": {
    "home": "首页",
    "close": "关闭",
    "skip": "跳转至主要内容",
    "signin": "登录",
    "signup": "注册账号",
    "welcome": "欢迎回来",
    "google": "使用 Google 快速登录",
    "orEmail": "或使用邮箱登录",
    "email": "电子邮箱",
    "password": "密码",
    "passwordHint": "至少 8 位字符",
    "termsConsent": "登录即代表您同意本站的服务条款与隐私政策。",
    "forgot": "忘记密码？",
    "reset": "重置密码",
    "signedOut": "已成功退出登录。",
    "authRequired": "请先登录以访问您的创作者资产。",
    "processingPayment": "正在安全拉取 Stripe 支付环境…",
    "paid": "支付成功",
    "loading": "加载中…",
    "unavailable": "服务繁忙，请稍后重试。",
    "uploading": "正在上传照片并提取特征…",
    "rendering": "AI 动作迁移合成中，请稍候…",
    "success": "视频生成完毕！",
    "failed": "生成异常，已自动返还算力点数。",
    "copied": "文案已成功复制到剪贴板！",
    "sharePrivate": "已生成专属作品，点击下载 MP4 保存。",
    "delete": "删除",
    "deleteConfirm": "确认从个人作品库中彻底移除此视频吗？",
    "footer": "单张照片赋予任意角色丝滑舞步与生命力。"
  },
  "auth": {
    "badge": "GENJUTSU AI STUDIO",
    "titleSignUp": "创建您的创作者账号",
    "titleSignIn": "欢迎回来",
    "subtitle": "多端同步您的云端算力与生成视频作品。",
    "google": "使用 Google 快速继续",
    "divider": "或使用邮箱",
    "nameLabel": "创作者昵称",
    "namePlaceholder": "请输入您的昵称",
    "emailLabel": "电子邮箱",
    "emailPlaceholder": "you@example.com",
    "passwordLabel": "登录密码",
    "passwordPlaceholder": "至少 8 位密码",
    "btnSignUp": "创建账号",
    "btnSignIn": "登录",
    "switchHaveAccount": "已有账号？",
    "switchNewHere": "第一次来？"
  },
  "payment": {
    "badge": "STRIPE 安全收银台",
    "title": "正在确认您的订单…",
    "waiting": "正在同步 Stripe 安全交易状态…",
    "refresh": "刷新状态",
    "viewOrders": "查看充值记录"
  }
};

const zhPath = path.join(localesDir, 'zh.json');
fs.writeFileSync(zhPath, JSON.stringify(zhData, null, 2), 'utf-8');
console.log('✅ Successfully wrote locales/zh.json with 100% key parity!');
