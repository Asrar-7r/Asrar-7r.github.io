document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const themeToggle = document.querySelector('.theme-toggle');
  const backToTop = document.querySelector('.back-to-top');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const year = document.querySelector('#current-year');

  const refreshIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  refreshIcons();

  // Current year
  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // Restore saved theme
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');

    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        'Switch to light mode'
      );

      themeToggle.innerHTML =
        '<i data-lucide="sun" aria-hidden="true"></i>';

      refreshIcons();
    }
  }


  // Mobile navigation
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');

      menuToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      menuToggle.setAttribute(
        'aria-label',
        isOpen
          ? 'Close navigation menu'
          : 'Open navigation menu'
      );

      menuToggle.innerHTML = `
        <i
          data-lucide="${isOpen ? 'x' : 'menu'}"
          aria-hidden="true"
        ></i>
      `;

      refreshIcons();
    });
  }


  // Close mobile menu after navigation
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {

      if (!navMenu || !menuToggle) return;

      navMenu.classList.remove('open');

      menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

      menuToggle.setAttribute(
        'aria-label',
        'Open navigation menu'
      );

      menuToggle.innerHTML =
        '<i data-lucide="menu" aria-hidden="true"></i>';

      refreshIcons();
    });
  });


  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {

      const isDark = document.body.classList.toggle('dark');

      localStorage.setItem(
        'theme',
        isDark ? 'dark' : 'light'
      );

      themeToggle.setAttribute(
        'aria-label',
        isDark
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      );

      themeToggle.innerHTML = `
        <i
          data-lucide="${isDark ? 'sun' : 'moon'}"
          aria-hidden="true"
        ></i>
      `;

      refreshIcons();
    });
  }


  // Scroll state
  const updateScrollState = () => {

    const scrollPosition = window.scrollY;

    if (header) {
      header.classList.toggle(
        'scrolled',
        scrollPosition > 20
      );
    }

    if (backToTop) {
      backToTop.classList.toggle(
        'visible',
        scrollPosition > 500
      );
    }

    let currentId = 'home';

    sections.forEach((section) => {

      if (
        scrollPosition >=
        section.offsetTop - 180
      ) {
        currentId = section.id;
      }

    });

    navLinks.forEach((link) => {

      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`
      );

    });
  };


  window.addEventListener(
    'scroll',
    updateScrollState,
    { passive: true }
  );

  updateScrollState();


  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });
  }


  // Reveal animations
  const revealElements =
    document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add('visible');

              observer.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    // Fallback for older browsers
    revealElements.forEach((element) => {
      element.classList.add('visible');
    });

  }

});