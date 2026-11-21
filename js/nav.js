/* Mobile navigation: toggles the menu with aria-expanded, Esc to close, closes on link click. */
(function () {
  var btn = document.querySelector('.nav-btn-js');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  var mq = window.matchMedia('(max-width: 900px)');
  function setOpen(open, focusBtn) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
    if (!open && focusBtn) btn.focus();
  }
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
    if (open) { var first = nav.querySelector('a'); if (first) first.focus(); }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && nav.classList.contains('open')) setOpen(false, true);
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function (ev) { if (!ev.matches) setOpen(false); });
})();

/* Show the floating Back to top control after the user scrolls. The footer link always works without JS. */
(function () {
  var fab = document.querySelector('.back-top-fab');
  if (!fab) return;
  function onScroll() {
    fab.classList.toggle('is-visible', window.scrollY > 280);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
