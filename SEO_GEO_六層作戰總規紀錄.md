# 鑫彥瑜珈運動館（`sinyanyoga.com.tw`）— SEO × GEO × 轉換 6 層作戰總規紀錄

> **建立／最後實測時間**：`2026-11-19`
> **最高指導原則**：
> 1. **第 0 條數據防呆鐵律**：GSC 資源固定為 `sc-domain:sinyanyoga.com.tw`；GA4 固定為 `ga4-yoga`（Property ID：`547750681`，目標網域：`sinyanyoga.com.tw`）。每次拉取 GA4 報表第一步必驗 `hostName == sinyanyoga.com.tw`，剔除 `localhost` / `127.0.0.1` 測試雜訊。
> 2. **先實測現況、禁止做白工**：所有頁面修改前必先查驗線上真實原始碼與 `Last-Modified`，已到位項目直接標記「✅ 已完成／進入觀察期」。
> 3. **6 層回報鐵律**：每次交付必標註「① 完成 6 層地圖的第幾層、② 該層進度、③ 下一層最大瓶頸」。

---

## 📊 第 0 條鐵律驗證紀錄（GA4 `hostName` 實測核對）

- **查驗區間**：近 90 天（`2026-08-21` 至 `2026-11-18`）
- **GA4 Property ID**：`547750681`（透過 `ga4-yoga` MCP 驗證）

| `hostName` | `screenPageViews` | `activeUsers` | `sessions` | 判定處置 |
| :--- | :---: | :---: | :---: | :--- |
| **`sinyanyoga.com.tw`** | **3,024** | **1,538** | **1,945** | ✅ **唯一分析目標網域（確認無誤）** |
| `localhost` | 155 | 7 | 31 | ❌ 本地開發雜訊（分析時予以剔除） |
| `127.0.0.1` | 66 | 12 | 23 | ❌ 本地開發雜訊（分析時予以剔除） |

---

## 🗺️ 全站 6 層作戰進度總覽

| 層級 | 作戰模組 | 目前進度 | 狀態摘要 |
| :---: | :--- | :---: | :--- |
| **第 1 層** | **技術與 GEO 地基** | **98%** | ✅ **地雷 3 已完成並線上實測 `LIVE=True`**（commit `6565ad4`）。首頁 `<title>` 改為在地核心詞置前（`高雄左營瑜珈教室・壁繩瑜珈與 AI 體態檢測｜鑫彥瑜珈運動館`）、補建 `.nojekyll` 修復 `/.well-known/ai.txt` 為 HTTP 200（`ai_discovery` 1→2 分）、294 處 `href="index.html"` 全數收斂為 `./`。 |
| **第 2 層** | **全站架構與內耗清查** | **92%** | ✅ 首頁 `/` 分裂已消滅；`ai-assessment.html` 舊測試頁已退役並導向 `assessment.html`；「壁繩」(`blog-what-is-wall-rope` → `about-wall-rope`) 與「AI體態」(`blog-first-time-ai-assessment` + `blog-who-needs-ai-posture-assessment` → `assessment.html`) 權責錨點已切分。 |
| **第 3 層** | **黃金機會詞與零點擊防禦** | **94%** | ✅ **地雷 2 ＋ 剩餘項 B 已完成**。Top 5 高曝光金礦頁（`pose-cross-legged-numb`、`pose-what-is-chest-opening`、`pose-what-is-hip-opening`、`pose-what-is-restorative`、`blog-what-is-wall-rope`）＋ 4 篇預警與重點文（`blog-rounded-shoulders`、`pose-gentle-backbend-start`、`blog-massage-tight-again`、`blog-who-needs-ai-posture-assessment`）全面補齊 GSC 扇出問句 H2、首段 100 字 RAG 原子答案塊與原生 HTML `<table>`。 |
| **第 4 層** | **實體權威（Entity Graph）與信號** | **96%** | ✅ **地雷 3 ＋ 剩餘項 C 已完成**。全站 106 篇 `BlogPosting.author` 升級為 `Person` `@id: about.html#amei`（黃淑美／阿美老師），`about.html` 補齊 `#amei` 完整資歷節點；`sameAs` 四大核心頁統一對齊 **FB + IG (`lanyingmin0209`) + Google 商家**；首頁 3 支與 `videos.html` 9 支 `VideoObject` 全數補齊 `hasPart (Clip)` 關鍵秒數錨點。 |
| **第 5 層** | **防流失轉換漏斗與行為觀測** | **95%** | ✅ **地雷 1 ＋ 剩餘項 A 已完成並通過 Playwright 320/375/390px 零跑版實測**。全站 122 篇知識文章自動掛載 3 條痛點分流＋10 秒自測斷點＋2 題快速勾選預填 LINE `#文章代碼`；主力落地頁 `assessment.html` 完成 Argon 黃金 4 拍（起・承・轉・合）大改版並修復全站夜間深色模式 `.sec-head h2` 黑字隱形 Bug；`site.js` 已預留 `CLARITY_PROJECT_ID` 接口待填入。 |
| **第 6 層** | **閉環追蹤與飛輪迭代** | **85%** | ✅ `site.js` 與 `assessment.html` 已串聯 `article_pain_chip_select`、`assessment_pain_chip_select`、`line_reservation_click` 與 `#PostSlug` 來源代碼閉環；進入 14～28 天 GSC CTR 與 GA4 轉換率觀察期。 |

---

## 🔍 第一步：全站 6 層真實數據體檢報告（只查不改）

### 1. 第 1 層（技術與 GEO 地基）實測證據

#### ① `geo audit --url https://sinyanyoga.com.tw --no-plugins` 實測結果
- **總分**：**91 / 100（Band: `excellent`）**
- **各維度得分明細**：
  - `google_ai`：**20 / 20**（✅ 已完成：HTTP 200、無 snippet 限制、Canonical 正確、日期一致、Author 宣告、37 條可爬連結、Viewport 正常、Sitemap 宣告正常）
  - `robots_txt`：**14 / 14**（✅ 已完成：`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended` 等 27 個 AI 爬蟲全數開放，無 CDN 阻擋）
  - `llms_txt`：**6 / 6**（✅ 已完成：`/llms.txt` 883 字、含 H1、Blockquote 摘要、4 大區塊、12 條核心連結；另有 `/llms-full.txt`）
  - `content`：**14 / 14**（✅ 已完成：首頁圖片 Alt 覆蓋率 **100% [6/6]**、含數據與外部權威引用）
  - `meta_tags`：**11 / 11**（✅ 已完成：Title、Description、Canonical、OG 與 Twitter 標籤齊全）
  - `signals`：**6 / 6**（✅ 已完成：`lang="zh-Hant"`、`/rss.xml`、新鮮度時間戳 `2026-11-13`）
  - `schema_jsonld`：**12 / 14**（⚠️ 待補強：首頁含 `HealthClub`, `Person`, `WebSite`, `WebPage`, `Service`, `VideoObject`×3, `FAQPage`，但缺少互動檢測工具之 `WebApplication` Schema 與影片 `Clip` 秒數錨點）
  - `brand_entity`：**8 / 12**（⚠️ 待補強：缺少權威外部圖譜連結與跨頁品牌名統一）
  - `ai_discovery`：**1 / 3**（⚠️ 待補強：已有 `/ai/summary.json` 與 `/ai/faq.json`，但缺少 `/.well-known/ai.txt` 與 `/ai/service.json`）
  - `negative_penalty`：**-1**（偵測到彈窗訊號 `exit-modal`）
  - `rag_chunk`（資訊檢索切塊準備度）：**35 / 100**（⚠️ 首頁區塊平均字數偏短、缺少首段標準定義型 Answer Capsule）

#### ② 品牌名一致性清查（Brand Coherence）
- 實測全站 138 個 HTML 檔案的 `<title>`、內文與 JSON-LD，發現**三種品牌名稱混用**：
  1. `鑫彥瑜珈運動館`（用於首頁 `<title>`、`HealthClub` Schema、`reviews.html`）
  2. `鑫彥瑜珈`（用於 `blog-*.html` 的 `<title>` 尾綴、`og:site_name`、導覽列）
  3. `鑫彥瑜伽館`（用於 `pose-*.html` 的 `<title>` 尾綴，以及 **122 篇文章 `BlogPosting.author.name`**）
- **診斷**：應統一主實體名稱為「**鑫彥瑜珈運動館（鑫彥瑜珈）**」，並消滅 `鑫彥瑜伽館` 這個不一致的第三變體。

#### ③ 首頁與核心文章線上 `<title>` 實測（檢查「品牌名置前」問題）
實測抓取線上正式環境（`Last-Modified: Fri, 13 Nov 2026 06:54:12 GMT`）與全站 138 頁原始碼：

| 頁面網址 | 線上實際 `<title>` | 品牌名位置 | 狀態判定 |
| :--- | :--- | :---: | :--- |
| **`https://sinyanyoga.com.tw/`（首頁）** | **`鑫彥瑜珈運動館 \| 高雄左營瑜珈課・壁繩瑜珈與 AI 體態檢測`** | ❌ **最前面（前 7 字被品牌名佔據）** | 🔴 **唯一違規頁！** 在手機 SERP 前 28 字黃金視覺區被品牌名吃掉地域與服務核心詞，且首頁在「高雄瑜珈 (pos 8.3)」、「瑜珈教室 (pos 7.2)」點擊率為 **0%**。 |
| `https://sinyanyoga.com.tw/assessment.html` | `AI 體態檢測｜高雄左營・原價 NT$699・首次 NT$299｜鑫彥瑜珈` | ✅ 最後面 | ✅ 已完成／進入觀察期 |
| `https://sinyanyoga.com.tw/blog-arm-flab-rounded-shoulders.html` | `手臂放下來就鬆垮？蝴蝶袖可能跟姿勢有關，不只是脂肪｜鑫彥瑜珈` | ✅ 最後面 | ✅ 已完成／進入觀察期 |
| `https://sinyanyoga.com.tw/blog-knee-hip-connection.html` | `膝蓋卡卡不一定在膝蓋？先看懂髖關節活動度與下肢代償的關係｜鑫彥瑜珈` | ✅ 最後面 | ✅ 已完成／進入觀察期 |
| `https://sinyanyoga.com.tw/blog-massage-tight-again.html` | `為什麼你按摩完，隔天又緊回去了？｜鑫彥瑜珈` | ✅ 最後面 | ✅ 已完成／進入觀察期 |
| `https://sinyanyoga.com.tw/blog-choosing-first-class-format.html` | `團課、一對一、零基礎入門班，第一次來該選哪一種？｜鑫彥瑜珈` | ✅ 最後面 | ✅ 已完成／進入觀察期 |
| `https://sinyanyoga.com.tw/blog-anterior-pelvic-tilt.html` | `骨盆前傾就等於小腹凸？先看懂骨盆位置與核心用力的真實關係｜鑫彥瑜珈` | ✅ 最後面 | ✅ 已完成／進入觀察期 |

> **小結**：全站 138 個 HTML 檔案中，137 頁皆已將品牌名置於最後；**唯獨首頁 `index.html` 把「鑫彥瑜珈運動館 | 」放在最前面**！

#### ④ GSC 舊 `/amp/`、參數頁與重複網址清查
- **GSC 實測（近 180 天所有曝光網址共 118 條）**：
  - 舊 `/amp/` 網址：**0 條**（✅ 完全乾淨）
  - `?` 參數頁或 `#` 錨點污染網址：**0 條**（✅ 完全乾淨）
  - `http://` 或 `www.` 重複網域：**0 條**（✅ 完全乾淨）
- **⚠️ 但在 GA4 與本機架構中抓出 2 個「隱形重複網址分裂」**：
  1. **首頁網址雙胞胎分裂（`/` vs `/index.html`）**：因為全站導覽列 `<a class="brand" href="index.html">` 與選單連結寫成 `index.html` 而非 `./` 或 `/`，導致 GA4 近 90 天流量分裂為 `/`（384 PV）與 `/index.html`（140 PV）兩條路徑。
  2. **多版本實驗落地頁並存**：根目錄存在 `assessment-v2.html`, `assessment-v3.html`, `assessment-v4.html`, `ai-assessment.html`（83 PV）、`neck-release-v1.html`, `neck-release-v3.html`, `shoulder-checkup-v1.html`（8 PV）。雖這 10 頁已正確設為 `<meta name="robots" content="noindex">` 且排除於 `sitemap.xml` 外（✅ 防呆已做好），但廣告或站內殘留流量進到 `/ai-assessment.html`（83 PV）時平均停留僅 9 秒且 0 轉換。

---

### 2. 第 2 層（全站架構與內耗清查）實測證據

#### ① 全站關鍵字內耗（Keyword Cannibalization）
從近 90 天 GSC `query + page` 交叉報表（共 447 筆組合）中，抓出 **54 個查詢詞有 2 頁以上同時競爭**。最嚴重的 **3 大非品牌內耗重災區** 如下：

1. **【重災區 A：「壁繩瑜珈／壁繩／壁繩瑜伽／牆繩瑜伽／壁繩瑜珈好處」詞簇（合計 969 次曝光）】**
   - **互搶頁面（多達 6 頁同時搶同一批詞）**：
     - `blog-what-is-wall-rope.html`（「壁繩瑜珈」358 曝 / 22 點，pos 3.7；「壁繩」78 曝 / 3 點，pos 7.5；「壁繩瑜伽」65 曝 / 5 點，pos 5.2）
     - `about-wall-rope.html`（「壁繩」111 曝 / 8 點，pos 3.4；「壁繩瑜伽」48 曝 / **0 點**，pos 5.4；「壁繩瑜珈」28 曝 / 1 點，pos 4.2；「壁繩瑜珈好處」12 曝 / **0 點**，pos 8.2）
     - `blog-wall-rope-vs-yoga.html`（「壁繩瑜珈」57 曝 / 2 點，pos 4.6；「壁繩瑜伽」14 曝 / **0 點**，pos 6.4）
     - `blog-stiff-body-wall-rope.html`（「壁繩」28 曝 / 3 點，pos 5.4；「壁繩瑜珈好處」18 曝 / **0 點**，pos 6.9）
     - `know-yoga.html`（「壁繩瑜珈」20 曝 / **0 點**，pos 2.4；「牆繩瑜伽」7 曝 / **0 點**，pos 1.0）
   - **內耗診斷**：主支柱頁 `about-wall-rope.html` 與新手流程文 `blog-what-is-wall-rope.html` 定位重疊，導致搜尋「壁繩」時出 `about-wall-rope.html`，搜尋「壁繩瑜珈」時卻出 `blog-what-is-wall-rope.html`，搜尋「壁繩瑜珈好處」時兩篇都在第 7～8 名互扯後腿（0 點擊）。

2. **【重災區 B：「AI體態／AI體態是什麼／AI體態檢測」詞簇（合計 65 次曝光，卻是 0 點擊！）】**
   - **互搶頁面（5 頁互搶，結果主力成交頁 `assessment.html` 反而排在最後！）**：
     - `blog-first-time-ai-assessment.html`（「ai體態」28 曝 / 0 點，pos 8.2；「ai體態是什麼」11 曝 / 0 點，pos 6.2；「ai體態檢測」6 曝 / 0 點，pos 4.5）
     - `blog-who-needs-ai-posture-assessment.html`（「ai體態」10 曝 / 0 點，pos 8.5；「ai體態檢測」2 曝 / 0 點，pos 1.0）
     - `blog-no-pain-ai-posture-assessment.html`（「ai體態是什麼」3 曝 / 0 點，pos 6.0）
     - `blog-ai-assessment-not-just-numbers.html`（「ai體態是什麼」2 曝 / 0 點，pos 6.0）
     - **`assessment.html`（核心預約頁）**：在「ai體態是什麼」僅 **1 曝 / 0 點（pos 10.0）**，在「ai體態」與「ai體態檢測」甚至被自己的部落格文章擠出榜外！

3. **【重災區 C：「高雄瑜珈／北高雄瑜珈推薦／附近瑜珈教室／高雄瑜珈推薦」在地商業詞簇（合計 132 次曝光，僅 3 點擊）】**
   - **互搶頁面**：`/`（首頁）、`/assessment.html`、`/contact.html`、甚至連場地租借頁 `/rental.html`（在「附近瑜珈教室」搶走 11 次曝光、pos 9.1、0 點擊！）都在互搶本地搜尋意圖。

#### ② 衰退文清查（Content Decay：近 90 天 vs 前 90 天）
- **實測結論**：✅ **全站無實質內容流量衰退（點擊零流失）**！
  - 對比前 90 天（`2026-05-23`～`08-20`，67 頁有曝光）與近 90 天（`2026-08-21`～`11-18`，118 頁有曝光），全站正處於高速爬升期（例如首頁曝光從 810 升至 2,798；`blog-what-is-wall-rope.html` 從 74 升至 865；`pose-cross-legged-numb.html` 從 35 升至 990）。
  - 僅有 **4 篇舊文「曝光微增、但平均排名下滑且維持 0 點擊」**（潛在排名滑落預警）：
    1. `blog-rounded-shoulders.html`：曝光 7 → 101，但排名從 **7.0 掉到 12.3**
    2. `blog-who-needs-ai-posture-assessment.html`：曝光 6 → 47，但排名從 **5.0 掉到 11.0**
    3. `pose-gentle-backbend-start.html`：曝光 1 → 59，但排名從 **2.0 掉到 7.3**（0 點擊）
    4. `blog-hunchback-height.html`：曝光 13 → 24，排名從 **5.5 掉到 6.8**（0 點擊）

#### ③ 秒跳重災區（GA4 `hostName == sinyanyoga.com.tw`，平均每人互動時間 < 15 秒）
| 頁面路徑 | 瀏覽量 (PV) | 活躍用戶 | 平均每人互動秒數 | 跳出率 (Bounce Rate) | 秒跳診斷 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **`/assessment.html`（舊 $199 + 現 $299 合計）** | **1,012** | **775** | **10.8s ～ 13.0s** | **64.3% ～ 66.0%** | 🔴 **全站最大流量落地頁**（承接廣告與站內導流），雖有 92 次 LINE 預約點擊，但 **65% 用戶在 11 秒內跳出**，且僅觸發 1 次 `page_engaged_10s` 與 0 次 `scroll_depth_milestone`！ |
| **`/ai-assessment.html`（舊版實驗頁）** | **83** | **65** | **9.0s** | **64.1%** | 🔴 **83 PV 卻是 0 次 LINE 點擊**！仍在消耗流量卻無轉換。 |
| `/pose-gentle-backbend-start.html` | 13 | 13 | **6.2s** | 69.2% | 🟠 缺少首屏吸睛痛點切入與結構化比較表，用戶進站 6 秒即跳出。 |
| `/blog-who-needs-ai-posture-assessment.html` | 9 | 7 | **7.9s** | 22.2% | 🟠 決策分流文，讀完 8 秒未點擊 CTA。 |
| `/shoulder-checkup-v1.html`（實驗頁） | 8 | 8 | **1.5s** | 62.5% | 🟠 實驗落地頁秒跳（0 轉換）。 |
| `/blog-choosing-first-class-format.html` | 7 | 2 | **5.5s** | 85.7% | 🟠 選課比較文，跳出率 85.7%。 |
| `/blog-massage-tight-again.html` | 5 | 5 | **0.0s** | 40.0% | 🟠 按摩反覆緊繃文，未改版為深度解剖量化結構（與 `blog-arm-flab` 相比內容明顯單薄，僅 131 行）。 |

#### ④ 瑜珈站目前「樹狀架構圖（樹根預約頁 → 主樹幹主題集群 → 樹枝）」

```mermaid
flowchart TD
    subgraph ROOT["🌳 樹根：核心成交與預約終點（Conversion Roots）"]
        R1["/assessment.html<br/>首次 NT$299 AI 體態檢測<br/>(1,012 PV / 92 LINE 預約)"]
        R2["/neck-release.html<br/>NT$1,500 一對一體態結構調整<br/>(64 PV / 0 LINE 預約 ⚠️)"]
        R3["/classes.html<br/>NT$399 零基礎入門班 & 壁繩小班團課<br/>(108 PV / 14 LINE 點擊)"]
        R4["/contact.html & LINE @561wigip<br/>左營巨蛋教室實體到店"]
    end

    subgraph TRUNK["🪵 主樹幹：流量樞紐與互動護城河（Hubs & Interactive Moat）"]
        H0["/ (index.html)<br/>首頁總樞紐 + 10秒微檢測<br/>(524 PV / 58 LINE 點擊)"]
        H1["/know-yoga.html<br/>認識瑜伽總覽頁 (83 PV)"]
        H2["/about-wall-rope.html<br/>壁繩瑜伽支柱頁 (45 PV)"]
        H3["/about-poses.html<br/>27 篇瑜伽動作支柱頁 (16 PV)"]
        H4["/blog.html<br/>體態知識庫總覽 95 篇 (121 PV)"]
        H5["/posture-self-test.html & /body-tension-map.html<br/>互動體態訊號掃描 / 緊繃地圖 (32 PV)"]
        H6["/videos.html & /reviews.html & /about.html<br/>Reels 影音庫 / 91則見證 / 阿美老師 (110 PV)"]
    end

    subgraph BRANCH["🌿 樹枝：122 篇 SEO × GEO 搜尋捕獲集群（Topic Clusters）"]
        B1["【集群 1：壁繩瑜伽入門與比較】（8 篇）<br/>blog-what-is-wall-rope (865曝/43點)<br/>blog-wall-rope-vs-yoga (160曝/11點)<br/>blog-stiff-body-wall-rope (170曝/8點)"]
        B2["【集群 2：開髖、盤腿麻與骨盆下肢】（22 篇）<br/>pose-cross-legged-numb (990曝/28點)<br/>pose-what-is-hip-opening (411曝/14點)<br/>blog-emotions-stored-in-hips (231曝/25點)<br/>blog-anterior-pelvic-tilt (80曝/1點)"]
        B3["【集群 3：開胸、圓肩駝背與肩頸代償】（28 篇）<br/>pose-what-is-chest-opening (932曝/27點)<br/>blog-rounded-shoulder-self-test (132曝/0點)<br/>blog-stiff-neck-crick (121曝/4點)<br/>blog-massage-tight-again (13曝/0點)"]
        B4["【集群 4：呼吸、修復瑜伽與身心減壓】（18 篇）<br/>pose-inhale-or-exhale (497曝/13點)<br/>pose-what-is-restorative (271曝/3點)<br/>blog-bedtime-back-release (147曝/5點)"]
        B5["【集群 5：AI 體態檢測決策與新手選課】（16 篇）<br/>blog-first-time-ai-assessment (127曝/6點)<br/>blog-who-needs-ai-posture-assessment (47曝/2點)<br/>blog-choosing-first-class-format (20曝/2點)"]
        B6["【集群 6：重訓比較、日常坐姿與熟齡防跌】（30 篇）<br/>blog-yoga-vs-strength-training (411曝/16點)<br/>blog-lifting-carrying-daily (115曝/1點)<br/>blog-squat-functional-mobility (130曝/0點)"]
    end

    B1 & B2 & B3 & B4 & B5 & B6 -->|"⚠️ 斷點：122 篇僅 1 次 LINE 點擊！<br/>缺 3 秒痛點勾選預填 + 缺 #PostSlug"| TRUNK
    TRUNK --> ROOT
```

---

### 3. 第 3 層（黃金機會詞與 AI 零點擊防禦）實測證據

從近 90 天 GSC 撈出**「高曝光、排名 4–15、極低點擊（CTR < 3%）」**或**「排名前 3 卻被 AI 摘要吃掉點擊」**的 6 大黃金機會詞簇：

| 優先序 | 目標頁面 | 核心扇出機會詞（GSC 90天實測數據） | 目前表現 | 問題診斷與升級方向 |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `pose-cross-legged-numb.html`<br/>（全站曝光第 2 名：990 曝） | • `盤腿坐腳麻`（67 曝 / **0 點**，pos 5.9）<br/>• `為什麼盤腿坐會腳麻`（26 曝 / **0 點**，pos 5.3）<br/>• `盤腿腳麻`（17 曝 / **0 點**，pos 9.5）<br/>• `盤腿容易腳麻`（10 曝 / **0 點**，pos 10.0） | 合計 120+ 精準長尾曝光卻 **0 點擊**（整體 CTR 僅 2.8%） | 內文 H2 為感性標題，未直接命中「為什麼盤腿坐會腳麻？」問句，且首段缺 100 字量化原子答案塊（髖外旋角度 < 45°、坐骨墊高 5–10cm、腓總神經壓迫機轉）與 10 秒左右髖高低自測。 |
| **2** | `pose-what-is-chest-opening.html`<br/>（全站曝光第 3 名：932 曝） | • `開胸`（282 曝 / 6 點，**CTR 2.13%**，pos 7.3）<br/>• `如何自己開胸`（39 曝 / 1 點，**CTR 2.56%**，pos 7.5）<br/>• `開胸瑜珈`（14 曝 / 1 點，pos 8.7） | 932 曝光僅 27 點擊（**CTR 2.90%**），且全頁無 `<table>` 比較表！ | 缺少「如何自己安全開胸？」H2 問句與原生 HTML `<table>`（硬夾肩胛骨代償 vs 胸小肌鬆解＋胸椎伸展對照表），且 GA4 35 PV 中 **LINE 預約點擊為 0**。 |
| **3** | `pose-what-is-restorative.html`<br/>（271 曝 / 僅 3 點） | • `修復瑜伽`（80 曝 / **0 點**，pos 8.0）<br/>• `修復瑜珈`（32 曝 / **0 點**，pos 12.9）<br/>• `修復瑜伽是什麼`（21 曝 / **0 點**，pos 9.9） | 271 曝光僅 3 點擊（**CTR 1.11%**），核心詞全數 0 點擊！ | `<title>` 尾綴還是舊的 `｜鑫彥瑜伽館`，且內文缺少具體量化數據（如：停留 5–15 分鐘、迷走神經與心率變異度 HRV 調節、與陰瑜伽／壁繩支撐的量化比較）。 |
| **4** | `pose-what-is-hip-opening.html`<br/>（411 曝 / 14 點） | • `為何要開髖`（36 曝 / 2 點，pos 6.4）<br/>• `為什麼要開髖`（36 曝 / 1 點，**CTR 2.78%**，pos 8.4）<br/>• `開髖`（15 曝 / **0 點**，pos 16.3） | 411 曝光，CTR 3.41%，且全頁**無 `<table>` 比較表**、GA4 36 PV **0 轉換** | 需將 H2 直接對齊「為什麼要開髖？」並補上 HTML `<table>`（髂腰肌縮短 vs 臀肌失憶 vs 內收肌緊繃三型對照表）與 10 秒單側髖外旋自測。 |
| **5** | `blog-what-is-wall-rope.html` ＋ `about-wall-rope.html` | • `壁繩瑜珈`（418 曝 / 25 點，**pos 3.7**，CTR 5.98%）<br/>• `壁繩`（204 曝 / 13 點，pos 5.1）<br/>• `壁繩瑜伽`（96 曝 / 5 點，pos 4.4）<br/>• `牆繩瑜伽`（54 曝 / 2 點，**pos 3.0，CTR 3.70%**）<br/>• `壁繩瑜珈好處`（31 曝 / 1 點，pos 6.9） | 雖是全站流量王（合計 1,299 曝、108 PV），但 **GA4 兩頁合計 LINE 預約點擊 = 0**！ | 兩頁權責未切分（內耗），且 `blog-what-is-wall-rope.html` 連 `data-line-message` 都沒設，讀者看完 56.8 秒直接離開，白白流失全站最大精準流量！ |
| **6** | `/`（首頁）＋ `assessment.html` | • `高雄瑜珈`（27 曝 / **0 點**，pos 8.3）<br/>• `瑜珈教室`（23 曝 / **0 點**，pos 7.2）<br/>• `高雄瑜伽`（19 曝 / **0 點**，pos 13.1）<br/>• `高雄瑜珈推薦`（14 曝 / **0 點**，pos 9.6）<br/>• `ai體態`（38 曝 / **0 點**，pos 8.3） | 高雄在地高商業意圖詞已排進第一頁（7～9 名），卻是 **0 點擊**！ | 首頁 `<title>` 品牌名放最前面擋住「高雄左營瑜珈教室・壁繩瑜珈與 AI 體態檢測」；而 `assessment.html` 被部落格文分食了 `ai體態` 權重。 |

---

### 4. 第 4 層 & 第 5 層（實體權威與轉換工具盤點）實測證據

#### ① Microsoft Clarity 安裝狀態
- **線上與本機 138 頁實測結果**：❌ **全站 0 安裝（0 / 138 頁，`site.js` 亦無 Clarity 追蹤碼）**。
- **影響**：目前 `/assessment.html` 高達 65% 的跳出率與 11 秒停留、以及知識文章讀完不點 CTA 的熱區斷點，完全沒有螢幕錄影（Session Recordings）與點擊熱圖（Heatmaps）可供視覺化屍檢。

#### ② GA4 事件與轉換漏斗現況
- **線上實測**：透過 `site.js` 動態載入 GA4（`G-6X3PD7NMMG`）與 Meta Pixel（`1594348069032790`），全站 135 個正式頁皆正常載入。
- **已部署自訂事件（近 90 天 `sinyanyoga.com.tw` 實測觸發量）**：
  - `line_reservation_click`：**153 次**（97 人）— 但 **94% 集中在 `/assessment.html` (92 次) 與首頁 (33 次)**！
  - `line_contact_click`：**34 次**（15 人）
  - `scroll_depth_milestone`：**198 次**（63 人）
  - `page_engaged_10s`：**88 次**（63 人）
  - `posture_scan_click`：**9 次**（4 人）
- **🔴 致命轉換斷點（數據鐵證）**：
  - **全站 122 篇部落格與動作知識文章（`blog-*.html` + `pose-*.html`）在近 90 天帶來最高搜尋曝光與長時閱讀（如 `blog-what-is-wall-rope.html` 63 PV / 平均互動 56.8 秒、`blog-emotions-stored-in-hips.html` 46 PV / 平均互動 40.3 秒、`pose-cross-legged-numb.html` 42 PV / 平均互動 83.5 秒），但全部 122 篇文章加起來，竟然只產生 1 次 `line_reservation_click`！**
  - **原因屍檢**：
    1. 122 篇文章中有 **120 篇完全沒有設定 `data-line-message`**（點擊 CTA 時沒有預填訊息，桌機直接跳空白 `lin.ee` 加好友頁，也沒有 `#文章代碼`）。
    2. 文末 CTA 全站千篇一律塞同一張死板的「預約首次 NT$299 AI 體態檢測」黑底卡片，**缺乏「物理極限斷點＋10 秒鏡前／坐姿單側自測」**，也**沒有「3 秒痛點勾選 → 自動組裝預填 LINE 訊息」**的互動防流失機關！
    3. 甚至連高單價主力頁 `/neck-release.html`（NT$1,500 一對一調整，64 PV，平均停留 35.9 秒）在近 90 天的 **`line_reservation_click` 也是 0 次**！

#### ③ `Organization` / `Person` Schema 與 `sameAs` 社群連結一致性盤點
- **`sameAs` 覆蓋率與完整度**：
  - 全站 138 頁中，僅 **4 頁**（`index.html`, `about.html`, `contact.html`, `reviews.html`）的 `HealthClub` Schema 包含 `sameAs`。
  - 且 `sameAs` 內容僅有 2 條：`["https://www.facebook.com/sinyanyoga", "https://maps.google.com/?cid=3869696325150721929"]`，缺少官方 LINE（`https://lin.ee/5rWzdNd`）等外部實體連結。
- **`Person`（阿美老師）與 `Article` 實體圖譜斷鏈**：
  - 首頁 `index.html` 已定義了高品質的 `@type: Person`（`@id: "https://sinyanyoga.com.tw/about.html#amei"`, `name: "黃淑美"`, `alternateName: "阿美老師"`, 含 RYT-200 / RYT-95 / 艾揚格 180+ 小時研習資歷）。
  - **但是！** 打開 `about.html` 本身，裡面的 JSON-LD **竟然沒有定義 `#amei` 的 `Person` 節點**！
  - 更嚴重的是，全站 **122 篇 `blog-*.html` 與 `pose-*.html` 的 `BlogPosting` Schema**，其 `author` 全部寫成 `{"@type": "Organization", "name": "鑫彥瑜伽館"}`（不僅名稱不一致，還把個人專家降格為無資歷的機構名），完全沒有串聯到 `{"@type": "Person", "@id": "https://sinyanyoga.com.tw/about.html#amei", "name": "黃淑美（阿美老師）"}`！這在 YMYL 運動體態領域直接損失了 Google E-E-A-T 與 AI 引擎最看重的專家實體權重。

---

## 🎯 最優先的 3 件核心地雷（Top 3 Core Landmines）

1. **【地雷 1｜第 5 層轉換大失血】全站 122 篇知識文章「有流量、高停留、卻近乎 0 預約（僅 1 次點擊）」＋ 全站未裝 Clarity**
   - **證據**：`blog-what-is-wall-rope.html`（865 曝 / 63 PV / 停留 57 秒）、`pose-cross-legged-numb.html`（990 曝 / 42 PV / 停留 84 秒）、`pose-what-is-chest-opening.html`（932 曝 / 35 PV）等高流量知識文，以及 `/neck-release.html`（64 PV），因為缺少「10 秒單側代償自測斷點 ＋ 3 秒痛點勾選自動預填 LINE `oaMessage`（含 `#文章ID`）」，且 120 篇文章連基礎 `data-line-message` 都沒掛，導致讀者看完免費教學拍拍屁股就走，轉換率趨近 0%；同時全站 0/138 頁安裝 Microsoft Clarity，且 `/assessment.html`（1,012 PV）有 65% 用戶在 11 秒內跳出卻無熱圖可看。
2. **【地雷 2｜第 2 & 3 層流量內耗與零點擊流失】Top 5 高曝光流量王（盤腿麻 990 曝、開胸 932 曝、壁繩 865 曝、開髖 411 曝、修復瑜伽 271 曝）陷入「長尾詞 0 點擊」與「多頁互搶內耗」**
   - **證據**：「盤腿坐腳麻（120+ 曝 0 點）」、「修復瑜伽（133 曝 0 點）」、「如何自己開胸（CTR 2.5%）」、「AI體態（65 曝 0 點，5 篇部落格把主力頁 `assessment.html` 擠到第 10 名）」、「壁繩瑜珈（6 頁互搶）」。文章 H2 未對齊 GSC 真實扇出問句，且舊制 `pose-*.html` 缺首段 100 字量化 RAG 原子答案塊與結構化 `<table>`。
3. **【地雷 3｜第 1 & 4 層首頁標題違規與實體圖譜斷鏈】首頁 `<title>` 品牌名置前（吃掉高雄在地詞點擊）＋ 導覽列 `index.html` 分裂首頁權重 ＋ 122 篇文章 `Author` 實體與 `about.html#amei` 斷鏈**
   - **證據**：首頁是全站 138 頁中唯一把 `鑫彥瑜珈運動館 | ` 放在 `<title>` 最前面的頁面，導致「高雄瑜珈 (pos 8.3)」、「瑜珈教室 (pos 7.2)」0 點擊；導覽列指向 `index.html` 造成 GA4 分裂出 140 PV 的 `/index.html`；且 122 篇文章作者寫成不一致的 `鑫彥瑜伽館`，未連回 `about.html#amei` 阿美老師 `Person` 實體。
