(function () {
  const root = document.documentElement;
  const body = document.body;

  function setOffsets() {
    const topBar = document.querySelector('.top-bar');
    const header = document.querySelector('.site-header');

    const topH = topBar ? Math.ceil(topBar.getBoundingClientRect().height) : 0;
    const headH = header ? Math.ceil(header.getBoundingClientRect().height) : 0;

    root.style.setProperty('--topbar-h', topH + 'px');
    root.style.setProperty('--header-h', headH + 'px');
    root.style.setProperty('--stack-h', (topH + headH) + 'px');
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const overlay = document.getElementById('menuOverlay');
    const drawer = document.getElementById('mobileDrawer');

    if (!menuBtn || !overlay || !drawer) return;

    function openMenu() {
      body.classList.add('menu-open');
      root.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (menuCloseBtn) menuCloseBtn.focus();
    }

    function closeMenu() {
      body.classList.remove('menu-open');
      root.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      if (menuBtn) menuBtn.focus();
    }

    menuBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('is-open')) closeMenu();
    });

    drawer.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.tagName === 'A') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && root.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  function initNewsletterDemo() {
    // Demo-only handler. Replace with real endpoint/HubSpot later.
    document.querySelectorAll('form[data-newsletter="true"]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = (input && input.value || '').trim();
        if (!email || !email.includes('@')) {
          alert('Please enter a valid email.');
          return;
        }
        alert('Thanks! You are subscribed (demo).');
        input.value = '';
      });
    });
  }

  window.addEventListener('load', () => {
    setOffsets();
    initMobileMenu();
    initNewsletterDemo();
  });

  window.addEventListener('resize', setOffsets);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setOffsets).catch(() => {});
  }
})();