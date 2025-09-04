/**
* Template Name: LeadPage
* Template URL: https://bootstrapmade.com/leadpage-bootstrap-landing-page-template/
* Updated: Aug 12 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

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
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
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

/*-------------------------------------------------------------------------------------------
# Aportes individuales al desarrollo del sitio web en cuanto al JS hecho por Valentina López
--------------------------------------------------------------------------------------------*/
function animateValentinaCounter() {
  const counter = document.querySelector('.valentina-stat-number[data-count]');
  if (!counter) return;

  const target = parseInt(counter.getAttribute('data-count'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      counter.textContent = target;
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current);
    }
  }, 16);
}

function addValentinaHoverEffect() {
  const valentinaCard = document.querySelector('.valentina-card');
  if (!valentinaCard) return;

  valentinaCard.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-15px) scale(1.02)';
  });

  valentinaCard.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
}

function initValentinaFeatures() {
  // Observador para animar contador cuando sea visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValentinaCounter();
        observer.disconnect();
      }
    });
  }, { threshold: 0.7 });

  const valentinaCard = document.querySelector('.valentina-card');
  if (valentinaCard) {
    observer.observe(valentinaCard);
    addValentinaHoverEffect();
  }
}

// Inicializar funciones de Valentina cuando se carga la página
window.addEventListener('load', initValentinaFeatures);

/**
 * Funciones personalizadas de Valentina López para las referencias bibliográficas
 */

// Función principal de inicialización
function valentinaInit() {
  console.log('🌟 Referencias interactivas de Valentina López cargadas');
  valentinaAnimateCards();
  valentinaAddHoverEffects();
  valentinaCreateCopyButtons();
  valentinaAddClickEffects();
}

// Animación de entrada para las tarjetas
function valentinaAnimateCards() {
  const cards = document.querySelectorAll('.referencia-card');

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
}

// Efectos hover mejorados
function valentinaAddHoverEffects() {
  const cards = document.querySelectorAll('.referencia-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 15px 30px rgba(231, 76, 60, 0.15)';

      // Efecto en el badge
      const badge = card.querySelector('.investigador-badge');
      if (badge) {
        badge.style.animation = 'valentinaGlow 0.5s ease-in-out';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 30px color-mix(in srgb, var(--default-color), transparent 85%)';
    });
  });
}

// Botones de copiado de la referencia APA
function valentinaCreateCopyButtons() {
  const cards = document.querySelectorAll('.referencia-card');

  cards.forEach(card => {
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '📋';
    copyBtn.title = 'Copiar referencia APA';
    copyBtn.className = 'valentina-copy-btn';

    card.appendChild(copyBtn);

    // Función de copiado
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      valentinaCopyReference(card);
    });
  });
}

// Copiar referencia al portapapeles
function valentinaCopyReference(card) {
  const autor = card.querySelector('.autor').textContent;
  const titulo = card.querySelector('.titulo').textContent;
  const revista = card.querySelector('.revista').textContent;
  const doi = card.querySelector('.doi a').href;

  const referencia = `${autor} (2025). ${titulo}. ${revista}. ${doi}`;

  navigator.clipboard.writeText(referencia).then(() => {
    valentinaShowMessage('📋 Referencia APA copiada!');

    // Efecto visual
    card.style.background = 'rgba(231, 76, 60, 0.05)';
    setTimeout(() => {
      card.style.background = '';
    }, 1000);
  });
}

// Auto-inicialización
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.referencias-grid')) {
    setTimeout(valentinaInit, 100);
  }
});

// Función para mostrar mensajes temporales
function valentinaShowMessage(mensaje) {
  // Crear elemento del mensaje
  const messageDiv = document.createElement('div');
  messageDiv.textContent = mensaje;
  messageDiv.className = 'valentina-message';
  
  // Agregar al DOM
  document.body.appendChild(messageDiv);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.classList.add('slide-out');
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.parentNode.removeChild(messageDiv);
        }
      }, 300);
    }
  }, 3000);
}

/*-------------------------------------------------------------------------------------------
# Aportes individuales al desarrollo del sitio web en cuanto al JS hecho por Valentina López
--------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------
# Aportes individuales al desarrollo del sitio web en cuanto al JS hecho por Camilo Prieto
--------------------------------------------------------------------------------------------*/
// Botón "Ver más / Ver menos"
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".ver-mas");
  const extra = document.querySelector(".extra-info");

  if (btn && extra) {
    btn.addEventListener("click", () => {
      extra.classList.toggle("show-extra");
      btn.textContent = extra.classList.contains("show-extra")
        ? "Ver menos"
        : "Ver más";
    });
  }
});

// Hover dinámico en la tarjeta de Camilo
const camiloCard = document.querySelector(".camilo-card");
if (camiloCard) {
  camiloCard.addEventListener("mouseenter", () => {
    camiloCard.style.transform = "scale(1.05)";
    camiloCard.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
    camiloCard.style.transition = "all 0.3s ease";
  });

  camiloCard.addEventListener("mouseleave", () => {
    camiloCard.style.transform = "scale(1)";
    camiloCard.style.boxShadow = "none";
  });
}

// Parallax en imagen de la tarjeta
const cardImage = document.querySelector(".camilo-card img");
if (cardImage) {
  camiloCard.addEventListener("mousemove", (e) => {
    const rect = camiloCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardImage.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.05)`;
    cardImage.style.transition = "transform 0.1s ease";
  });

  camiloCard.addEventListener("mouseleave", () => {
    cardImage.style.transform = "translate(0, 0) scale(1)";
  });
}
/*-------------------------------------------------------------------------------------------
# Aportes individuales al desarrollo del sitio web en cuanto al JS hecho por Camilo Prieto
--------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------
# Aportes individuales al desarrollo del sitio web en cuanto al JS hecho por Alexander Chacon
--------------------------------------------------------------------------------------------*/
// Función de bienvenida hecha por Alexander
function showWelcomeMessage() {
  alert("¡Bienvenido a la búsqueda de artículos de VACode!");
  
  // Limpiar cualquier hash de la URL y mantener la página arriba
  if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname);
  }
  
  // Forzar scroll al inicio
  window.scrollTo(0, 0);
}
window.addEventListener('load', showWelcomeMessage);

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
  section2.forEach(function (item) {
    item.style.backgroundColor = '#f1f1f1';  // Color de fondo gris claro
  });

  // Cambiar el color de todos los h3 con la clase "alex-subtitleh3"
  headers.forEach(function (header) {
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
  section2.forEach(function (item) {
    item.style.backgroundColor = '#fff';  // Fondo blanco
  });

  // Cambiar el color de todos los h3 con la clase "alex-subtitleh3" a negro
  headers.forEach(function (header) {
    header.style.color = '#000';  // Color de texto de h3 a negro
  });
}

// Función para contar los clics en cada artículo por separado
let clickCount1 = 0;  // Contador para el artículo 1
let clickCount2 = 0;  // Contador para el artículo 2
let clickCount3 = 0;  // Contador para el artículo 3

// Función para contar los clics por artículo
function countClicks(article) {
  if (article === 1) {
    clickCount1++;  // Incrementa el contador para el artículo 1
    document.getElementById("click-counter-1").innerHTML = "Artículo 1 - Número de clics: " + clickCount1;
  } else if (article === 2) {
    clickCount2++;  // Incrementa el contador para el artículo 2
    document.getElementById("click-counter-2").innerHTML = "Artículo 2 - Número de clics: " + clickCount2;
  } else if (article === 3) {
    clickCount3++;  // Incrementa el contador para el artículo 3
    document.getElementById("click-counter-3").innerHTML = "Artículo 3 - Número de clics: " + clickCount3;
  }
}
/*-------------------------------------------------------------------------------------------
# Aportes individuales al desarrollo del sitio web en cuanto al JS hecho por Alexander Chacon
--------------------------------------------------------------------------------------------*/
