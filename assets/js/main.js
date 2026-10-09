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
  // textos gerados aqui passam pelo tradutor (i18n.js); sem ele, ficam em português
  const t = (text, vars) => (window.i18n ? window.i18n.t(text, vars) : text);

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
    if (toggleLabel) toggleLabel.textContent = open ? t('Fechar') : t('Menu');
    document.body.classList.toggle('no-scroll', open);
    behindMenu.forEach((el) => { if (el) el.inert = open; });
  };

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));

  document.addEventListener('langchange', () => {
    if (toggleLabel) toggleLabel.textContent = toggle?.getAttribute('aria-expanded') === 'true' ? t('Fechar') : t('Menu');
  });

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

    // o texto final é relido de data-final: se o idioma mudar no meio, termina no idioma novo
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
      else el.textContent = el.dataset.final;
    };

    requestAnimationFrame(frame);
    // garantia: se o rAF pausar (aba em segundo plano), o texto final não fica embaralhado
    window.setTimeout(() => { el.textContent = el.dataset.final; }, duration + 200);
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
      label.textContent = ok ? t('E-mail copiado ✓') : value;
      if (copyStatus) {
        copyStatus.textContent = ok
          ? t('E-mail copiado para a área de transferência.')
          : t('Não foi possível copiar automaticamente. E-mail: {email}', { email: value });
      }
      window.clearTimeout(timer);
      // volta ao rótulo original no idioma atual
      timer = window.setTimeout(() => {
        if (!window.i18n?.restore(label)) label.textContent = original;
      }, 2400);
    });
  });

  /* ------------------------------------------------------------ Ano atual */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------- Vídeos do card Braindance (fundo + player, lazy) */
  // só baixam quando o card chega perto da tela e pausam quando ele sai
  const lazyVideos = document.querySelectorAll('[data-lazy-video]');
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const canAutoplay = () => !reduceMotion.matches && !saveData;
  const wantsPlay = new Map();
  const onScreen = new Map();

  const loadVideo = (video) => {
    if (video.dataset.loaded) return;
    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
    });
    video.load();
    video.dataset.loaded = 'true';
  };

  const playVideo = (video) => {
    loadVideo(video);
    video.play().catch(() => {});
  };

  // troca a fonte (versão leve do fundo <-> 720p com áudio) continuando do mesmo ponto
  const setSource = (video, url) => {
    const source = video.querySelector('source');
    if (!source || !url || source.src === url) return;
    const time = video.currentTime;
    source.src = url;
    video.dataset.loaded = 'true';
    video.load();
    if (time) video.addEventListener('loadedmetadata', () => { video.currentTime = time; }, { once: true });
  };

  lazyVideos.forEach((video) => wantsPlay.set(video, canAutoplay()));

  // os vídeos são pesados e dividem a conexão: o fundo só começa a baixar
  // depois que o player em destaque já tem buffer para tocar sem travar
  const bgVideo = document.querySelector('.bd__video');
  const playerVideo = document.querySelector('[data-player-video]');
  let bgUnlocked = !playerVideo;
  const isGated = (video) => video === bgVideo && !bgUnlocked;
  const canStart = (video) => wantsPlay.get(video) && onScreen.get(video) && !isGated(video);

  const unlockBg = () => {
    if (bgUnlocked) return;
    bgUnlocked = true;
    if (bgVideo && !bgVideo.dataset.diving && canStart(bgVideo)) playVideo(bgVideo);
  };

  // libera quando o player tem ~20 s de folga (ou já baixou tudo); em conexão lenta o fundo espera
  const checkPlayerBuffer = () => {
    const { buffered, currentTime, duration } = playerVideo;
    if (!buffered.length || !duration) return;
    const end = buffered.end(buffered.length - 1);
    if (end - currentTime >= 20 || end >= duration - 1) unlockBg();
  };

  if (playerVideo) {
    playerVideo.addEventListener('progress', checkPlayerBuffer);
    playerVideo.addEventListener('timeupdate', checkPlayerBuffer);
    playerVideo.querySelector('source')?.addEventListener('error', unlockBg, { once: true });
  }

  // "carregando sinal" na tela quando a conexão não acompanha o vídeo
  lazyVideos.forEach((video) => {
    const stopBuffering = () => video.parentElement.classList.remove('is-buffering');
    video.addEventListener('waiting', () => video.parentElement.classList.add('is-buffering'));
    ['playing', 'pause', 'emptied'].forEach((type) => video.addEventListener(type, stopBuffering));
    // se o arquivo falhar, fica o poster, sem o aviso preso na tela
    video.querySelector('source')?.addEventListener('error', stopBuffering);
  });

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (video.dataset.diving) return; // está no modo braindance, fora do card
        onScreen.set(video, entry.isIntersecting);
        if (!entry.isIntersecting) video.pause();
        else if (canStart(video)) playVideo(video);
      });
    }, { rootMargin: '200px 0px' });
    lazyVideos.forEach((video) => videoObserver.observe(video));
  }

  // controles do player: pausar/tocar e som
  const playerPlay = document.querySelector('[data-player-play]');
  const playerSound = document.querySelector('[data-player-sound]');
  const playerTime = document.querySelector('[data-player-time]');

  const syncPlayerPlay = () => {
    if (playerPlay) playerPlay.textContent = wantsPlay.get(playerVideo) ? t('Pausar') : t('Tocar');
  };

  if (playerVideo) {
    syncPlayerPlay();
    document.addEventListener('langchange', syncPlayerPlay);

    playerPlay?.addEventListener('click', () => {
      const play = !wantsPlay.get(playerVideo);
      wantsPlay.set(playerVideo, play);
      if (play) playVideo(playerVideo);
      else {
        playerVideo.pause();
        unlockBg(); // com o player parado, a conexão fica livre para o fundo
      }
      syncPlayerPlay();
    });

    playerSound?.addEventListener('click', () => {
      playerVideo.muted = !playerVideo.muted;
      playerSound.setAttribute('aria-pressed', String(!playerVideo.muted));
      if (!playerVideo.muted && !wantsPlay.get(playerVideo)) {
        wantsPlay.set(playerVideo, true);
        playVideo(playerVideo);
        syncPlayerPlay();
      }
    });

    playerVideo.addEventListener('timeupdate', () => {
      if (!playerTime) return;
      const seconds = Math.floor(playerVideo.currentTime);
      playerTime.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    });
  }

  // retoma (ou pausa) os vídeos do card conforme a preferência e a posição na tela
  const resumeCardVideos = () => {
    lazyVideos.forEach((video) => {
      if (video.dataset.diving) return;
      if (canStart(video)) playVideo(video);
      else video.pause();
    });
  };

  reduceMotion.addEventListener('change', () => {
    lazyVideos.forEach((video) => wantsPlay.set(video, canAutoplay()));
    resumeCardVideos();
    syncPlayerPlay();
  });

  /* ------------- Modo braindance: o vídeo de fundo sai do card, com áudio */
  const dive = document.querySelector('[data-dive]');
  const diveVideo = document.querySelector('.bd__video');

  if (dive && diveVideo) {
    const home = diveVideo.parentElement;
    const screen = dive.querySelector('[data-dive-screen]');
    const playButton = dive.querySelector('[data-dive-play]');
    const audioButton = dive.querySelector('[data-dive-audio]');
    const layerButtons = dive.querySelectorAll('[data-dive-layer]');
    const scrub = dive.querySelector('[data-dive-scrub]');
    const timeEl = dive.querySelector('[data-dive-time]');
    const resEl = dive.querySelector('[data-dive-res]');
    const durEl = dive.querySelector('[data-dive-dur]');
    const wave = dive.querySelector('[data-dive-wave]');
    const waveCtx = wave.getContext('2d');
    let audio = null; // { ctx, analyser, data } — ou false se o navegador não suportar
    let frame = 0;
    let scrubbing = false;

    const clock = (seconds) => {
      const s = Math.max(0, Math.floor(seconds || 0));
      return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    };

    const syncMeta = () => {
      if (diveVideo.videoWidth) {
        screen.style.aspectRatio = `${diveVideo.videoWidth} / ${diveVideo.videoHeight}`;
        resEl.textContent = `${diveVideo.videoWidth}×${diveVideo.videoHeight}`;
      }
      if (diveVideo.duration) durEl.textContent = clock(diveVideo.duration);
    };

    const syncTime = () => {
      const duration = diveVideo.duration || 0;
      timeEl.textContent = `${clock(diveVideo.currentTime)} / ${clock(duration)}`;
      if (!scrubbing && duration) scrub.value = String(Math.round((diveVideo.currentTime / duration) * 1000));
      scrub.style.setProperty('--progress', `${scrub.value / 10}%`);
    };

    const syncPlay = () => {
      playButton.textContent = diveVideo.paused ? t('Tocar') : t('Pausar');
    };

    const setLayer = (layer) => {
      layerButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.diveLayer === layer)));
      screen.classList.toggle('is-thermal', layer === 'thermal');
    };

    const setMuted = (muted) => {
      diveVideo.muted = muted;
      audioButton.setAttribute('aria-pressed', String(!muted));
    };

    // o analisador de áudio alimenta a "onda" da linha do tempo
    const setupAudio = () => {
      if (audio !== null) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      try {
        const ctx = new AudioCtx();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        ctx.createMediaElementSource(diveVideo).connect(analyser);
        analyser.connect(ctx.destination);
        audio = { ctx, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
      } catch {
        audio = false;
      }
    };

    const drawWave = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = Math.round(wave.clientWidth * ratio);
      const height = Math.round(wave.clientHeight * ratio);
      if (wave.width !== width || wave.height !== height) {
        wave.width = width;
        wave.height = height;
      }

      const live = audio && !diveVideo.paused && !diveVideo.muted;
      if (live) audio.analyser.getByteFrequencyData(audio.data);

      const bars = Math.max(24, Math.min(72, Math.floor(wave.clientWidth / 9)));
      const step = width / bars;
      const played = (Number(scrub.value) / 1000) * bars;
      waveCtx.clearRect(0, 0, width, height);
      for (let i = 0; i < bars; i += 1) {
        const level = live ? audio.data[Math.floor((i / bars) * audio.data.length * 0.75)] / 255 : 0.06;
        const barHeight = Math.max(ratio * 2, level * height);
        waveCtx.fillStyle = i < played ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.28)';
        waveCtx.fillRect(i * step + ratio, height - barHeight, Math.max(ratio, step - ratio * 3), barHeight);
      }

      if (dive.open && !reduceMotion.matches) frame = requestAnimationFrame(drawWave);
    };

    const openDive = () => {
      setupAudio();
      if (audio) audio.ctx.resume();

      // pausa o player do card e traz o vídeo de fundo para a tela do braindance, já na versão 720p com áudio
      lazyVideos.forEach((video) => { if (video !== diveVideo) video.pause(); });
      bgUnlocked = true;
      diveVideo.dataset.diving = 'true';
      diveVideo.parentElement.classList.remove('is-buffering');
      screen.prepend(diveVideo);
      setSource(diveVideo, diveVideo.dataset.srcHd);
      setMuted(false);
      setLayer('visual');
      playVideo(diveVideo);

      if (typeof dive.showModal === 'function') dive.showModal();
      else dive.setAttribute('open', '');

      syncMeta();
      syncTime();
      syncPlay();
      cancelAnimationFrame(frame);
      drawWave();
    };

    // devolve o vídeo ao card, mudo, na camada normal e na versão leve, de onde parou
    const onDiveClosed = () => {
      cancelAnimationFrame(frame);
      setMuted(true);
      setLayer('visual');
      screen.classList.remove('is-buffering');
      home.prepend(diveVideo);
      setSource(diveVideo, diveVideo.querySelector('source')?.dataset.src);
      delete diveVideo.dataset.diving;
      if (audio) audio.ctx.suspend();
      resumeCardVideos();
    };

    const closeDive = () => {
      if (typeof dive.close === 'function') dive.close();
      else {
        dive.removeAttribute('open');
        onDiveClosed();
      }
    };

    dive.addEventListener('close', onDiveClosed);
    dive.querySelector('[data-dive-close]')?.addEventListener('click', closeDive);
    document.querySelectorAll('[data-dive-open]').forEach((button) => button.addEventListener('click', openDive));

    playButton.addEventListener('click', () => {
      if (diveVideo.paused) playVideo(diveVideo);
      else diveVideo.pause();
    });

    audioButton.addEventListener('click', () => {
      setMuted(!diveVideo.muted);
      if (audio) audio.ctx.resume();
    });

    layerButtons.forEach((button) => {
      button.addEventListener('click', () => setLayer(button.dataset.diveLayer));
    });

    scrub.addEventListener('input', () => {
      scrubbing = true;
      if (diveVideo.duration) diveVideo.currentTime = (Number(scrub.value) / 1000) * diveVideo.duration;
      syncTime();
    });
    scrub.addEventListener('change', () => { scrubbing = false; });

    diveVideo.addEventListener('loadedmetadata', syncMeta);
    diveVideo.addEventListener('timeupdate', () => {
      if (!diveVideo.dataset.diving) return;
      syncTime();
      if (reduceMotion.matches) drawWave(); // sem animação contínua: atualiza junto com o tempo
    });
    diveVideo.addEventListener('play', syncPlay);
    diveVideo.addEventListener('pause', syncPlay);
    document.addEventListener('langchange', syncPlay);
  }

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
