# DECISIONS.md — 鑫彥瑜珈網站 決策紀錄

記錄已做過的重要技術與商業決策、原因、與目前狀態。狀態標註:**已定案** / **待確認** / **待你決定**。

---

## 1. GitHub Pages + 自有網域

**決策:** 網站部署在 GitHub Pages,綁定自有網域 `sinyanyoga.com.tw`(見 `CNAME`)。
**原因:** 免費做法,沿用撥筋美國站同一套模式,不增加額外月租成本。
**狀態:** 已定案。

---

## 2. 追蹤集中於 `site.js`

**決策:** GA4、Meta Pixel 載入邏輯、LINE 按鈕點擊追蹤,全部集中寫在單一檔案 `site.js`,全站頁面統一引用同一版本(目前 `v=5`)。
**原因:** 單一事實來源,改一次全站生效,避免逐頁維護追蹤碼造成不一致。
**風險:** 牽一髮動全身 — 修改 `site.js` 前必須先報告影響範圍(見 `CLAUDE.md`)。
**狀態:** 已定案。

---

## 3. 每頁 Lead 價值 / metadata 覆寫策略(`data-lead-*`)

**決策:** 各頁可透過 `<body data-lead-value>` `data-lead-name` `data-lead-category` 覆寫傳給 GA4 / Meta Pixel 的轉換價值與名稱,未設定時 fallback 為預設值(199 / "AI posture assessment")。
**原因:** 讓 Meta Pixel 與 GA4 依落地頁正確回傳轉換價值(例如檢測頁 199、肩頸頁 1200 或 1500),同時不影響既有未設定此屬性的頁面行為。
**狀態:** 已定案,已在 `assessment-v3.html`、`neck-release.html`、`neck-release-v3.html` 使用;`assessment.html`、`assessment-v2.html` 未設定(用預設值)。

---

## 4. LINE oaMessage + 版本化預填訊息

**決策:** 頁面可透過 `<body data-line-message>` 讓點擊 LINE 按鈕時改用 `line.me/R/oaMessage/` 深連結,自動預填指定文字到 LINE 聊天室,取代單純開啟一般 LINE 連結。
**原因:** 讓 LINE 端收到的詢問可以分辨是哪個頁面 / 哪個方案 / 哪個商業測試版本帶來的,便於分流與歸因。
**額外機制:** 頁面可用 `data-line-event="Contact"` 把 LINE 點擊降級成「詢問」事件(而非「Lead」),用於側門引流場景,避免稀釋真正轉換(如站內表單送出)的廣告優化訊號。目前僅 `neck-release.html` 使用此覆寫。
**狀態:** 已定案並已實作。

---

## 5. Landing Page A/B 測試策略

**決策:** 測試版落地頁(`-v1`、`-v2`、`-v3` 等檔名)一律標示 `<meta name="robots" content="noindex, nofollow">`,並將 `canonical` 指回對應的正式頁,避免測試版被搜尋引擎索引、稀釋正式頁權重。
**例外(待確認):** `neck-release-v3.html` 的 canonical 目前指向自己而非 `neck-release.html`,與此策略不一致。**待你決定**是否為刻意設計(例如曾經打算讓它獨立索引),或需修正指回正式頁。
**狀態:** 原則已定案,`neck-release-v3.html` 一項待你決定。

---

## 6. 檔名版本與商業版本分離

**決策:** 檔名中的版號(`-v1` `-v2` `-v3`)僅代表技術 / 檔案建立順序,**不代表商業 A/B 測試版本**。商業測試版本由 `data-line-message` 內文字中刻意標註的字樣(如「V1」「V3」)決定,兩者可以不一致。
**範例:** `neck-release-v3.html` 檔名是 v3,但其 `data-line-message` 標記為「V1」— 這是刻意區分,用來標示這是「肩頸調整」商業測試線的第 1 個商業版本,與檔案本身是第幾次技術迭代無關。
**原因:** 避免未來對話或分析誤用檔名推論商業測試結果,造成誤判。
**狀態:** 已定案,已寫入 `PROJECT.md`、`CLAUDE.md` 作為强制規則。

---

## 7. neck-release 正式頁整併策略

**決策:** 原本 `neck-release-v1.html`、`neck-release-v3.html`(以及可能存在的第三版,commit 訊息稱「三個實驗版」但目前僅找到兩個檔案,**待確認**)整併為單一正式頁 `neck-release.html`,並接上 n8n 表單收單。
**狀態:** 正式頁已上線(commit `eb188e2`)。舊版檔案是否已無流量、是否可安全下線,**待你決定**,詳見 `PROJECT.md` 第 5 節 Deprecated / Archived。
**待確認:** commit `eb188e2` 提及「三個實驗版」,但 repo 中僅發現 `neck-release-v1.html`、`neck-release-v3.html` 兩個檔案,第三個版本是否曾存在後被刪除,需你確認。

---

## 8. n8n 表單收單與 LINE 側門 / 表單正門事件分離

**決策:** `neck-release.html` 的站內表單正式接上 n8n webhook(`https://melvinlin07-n8n.zeabur.app/webhook/neck-release-lead`),送出後寫入 Google 試算表並發送 LINE 通知,作為「表單正門」的正式轉換路徑。該頁的 LINE 按鈕(側門)改送 Meta Pixel 的 `Contact` 事件而非 `Lead`,與表單送出的 `Lead` 事件分開。
**原因:** 避免側門(LINE 詢問)與正門(表單送出)兩種不同強度的動作都算作 `Lead`,稀釋廣告優化的轉換訊號品質。
**狀態:** 已定案並已實作(commit `155a93b`)。**待確認:** 正式環境是否已實測 webhook 成功寫入試算表並發送 LINE 通知。
