/* VIAGENS — edite aqui os destinos, fotografias e localizações no Google Maps. */
const viagens = [
  {
    "id": "chapada",
    "nome": "Chapada dos Veadeiros",
    "regiao": "Goiás",
    "foto": "imagens/viagens/chapada-dos-veadeiros.webp",
    "mapa": "Parque Nacional da Chapada dos Veadeiros, Alto Paraíso de Goiás, Goiás, Brasil",
    "descricao": "Paisagens naturais, trilhas e cachoeiras entre formações rochosas do Cerrado."
  },
  {
    "id": "genipabu",
    "nome": "Genipabu",
    "regiao": "Extremoz · Rio Grande do Norte",
    "foto": "imagens/viagens/genipabu.webp",
    "mapa": "Praia de Genipabu, Extremoz, Rio Grande do Norte, Brasil",
    "descricao": "Dunas de areia clara, lagoas e o encontro da paisagem com o litoral potiguar."
  },
  {
    "id": "gramado",
    "nome": "Gramado",
    "regiao": "Rio Grande do Sul",
    "foto": "imagens/viagens/gramado.webp",
    "mapa": "Gramado, Rio Grande do Sul, Brasil",
    "descricao": "Arquitetura acolhedora, ruas charmosas e um clima de serra bem particular."
  },
  {
    "id": "porto",
    "nome": "Porto de Galinhas",
    "regiao": "Ipojuca · Pernambuco",
    "foto": "imagens/viagens/porto-de-galinhas.webp",
    "mapa": "Praia de Porto de Galinhas, Ipojuca, Pernambuco, Brasil",
    "descricao": "Mar azul-turquesa, recifes e paisagens tropicais no litoral pernambucano."
  },
  {
    "id": "salto",
    "nome": "Salto do Itiquira",
    "regiao": "Formosa · Goiás",
    "foto": "imagens/viagens/salto-do-itiquira.webp",
    "mapa": "Salto do Itiquira, Formosa, Goiás, Brasil",
    "descricao": "Uma impressionante queda-d’água cercada por vegetação e paredões naturais."
  }
];


(() => {
  'use strict';
  const grid = document.getElementById('viagens-grid');
  if (!grid) return;

  // Todos os locais aparecem ao mesmo tempo: fotografia e mapa em cada card.
  // As imagens usam a pasta imagens/viagens/, junto dos arquivos do site.
  viagens.forEach((local, indice) => {
    const card = document.createElement('article');
    card.className = 'viagens-card';
    card.dataset.destino = local.id;

    const info = document.createElement('div');
    info.className = 'viagens-card-detalhes';
    const numero = document.createElement('span');
    numero.className = 'viagens-card-numero';
    numero.textContent = `${String(indice + 1).padStart(2, '0')} / ${String(viagens.length).padStart(2, '0')}`;
    const titulo = document.createElement('h3');
    titulo.className = 'viagens-card-titulo';
    titulo.id = `viagens-${local.id}-titulo`;
    titulo.textContent = local.nome;
    card.setAttribute('aria-labelledby', titulo.id);
    const regiao = document.createElement('p');
    regiao.className = 'viagens-card-regiao';
    regiao.textContent = local.regiao;
    const linha = document.createElement('div');
    linha.className = 'viagens-card-linha';
    linha.setAttribute('aria-hidden','true');
    const descricao = document.createElement('p');
    descricao.className = 'viagens-card-descricao';
    descricao.textContent = local.descricao;
    const link = document.createElement('a');
    link.className = 'viagens-abrir-google';
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.mapa)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Abrir no Google Maps ↗';
    link.setAttribute('aria-label', `Abrir ${local.nome} no Google Maps, em outra aba`);
    info.append(numero,titulo,regiao,linha,descricao,link);

    const fotoBox = document.createElement('div');
    fotoBox.className = 'viagens-card-foto';
    const img = document.createElement('img');
    img.src = local.foto;
    img.alt = `Fotografia de ${local.nome}`;
    img.loading = indice === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    fotoBox.append(img);

    const mapaBox = document.createElement('div');
    mapaBox.className = 'viagens-card-mapa';
    const mapaTopo = document.createElement('div');
    mapaTopo.className = 'viagens-card-mapa-topo';
    mapaTopo.textContent = 'LOCALIZAÇÃO · GOOGLE MAPS';
    const mapa = document.createElement('iframe');
    mapa.className = 'viagens-card-mapa-iframe';
    mapa.title = `Mapa de ${local.nome}`;
    mapa.loading = 'lazy';
    mapa.referrerPolicy = 'no-referrer-when-downgrade';
    mapa.src = `https://maps.google.com/maps?q=${encodeURIComponent(local.mapa)}&z=12&output=embed`;
    mapa.setAttribute('allowfullscreen', '');
    const aviso = document.createElement('p');
    aviso.className = 'viagens-card-mapa-aviso';
    aviso.textContent = 'Mapa da região turística. Requer internet.';
    mapaBox.append(mapaTopo,mapa,aviso);

    card.append(info,fotoBox,mapaBox);
    grid.append(card);
  });
})();