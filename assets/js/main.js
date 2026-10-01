/* ==========================================================================
   Pedro Henrique Marcelino — Portfólio · interações
   - Menu mobile, link ativo na navegação e header ao rolar
   - Revelação ao rolar + efeito "decode" nos textos monoespaçados
   - Relógio (horário de Brasília), copiar e-mail e ano do rodapé
   - Spotlight que segue o cursor nos cards
   ========================================================================== */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------ Menu mobile */
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const toggleLabel = document.querySelector('[data-nav-label]');
  const desktop = window.matchMedia('(min-width: 1080px)');
  // enquanto o menu está aberto, o resto da página fica inerte (foco preso no menu)
  const behindMenu = [document.querySelector('.statusbar'), document.querySelector('main'), document.querySelector('.site-footer')];

  const setMenu = (open) => {
    if (!header || !toggle) return;
    header.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (toggleLabel) toggleLabel.textContent = open ? 'Fechar' : 'Menu';
    document.body.classList.toggle('no-scroll', open);
    behindMenu.forEach((el) => { if (el) el.inert = open; });
  };

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header?.classList.contains('is-menu-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  desktop.addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  /* ------------------------------------------------------- Header ao rolar */
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------- Link ativo na seção */
  const navLinks = [...document.querySelectorAll('.nav__link')];
  const sections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = navLinks.find((item) => item.hash === `#${entry.target.id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((item) => item.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        } else if (link.hasAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => spy.observe(section));
  }

  /* ------------------------------------- Decode (só em fonte monoespaçada,
     então trocar caracteres não muda a largura do texto) */
  const GLYPHS = 'ABCDEF0123456789#$%&*+-/<>[]{}=?';

  const decode = (el) => {
    const finalText = el.dataset.final ?? el.textContent;
    el.dataset.final = finalText;
    if (reduceMotion.matches) {
      el.textContent = finalText;
      return;
    }

    const duration = Math.min(1100, 320 + finalText.length * 28);
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(progress * finalText.length);
      let output = '';
      for (let i = 0; i < finalText.length; i += 1) {
        const char = finalText[i];
        output += i < revealed || char === ' ' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = output;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    };

    requestAnimationFrame(frame);
    // garantia: se o rAF pausar (aba em segundo plano), o texto final não fica embaralhado
    window.setTimeout(() => { el.textContent = finalText; }, duration + 200);
  };

  /* ---------------------------------------------------- Revelação ao rolar */
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const siblingCount = new Map();

  // escalonamento automático entre irmãos; data-reveal-delay (ms) sobrescreve
  revealItems.forEach((el) => {
    const index = siblingCount.get(el.parentElement) ?? 0;
    siblingCount.set(el.parentElement, index + 1);
    const delay = el.dataset.revealDelay ?? Math.min(index, 5) * 80;
    el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const reveal = (el) => {
    el.classList.add('is-visible');
    const delay = Number.parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0;
    const targets = el.matches('[data-decode]') ? [el] : [...el.querySelectorAll('[data-decode]')];
    if (targets.length) window.setTimeout(() => targets.forEach(decode), delay);
  };

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  /* -------------------------------------------- Relógio (Brasília / BRT) */
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const format = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });
    const tick = () => {
      const now = new Date();
      clock.textContent = format.format(now);
      clock.dateTime = now.toISOString();
    };
    tick();
    window.setInterval(tick, 20000);
  }

  /* ----------------------------------------------------------- Copiar e-mail */
  const copyStatus = document.querySelector('[data-copy-status]');

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback para contextos sem a Clipboard API (ex.: arquivo aberto direto do disco)
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      field.remove();
      return ok;
    }
  };

  document.querySelectorAll('[data-copy]').forEach((button) => {
    const label = button.querySelector('[data-copy-label]') ?? button;
    const original = label.textContent;
    let timer;

    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      const ok = await copyText(value);
      label.textContent = ok ? 'E-mail copiado ✓' : value;
      if (copyStatus) {
        copyStatus.textContent = ok
          ? 'E-mail copiado para a área de transferência.'
          : `Não foi possível copiar automaticamente. E-mail: ${value}`;
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { label.textContent = original; }, 2400);
    });
  });

  /* ------------------------------------------------------------ Ano atual */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ----------------------------------------- Spotlight nos cards (desktop) */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-spotlight]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  }
})();
