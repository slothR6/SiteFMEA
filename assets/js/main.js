/**
 * FMEA Engineering — JavaScript principal
 * Header inteligente + menu mobile + utilitários globais
 */

;(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     1. Header — scroll awareness + menu mobile
  ------------------------------------------------------------------------- */
  const header    = document.querySelector('.site-header');
  const headerInner = document.querySelector('.header-inner');
  const btnMenu   = document.querySelector('.btn-menu');
  const navMobile = document.querySelector('.nav-mobile');
  const iconOpen  = document.querySelector('.icon-menu-open');
  const iconClose = document.querySelector('.icon-menu-close');

  // Detecta página inicial para modo "sobre o hero"
  const isHome = document.body.dataset.page === 'home';
  const heroSection = document.getElementById('hero-section');

  function updateHeader() {
    if (!headerInner) return;

    const scrolled = window.scrollY > 12;

    if (scrolled) {
      headerInner.classList.add('scrolled');
    } else {
      headerInner.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
  updateHeader();

  // Toggle menu mobile
  if (btnMenu && navMobile) {
    btnMenu.addEventListener('click', function () {
      const isOpen = navMobile.classList.toggle('open');
      btnMenu.classList.toggle('open', isOpen);
      btnMenu.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      if (iconOpen)  iconOpen.style.display  = isOpen ? 'none'  : 'block';
      if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
    });

    // Fecha ao clicar nos links do menu mobile
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        btnMenu.classList.remove('open');
        if (iconOpen)  iconOpen.style.display  = 'block';
        if (iconClose) iconClose.style.display = 'none';
      });
    });
  }

  /* -------------------------------------------------------------------------
     2. Highlight link ativo na nav
  ------------------------------------------------------------------------- */
  const currentPath = window.location.pathname;

  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    // BASE_URL injetado pelo PHP em head.php (funciona em qualquer ambiente)
    const BASE = (window.BASE_URL || '').replace(/\/$/, '');
    const normalizedPath = currentPath.replace(/\/$/, '');
    const normalizedHref = href.replace(/\/$/, '');

    let isActive = false;

    if (normalizedHref === '' || normalizedHref === BASE || normalizedHref === BASE + '/index') {
      // Link da home
      isActive = (normalizedPath === '' || normalizedPath === BASE || normalizedPath === BASE + '/index');
    } else {
      isActive = normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + '/');
    }

    if (isActive) {
      link.classList.add('active');
    }
  });

  /* -------------------------------------------------------------------------
     3. Scroll reveal geral (sections e cards)
  ------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback sem IntersectionObserver
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* -------------------------------------------------------------------------
     4. Timeline interativa com auto-advance e barra de progresso global
  ------------------------------------------------------------------------- */
  var timelineTabs = document.querySelectorAll('.timeline-tab-btn');
  var timelineCard = document.getElementById('timeline-content');
  var progressFill = document.getElementById('timeline-progress-fill');

  if (timelineTabs.length > 0 && timelineCard) {
    var currentTab  = 0;
    var totalTabs   = timelineTabs.length;
    var INTERVAL_MS = 5000;
    var autoTimer   = null;
    var isPaused    = false;

    // ── Atualiza a barra global de progresso ─────────────────────────────
    // Cada tab ocupa 1/totalTabs da barra. A barra cresce de startPct → endPct.
    function animateProgressBar(tabIndex, duration) {
      if (!progressFill) return;
      var segW    = 100 / totalTabs;                // largura de cada segmento
      var startPct = tabIndex * segW;               // início do segmento atual
      var endPct   = startPct + segW;               // fim do segmento

      // Salta para o início do segmento sem animação
      progressFill.style.transition = 'none';
      progressFill.style.width      = startPct + '%';

      // Force reflow
      void progressFill.offsetWidth;

      // Cresce até o fim do segmento na duração do intervalo
      progressFill.style.transition = 'width ' + duration + 'ms linear';
      progressFill.style.width      = endPct + '%';
    }

    function freezeProgressBar() {
      if (!progressFill) return;
      // Lê largura computada atual e trava sem transição
      var currentW = parseFloat(window.getComputedStyle(progressFill).width);
      var trackW   = progressFill.parentElement.offsetWidth;
      var pct      = trackW > 0 ? (currentW / trackW * 100) : 0;
      progressFill.style.transition = 'none';
      progressFill.style.width      = pct + '%';
    }

    // ── Ativa um tab por índice ───────────────────────────────────────────
    function activateTab(index, animate) {
      var btn = timelineTabs[index];

      timelineTabs.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Conteúdo do card
      timelineCard.querySelector('.timeline-period-label').textContent = btn.dataset.period;
      timelineCard.querySelector('.timeline-title').textContent        = btn.dataset.title;
      timelineCard.querySelector('.timeline-desc').textContent         = btn.dataset.desc;
      timelineCard.querySelector('.timeline-focus').textContent        = btn.dataset.focus;
      timelineCard.querySelector('.timeline-milestone').textContent    = btn.dataset.milestone;

      var imgEl = timelineCard.querySelector('.timeline-card-img img');
      if (imgEl) { imgEl.src = btn.dataset.img; imgEl.alt = btn.dataset.imgAlt; }

      // Animação de entrada
      timelineCard.style.opacity   = '0';
      timelineCard.style.transform = 'translateY(10px)';
      setTimeout(function () {
        timelineCard.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        timelineCard.style.opacity    = '1';
        timelineCard.style.transform  = 'translateY(0)';
      }, 20);

      // Barra global
      if (animate !== false) animateProgressBar(index, INTERVAL_MS);
    }

    // ── Auto-advance ─────────────────────────────────────────────────────
    function startAutoAdvance() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        // Ao terminar o último, reseta a barra para o início antes de trocar
        if (currentTab === totalTabs - 1 && progressFill) {
          progressFill.style.transition = 'none';
          progressFill.style.width = '0%';
          void progressFill.offsetWidth;
        }
        currentTab = (currentTab + 1) % totalTabs;
        activateTab(currentTab);
      }, INTERVAL_MS);
    }

    // ── Clique manual ────────────────────────────────────────────────────
    timelineTabs.forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        isPaused   = true;
        currentTab = index;
        clearInterval(autoTimer);
        freezeProgressBar();
        activateTab(currentTab, false); // sem animar a barra no clique manual

        // Retoma após 8 s sem interação
        clearTimeout(window._tlResumeTimer);
        window._tlResumeTimer = setTimeout(function () {
          isPaused = false;
          animateProgressBar(currentTab, INTERVAL_MS);
          startAutoAdvance();
        }, 8000);
      });
    });

    // ── Pausa ao hover ───────────────────────────────────────────────────
    var timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
      timelineSection.addEventListener('mouseenter', function () {
        if (isPaused) return;
        clearInterval(autoTimer);
        clearTimeout(window._tlResumeTimer);
        freezeProgressBar();
      });
      timelineSection.addEventListener('mouseleave', function () {
        if (isPaused) return;
        animateProgressBar(currentTab, INTERVAL_MS);
        startAutoAdvance();
      });
    }

    // ── Inicia ───────────────────────────────────────────────────────────
    activateTab(0);
    startAutoAdvance();
  }

  /* -------------------------------------------------------------------------
     5. Dropdown de Serviços — abre/fecha com clique (suporte a touch)
  ------------------------------------------------------------------------- */
  var dropdown = document.querySelector('.nav-dropdown');

  if (dropdown) {
    var trigger = dropdown.querySelector('.nav-dropdown-trigger');

    // Clique no trigger (útil em touch/tablet)
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        // Só intercepta clique se não for dispositivo com hover real
        if (window.matchMedia('(hover: none)').matches) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }

    // Fecha ao clicar fora
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  /* -------------------------------------------------------------------------
     6. Botão WhatsApp — aparece após 3 segundos
  ------------------------------------------------------------------------- */
  var whatsappBtn = document.getElementById('whatsapp-btn');

  if (whatsappBtn) {
    setTimeout(function () {
      whatsappBtn.classList.add('visible');
    }, 3000);
  }

  /* -------------------------------------------------------------------------
     6. Scroll to top
  ------------------------------------------------------------------------- */
  var scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    // Exibe o botão após 320px de scroll
    window.addEventListener('scroll', function () {
      if (window.scrollY > 320) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    // Clique — volta ao topo com animação suave
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
