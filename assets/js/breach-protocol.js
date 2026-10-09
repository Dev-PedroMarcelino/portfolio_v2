/* ==========================================================================
   Breach Protocol — easter egg inspirado no minigame de Cyberpunk 2077.
   Abre pelo botão do rodapé, pelo console (breach()) ou com o Konami code.

   Regras: comece pela primeira linha; cada escolha alterna entre a coluna e
   a linha do último código. Complete as sequências antes de o buffer acabar.
   A matriz é gerada a partir de um caminho válido, então sempre há solução.
   ========================================================================== */
(() => {
  'use strict';

  const dialog = document.querySelector('[data-breach]');
  if (!dialog) return;

  // textos passam pelo tradutor PT/EN (i18n.js); sem ele, ficam em português
  const t = (text, vars) => (window.i18n ? window.i18n.t(text, vars) : text);

  const CODES = ['1C', '55', 'BD', 'E9', '7A', 'FF'];
  const SIZE = 5;
  const BUFFER_SIZE = 6;
  const PATH_LENGTH = 5; // 2 sequências de 3 que se sobrepõem em 1 código
  const DAEMONS = [
    { name: 'ICEPICK', desc: 'Derruba o firewall do portfólio' },
    { name: 'DATAMINE_V2', desc: 'Extrai o arquivo contato_pedro.dat' },
  ];

  const els = {
    matrix: dialog.querySelector('[data-breach-matrix]'),
    buffer: dialog.querySelector('[data-breach-buffer]'),
    daemons: dialog.querySelector('[data-breach-daemons]'),
    result: dialog.querySelector('[data-breach-result]'),
    reset: dialog.querySelector('[data-breach-reset]'),
  };

  let state = null;

  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const key = (r, c) => `${r},${c}`;
  const sameSequence = (a, b) => a.length === b.length && a.every((code, i) => code === b[i]);

  /* ------------------------------------------------------------ Geração */
  function buildPuzzle() {
    const matrix = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => pick(CODES)));
    const taken = new Set();
    const path = [];
    let axis = 'row';
    let line = 0;

    for (let step = 0; step < PATH_LENGTH; step += 1) {
      const options = [];
      for (let k = 0; k < SIZE; k += 1) {
        const [r, c] = axis === 'row' ? [line, k] : [k, line];
        if (!taken.has(key(r, c))) options.push([r, c]);
      }
      const [r, c] = pick(options);
      taken.add(key(r, c));
      path.push(matrix[r][c]);
      [axis, line] = axis === 'row' ? ['col', c] : ['row', r];
    }

    return { matrix, sequences: [path.slice(0, 3), path.slice(2, 5)] };
  }

  function newGame() {
    let puzzle = buildPuzzle();
    while (sameSequence(puzzle.sequences[0], puzzle.sequences[1])) puzzle = buildPuzzle();

    state = {
      matrix: puzzle.matrix,
      used: new Set(),
      axis: 'row',
      line: 0,
      buffer: [],
      hover: null,
      over: false,
      daemons: DAEMONS.map((daemon, i) => ({ ...daemon, seq: puzzle.sequences[i], done: false, failed: false })),
    };

    buildMatrix();
    render();
  }

  /* -------------------------------------------------------------- Regras */
  const isSelectable = (r, c) => !state.over
    && !state.used.has(key(r, c))
    && (state.axis === 'row' ? r === state.line : c === state.line);

  const containsSequence = (buffer, seq) => {
    for (let i = 0; i + seq.length <= buffer.length; i += 1) {
      if (seq.every((code, j) => buffer[i + j] === code)) return true;
    }
    return false;
  };

  // quantos códigos do início da sequência já estão no fim do buffer
  const progress = (buffer, seq) => {
    for (let n = Math.min(seq.length - 1, buffer.length); n > 0; n -= 1) {
      if (seq.slice(0, n).every((code, j) => buffer[buffer.length - n + j] === code)) return n;
    }
    return 0;
  };

  function evaluate() {
    const remaining = BUFFER_SIZE - state.buffer.length;

    state.daemons.forEach((daemon) => {
      if (daemon.done || daemon.failed) return;
      if (containsSequence(state.buffer, daemon.seq)) daemon.done = true;
      else if (daemon.seq.length - progress(state.buffer, daemon.seq) > remaining) daemon.failed = true;
    });

    const hasMoves = state.matrix.some((row, r) => row.some((_, c) => isSelectable(r, c)));
    const resolved = state.daemons.every((daemon) => daemon.done || daemon.failed);

    if (resolved || remaining === 0 || !hasMoves) {
      state.over = true;
      state.daemons.forEach((daemon) => { if (!daemon.done) daemon.failed = true; });
    }
  }

  function select(r, c) {
    if (!isSelectable(r, c)) return;
    state.used.add(key(r, c));
    state.buffer.push(state.matrix[r][c]);
    [state.axis, state.line] = state.axis === 'row' ? ['col', c] : ['row', r];
    state.hover = null;
    evaluate();
    render();

    // o botão clicado fica desabilitado; mantém o foco dentro do jogo
    const next = state.cells.find((cell) => !cell.disabled);
    (next ?? els.reset)?.focus();
  }

  /* ------------------------------------------------------------- Render */
  function buildMatrix() {
    state.cells = [];
    els.matrix.replaceChildren();

    for (let r = 0; r < SIZE; r += 1) {
      for (let c = 0; c < SIZE; c += 1) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cell';
        cell.textContent = state.matrix[r][c];
        cell.dataset.r = String(r);
        cell.dataset.c = String(c);
        cell.addEventListener('click', () => select(r, c));
        cell.addEventListener('pointerenter', () => setHover(r, c));
        cell.addEventListener('focus', () => setHover(r, c));
        cell.addEventListener('pointerleave', () => setHover(null));
        cell.addEventListener('blur', () => setHover(null));
        els.matrix.append(cell);
        state.cells.push(cell);
      }
    }
  }

  function setHover(r, c) {
    state.hover = r === null || !isSelectable(r, c) ? null : { r, c };
    renderMatrix();
  }

  function renderMatrix() {
    const preview = state.hover
      ? (state.axis === 'row' ? { axis: 'col', line: state.hover.c } : { axis: 'row', line: state.hover.r })
      : null;

    state.cells.forEach((cell) => {
      const r = Number(cell.dataset.r);
      const c = Number(cell.dataset.c);
      const used = state.used.has(key(r, c));
      const inLine = !state.over && (state.axis === 'row' ? r === state.line : c === state.line);
      const inPreview = preview && (preview.axis === 'row' ? r === preview.line : c === preview.line);

      cell.classList.toggle('is-used', used);
      cell.classList.toggle('is-line', inLine);
      cell.classList.toggle('is-preview', Boolean(inPreview) && !inLine);
      cell.disabled = !isSelectable(r, c);
      cell.setAttribute('aria-label', t('Linha {r}, coluna {c}: {code}', { r: r + 1, c: c + 1, code: used ? t('já usado') : state.matrix[r][c] }));
    });
  }

  function renderBuffer() {
    els.buffer.replaceChildren(...Array.from({ length: BUFFER_SIZE }, (_, i) => {
      const slot = document.createElement('li');
      const code = state.buffer[i];
      slot.className = `buffer-slot${code ? ' is-filled' : ''}`;
      slot.textContent = code ?? '';
      if (!code) slot.setAttribute('aria-label', t('vazio'));
      return slot;
    }));
  }

  function renderDaemons() {
    els.daemons.replaceChildren(...state.daemons.map((daemon) => {
      const item = document.createElement('li');
      item.className = `daemon${daemon.done ? ' is-done' : ''}${daemon.failed ? ' is-failed' : ''}`;
      const matched = daemon.done ? daemon.seq.length : progress(state.buffer, daemon.seq);
      const stateLabel = t(daemon.done ? 'Carregado' : daemon.failed ? 'Falhou' : 'Pendente');

      item.innerHTML = `
        <div class="daemon__codes">${daemon.seq.map((code, i) => `<span class="${i < matched ? 'is-matched' : ''}">${code}</span>`).join('')}</div>
        <div>
          <p class="daemon__name">${daemon.name}</p>
          <p class="daemon__desc">${t(daemon.desc)}</p>
        </div>
        <span class="daemon__state">${stateLabel}</span>`;
      return item;
    }));
  }

  function renderResult() {
    els.result.className = 'breach__result';
    if (!state.over) {
      els.result.replaceChildren();
      return;
    }

    const done = state.daemons.filter((daemon) => daemon.done).length;

    if (done === state.daemons.length) {
      els.result.classList.add('is-success');
      els.result.innerHTML = `
        <p class="breach__result-title">${t('Acesso concedido')}</p>
        <p>${t('Firewall derrubado e arquivo extraído: <code>contato_pedro.dat</code>. Brincadeiras à parte, o convite é sério — vamos conversar?')}</p>
        <div class="breach__result-actions">
          <a class="btn btn--sm" href="${t('mailto:pedromarcelinoh7@gmail.com?subject=Breach%20protocol%20conclu%C3%ADdo')}">${t('Enviar e-mail')}</a>
          <a class="btn btn--sm btn--ghost" href="#contato" data-breach-close>${t('Ver contatos')}</a>
        </div>`;
    } else if (done > 0) {
      els.result.classList.add('is-partial');
      els.result.innerHTML = `
        <p class="breach__result-title">${t('Acesso parcial')}</p>
        <p>${t('Um daemon foi carregado, mas o buffer não deu conta do outro. Gere uma nova matriz e tente fechar as duas sequências.')}</p>`;
    } else {
      els.result.classList.add('is-fail');
      els.result.innerHTML = `
        <p class="breach__result-title">${t('Breach falhou')}</p>
        <p>${t('O ICE venceu desta vez. Gere uma nova matriz e tente de novo.')}</p>`;
    }
  }

  function render() {
    renderMatrix();
    renderBuffer();
    renderDaemons();
    renderResult();
  }

  /* ------------------------------------------------------- Abrir/fechar */
  function open() {
    newGame();
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    state.cells.find((cell) => !cell.disabled)?.focus();
  }

  // a rolagem da página trava via CSS (html:has(.breach[open])) e o navegador
  // devolve o foco para quem abriu o diálogo ao fechar
  function close() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-breach-close]')) close();
  });

  els.reset?.addEventListener('click', () => {
    newGame();
    state.cells.find((cell) => !cell.disabled)?.focus();
  });

  document.querySelectorAll('[data-breach-open]').forEach((button) => {
    button.addEventListener('click', open);
  });

  // troca de idioma com o jogo aberto: redesenha os textos gerados aqui
  document.addEventListener('langchange', () => {
    if (state) render();
  });

  /* ------------------------------------------------------- Konami code */
  const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let konami = 0;

  document.addEventListener('keydown', (event) => {
    const pressed = event.key.toLowerCase();
    if (pressed === KONAMI[konami]) konami += 1;
    else if (pressed === 'arrowup') konami = konami >= 2 ? 2 : 1;
    else konami = 0;

    if (konami === KONAMI.length) {
      konami = 0;
      if (!dialog.open) open();
    }
  });

  /* ------------------------------------------------------------ Console */
  window.breach = () => {
    open();
    return t('Breach protocol iniciado. Boa sorte, netrunner.');
  };

  console.log(
    '%c PH // 2077 %c Pedro Henrique Marcelino — Desenvolvedor Fullstack ',
    'background:#fcee0a;color:#000;font:700 12px monospace;padding:4px 6px',
    'background:#0f0f15;color:#ecebe6;font:500 12px monospace;padding:4px 6px',
  );
  console.log(`%c${t('Wake up, samurai. Temos sistemas para construir.')}`, 'color:#00f0ff;font:500 12px monospace');
  console.log(`%c${t('> digite breach() para iniciar o breach protocol · pedromarcelinoh7@gmail.com')}`, 'color:#8b8a92;font:12px monospace');
})();
