// Google Tag Manager Loader (Deferred for High Performance & Clean Server Parsing)
window.dataLayer = window.dataLayer || [];

function initGTM() {
  if (window._gtmDidInit) return;
  window._gtmDidInit = true;
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-MTBCV58T');
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(initGTM, { timeout: 2500 });
} else {
  window.addEventListener('load', function() {
    setTimeout(initGTM, 1500);
  });
}

['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(function(e) {
  window.addEventListener(e, initGTM, { once: true, passive: true });
});

// Modal dismiss utility
window.closeFcp = function(el) {
  var c = el ? el.closest('.fcp-container') : null;
  if (c) c.style.display = 'none';
};
