/**
 * FMEA Engineering — Animações
 * Contador de estatísticas com IntersectionObserver
 */

;(function () {
  'use strict';

  const SESSION_KEY = 'fmea-stats-animated';

  /* -------------------------------------------------------------------------
     Contador animado
  ------------------------------------------------------------------------- */
  function animateCounter(el, target, duration) {
    const startTime = performance.now();
    const start = 0;

    function step(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);

      el.textContent = current.toLocaleString('pt-BR');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('pt-BR');
      }
    }

    requestAnimationFrame(step);
  }

  /* -------------------------------------------------------------------------
     Inicializa contadores
  ------------------------------------------------------------------------- */
  function initCounters() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const counterEls = statsSection.querySelectorAll('.counter');
    const statCards  = statsSection.querySelectorAll('.stat-card');

    if (counterEls.length === 0) return;

    const wasAnimated = sessionStorage.getItem(SESSION_KEY) === 'true';

    function runCounters() {
      // Mostra os cards
      statCards.forEach(function (card, index) {
        setTimeout(function () {
          card.classList.add('visible');
        }, index * 60);
      });

      // Anima os contadores
      counterEls.forEach(function (el) {
        const target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) {
          animateCounter(el, target, 1900);
        }
      });

      sessionStorage.setItem(SESSION_KEY, 'true');
    }

    if (wasAnimated) {
      // Já animou antes — apenas mostra o valor final
      statCards.forEach(function (card) { card.classList.add('visible'); });
      counterEls.forEach(function (el) {
        const target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) {
          el.textContent = target.toLocaleString('pt-BR');
        }
      });
      return;
    }

    // Observa quando a seção fica visível
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounters();
            observer.disconnect();
          }
        });
      }, { threshold: 0.35 });

      observer.observe(statsSection);
    } else {
      runCounters();
    }
  }

  document.addEventListener('DOMContentLoaded', initCounters);

})();
