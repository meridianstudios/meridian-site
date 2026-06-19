(function () {
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll-spy: highlight the nav link whose section is in view
  if ('IntersectionObserver' in window) {
    var spyLinks = [].slice.call(document.querySelectorAll('.navlinks a[href^="#"]'));
    var spyMap = {};
    spyLinks.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el && el.tagName === 'SECTION') spyMap[el.id] = a;
    });
    if (Object.keys(spyMap).length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            spyLinks.forEach(function (a) { a.classList.remove('current'); });
            spyMap[en.target.id].classList.add('current');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      Object.keys(spyMap).forEach(function (id) { spy.observe(document.getElementById(id)); });
    }
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { io.observe(e); });
})();
