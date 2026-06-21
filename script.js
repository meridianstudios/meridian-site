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

  // Point download buttons at the latest GitHub release (fallback links stay if this fails).
  // Repo is read from a [data-release-repo] attribute on the page; defaults to Nova OS.
  var dlEls = [].slice.call(document.querySelectorAll('[data-dl]'));
  if (dlEls.length && window.fetch) {
    var repoEl = document.querySelector('[data-release-repo]');
    var repo = (repoEl && repoEl.getAttribute('data-release-repo')) || 'meridianstudios/nova-os';
    fetch('https://api.github.com/repos/' + repo + '/releases/latest')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rel) {
        if (!rel || !rel.assets) return;
        dlEls.forEach(function (a) {
          var key = (a.getAttribute('data-dl') || '').toLowerCase();
          var hit = rel.assets.filter(function (x) { return x.name.toLowerCase().indexOf(key) !== -1; })[0];
          if (hit) a.href = hit.browser_download_url;
        });
        [].slice.call(document.querySelectorAll('[data-latest-tag]')).forEach(function (t) { t.textContent = rel.tag_name; });
      })
      .catch(function () {});
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
