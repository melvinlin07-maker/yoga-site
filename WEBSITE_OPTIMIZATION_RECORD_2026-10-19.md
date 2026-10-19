# 鑫彥瑜珈網站全面優化與自媒體影音庫發布全紀錄

> **紀錄時間**：2026 年 10 月 19 日  
> **專案版本**：v2.4 (Commit: `bcb0bc9`)  
> **發布狀態**：已正式部署至生產環境（GitHub `main` 分支）  
> **核心目標**：整合全網破十萬觀看的自媒體爆款 Reels，打造站內「影音動作庫（videos.html）」，並與深度部落格專題（Topic Clusters）雙向串聯，形成「短影音吸引注意力 ➔ 深度專題建立專業信任 ➔ AI 體態檢測預約轉化」的完整漏斗。

---

## 目錄
1. [專案執行背景與解決痛點](#一專案執行背景與解決痛點)
2. [核心里程碑一：全新「影音動作庫」（videos.html）建置](#二核心里程碑一全新影音動作庫videoshtml建置)
3. [核心里程碑二：徹底解決畫質模糊問題（Full HD 原生升級）](#三核心里程碑二徹底解決畫質模糊問題full-hd-原生升級)
4. [核心里程碑三：部落格 6 大主題聚落與影音雙向導流](#四核心里程碑三部落格-6-大主題聚落與影音雙向導流)
5. [核心里程碑四：全站導航、SEO 索引與技術架構優化](#五核心里程碑四全站導航seo-索引與技術架構優化)
6. [收錄之 9 支爆款 Reels 影片矩陣總覽](#六收錄之-9-支爆款-reels-影片矩陣總覽)
7. [未來影音持續擴充標準作業程序 (SOP)](#七未來影音持續擴充標準作業程序-sop)

---

## 一、專案執行背景與解決痛點

### 1. 散落各處的社群流量缺乏站內轉化
* **問題**：老師在 Facebook 與 Instagram 發布了大量高品質的 Reels 短影音，單支觀看量高達 7 萬至 14 萬以上，但社群平台流量無法有效累積在官方網站的 SEO 權重上，也無法引導受眾深入閱讀網站的深度衛教文章。
* **解法**：建立網站專屬的「影音動作庫（videos.html）」，將自媒體爆款影片作為視覺抓手，站內聚攏高黏著度用戶。

### 2. 文章有深度但文字門檻高；短影音易吸睛但缺乏原理解析
* **問題**：單純看文章容易感到枯燥或文字抽象；單純看 Reels 只有 10–15 秒，學員常知其然不知其所以然。
* **解法**：建立「短影音示範 ⇄ 生物力學深度解析文章」的雙向超連結，形成「看影片懂動作、看文章懂原理、到現場量身調整」的黃金轉化路徑。

---

## 二、核心里程碑一：全新「影音動作庫」（videos.html）建置

### 1. 3 × 3 完美九宮格卡片矩陣
* 桌面端（Desktop）：採用標準三欄九宮格（`grid-template-columns: repeat(3, 1fr)`），間距 26px，卡片比例統一為直式影音風格（9:16），視覺平衡大氣。
* 平板與手機端（Mobile）：自適應響應式佈局，平板切換為雙欄，手機端自動轉為舒適的單欄滑動卡片，兼顧觸控體驗。

### 2. 站內原生劇院級彈窗播放器（In-Page Lightbox Modal）
* **免跳出站外**：訪客點擊任一張影音卡片，立即浮現暗色磨砂玻璃背景（`rgba(15, 10, 13, 0.88)` + `backdrop-filter: blur(8px)`）的劇院級彈窗播放器。
* **無縫流暢播放**：播放器載入 1080p 原生 MP4 影片，保留老師原音示範、完整動作與即時字幕。
* **友善交互體驗**：
  * 支援點擊右上角 `✕` 按鈕關閉。
  * 支援點擊彈窗外部暗色背景自動關閉。
  * 支援鍵盤 `Esc` 鍵快捷退出。
  * 關閉彈窗時自動停止影片並重置時間軸，防止背景重複發聲。

### 3. 即時分類篩選列（Instant Filter Bar）
頂部提供 5 大維度的標籤切換鈕，點擊無刷新即時過濾：
1. **全部影音 (9)**
2. **骨盆・臀腿核心 (3)**
3. **足踝・小腿活動度 (3)**
4. **站姿平衡・防跌 (2)**
5. **膝蓋受力・下樓梯 (1)**

---

## 三、核心里程碑二：徹底解決畫質模糊問題（Full HD 原生升級）

### 1. 模糊根源診斷
* 前期雛形版本從儀表板局部低解析截圖提取，並透過模擬程式插值放大，導致在視網膜螢幕與手機上產生馬賽克與失真。

### 2. 完整重構與升級方案
* **真實 1080p Full HD MP4 原檔**：
  * 將老師提供的 9 支精確 Facebook Reels 網址下載為原生 MP4 串流（檔案大小約 1MB～2.7MB，兼顧極速加載與高畫質）。
  * 存儲於 `assets/reels/reel-1.mp4` 至 `reel-9.mp4`。
* **540 × 960 官方高解析度封面**：
  * 直接採用高畫質直式封面圖（`assets/reels/reel-cover-1.jpg` 至 `reel-cover-9.jpg`），確保字體、人像與線條纖毫畢現。
* **保留原汁原味設計**：
  * 前兩張保留老師親自設計的頂級爆款縮圖（高對比立體字、紅藍印章標籤、發光解剖透視與 ❌ / ✔️ 圖標）。
  * 其餘卡片忠實呈現影片自然的動態光暈與示範畫面，不硬加生硬的程式碼合成字，維持高質感瑜伽品牌風格。

---

## 四、核心里程碑三：部落格 6 大主題聚落與影音雙向導流

### 1. 6 大情境主題聚落（Topic Clusters）結構
網站部落格已全數收錄 24 篇深度衛教長文，依據 40–60 歲女性最關心的體態困擾分群：
* **專題一：肩頸警訊與圓肩駝背連鎖**（圓肩、駝背、高低肩、富貴包、駝背身高力學）
* **專題二：下背痠痛與骨盆底核心修復**（骨盆前傾、壁繩卸載、骨盆底肌漏尿、久站腰痠臀肌失憶）
* **專題三：下肢地基、足踝活動度與步態**（足弓塌陷、走路內外八、膝蓋卡卡與髖關節）
* **專題四：現代久坐與生活代償拆解**（久坐8小時、做家事彎腰、搬重物傷腰）
* **專題五：女性熟齡身心、產後與更年期**（產後漏尿腹直肌分離、熟齡平衡力防跌、情緒卡在髖關節）
* **專題六：體態調整瓶頸、練習心態與服務選擇**（進展停滯迷思、無痛反而危險、初學者選課）

### 2. 雙向互聯閉環
* **影音庫 ➔ 部落格**：每個影片卡片與彈窗均設有「📖 深入閱讀完整生物力學解析」，直接跳轉到對應長文，讓有深度求知慾的訪客停留時間大幅增加。
* **部落格 ➔ 影音庫**：在 `blog.html` 體態知識庫頂部，設置專屬高亮引導按鈕：
  > `🎬 想直接看動作示範？前往「精選 Reels 影音動作庫」→`

---

## 五、核心里程碑四：全站導航、SEO 索引與技術架構優化

1. **頂部導航列全面連通**：
   * [index.html](file:///c:/Users/user888/Desktop/瑜珈網站/index.html)、[blog.html](file:///c:/Users/user888/Desktop/瑜珈網站/blog.html)、[videos.html](file:///c:/Users/user888/Desktop/瑜珈網站/videos.html) 的導航選單中全面加入 **「影音動作庫」**。
2. **SEO 搜尋引擎索引**：
   * 在 [sitemap.xml](file:///c:/Users/user888/Desktop/瑜珈網站/sitemap.xml) 中註冊：
     ```xml
     <url>
       <loc>https://sinyanyoga.com.tw/videos.html</loc>
       <lastmod>2026-10-19</lastmod>
     </url>
     ```
3. **無損發布紀律**：
   * 全程未改動全局 `theme.css` 與 `site.js`，避免造成既有首頁或部落格排版回歸問題；所有影音庫樣式與交互腳本均高內聚封裝在 `videos.html` 內。

---

## 六、收錄之 9 支爆款 Reels 影片矩陣總覽

| # | 動作主題分類 | 觀看量 | 影片標題 | 示範痛點與動作精髓 | 深度文章串聯 |
|---|---|---|---|---|---|
| **1** | 足踝活動度 | 👁️ 14.5 萬 | **膝蓋碰到牆，腳跟別偷偷抬起來！** | 測試踝關節背屈；很多人腳跟偷離地代償，阿基里斯腱與比目魚肌攣縮引發足弓塌陷。 | [足弓與全身連鎖解析](file:///c:/Users/user888/Desktop/瑜珈網站/blog-feet-shoes-foundation.html) |
| **2** | 骨盆・腰背 | 👁️ 13.4 萬 | **屁股一往後坐，腰就先拱起來？** | 四足跪姿往後坐腰椎代償突起，揭露骨盆翻轉與腰大肌深層張力卡死真相。 | [骨盆前傾自我檢測與成因](file:///c:/Users/user888/Desktop/瑜珈網站/blog-anterior-pelvic-tilt.html) |
| **3** | 平衡防跌 | 👁️ 7.6 萬 | **穿褲子一抬腳，身體就東倒西歪？** | 穿褲子低頭找褲管身體失衡；教導先固定前方定點，喚醒 70% 本體感覺神經。 | [熟齡防跌與平衡力真相](file:///c:/Users/user888/Desktop/瑜珈網站/blog-balance-midlife.html) |
| **4** | 膝蓋對齊 | 👁️ 10.1 萬 | **下樓梯時，膝蓋有沒有偷偷往裡跑？** | 膝內扣（Knee Valgus）導致髕骨受力不均，教導對齊第二腳趾穩定下踩。 | [膝蓋卡卡與髖關節連鎖解析](file:///c:/Users/user888/Desktop/瑜珈網站/blog-knee-hip.html) |
| **5** | 動態平衡 | 👁️ 9.5 萬 | **手一伸遠，腳踝先忙了？動態平衡真相** | 生活中的平衡不是靜止不動，而是拿遠物移動後能穩穩接回重心。 | [熟齡平衡力與重心控制練習](file:///c:/Users/user888/Desktop/瑜珈網站/blog-balance-midlife.html) |
| **6** | 足底筋膜 | 👁️ 9.6 萬 | **越想站穩，腳趾反而抓得越緊？** | 腳趾死扣地面反而加劇緊繃，引導足底「腳跟、大趾球、小趾球」三點均勻接地。 | [足底筋膜與三點支撐連鎖](file:///c:/Users/user888/Desktop/瑜珈網站/blog-feet-shoes-foundation.html) |
| **7** | 臀肌離心 | 👁️ 9.3 萬 | **妳不是坐下，是最後幾公分直接掉下去？** | 接近椅面最後失控摔坐，源於臀肌離心煞車能力失憶；找回接住自己的力量。 | [久站腰痠與臀肌離心力修復](file:///c:/Users/user888/Desktop/瑜珈網站/blog-standing-low-back.html) |
| **8** | 小腿活動 | 👁️ 9.2 萬 | **踮腳時，腳趾會不會偷偷抓住地板？** | 踮腳高不代表穩；不靠腳趾死扣，精準鍛鍊小腿深層肌群與踝關節軸線穩定性。 | [鞋子與足踝肌力牽引解析](file:///c:/Users/user888/Desktop/瑜珈網站/blog-feet-shoes-foundation.html) |
| **9** | 臀腿啟動 | 👁️ 8.7 萬 | **以為在練臀腿，結果先燒的是大腿前側？** | 椅子式膝蓋壓力過大；重心後移腳跟、髖鉸鏈先行，讓臀肌與腿後協同發力。 | [壁繩輔助關節卸載與臀部發力](file:///c:/Users/user888/Desktop/瑜珈網站/blog-wall-rope-anterior-pelvic-tilt.html) |

---

## 七、未來影音持續擴充標準作業程序 (SOP)

當老師未來在 Facebook / Instagram 發布新的爆款影音（具備同款「駱駝式」精美縮圖）時，可依循以下極簡 3 步驟擴充或替換：

1. **準備素材**：
   - 影片檔：下載 1080p MP4 存入 `assets/reels/reel-新編號.mp4`。
   - 縮圖檔：將已設計好的 540×960 直式縮圖存入 `assets/reels/reel-cover-新編號.jpg`。
2. **在 `videos.html` 新增卡片**：
   - 複製既有 `.video-card` 區塊，修改 `data-video`、`data-poster`、`data-title`、`data-desc` 與對應的部落格連結。
3. **驗證與發布**：
   - 在本地預覽確認彈窗播放正常後，執行發布部署。

---

## 八、行動端（Mobile）響應式全頁面檢驗與水平溢出修復

### 1. 發現之問題（Root Cause）
* **問題現象**：用戶在手機端（如 iPhone 375px/390px 寬度）瀏覽時，發現頁面會水平左右晃動、部分字體被右側邊緣裁切、頂部導航右移。
* **技術根因**：
  1. `index.html` 與 `about.html` 內建的學員真實評價區塊（`.testimonial-grid` / `.testimonial-track`）包含 4,780px 寬的無限滾動跑馬燈。在部分行動端瀏覽器（WebKit/Blink）中，即使父層設有 `overflow: hidden`，若缺乏 CSS 渲染隔離層，仍會導致 `document.documentElement.scrollWidth` 被撐開至 4,780px。
  2. 首頁 `.content-paths` 曾使用行內樣式 `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`，因權重過高蓋過媒體查詢，使手機端寬度卡死在 280px 以上無法乾淨轉為單欄。

### 2. 修復措施
1. **全局視窗溢出防護**：
   * 在 [theme.css](file:///c:/Users/user888/Desktop/瑜珈網站/theme.css) 頂部注入 `html, body { overflow-x: hidden; max-width: 100vw; width: 100%; }`，從根源截斷所有寬度外溢。
2. **跑馬燈元件隔離**：
   * 在 `.testimonial-grid` 加入 `width: 100%; max-width: 100%; position: relative; contain: paint;`，確保跑馬燈軌跡不會影響外層文檔流寬度。
3. **導航卡片純淨響應式**：
   * 移除 `index.html` 上的行內 `style`，將 `.content-paths` 桌面版三欄與行動版單欄完全由 `theme.css` 與 `@media (max-width: 820px)` 精確控制。

### 3. 全站行動端自動化檢測結果（375px 視窗）
透過無頭瀏覽器對站內所有核心頁面進行 375px / 481px 視窗溢出自動化量測，結果如下：
* `index.html`（首頁）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `videos.html`（影音庫）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `classes.html`（課程介紹）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `about.html`（關於我們）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `blog.html`（部落格）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `know-yoga.html`（認識瑜伽）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `neck-release.html`（肩頸專題）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `assessment.html`（AI 檢測）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `ai-assessment.html`（檢測詳情）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `reviews.html`（評價專頁）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `contact.html`（聯絡諮詢）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* `posture-self-test.html`（自我檢測）：`scrollWidth == clientWidth`（無水平滾動，PASS）
* 各篇部落格長文（例 `blog-why-i-look-hunched-in-photos.html`）：`scrollWidth == clientWidth`（PASS）
* 各篇動作拆解（例 `pose-alignment-over-depth.html`）：`scrollWidth == clientWidth`（PASS）

