// Google Tag Manager Loader (Deferred for High Performance & Clean Server Parsing)
window.dataLayer = window.dataLayer || [];

// Clean tracking query parameters from history/URL without destroying attribution cookies
(function cleanTrackingParameters() {
  try {
    if (window.location && window.location.search) {
      var currentUrl = new URL(window.location.href);
      var paramsToClean = ['fbclid', 'gclid', 'msclkid', 'twclid', 'igshid', 'srsltid', '_gl', 'mc_eid'];
      var modified = false;

      // Save click attribution before cleaning if needed by tags
      window.__adParams = window.__adParams || {};
      paramsToClean.forEach(function(param) {
        if (currentUrl.searchParams.has(param)) {
          window.__adParams[param] = currentUrl.searchParams.get(param);
          currentUrl.searchParams.delete(param);
          modified = true;
        }
      });

      if (modified && window.history && window.history.replaceState) {
        var cleanSearch = currentUrl.searchParams.toString();
        var cleanPath = currentUrl.pathname + (cleanSearch ? '?' + cleanSearch : '') + currentUrl.hash;
        window.history.replaceState(window.history.state, document.title, cleanPath);
      }
    }
  } catch (err) {
    // Graceful fallback if URL parsing fails on legacy environments
  }
})();

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

// Slashing Main-Thread Blocking Time (TBT): Defer until idle or deliberate user interaction
if ('requestIdleCallback' in window) {
  requestIdleCallback(initGTM, { timeout: 3500 });
} else {
  window.addEventListener('load', function() {
    setTimeout(initGTM, 2500);
  });
}

// Trigger only on active intent (tap, click, keydown, scroll) - avoid mousemove noise
['pointerdown', 'touchstart', 'scroll', 'keydown', 'click'].forEach(function(e) {
  window.addEventListener(e, initGTM, { once: true, passive: true });
});

// Modal dismiss utility
window.closeFcp = function(el) {
  var c = el ? el.closest('.fcp-container') : null;
  if (c) c.style.display = 'none';
};
