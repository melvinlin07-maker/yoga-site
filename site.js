/* Shared site scripts.
   Update LINE_URL to change all LINE reservation buttons. */
var LINE_URL = "https://lin.ee/5rWzdNd";
var LINE_OA_ID = "@561wigip";
var GA_MEASUREMENT_ID = "G-6X3PD7NMMG";
var META_PIXEL_ID = "1594348069032790";
var CLARITY_PROJECT_ID = ""; // 填入 Microsoft Clarity 10 碼 Project ID 即可全站啟用熱圖與錄影

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

(function loadMicrosoftClarity() {
  if (!CLARITY_PROJECT_ID) return;
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
})();

(function loadGoogleAnalytics() {
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
})();

(function loadMetaPixel() {
  if (window.fbq) return;

  var fbq = window.fbq = function () {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
})();


// Web Share API + 剪貼簿 fallback & Toast 提示
function showToast(message, duration) {
  duration = duration || 2600;
  var toast = document.getElementById("siteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "share-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add("is-show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function () {
    toast.classList.remove("is-show");
  }, duration);
}
window.showToast = showToast;

function copyToClipboard(text, customSuccessMsg) {
  var successMsg = customSuccessMsg || "✓ 已複製連結至剪貼簿，可直接傳給朋友！";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      showToast(successMsg);
    }).catch(function () {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}
window.copyToClipboard = copyToClipboard;

function fallbackCopy(text, successMsg) {
  var input = document.createElement("input");
  input.value = text;
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
    showToast(successMsg);
  } catch (err) {
    showToast("請手動複製連結：" + text);
  }
  document.body.removeChild(input);
}

function initShareButtons() {
  document.querySelectorAll("[data-share]").forEach(function (btn) {
    if (btn.__shareBound) return;
    btn.__shareBound = true;
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      var title = btn.getAttribute("data-share-title") || document.title;
      var text = btn.getAttribute("data-share-text") || "";
      var url = btn.getAttribute("data-share-url") || window.location.href;

      var isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      if (isMobileDevice && navigator.share) {
        navigator.share({
          title: title,
          text: text,
          url: url
        }).catch(function (err) {
          if (err && err.name !== "AbortError") {
            copyToClipboard(url);
          }
        });
      } else {
        copyToClipboard(url);
      }
    });
  });
}
window.initShareButtons = initShareButtons;


/* ============================================================
   CRO PART 3: 閱讀進度條、暗黑護眼模式、離開挽留、即時搜尋
   ============================================================ */

// 8. 長文頂端金色閱讀進度條
function initReadingProgressBar() {
  var isArticle = document.querySelector("article") ||
                  document.querySelector(".article-body") ||
                  document.querySelector(".guide-content") ||
                  window.location.pathname.indexOf("blog-") !== -1 ||
                  window.location.pathname.indexOf("beginner-yoga-guide") !== -1;
  if (!isArticle) return;

  var bar = document.getElementById("readingProgressBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "readingProgressBar";
    bar.className = "reading-progress-bar";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
  }

  var ticking = false;
  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0) {
      var pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      bar.style.width = pct + "%";
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

// 9. 睡前護眼自動夜間暗黑模式
function initTheme() {
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    document.querySelectorAll(".theme-toggle-btn").forEach(function (btn) {
      if (theme === "dark") {
        btn.textContent = "☀️";
        btn.setAttribute("aria-label", "切換日間模式");
        btn.setAttribute("title", "切換日間模式");
      } else {
        btn.textContent = "🌙";
        btn.setAttribute("aria-label", "切換夜間護眼模式");
        btn.setAttribute("title", "切換夜間護眼模式");
      }
    });
  }

  var saved = localStorage.getItem("sinyan_theme");
  var currentTheme = "light";
  if (saved) {
    currentTheme = saved;
  } else {
    var h = new Date().getHours();
    var isNight = h >= 21 || h < 6;
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isNight || prefersDark) currentTheme = "dark";
  }
  applyTheme(currentTheme);

  document.querySelectorAll(".theme-toggle-btn").forEach(function (btn) {
    if (btn.__themeBound) return;
    btn.__themeBound = true;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var now = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = now === "dark" ? "light" : "dark";
      localStorage.setItem("sinyan_theme", next);
      applyTheme(next);
      if (window.showToast) {
        window.showToast(next === "dark" ? "🌙 已切換至溫潤護眼模式" : "☀️ 已切換至明亮日間模式", 2000);
      }
    });
  });
}

// 7. 離開意圖溫柔挽留彈窗（僅在知識閱讀頁／首頁的桌面端離開視窗時觸發，不干擾高意圖成交頁與手機回滑操作）
function initExitIntentModal() {
  var path = window.location.pathname || "";
  if (/beginner-yoga-guide|assessment|neck-release|shoulder-checkup|yoga-beginner|posture-self-test|contact/i.test(path)) return;
  if (!window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches) return;
  try {
    if (sessionStorage.getItem("sinyan_exit_modal_shown")) return;
  } catch (error) {
    return;
  }

  function createModal() {
    if (document.getElementById("exitIntentModal")) return document.getElementById("exitIntentModal");
    var div = document.createElement("div");
    div.id = "exitIntentModal";
    div.className = "exit-modal";
    div.setAttribute("aria-hidden", "true");
    div.setAttribute("role", "dialog");
    div.setAttribute("aria-modal", "true");
    div.innerHTML = [
      '<div class="exit-modal__backdrop"></div>',
      '<div class="exit-modal__dialog">',
      '  <button type="button" class="exit-modal__close" id="exitModalClose" aria-label="關閉視窗">✕</button>',
      '  <div class="exit-modal__badge">🌸 離開前專屬建議</div>',
      '  <h3 class="exit-modal__title" id="exitModalTitle">先別盲目拉筋！帶走圖解手冊，或預約 20 分鐘 AI 體態檢測</h3>',
      '  <p class="exit-modal__desc">不確定自己肩頸、腰背緊繃從哪來？可免費看居家 3 步驟圖解，或預約左營現場首次 NT$299 AI 姿勢分析由老師當面解讀。</p>',
      '  <div class="exit-modal__actions">',
      '    <a href="assessment.html" class="btn exit-modal__btn-primary">🎯 了解首次 NT$299 AI 體態檢測</a>',
      '    <a href="beginner-yoga-guide.html" class="btn exit-modal__btn-secondary">📖 免費看 3 步驟居家圖解</a>',
      '  </div>',
      '  <button type="button" class="exit-modal__dismiss" id="exitModalDismiss">謝謝，我先逛逛（不再提示）</button>',
      '</div>'
    ].join("");
    document.body.appendChild(div);

    function closeModal() {
      div.classList.remove("is-active");
      div.setAttribute("aria-hidden", "true");
    }

    div.querySelector("#exitModalClose").addEventListener("click", closeModal);
    div.querySelector(".exit-modal__backdrop").addEventListener("click", closeModal);
    div.querySelector("#exitModalDismiss").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && div.classList.contains("is-active")) {
        closeModal();
      }
    });

    return div;
  }

  function showModal() {
    try {
      if (sessionStorage.getItem("sinyan_exit_modal_shown")) return;
      sessionStorage.setItem("sinyan_exit_modal_shown", "true");
    } catch (error) {
      return;
    }
    var m = createModal();
    m.classList.add("is-active");
    m.setAttribute("aria-hidden", "false");
  }

  var visibleSince = performance.now();
  var sawContentPointer = false;
  var lastPointerY = null;
  var page = document.documentElement;

  document.addEventListener("visibilitychange", function () {
    visibleSince = performance.now();
    sawContentPointer = false;
    lastPointerY = null;
  });

  page.addEventListener("pointermove", function (e) {
    if (!e.isTrusted || e.pointerType !== "mouse" || e.buttons) return;
    if (e.clientY >= 48) sawContentPointer = true;
    lastPointerY = e.clientY;
  }, { passive: true });

  // 等滿 30 秒只解除限制，彈窗仍須由滑鼠實際穿過視窗頂緣觸發。
  page.addEventListener("pointerleave", function (e) {
    if (!e.isTrusted || e.pointerType !== "mouse") return;
    var leftUpward = sawContentPointer && lastPointerY !== null && e.clientY < lastPointerY &&
      e.clientY <= 0 && e.clientX >= 0 && e.clientX < page.clientWidth;
    sawContentPointer = false;
    lastPointerY = null;
    if (!leftUpward || e.relatedTarget || e.buttons || document.visibilityState !== "visible" ||
        performance.now() - visibleSince < 30000) return;
    showModal();
  }, { passive: true });
}

// 11. 捲動深度與 10 秒實質停留追蹤（診斷 4 秒跳出與頁面承接瓶頸）
function initScrollAndEngagementTelemetry() {
  var firedDepths = {};
  var depths = [25, 50, 75];
  var ticking = false;

  function checkScroll() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      ticking = false;
      return;
    }
    var pct = (window.scrollY / docHeight) * 100;
    depths.forEach(function (d) {
      if (!firedDepths[d] && pct >= d) {
        firedDepths[d] = true;
        try {
          gtag("event", "scroll_depth_milestone", {
            percent_scrolled: d,
            page_path: window.location.pathname,
            transport_type: "beacon"
          });
        } catch (err) {}
      }
    });
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(checkScroll);
      ticking = true;
    }
  }, { passive: true });

  window.setTimeout(function () {
    if (document.visibilityState === "visible") {
      try {
        gtag("event", "page_engaged_10s", {
          page_path: window.location.pathname,
          transport_type: "beacon"
        });
      } catch (err) {}
    }
  }, 10000);
}

// 10. 毫秒級即時關鍵字模糊搜尋與標籤過濾
function initInstantSearch() {
  var searchInput = document.getElementById("blogSearchInput");
  var searchClear = document.getElementById("blogSearchClear");
  var searchCount = document.getElementById("blogSearchCount");
  var matchNum = document.getElementById("matchCount");
  var tilesContainer = document.getElementById("posts");
  var emptyMsg = document.getElementById("empty");
  var filterBtns = document.querySelectorAll(".filter-btn");

  if (!searchInput || !tilesContainer) return;

  var tiles = Array.from(tilesContainer.querySelectorAll(".tile[data-cat], .tile--featured"));
  var cached = tiles.map(function (el) {
    var h = el.querySelector("h3, b, .tbody b") ? el.querySelector("h3, b, .tbody b").textContent : "";
    var p = el.querySelector("p, .tbody span") ? el.querySelector("p, .tbody span").textContent : "";
    var cat = el.getAttribute("data-cat") || "all";
    return {
      el: el,
      cat: cat,
      searchIndex: (h + " " + p + " " + cat).toLowerCase()
    };
  });

  function filterPosts() {
    var q = searchInput.value.trim().toLowerCase();
    var activeBtn = document.querySelector(".filter-btn.is-active");
    var activeCat = activeBtn ? activeBtn.getAttribute("data-filter") : "all";

    if (searchClear) {
      searchClear.style.display = q ? "flex" : "none";
    }

    var shown = 0;
    cached.forEach(function (item) {
      var matchesCat = (activeCat === "all" || item.cat === activeCat);
      var matchesQuery = !q || item.searchIndex.indexOf(q) !== -1;

      if (matchesCat && matchesQuery) {
        item.el.classList.remove("is-hidden");
        shown++;
      } else {
        item.el.classList.add("is-hidden");
      }
    });

    if (searchCount && matchNum) {
      if (q) {
        matchNum.textContent = String(shown);
        searchCount.style.display = "block";
      } else {
        searchCount.style.display = "none";
      }
    }

    if (emptyMsg) {
      emptyMsg.style.display = shown === 0 ? "block" : "none";
      if (shown === 0 && q) {
        emptyMsg.textContent = "找不到符合「" + q + "」的教學，試試點選上方熱門主題，或換個關鍵字搜尋。";
      } else if (shown === 0) {
        emptyMsg.textContent = "這個分類的文章正在陸續整理中，先看看其他主題吧。";
      }
    }
  }

  searchInput.addEventListener("input", filterPosts);
  if (searchClear) {
    searchClear.addEventListener("click", function () {
      searchInput.value = "";
      searchInput.focus();
      filterPosts();
    });
  }

  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      filterBtns.forEach(function (x) { x.classList.remove("is-active"); });
      b.classList.add("is-active");
      filterPosts();
    });
  });
}

// 12. 第 5 層防流失轉換引擎：全站 122 篇知識文章自動分流（10 秒代償盲區自測 ＋ 3 秒痛點勾選 → 動態預填 LINE #文章代碼）
function initArticleConversionWidget() {
  var path = (window.location.pathname || "").replace(/^\/+/, "");
  if (!/^(blog-|pose-)/i.test(path)) return;
  var slug = path.replace(/\.html$/i, "");
  var ctaBox = document.querySelector("article .article-cta:not(.soft)");
  if (!ctaBox || ctaBox.querySelector(".sinyan-conv-widget")) return;

  // 若文章本身已有自訂多按鈕對照（如 blog-choosing-first-class-format.html），保留原按鈕但仍補齊預設 body data-line-message
  var hasCustomSlot = ctaBox.querySelector("[data-slot-message]");

  var trackType = "wallrope";
  if (/neck|shoulder|chest|hunch|headache|arm|jaw|sleep|bedtime|pillow|backbend|breath|massage|phone|office|chair|bracing|winter|tired|crick|frozen|upper/i.test(slug)) {
    trackType = "upper";
  } else if (/hip|pelvic|knee|numb|squat|glute|butt|low-back|standing|walking|feet|hamstring|period|balance|lifting|housework|flight|fold|hinge/i.test(slug)) {
    trackType = "lower";
  }

  var tracks = {
    upper: {
      gapTitle: "🔍 10 秒鏡前單側自測（為什麼自己拉完很快又緊回來？）",
      gapDesc: "居家伸展多半只鬆到表淺張力；如果左右肩線一高一低、轉頭兩邊緊繃差明顯，或按完隔天又緊回去，代表胸椎活動度與深層肩胛代償還沒對位。",
      pains: ["肩頸反覆緊／按摩隔天又緊", "圓肩駝背／胸口打不開", "高低肩／左右轉頭緊繃差", "想先用 AI 看懂肩頸角度"],
      offerName: "首次 NT$299 AI 體態檢測（原價 NT$699）",
      offerCode: "ai_assessment",
      offerValue: "299"
    },
    lower: {
      gapTitle: "🔍 10 秒坐姿／站姿單側自測（找出骨盆與下肢代償起點）",
      gapDesc: "盤腿一側膝蓋特別高、久站腰痠或下樓梯單側膝蓋卡卡，往往不是「筋太硬」，而是骨盆前後傾與深層髂腰肌／臀中肌張力失衡。",
      pains: ["盤腿坐不住／容易腳麻", "骨盆前傾／小腹凸或久站腰痠", "開髖卡卡／左右腳跨步不對稱", "想先用 AI 看懂骨盆與下肢力線"],
      offerName: "首次 NT$299 AI 體態檢測（原價 NT$699）",
      offerCode: "ai_assessment",
      offerValue: "299"
    },
    wallrope: {
      gapTitle: "🔍 10 秒新手避坑檢查（不用筋軟也能安全開始）",
      gapDesc: "多數新手不是不適合練瑜伽，而是少了支點、一用力就變成聳肩折腰代償。先看懂自己目前的活動度起點，再決定從壁繩或小班切入最安心。",
      pains: ["筋骨很硬／零基礎怕跟不上", "想體驗壁繩瑜伽支撐減壓", "不確定該選團課還是一對一", "想先做 NT$299 AI 體態檢測再決定"],
      offerName: "首次 NT$299 AI 體態檢測（或詢問零基礎入門班）",
      offerCode: "ai_assessment",
      offerValue: "299"
    }
  };

  var cfg = tracks[trackType];
  var times = ["平日白天", "平日晚上", "週末時段", "都可以，請推薦"];
  var selectedPain = cfg.pains[0];
  var selectedTime = times[0];

  function buildMsg() {
    return "老師您好，我看完文章（來源代碼：#" + slug + "），目前最困擾的是【" + selectedPain + "】，方便時段是【" + selectedTime + "】，想預約了解 " + cfg.offerName + "！";
  }

  // 先寫入 body 預設預填訊息，確保頁面上所有浮動/導覽/頁尾 LINE 按鈕都帶來源代碼
  if (!document.body.getAttribute("data-line-message")) {
    document.body.setAttribute("data-line-message", buildMsg());
  }

  if (hasCustomSlot) return;

  var existingBtn = ctaBox.querySelector("a.js-line");
  if (existingBtn) {
    existingBtn.style.display = "none";
  }

  var widget = document.createElement("div");
  widget.className = "sinyan-conv-widget";
  widget.innerHTML = [
    '<div class="sinyan-conv-gap"><b>' + cfg.gapTitle + '</b>' + cfg.gapDesc + '</div>',
    '<div class="sinyan-conv-step">',
    '  <span class="sinyan-conv-label">① 點選你目前最像的身體狀態（1 秒完成）：</span>',
    '  <div class="sinyan-conv-chips" data-group="pain">' + cfg.pains.map(function (p, i) {
      return '<button type="button" class="sinyan-chip' + (i === 0 ? ' is-selected' : '') + '" data-val="' + p + '">' + p + '</button>';
    }).join("") + '</div>',
    '</div>',
    '<div class="sinyan-conv-step">',
    '  <span class="sinyan-conv-label">② 你比較方便到高雄左營教室的時段：</span>',
    '  <div class="sinyan-conv-chips" data-group="time">' + times.map(function (t, i) {
      return '<button type="button" class="sinyan-chip' + (i === 0 ? ' is-selected' : '') + '" data-val="' + t + '">' + t + '</button>';
    }).join("") + '</div>',
    '</div>',
    '<div class="sinyan-conv-preview"><small>💬 點擊下方按鈕將自動帶入以下詢問文字（免打字、零壓力）：</small><span class="sinyan-preview-text"></span></div>',
    '<div class="sinyan-conv-actions">',
    '  <a href="#" class="btn js-line sinyan-conv-btn" data-line-purpose="reservation" data-cta-location="article_prefill_widget" data-offer="' + cfg.offerCode + '" data-offer-value="' + cfg.offerValue + '">💬 一鍵開啟 LINE 預填詢問（首次 NT$299 AI 檢測）→</a>',
    '  <span class="sinyan-conv-sub">高雄左營新庄仔路 726 號 3 樓（近巨蛋捷運站）· 檢測後不強迫購課</span>',
    '</div>'
  ].join("");

  ctaBox.appendChild(widget);

  var previewEl = widget.querySelector(".sinyan-preview-text");
  var lineBtn = widget.querySelector(".sinyan-conv-btn");

  function syncMessage() {
    var msg = buildMsg();
    previewEl.textContent = msg;
    lineBtn.setAttribute("data-line-message", msg);
    document.body.setAttribute("data-line-message", msg);
  }
  syncMessage();

  widget.querySelectorAll(".sinyan-conv-chips").forEach(function (group) {
    var kind = group.getAttribute("data-group");
    group.querySelectorAll(".sinyan-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        group.querySelectorAll(".sinyan-chip").forEach(function (c) { c.classList.remove("is-selected"); });
        chip.classList.add("is-selected");
        if (kind === "pain") selectedPain = chip.getAttribute("data-val");
        if (kind === "time") selectedTime = chip.getAttribute("data-val");
        syncMessage();
        try {
          gtag("event", "article_pain_chip_select", {
            article_slug: slug,
            chip_group: kind,
            chip_value: chip.getAttribute("data-val"),
            page_path: window.location.pathname
          });
        } catch (err) {}
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var articleSlugPattern = /^(?:blog|pose)-[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var pageSlug = window.location.pathname.split("/").pop().replace(/\.html$/, "");
  var isReservationPage = /^(assessment|classes|neck-release)$/.test(pageSlug);
  var entryArticle = "";
  if (isReservationPage || articleSlugPattern.test(pageSlug)) {
    try {
      var entryKey = "sinyan_entry_article";
      var storedArticle = sessionStorage.getItem(entryKey) || "";
      if (articleSlugPattern.test(storedArticle)) {
        entryArticle = storedArticle;
      } else if (articleSlugPattern.test(pageSlug)) {
        sessionStorage.setItem(entryKey, pageSlug);
        entryArticle = pageSlug;
      }
    } catch (error) {
      // Privacy settings can block storage; the original LINE message still works.
    }
  }

  initReadingProgressBar();
  initTheme();
  initExitIntentModal();
  initScrollAndEngagementTelemetry();
  initInstantSearch();
  initShareButtons();
  initArticleConversionWidget();
  // LINE reservation buttons
  document.querySelectorAll("a.js-line").forEach(function (a) {
    a.href = LINE_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function (event) {
      event.preventDefault();

      // 每頁可用 <body data-lead-value / data-lead-name / data-lead-category> 覆寫；
      // 未設定時沿用預設（AI 體態檢測、299），確保其他既有頁面行為不變。
      var body = document.body;
      var leadValue = Number(body.getAttribute("data-lead-value")) || 299;
      var leadName = body.getAttribute("data-lead-name") || "LINE AI posture assessment reservation";
      var leadCategory = body.getAttribute("data-lead-category") || "AI posture assessment";
      // 修正 Meta 演算法餵毒：未經表單或後端確認的純 LINE 連結點擊預設送 Contact，
      // 真正完成站內預約表單的提交才保留標準 Lead 給廣告演算法優化用。
      var lineEventName = a.getAttribute("data-line-event") || body.getAttribute("data-line-event") || "Contact";
      // 按鈕層級用途分類（同一訊號也驅動下方 Meta 的 LineClick / ReservationIntent）。
      var linePurpose = a.getAttribute("data-line-purpose") || "";

      // GA4：contact 用途的 LINE 點擊送 line_contact_click（不帶預約 value），
      // reservation 與未分類（unclassified）維持原本的 line_reservation_click，不影響其他既有頁面。
      var gaEventName = linePurpose === "contact" ? "line_contact_click" : "line_reservation_click";
      var gaParams = {
        link_url: LINE_URL,
        link_text: a.textContent.trim(),
        page_path: window.location.pathname
      };
      if (linePurpose !== "contact") {
        gaParams.value = leadValue;
        gaParams.currency = "TWD";
      }
      gtag("event", gaEventName, gaParams);
      fbq("track", lineEventName, {
        content_name: leadName,
        content_category: leadCategory,
        value: leadValue,
        currency: "TWD"
      });

      // ── Phase 1 shadow events (migration, does not replace legacy Lead/Contact above) ──
      // Button-level classification takes priority; unclassified buttons still get LineClick
      // (with no offer/value guessing) but never ReservationIntent.
      // (linePurpose already read above, reused here for the Meta side.)
      var ctaLocation = a.getAttribute("data-cta-location") || "unspecified";
      var offer = a.getAttribute("data-offer") || "";

      var lineClickParams = {
        page_path: window.location.pathname,
        cta_location: ctaLocation,
        cta_purpose: linePurpose || "unclassified"
      };
      if (offer) lineClickParams.offer = offer;
      fbq("trackCustom", "LineClick", lineClickParams);

      // ReservationIntent requires the button's own explicit reservation wording
      // (data-line-purpose="reservation"), never inferred from the offer/destination alone.
      if (linePurpose === "reservation") {
        var reservationParams = {
          page_path: window.location.pathname,
          cta_location: ctaLocation
        };
        if (offer) reservationParams.offer = offer;
        var offerValue = a.getAttribute("data-offer-value");
        if (offerValue) {
          reservationParams.value = Number(offerValue);
          reservationParams.currency = "TWD";
        }
        fbq("trackCustom", "ReservationIntent", reservationParams);
      }

      // 若按鈕或 <body> 設定 data-line-message，同步複製到剪貼簿，
      // 手機端以 LINE oaMessage 協議直接喚起 LINE App 並填入訊息；
      // 桌機端開啟 LINE 加好友/QR 頁面（避免桌面瀏覽器 line.me/R 302 轉跳行銷首頁），用戶可直接貼上預填文字。
      // 未設定時維持原行為（開啟 LINE_URL），不影響其他既有頁面。
      var lineMessage = a.getAttribute("data-line-message") || body.getAttribute("data-line-message");
      if (lineMessage && linePurpose === "reservation" && isReservationPage && entryArticle) {
        lineMessage += "（初次閱讀：#" + entryArticle + "）";
      }
      if (lineMessage && navigator.clipboard && navigator.clipboard.writeText) {
        try { navigator.clipboard.writeText(lineMessage); } catch (e) {}
      }
      var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      var openUrl = lineMessage
        ? (isMobile ? "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_OA_ID) + "/?" + encodeURIComponent(lineMessage) : LINE_URL)
        : LINE_URL;

      if (isMobile) {
        window.setTimeout(function () {
          window.location.href = openUrl;
        }, 180);
      } else {
        if (lineMessage && window.showToast) {
          window.showToast("✓ 已複製預約詢問文字，加入 LINE 後可直接貼上送出！", 3200);
        }
        window.setTimeout(function () {
          window.open(openUrl, "_blank", "noopener");
        }, 220);
      }
    });
  });

  // Mobile menu
  var t = document.querySelector(".nav-toggle");
  var m = document.getElementById("menu");
  if (t && m) {
    function closeMenu() {
      m.classList.remove("open");
      t.setAttribute("aria-expanded", "false");
    }
    t.addEventListener("click", function () {
      var open = m.classList.toggle("open");
      t.setAttribute("aria-expanded", String(open));
    });
    m.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && m.classList.contains("open")) {
        closeMenu();
        t.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".nav")) closeMenu();
    });
    window.matchMedia("(max-width: 1080px)").addEventListener("change", closeMenu);
  }

  // A real fallback link remains usable for direct visits and without JavaScript.
  document.querySelectorAll("[data-back-link]").forEach(function (link) {
    var referrer;
    try { referrer = new URL(document.referrer); } catch (error) { return; }
    if (referrer.origin !== window.location.origin || referrer.pathname === window.location.pathname) return;
    link.href = referrer.href;
    link.addEventListener("click", function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (window.history.length > 1) {
        event.preventDefault();
        window.history.back();
      }
    });
  });
});
