// Minimal, dependency-free image lightbox.
// Any <img class="zoomable"> opens enlarged on click; close via the ✕, the
// backdrop, or the Escape key.
(function () {
  function init() {
    var images = document.querySelectorAll('img.zoomable');
    if (!images.length) return;

    // Build the overlay once and reuse it.
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<img class="lightbox__img" alt="">';
    document.body.appendChild(overlay);

    var bigImg = overlay.querySelector('.lightbox__img');
    var closeBtn = overlay.querySelector('.lightbox__close');

    function open(src, alt) {
      bigImg.src = src;
      bigImg.alt = alt || '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      bigImg.src = '';
    }

    images.forEach(function (img) {
      img.addEventListener('click', function () {
        open(img.currentSrc || img.src, img.alt);
      });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close(); // click backdrop, not the image
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
