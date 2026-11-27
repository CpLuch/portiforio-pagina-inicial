/* MODO OFF — FILMES, SÉRIES E ANIMES
   Os 15 títulos, imagens, anos e sinopses estão aqui.
   Para editar, altere o array abaixo. Não há notas.
*/
const colecoes = [
  {
    "id": "filmes",
    "nome": "Filmes",
    "tag": "CINEMA",
    "resumo": "Cinco histórias que merecem um lugar na minha coleção.",
    "itens": [
      {
        "nome": "Elo Perdido",
        "ano": 2009,
        "imagem": "imagens/filmes/elo-perdido.webp",
        "sinopse": "Após um experimento inesperado, um cientista e seus companheiros vão parar em um mundo estranho, habitado por criaturas pré-históricas e perigos imprevisíveis. Para voltar para casa, precisarão explorar um território completamente desconhecido."
      },
      {
        "nome": "Bernardo e Bianca",
        "ano": 1977,
        "imagem": "imagens/filmes/bernardo-e-bianca.webp",
        "sinopse": "Dois pequenos agentes de uma sociedade dedicada a ajudar quem precisa embarcam em uma missão para encontrar e proteger uma menina desaparecida. A aventura reúne coragem, amizade e muita criatividade."
      },
      {
        "nome": "Tropa de Elite",
        "ano": 2007,
        "imagem": "imagens/filmes/tropa-de-elite.webp",
        "sinopse": "No Rio de Janeiro, um capitão do BOPE enfrenta a pressão de operações arriscadas enquanto dois jovens policiais descobrem os conflitos e dilemas da profissão. Uma história intensa sobre violência, instituições e escolhas difíceis."
      },
      {
        "nome": "Star Wars: Episódio I – A Ameaça Fantasma",
        "ano": 1999,
        "imagem": "imagens/filmes/star-wars-episodio-1.webp",
        "sinopse": "Em meio a uma crise que ameaça o equilíbrio da galáxia, dois cavaleiros Jedi partem em uma missão diplomática e cruzam o caminho de um garoto com um talento extraordinário. Uma aventura de planetas distantes, política e mistérios da Força."
      },
      {
        "nome": "Scarface",
        "ano": 1983,
        "imagem": "imagens/filmes/scarface.webp",
        "sinopse": "Tony Montana chega a Miami decidido a conquistar riqueza e poder. Ao entrar no submundo do crime, sua ambição o coloca diante de um universo de luxo, rivalidades e riscos cada vez maiores."
      }
    ]
  },
  {
    "id": "series",
    "nome": "Séries",
    "tag": "TELEVISÃO",
    "resumo": "Cinco universos para acompanhar episódio após episódio.",
    "itens": [
      {
        "nome": "Game of Thrones",
        "ano": 2011,
        "imagem": "imagens/filmes/game-of-thrones.webp",
        "sinopse": "Em Westeros, famílias poderosas disputam o Trono de Ferro em meio a alianças instáveis, conflitos e intrigas. Enquanto a luta pelo poder cresce, uma ameaça antiga começa a se aproximar dos reinos."
      },
      {
        "nome": "Breaking Bad",
        "ano": 2008,
        "imagem": "imagens/filmes/breaking-bad.webp",
        "sinopse": "Depois de receber um diagnóstico grave, um professor de química decide usar seus conhecimentos para entrar no mercado ilegal de drogas. A parceria com um ex-aluno muda completamente a direção de sua vida."
      },
      {
        "nome": "Arrow",
        "ano": 2012,
        "imagem": "imagens/filmes/arrow.webp",
        "sinopse": "Após anos dado como morto, Oliver Queen retorna à sua cidade natal com novas habilidades e um propósito secreto. Entre conflitos familiares e ameaças urbanas, ele assume uma identidade vigilante."
      },
      {
        "nome": "Vikings",
        "ano": 2013,
        "imagem": "imagens/filmes/vikings.webp",
        "sinopse": "Inspirada nas lendas nórdicas, a série acompanha Ragnar Lothbrok e seu povo em expedições, conquistas e disputas por liderança. Fé, família e ambição se encontram nas jornadas pelo mundo medieval."
      },
      {
        "nome": "Sherlock",
        "ano": 2010,
        "imagem": "imagens/filmes/sherlock.webp",
        "sinopse": "Na Londres contemporânea, o detetive Sherlock Holmes utiliza observação e raciocínio fora do comum para resolver casos complexos. Ao lado de John Watson, ele investiga mistérios que desafiam a polícia."
      }
    ]
  },
  {
    "id": "animes",
    "nome": "Animes",
    "tag": "ANIMAÇÃO JAPONESA",
    "resumo": "Cinco aventuras e personagens que marcaram gerações.",
    "itens": [
      {
        "nome": "Os Cavaleiros do Zodíaco",
        "ano": 1986,
        "imagem": "imagens/filmes/cavaleiros-do-zodiaco.webp",
        "sinopse": "Jovens guerreiros protegidos por armaduras ligadas às constelações lutam para defender Atena e a humanidade. As batalhas colocam à prova sua amizade, coragem e determinação."
      },
      {
        "nome": "Naruto Shippuden",
        "ano": 2007,
        "imagem": "imagens/filmes/naruto-shippuden.webp",
        "sinopse": "Após um período de treinamento, Naruto Uzumaki retorna à Vila da Folha mais determinado do que nunca. Ao lado de seus amigos, enfrenta novos desafios no mundo ninja enquanto busca proteger as pessoas importantes para ele."
      },
      {
        "nome": "Attack on Titan",
        "ano": 2013,
        "imagem": "imagens/filmes/attack-on-titan.webp",
        "sinopse": "A humanidade vive protegida por muralhas gigantescas para escapar de criaturas conhecidas como Titãs. Quando essa segurança é ameaçada, Eren e seus amigos precisam enfrentar um mundo repleto de perigos e perguntas sem resposta."
      },
      {
        "nome": "Dragon Ball Z",
        "ano": 1989,
        "imagem": "imagens/filmes/dragon-ball-z.webp",
        "sinopse": "Goku e seus companheiros enfrentam adversários cada vez mais poderosos para proteger a Terra e aqueles que amam. Treinamentos, amizade e confrontos épicos fazem parte dessa jornada."
      },
      {
        "nome": "Jujutsu Kaisen",
        "ano": 2020,
        "imagem": "imagens/filmes/jujutsu-kaisen.webp",
        "sinopse": "Ao entrar em contato com um objeto amaldiçoado, Yuji Itadori descobre a existência de espíritos perigosos e feiticeiros que combatem maldições. Sua nova vida mistura aprendizado, trabalho em equipe e batalhas sobrenaturais."
      }
    ]
  }
];

(() => {
  'use strict';
  const raiz = document.getElementById('filme-colecoes');
  const modal = document.getElementById('filme-modal');
  const painel = modal?.querySelector('.filme-modal-painel');
  const titulo = document.getElementById('filme-modal-titulo');
  const contagem = document.getElementById('filme-modal-contagem');
  const lista = document.getElementById('filme-modal-lista');
  const fechar = document.getElementById('filme-modal-fechar');
  if (!raiz || !modal || !painel || !titulo || !contagem || !lista || !fechar) {
    const erro = document.getElementById('filme-erro');
    if (erro) erro.hidden = false;
    return;
  }

  let focoAnterior = null;
  let elementosInertes = [];
  const criar = (tag, classe, texto) => {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  };

  function gerarImagem(item, decorativa = false) {
    const img = criar('img');
    img.src = item.imagem;
    img.alt = decorativa ? '' : `Pôster de ${item.nome}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      if (decorativa) return;
      img.replaceWith(criar('div', 'filme-sem-capa', item.nome));
    }, { once: true });
    return img;
  }

  function criarItem(item) {
    const card = criar('article', 'filme-card');
    const capa = criar('div', 'filme-capa');
    capa.append(gerarImagem(item));
    const info = criar('div', 'filme-card-dados');
    info.append(
      criar('h3', '', item.nome),
      criar('p', 'filme-card-ano', String(item.ano)),
      criar('p', 'filme-card-sinopse', item.sinopse)
    );
    card.append(capa, info);
    return card;
  }

  function abrirColecao(colecao) {
    if (!modal.hidden) return;
    focoAnterior = document.activeElement;
    titulo.textContent = colecao.nome;
    contagem.textContent = `${colecao.itens.length} ${colecao.itens.length === 1 ? 'título' : 'títulos'} · sinopses sem spoilers`;
    lista.replaceChildren(...colecao.itens.map(criarItem));
    modal.hidden = false;
    lista.scrollTop = 0;
    requestAnimationFrame(() => {
      if (!modal.hidden) lista.scrollTop = 0;
    });
    document.body.classList.add('filme-modal-ativo');
    elementosInertes = [...document.body.children]
      .filter(el => el !== modal && el.tagName !== 'SCRIPT')
      .map(el => ({ el, estado: el.inert }));
    elementosInertes.forEach(({ el }) => { el.inert = true; });
    fechar.focus({ preventScroll: true });
  }

  function fecharColecao() {
    if (modal.hidden) return;
    modal.hidden = true;
    lista.replaceChildren();
    lista.scrollTop = 0;
    document.body.classList.remove('filme-modal-ativo');
    elementosInertes.forEach(({ el, estado }) => { el.inert = estado; });
    elementosInertes = [];
    if (focoAnterior?.isConnected) focoAnterior.focus({ preventScroll: true });
    focoAnterior = null;
  }

  for (const [indice, colecao] of colecoes.entries()) {
    const grupo = criar('article', 'filme-grupo');
    const botao = criar('button', 'filme-grupo-trigger');
    botao.type = 'button';
    botao.setAttribute('aria-haspopup', 'dialog');
    botao.setAttribute('aria-label', `Abrir coleção de ${colecao.nome}, ${colecao.itens.length} títulos`);
    const leque = criar('span', 'filme-leque');
    leque.setAttribute('aria-hidden', 'true');
    colecao.itens.slice(0, 3).forEach(item => leque.append(gerarImagem(item, true)));
    const nome = criar('span', 'filme-grupo-nome', colecao.nome);
    const quant = criar('span', 'filme-grupo-contador', `${colecao.itens.length} títulos`);
    const resumo = criar('span', 'filme-grupo-resumo', colecao.resumo);
    const acao = criar('span', 'filme-grupo-abrir');
    acao.append(criar('span', '', 'Ver títulos'));
    const icone = criar('i', 'bi bi-arrow-up-right');
    icone.setAttribute('aria-hidden', 'true');
    acao.append(icone);
    botao.append(leque, nome, quant, resumo, acao);
    botao.addEventListener('click', () => abrirColecao(colecao));
    grupo.append(botao);
    raiz.append(grupo);
  }

  fechar.addEventListener('click', fecharColecao);
  modal.addEventListener('click', evento => {
    if (evento.target === modal) fecharColecao();
  });
  document.addEventListener('keydown', evento => {
    if (modal.hidden) return;
    if (evento.key === 'Escape') {
      evento.preventDefault();
      fecharColecao();
      return;
    }
    if (evento.key !== 'Tab') return;
    const botoes = [...modal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
      .filter(el => el.getClientRects().length);
    if (!botoes.length) { evento.preventDefault(); painel.focus(); return; }
    const primeiro = botoes[0];
    const ultimo = botoes[botoes.length - 1];
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault(); ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault(); primeiro.focus();
    }
  });
})();