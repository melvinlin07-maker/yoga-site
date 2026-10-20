/* Shared site scripts.
   Update LINE_URL to change all LINE reservation buttons. */
var LINE_URL = "https://lin.ee/5rWzdNd";
var LINE_OA_ID = "@561wigip";
var GA_MEASUREMENT_ID = "G-6X3PD7NMMG";
var META_PIXEL_ID = "1594348069032790";

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

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

// 7. 離開意圖溫柔挽留彈窗
function initExitIntentModal() {
  if (sessionStorage.getItem("sinyan_exit_modal_shown")) return;
  if (window.location.pathname.indexOf("beginner-yoga-guide") !== -1) return;

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
      '  <div class="exit-modal__badge">🌸 離開前專屬好禮</div>',
      '  <h3 class="exit-modal__title" id="exitModalTitle">在離開之前，免費帶走這份《新手居家瑜伽 3 步驟圖解手冊》？</h3>',
      '  <p class="exit-modal__desc">零基礎友善、免輔具！呼吸調息 × 溫和貓牛式 × 深層大休息，每天 10 分鐘，在家就能跟著高清圖解找回身體輕盈感。</p>',
      '  <div class="exit-modal__actions">',
      '    <a href="beginner-yoga-guide.html" class="btn exit-modal__btn-primary">📖 免費線上閱讀 3 步驟圖解</a>',
      '    <a href="body-tension-map.html" class="btn exit-modal__btn-secondary">🗺️ 動手點選全身緊繃地圖</a>',
      '  </div>',
      '  <button type="button" class="exit-modal__dismiss" id="exitModalDismiss">謝謝，我先逛逛（不再提示）</button>',
      '</div>'
    ].join("");
    document.body.appendChild(div);

    function closeModal() {
      div.classList.remove("is-active");
      div.setAttribute("aria-hidden", "true");
      sessionStorage.setItem("sinyan_exit_modal_shown", "true");
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
    if (sessionStorage.getItem("sinyan_exit_modal_shown")) return;
    sessionStorage.setItem("sinyan_exit_modal_shown", "true");
    var m = createModal();
    m.classList.add("is-active");
    m.setAttribute("aria-hidden", "false");
  }

  // 電腦端：滑鼠向上離開視窗頂部
  document.addEventListener("mouseleave", function (e) {
    if (e.clientY <= 20) {
      showModal();
    }
  });

  // 手機端：停留 >25 秒且快速向上滑動
  var startTs = Date.now();
  var lastScrollY = window.scrollY;
  var lastScrollTs = Date.now();

  window.addEventListener("scroll", function () {
    var now = Date.now();
    var currentY = window.scrollY;
    var dt = now - lastScrollTs;
    var dy = currentY - lastScrollY;

    if (now - startTs > 22000 && dt < 200 && dy < -100 && currentY < 300) {
      showModal();
    }

    lastScrollY = currentY;
    lastScrollTs = now;
  }, { passive: true });
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

document.addEventListener("DOMContentLoaded", function () {
  initReadingProgressBar();
  initTheme();
  initExitIntentModal();
  initInstantSearch();
  initShareButtons();
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
      // 頁面可用 <body data-line-event="Contact"> 把 LINE 點擊降級成「詢問」事件，
      // 讓真正的轉換（如站內表單）保留 Lead 給廣告優化用。未設定時維持原行為（Lead），不影響其他既有頁面。
      var lineEventName = a.getAttribute("data-line-event") || body.getAttribute("data-line-event") || "Lead";
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
      if (lineMessage && navigator.clipboard && navigator.clipboard.writeText) {
        try { navigator.clipboard.writeText(lineMessage); } catch (e) {}
      }
      var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      var openUrl = lineMessage
        ? (isMobile ? "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_OA_ID) + "/?" + encodeURIComponent(lineMessage) : LINE_URL)
        : LINE_URL;

      window.setTimeout(function () {
        window.open(openUrl, "_blank", "noopener");
      }, 400);
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
