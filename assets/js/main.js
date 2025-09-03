(function () {
  "use strict";

  /**
   * --- Funciones Generales ---
   */

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();

/**
   * --- Funciones Específicas para la Sección de Alexander ---
   */

  // Función de bienvenida para la sección de Alexander
  function showWelcomeMessage() {
    alert("¡Bienvenido a la sección de artículos de Alexander Chacon!");
  }
  window.onload = showWelcomeMessage;

// Función para cambiar el color de fondo a gris claro y el color de los h3
function changeBackgroundColor() {
  const section1 = document.getElementById('alex-section');  // La sección de autores y demás
  const section2 = document.querySelectorAll('.alex-article-text');  // La sección de texto adicional (p)
  const headers = document.querySelectorAll('.alex-subtitleh3');  // Todos los h3 dentro de la sección

  // Cambiar el fondo de la primera sección (la de autores)
  if (section1) {
    section1.style.backgroundColor = '#f1f1f1';  // Color de fondo gris claro para buen contraste con el texto negro
  }

  // Cambiar el fondo de todos los elementos con la clase "alex-article-text" (p)
  section2.forEach(function(item) {
    item.style.backgroundColor = '#f1f1f1';  // Color de fondo gris claro
  });

  // Cambiar el color de todos los h3 con la clase "alex-subtitleh3"
  headers.forEach(function(header) {
    header.style.color = '#333';  // Cambiar color de texto de h3 a gris oscuro (#333)
  });
}

// Función para cambiar el color de fondo a blanco y el color de los h3 a negro
function changeBackgroundToWhite() {
  const section1 = document.getElementById('alex-section');  // La sección de autores y demás
  const section2 = document.querySelectorAll('.alex-article-text');  // La sección de texto adicional (p)
  const headers = document.querySelectorAll('.alex-subtitleh3');  // Todos los h3 dentro de la sección

  // Cambiar el fondo de la primera sección (la de autores) a blanco
  if (section1) {
    section1.style.backgroundColor = '#fff';  // Fondo blanco
  }

  // Cambiar el fondo de todos los elementos con la clase "alex-article-text" (p) a blanco
  section2.forEach(function(item) {
    item.style.backgroundColor = '#fff';  // Fondo blanco
  });

  // Cambiar el color de todos los h3 con la clase "alex-subtitleh3" a negro
  headers.forEach(function(header) {
    header.style.color = '#000';  // Color de texto de h3 a negro
  });
}

  // Función para contar los clics en la sección de Alexander
  let clickCount = 0;
  function countClicks() {
    clickCount++;
    document.getElementById("click-counter").innerHTML = "Número de clics: " + clickCount;
  }

