/**
 * FMEA Engineering — Formulário de contato
 * Validação client-side + envio via Fetch para api/contact.php
 */

;(function () {
  'use strict';

  const MIN_MSG_CHARS = 20;
  const MAX_MSG_CHARS = 2000;

  /* -------------------------------------------------------------------------
     Utilitários de validação
  ------------------------------------------------------------------------- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidCnpj(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    function calcDigit(cnpj, weights) {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(cnpj[i]) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    }

    const w1 = [5,4,3,2,9,8,7,6,5,4,3,2];
    const w2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    const d1 = calcDigit(cnpj, w1);
    const d2 = calcDigit(cnpj, w2);

    return d1 === parseInt(cnpj[12]) && d2 === parseInt(cnpj[13]);
  }

  function formatCnpj(value) {
    const digits = value.replace(/\D/g, '').slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  /* -------------------------------------------------------------------------
     Exibe/limpa erro de campo
  ------------------------------------------------------------------------- */
  function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errEl = document.getElementById(fieldId + '-error');
    if (field) field.classList.toggle('error', !!message);
    if (errEl) errEl.textContent = message || '';
  }

  function clearAllErrors(form) {
    form.querySelectorAll('.form-input, .form-textarea').forEach(function (el) {
      el.classList.remove('error');
    });
    form.querySelectorAll('.form-error').forEach(function (el) {
      el.textContent = '';
    });
  }

  /* -------------------------------------------------------------------------
     Mostra feedback (sucesso ou erro)
  ------------------------------------------------------------------------- */
  function showFeedback(form, type, text) {
    const el = form.querySelector('.form-feedback');
    if (!el) return;
    el.className = 'form-feedback ' + type;
    el.textContent = text;
  }

  function hideFeedback(form) {
    const el = form.querySelector('.form-feedback');
    if (el) el.className = 'form-feedback';
  }

  /* -------------------------------------------------------------------------
     Valida os dados do formulário
  ------------------------------------------------------------------------- */
  function validateForm(data) {
    const errors = {};

    if (!data.requesterName.trim() || data.requesterName.trim().length < 3) {
      errors.requesterName = 'Informe o nome completo do solicitante.';
    }

    if (!data.company.trim() || data.company.trim().length < 2) {
      errors.company = 'Informe a empresa.';
    }

    if (!isValidCnpj(data.cnpj)) {
      errors.cnpj = 'Informe um CNPJ válido.';
    }

    if (!isValidEmail(data.email)) {
      errors.email = 'Informe um e-mail válido.';
    }

    const msg = data.message.trim();
    if (!msg || msg.length < MIN_MSG_CHARS) {
      errors.message = 'A mensagem deve ter no mínimo ' + MIN_MSG_CHARS + ' caracteres.';
    } else if (msg.length > MAX_MSG_CHARS) {
      errors.message = 'A mensagem deve ter no máximo ' + MAX_MSG_CHARS + ' caracteres.';
    }

    return errors;
  }

  /* -------------------------------------------------------------------------
     Inicializa um formulário de contato
  ------------------------------------------------------------------------- */
  function initForm(form) {
    if (!form) return;

    // Máscara de CNPJ
    const cnpjInput = form.querySelector('#cnpj');
    if (cnpjInput) {
      cnpjInput.addEventListener('input', function () {
        this.value = formatCnpj(this.value);
      });
    }

    // Contador de caracteres na mensagem
    const msgInput = form.querySelector('#message');
    const msgCount = form.querySelector('.msg-counter');
    if (msgInput && msgCount) {
      msgInput.addEventListener('input', function () {
        const len = this.value.length;
        msgCount.textContent = len + '/' + MAX_MSG_CHARS;
        msgCount.style.color = len > MAX_MSG_CHARS ? '#dc2626' : 'rgba(1,61,35,0.55)';
      });
    }

    // Submit
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      hideFeedback(form);
      clearAllErrors(form);

      const data = {
        requesterName: form.querySelector('#requesterName')?.value ?? '',
        company:       form.querySelector('#company')?.value ?? '',
        cnpj:          form.querySelector('#cnpj')?.value ?? '',
        email:         form.querySelector('#email')?.value ?? '',
        message:       form.querySelector('#message')?.value ?? '',
        website:       form.querySelector('#website')?.value ?? '' // honeypot
      };

      // Validação client-side
      const errors = validateForm(data);

      if (Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(function ([field, msg]) {
          setError(field, msg);
        });
        // Foca no primeiro campo com erro
        const firstErrorField = form.querySelector('.error');
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Desabilita botão durante envio
      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      try {
        // Determina o caminho da API (funciona em qualquer subdiretório)
        const formAction = form.getAttribute('action') || 'api/contact';

        const response = await fetch(formAction, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          showFeedback(form, 'error', result.message || 'Não foi possível enviar. Tente novamente em instantes.');
          return;
        }

        showFeedback(form, 'success', result.message || 'Solicitação enviada com sucesso!');
        form.reset();
        if (msgCount) msgCount.textContent = '0/' + MAX_MSG_CHARS;

      } catch (err) {
        showFeedback(form, 'error', 'Falha de conexão. Verifique sua rede e tente novamente.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    });
  }

  // Inicializa todos os formulários da página
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.contact-form').forEach(initForm);
  });

})();
