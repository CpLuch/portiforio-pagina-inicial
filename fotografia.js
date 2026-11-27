/* FOTOGRAFIA - GALERIAS RESPONSIVAS E VISUALIZAÇÃO AMPLIADA */
/* Os NOMES são textos definidos em fotos-dados.js. Os SLUGS são caminhos estáveis. */
(function () {
  "use strict";
  const albuns = Array.isArray(window.FOTOS_ALBUNS) ? window.FOTOS_ALBUNS : [];
  const titulos = window.NOMES_DAS_GALERIAS || {};
  const nome = album => titulos[album.slug] || album.name;
  const aoCriar = (tag, classe, texto) => {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  };

  const lista = document.getElementById('fotos-albuns');
  if (lista) {
    for (const album of albuns) {
      const cartao = aoCriar('a', 'fotos-cartao');
      cartao.href = 'album.html?album=' + encodeURIComponent(album.slug);
      cartao.setAttribute('aria-label', 'Abrir álbum ' + nome(album));
      const leque = aoCriar('span', 'fotos-leque');
      for (const foto of album.cover.slice(0, 3)) {
        const img = aoCriar('img');
        img.src = foto;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        leque.appendChild(img);
      }
      cartao.appendChild(leque);
      // Título em texto HTML de verdade. Altere livremente em fotos-dados.js.
      cartao.appendChild(aoCriar('h2', 'fotos-nome', nome(album)));
      cartao.appendChild(aoCriar('span', 'fotos-contagem', album.photos.length + (album.photos.length === 1 ? ' fotografia' : ' fotografias')));
      lista.appendChild(cartao);
    }
  }

  const grade = document.getElementById('fotos-grade');
  if (!grade) return;
  const slug = new URLSearchParams(window.location.search).get('album');
  const album = albuns.find(a => a.slug === slug);
  const titulo = document.getElementById('titulo-album');
  if (!album) {
    if (titulo) titulo.textContent = 'Álbum não encontrado';
    const mensagem = document.getElementById('fotos-mensagem');
    if (mensagem) mensagem.hidden = false;
    return;
  }
  if (titulo) titulo.textContent = nome(album);
  document.title = nome(album) + ' | Fotografia - Ricardo Henrique';
  const fotos = album.photos;
  const caixa = document.getElementById('fotos-lightbox');
  const ampliada = document.getElementById('fotos-lb-imagem');
  const contador = document.getElementById('fotos-lb-contador');
  const botaoFechar = document.getElementById('fotos-lb-fechar');
  let atual = 0;
  let focoAnterior = null;

  function mostrar(indice) {
    atual = (indice + fotos.length) % fotos.length;
    ampliada.src = fotos[atual].full;
    ampliada.alt = 'Fotografia ' + (atual+1) + ' de ' + fotos.length;
    contador.textContent = (atual+1) + ' / ' + fotos.length;
  }
  function abrir(indice) {
    focoAnterior = document.activeElement;
    caixa.hidden = false;
    caixa.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    mostrar(indice);
    botaoFechar.focus();
  }
  function fechar() {
    if (caixa.hidden) return;
    caixa.hidden = true;
    caixa.setAttribute('aria-hidden','true');
    ampliada.removeAttribute('src');
    document.body.style.overflow = '';
    if (focoAnterior && focoAnterior.focus) focoAnterior.focus();
  }
  fotos.forEach((foto,i) => {
    const btn = aoCriar('button','fotos-foto');
    btn.type = 'button';
    btn.setAttribute('aria-label','Ampliar fotografia ' + (i+1));
    const img = aoCriar('img');
    img.src = foto.thumb;
    img.alt = 'Fotografia ' + (i+1);
    img.loading = i < 6 ? 'eager' : 'lazy';
    img.decoding = 'async';
    btn.appendChild(img);
    btn.addEventListener('click',()=>abrir(i));
    grade.appendChild(btn);
  });
  botaoFechar.addEventListener('click',fechar);
  document.getElementById('fotos-lb-prev').addEventListener('click',()=>mostrar(atual-1));
  document.getElementById('fotos-lb-next').addEventListener('click',()=>mostrar(atual+1));
  caixa.addEventListener('click',e=>{ if (e.target === caixa) fechar(); });
  document.addEventListener('keydown',e=>{
    if (caixa.hidden) return;
    if (e.key === 'Escape') {e.preventDefault();fechar();}
    if (e.key === 'ArrowLeft') {e.preventDefault();mostrar(atual-1);}
    if (e.key === 'ArrowRight') {e.preventDefault();mostrar(atual+1);}
    if (e.key === 'Tab') { // Mantém o foco nos controles da visualização
      const controles=[botaoFechar,document.getElementById('fotos-lb-prev'),document.getElementById('fotos-lb-next')];
      const atualFoco=controles.indexOf(document.activeElement);
      if (e.shiftKey && atualFoco === 0) {e.preventDefault();controles[2].focus();}
      if (!e.shiftKey && atualFoco === 2) {e.preventDefault();controles[0].focus();}
    }
  });
})();