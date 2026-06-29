// Make off-site links open in a new tab (with safe rel), so visitors don't
// lose this page. Internal links and mailto/anchors are left untouched.
(function () {
  function init() {
    var here = location.hostname;
    document.querySelectorAll('a[href]').forEach(function (a) {
      var url;
      try { url = new URL(a.href); } catch (e) { return; }
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return; // skip mailto:, #, etc.
      if (url.hostname === here) return; // internal link
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
