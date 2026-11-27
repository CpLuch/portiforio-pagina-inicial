/* Franquias em leque + cards + som por franquia (quando os arquivos forem adicionados). */
(() => {
  'use strict';
  const data = window.JOGOS_DADOS;
  const raiz = document.getElementById('jogos-franquias');
  const avulsos = document.getElementById('jogos-avulsos');
  const erro = document.getElementById('jogos-erro');
  if (!raiz || !avulsos || !data || !Array.isArray(data.franquias) || !Array.isArray(data.avulsos)) {
    if (erro) erro.hidden = false;
    return;
  }
  const audioContainer = document.getElementById('jogos-audio-container');
  const audioToggle = document.getElementById('jogos-audio-toggle');
  const audioMsg = document.getElementById('jogos-audio-msg');
  const desktopMsg = document.getElementById('jogos-audio-desktop-msg');
  const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
  const modal = document.getElementById('jogos-modal');
  const modalPainel = modal.querySelector('.jogos-modal-painel');
  const modalTitulo = document.getElementById('jogos-modal-titulo');
  const modalContador = document.getElementById('jogos-modal-contador');
  const modalLista = document.getElementById('jogos-modal-lista');
  const modalFechar = document.getElementById('jogos-modal-fechar');
  let franquiaAberta = null;
  let focoAnterior = null;
  let elementosInertes = [];

  const trilhasDisponiveis = data.franquias.some(f => f.musica) || data.avulsos.some(g => g.musica);
  const player = new Audio();
  player.preload = 'none';
  player.loop = true;
  let musicaAtual = '';
  let donoAtual = '';
  let autorizadoMobile = false;
  let frame = 0;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function avisar(mensagem) {
    if (mouse.matches) { desktopMsg.hidden = !mensagem; desktopMsg.textContent = mensagem; }
    else { audioMsg.textContent = mensagem; }
  }
  function cancelarFade() { if (frame) { cancelAnimationFrame(frame); frame = 0; } }
  function parar(suave = true) {
    cancelarFade();
    musicaAtual = '';
    donoAtual = '';
    if (player.paused) return;
    if (!suave) { player.pause(); player.currentTime = 0; return; }
    const volInicio = player.volume;
    const inicio = performance.now();
    function tick(now) {
      const progresso = Math.min(1, (now - inicio) / 230);
      player.volume = Math.max(0, volInicio * (1 - progresso));
      if (progresso < 1) frame = requestAnimationFrame(tick);
      else { frame = 0; player.pause(); player.currentTime = 0; }
    }
    frame = requestAnimationFrame(tick);
  }
  async function tocar(id, caminho) {
    if (!caminho || (!mouse.matches && !autorizadoMobile)) return;
    if (id === donoAtual && !player.paused) return;
    cancelarFade();
    player.pause();
    player.src = caminho;
    player.load();
    player.volume = .22;
    donoAtual = id;
    musicaAtual = caminho;
    try {
      await player.play();
      if (donoAtual === id) avisar('');
    } catch (e) {
      if (donoAtual === id) {
        donoAtual = ''; musicaAtual = '';
        avisar(mouse.matches
          ? 'Seu navegador bloqueou o som no primeiro movimento do mouse. Clique em um leque para liberar o áudio.'
          : 'Não foi possível reproduzir a trilha. Confira se o MP3 está na pasta sons/jogos/.');
      }
    }
  }
  function img(game, decorativa = false) {
    const image = el('img');
    image.src = game.imagem;
    image.alt = decorativa ? '' : `Arte de ${game.nome}`;
    image.loading = 'lazy'; image.decoding = 'async';
    image.width = 600; image.height = 900;
    image.addEventListener('error', () => {
      const aviso = el('div','jogos-sem-capa',game.nome);
      image.replaceWith(aviso);
    }, {once:true});
    return image;
  }
  function criarCard(game) {
    const card = el('article','jogos-card');
    const capa = el('div','jogos-capa');
    capa.append(img(game));
    const info = el('div','jogos-card-dados');
    const h3 = el('h3','',game.nome);
    const ano = el('p','jogos-card-ano',String(game.ano));
    const sinopse = el('p','jogos-card-sinopse',game.sinopse);
    const nota = el('div','jogos-card-rodape');
    const forte = el('strong','jogos-nota');
    const estrela = el('span','jogos-nota-estrela','★');
    estrela.setAttribute('aria-hidden','true');
    forte.append(estrela,document.createTextNode(`${game.nota}/10`));
    nota.append(forte);
    info.append(h3,ano,sinopse,nota);
    card.append(capa,info);
    return card;
  }
  function abrirModal(franquia) {
    if (!modal.hidden) return;
    focoAnterior = document.activeElement;
    franquiaAberta = franquia.id;
    modalTitulo.textContent = franquia.nome;
    modalContador.textContent = `${franquia.jogos.length} ${franquia.jogos.length === 1 ? 'jogo' : 'jogos'}`;
    modalLista.replaceChildren(...franquia.jogos.map(criarCard));
    modal.hidden = false;
    // Reinicia a rolagem após exibir o modal: antes, com display:none,
    // a posição podia ser restaurada no meio da lista pelo navegador.
    modalLista.scrollTop = 0;
    requestAnimationFrame(() => {
      if (!modal.hidden) modalLista.scrollTop = 0;
    });
    document.body.classList.add('jogos-modal-ativo');
    // Acessibilidade: a navegação do site fica fora da sequência de foco enquanto o pop-up está aberto.
    elementosInertes = [...document.body.children]
      .filter(elemento => elemento !== modal && elemento.tagName !== 'SCRIPT')
      .map(elemento => ({elemento, estavaInerte: elemento.inert}));
    elementosInertes.forEach(({elemento}) => { elemento.inert = true; });
    modalFechar.focus({preventScroll:true});
    // Em telas de toque, abrir um leque também inicia a música se o visitante já a habilitou.
    if (franquia.musica && (!mouse.matches && autorizadoMobile || mouse.matches)) tocar(franquia.id, franquia.musica);
  }
  function fecharModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    franquiaAberta = null;
    modalLista.replaceChildren();
    modalLista.scrollTop = 0;
    document.body.classList.remove('jogos-modal-ativo');
    elementosInertes.forEach(({elemento, estavaInerte}) => { elemento.inert = estavaInerte; });
    elementosInertes = [];
    parar();
    if (focoAnterior?.isConnected) focoAnterior.focus({preventScroll:true});
    focoAnterior = null;
  }
  modalFechar.addEventListener('click', fecharModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) fecharModal();
  });
  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); fecharModal(); return; }
    if (event.key !== 'Tab') return;
    const controles = [...modal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
      .filter(elemento => elemento.getClientRects().length);
    if (!controles.length) { event.preventDefault(); modalPainel.focus(); return; }
    const primeiro = controles[0];
    const ultimo = controles[controles.length - 1];
    if (event.shiftKey && document.activeElement === primeiro) { event.preventDefault(); ultimo.focus(); }
    else if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primeiro.focus(); }
  });

  function criarFranquia(franquia) {
    const box = el('article','jogos-grupo');
    box.id = `grupo-${franquia.id}`;
    const botao = el('button','jogos-grupo-trigger');
    botao.type = 'button';
    botao.setAttribute('aria-haspopup','dialog');
    botao.setAttribute('aria-label',`Abrir janela da franquia ${franquia.nome}, ${franquia.jogos.length} jogos`);
    const leque = el('span','jogos-leque' + (franquia.jogos.length === 2 ? ' leque-dois' : ''));
    leque.setAttribute('aria-hidden','true');
    for (const g of franquia.jogos.slice(0,3)) leque.append(img(g,true));
    const textos = el('span','jogos-grupo-texto');
    const nome = el('span','jogos-grupo-nome',franquia.nome);
    const count = el('span','jogos-grupo-contador',`${franquia.jogos.length} jogos`);
    const acao = el('span','jogos-grupo-abrir');
    acao.append(el('span','', 'Ver jogos'));
    const ico = el('i','bi bi-arrow-up-right'); ico.setAttribute('aria-hidden','true');
    acao.append(ico);
    textos.append(nome,count,acao);
    botao.append(leque,textos);
    box.append(botao);
    box.addEventListener('pointerenter',event => {
      if (mouse.matches && event.pointerType === 'mouse' && modal.hidden) tocar(franquia.id,franquia.musica);
    });
    box.addEventListener('pointerleave',event => {
      if (mouse.matches && event.pointerType === 'mouse' && modal.hidden && donoAtual === franquia.id) parar();
    });
    botao.addEventListener('click', () => abrirModal(franquia));
    return box;
  }
  for (const f of data.franquias) raiz.append(criarFranquia(f));
  for (const g of data.avulsos) {
    const bloco = el('div','jogos-avulso-card');
    bloco.append(criarCard(g));
    if (g.musica) {
      bloco.classList.add('is-audio');
      bloco.tabIndex = 0;
      bloco.setAttribute('role','button');
      bloco.setAttribute('aria-label',`Tocar ou pausar trilha sonora de ${g.nome}`);
      bloco.addEventListener('pointerenter',e => {
        if (mouse.matches && e.pointerType === 'mouse') tocar(g.id,g.musica);
      });
      bloco.addEventListener('pointerleave',e => {
        if (mouse.matches && e.pointerType === 'mouse' && donoAtual === g.id) parar();
      });
      const alternarAudio = () => {
        if (donoAtual === g.id) parar(); else tocar(g.id,g.musica);
      };
      bloco.addEventListener('click',alternarAudio);
      bloco.addEventListener('keydown',e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternarAudio(); }
      });
    }
    avulsos.append(bloco);
  }
  // Enquanto as músicas não forem adicionadas, o site funciona sem controles vazios.
  if (trilhasDisponiveis) {
    audioContainer.hidden = false;
    audioToggle.addEventListener('click',() => {
      autorizadoMobile = !autorizadoMobile;
      audioToggle.setAttribute('aria-pressed',String(autorizadoMobile));
      const icon = el('i', autorizadoMobile ? 'bi bi-volume-up' : 'bi bi-volume-mute');
      icon.setAttribute('aria-hidden','true');
      audioToggle.replaceChildren(icon,document.createTextNode(autorizadoMobile ? ' Desativar trilhas sonoras' : ' Ativar trilhas sonoras'));
      if (!autorizadoMobile) parar(false);
      avisar(autorizadoMobile ? 'Áudio ativado. Toque no leque para ouvir a trilha da franquia.' : 'Áudio desligado.');
    });
  }
  document.addEventListener('visibilitychange',() => { if (document.hidden) parar(false); });
  window.addEventListener('pagehide',() => parar(false));
})();