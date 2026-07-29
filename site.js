/* 鑫彥瑜珈 — 共用腳本
   只要改這一行，全站「加 LINE」按鈕就會全部連過去 */
var LINE_URL = "https://lin.ee/5rWzdNd";

document.addEventListener("DOMContentLoaded", function () {
  // 全站 LINE 按鈕
  document.querySelectorAll("a.js-line").forEach(function (a) {
    a.href = LINE_URL; a.target = "_blank"; a.rel = "noopener";
  });
  // 手機版選單
  var t = document.querySelector(".nav-toggle"), m = document.getElementById("menu");
  if (t && m) {
    t.addEventListener("click", function () { m.classList.toggle("open"); });
    m.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { m.classList.remove("open"); }); });
  }
});
