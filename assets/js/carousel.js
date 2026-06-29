// Seamless continuous marquee: the track of images slides right and loops
// forever. Images are duplicated so the wrap is invisible. Pauses on hover/touch.
(function () {
  var SPEED = 0.5; // pixels per frame (~30px/s at 60fps)

  function setup(carousel) {
    var track = carousel.querySelector('.carousel__track');
    if (!track || track.dataset.marquee === 'on') return;

    var imgs = track.querySelectorAll('img');
    if (!imgs.length) return;

    function start() {
      // Width of one full set (original content + the gap before the clone).
      var gap = parseFloat(getComputedStyle(track).columnGap || '16') || 16;
      var setWidth = track.scrollWidth + gap;

      // Duplicate the set once so scrolling past it lands on identical content.
      // Clone whole items (image + caption) when present, else bare images.
      var units = track.querySelectorAll('.carousel__item');
      if (!units.length) units = track.querySelectorAll('img');
      units.forEach(function (node) {
        track.appendChild(node.cloneNode(true));
      });
      track.dataset.marquee = 'on';
      track.style.scrollBehavior = 'auto'; // instant; we drive it frame by frame

      var paused = false;
      ['mouseenter', 'touchstart', 'pointerdown'].forEach(function (ev) {
        carousel.addEventListener(ev, function () { paused = true; }, { passive: true });
      });
      ['mouseleave', 'touchend', 'pointerup'].forEach(function (ev) {
        carousel.addEventListener(ev, function () { paused = false; }, { passive: true });
      });

      function frame() {
        if (!paused) {
          var next = track.scrollLeft + SPEED;
          if (next >= setWidth) next -= setWidth; // seamless wrap
          track.scrollLeft = next;
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    // Wait until images have dimensions so setWidth is correct.
    var pending = imgs.length;
    imgs.forEach(function (img) {
      if (img.complete) { if (--pending === 0) start(); }
      else img.addEventListener('load', function () { if (--pending === 0) start(); });
    });
    // Fallback in case load events were missed.
    if (pending === imgs.length) setTimeout(function () {
      if (track.dataset.marquee !== 'on') start();
    }, 1500);
  }

  function init() {
    document.querySelectorAll('.carousel').forEach(setup);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
