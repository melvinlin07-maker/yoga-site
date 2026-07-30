/* 鑫彥瑜珈 — 共用腳本
   只要改這一行，全站「加 LINE」按鈕就會全部連過去 */
var LINE_URL = "https://lin.ee/5rWzdNd";
var GA_MEASUREMENT_ID = "G-6X3PD7NMMG";

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

document.addEventListener("DOMContentLoaded", function () {
  // 全站 LINE 按鈕
  document.querySelectorAll("a.js-line").forEach(function (a) {
    a.href = LINE_URL; a.target = "_blank"; a.rel = "noopener";
    a.addEventListener("click", function () {
      gtag("event", "line_reservation_click", {
        link_url: LINE_URL,
        link_text: a.textContent.trim(),
        page_path: window.location.pathname
      });
    });
  });
  // 手機版選單
  var t = document.querySelector(".nav-toggle"), m = document.getElementById("menu");
  if (t && m) {
    t.addEventListener("click", function () { m.classList.toggle("open"); });
    m.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { m.classList.remove("open"); }); });
  }
});
