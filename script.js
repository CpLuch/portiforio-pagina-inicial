
/* ==========================================

   PORTFÓLIO RICARDO HENRIQUE

   SCRIPT.JS COMPLETO

   FOTOGRAFIA = ESQUERDA

   CODER = DIREITA

   PARALLAX SOMENTE HORIZONTAL

========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");

    /* ==========================================

       1. ANIMAÇÃO PRINCIPAL

    ========================================== */

    if (hero) {

        let arrastando = false;

        let moveu = false;

        let inicioX = 0;

        let ultimoYMouse = null;

        // Textos: controle independente das areas clicaveis que mudam de tamanho.
        const textoFotografia = hero.querySelector(".texto-fotografia");
        const textoProgramacao = hero.querySelector(".texto-programacao");

        function atualizarFocoTexto(clientX) {
            if (window.innerWidth < 992) return;
            const area = hero.getBoundingClientRect();
            const naFotografia = clientX < area.left + area.width / 2;

            // Inline important tem prioridade sobre o :hover do CSS atual,
            // evitando que o texto desapareca e reapareca no mesmo movimento.
            if (textoFotografia) {
                textoFotografia.style.setProperty(
                    "opacity", naFotografia ? "1" : "0", "important"
                );
            }
            if (textoProgramacao) {
                textoProgramacao.style.setProperty(
                    "opacity", naFotografia ? "0" : "1", "important"
                );
            }
        }

        function restaurarFocoTexto() {
            if (textoFotografia) textoFotografia.style.removeProperty("opacity");
            if (textoProgramacao) textoProgramacao.style.removeProperty("opacity");
        }

        /* ======================================

           FUNÇÃO PARA LIMITAR VALORES

        ====================================== */

        function limitar(valor, minimo, maximo) {

            return Math.max(

                minimo,

                Math.min(maximo, valor)

            );

        }

        /* ======================================

           2. ATUALIZAR DIVISÃO DAS IMAGENS

        ====================================== */

        function atualizarAnimacao(divisao) {

            divisao = limitar(divisao, 15, 85);

            // Lado esquerdo:

            // Fotografia

            const focoEsquerda = limitar(

                (divisao - 50) / 35,

                0,

                1

            );

            // Lado direito:

            // Programação

            const focoDireita = limitar(

                (50 - divisao) / 35,

                0,

                1

            );

            /* DIVISÃO */

            hero.style.setProperty(

                "--divisao",

                `${divisao}%`

            );

            /* OPACIDADE DA ESQUERDA */

            hero.style.setProperty(

                "--op-dev",

                String(1 - focoDireita)

            );

            /* OPACIDADE DA DIREITA */

            hero.style.setProperty(

                "--op-foto",

                String(1 - focoEsquerda)

            );

            /* COMPATIBILIDADE COM OUTROS FUNDOS */

            const area =

                hero.getBoundingClientRect();

            const corteFundo =

                area.left +

                area.width * divisao / 100;

            hero.style.setProperty(

                "--corte-fundo",

                `${corteFundo}px`

            );

            /*

               NÃO MODIFICAMOS MAIS:

               --img-dev-x

               --img-foto-x

               As fotografias permanecem

               no enquadramento do CSS.

            */

        }

        /* ======================================

           3. PARALLAX SOMENTE HORIZONTAL

        ====================================== */

        function atualizarParallax(clientX) {

            // Mantem o calculo original do fundo, sem alterar sua animacao.
            const x = limitar(
                (clientX / window.innerWidth - 0.5) * 2,
                -1,
                1
            );

            // A foto principal usa a largura da HERO, nao da janela.
            // Assim o movimento e perceptivel mesmo em monitores largos.
            const areaRetrato = hero.getBoundingClientRect();
            const xRetrato = limitar(
                ((clientX - areaRetrato.left) / areaRetrato.width - 0.5) * 2,
                -1,
                1
            );

            /* RETRATOS PRINCIPAIS */

            hero.style.setProperty(

                "--parallax-frente-x",

                `${xRetrato * 40}px`

            );

            /* SEM MOVIMENTO VERTICAL */

            hero.style.setProperty(

                "--parallax-frente-y",

                "0px"

            );

            /* FUNDOS DECORATIVOS */

            hero.style.setProperty(

                "--parallax-fundo-x",

                `${x * 18}px`

            );

            /* SEM MOVIMENTO VERTICAL */

            hero.style.setProperty(

                "--parallax-fundo-y",

                "0px"

            );

        }

        /* ======================================

           4. VOLTAR AO CENTRO

        ====================================== */

        function voltarAoCentro() {

            // Metade de cada imagem

            atualizarAnimacao(50);

            restaurarFocoTexto();

            // Retorna o parallax ao centro

            hero.style.setProperty(

                "--parallax-frente-x",

                "0px"

            );

            hero.style.setProperty(

                "--parallax-frente-y",

                "0px"

            );

            hero.style.setProperty(

                "--parallax-fundo-x",

                "0px"

            );

            hero.style.setProperty(

                "--parallax-fundo-y",

                "0px"

            );

        }

        /* ======================================

           5. MOVIMENTO DO MOUSE

           NA JANELA INTEIRA

        ====================================== */

        window.addEventListener(

            "pointermove",

            (evento) => {

                // Apenas mouse.

                // Toque é tratado separadamente.

                if (evento.pointerType !== "mouse") {

                    return;

                }

                ultimoYMouse = evento.clientY;

                const area =

                    hero.getBoundingClientRect();

                /* --------------------------------

                   SAIU POR CIMA OU POR BAIXO

                -------------------------------- */

                if (

                    evento.clientY < area.top ||

                    evento.clientY > area.bottom

                ) {

                    voltarAoCentro();

                    return;

                }

                /* --------------------------------

                   CONTINUA NA ALTURA DA HERO

                -------------------------------- */

                const porcentagem = limitar(

                    (

                        evento.clientX /

                        window.innerWidth

                    ) * 100,

                    0,

                    100

                );

                // Esquerda = Fotografia

                // Direita = Programação

                atualizarAnimacao(

                    100 - porcentagem

                );

                // Parallax apenas para os lados

                atualizarParallax(

                    evento.clientX

                );

                atualizarFocoTexto(evento.clientX);

            },

            { passive: true }

        );

        /* ======================================

           6. MOUSE SAI DA PÁGINA

        ====================================== */

        document.addEventListener(

            "mouseleave",

            voltarAoCentro

        );

        /* ======================================

           7. JANELA PERDE O FOCO

        ====================================== */

        window.addEventListener(

            "blur",

            voltarAoCentro

        );

        /* ======================================

           8. ROLAGEM DA PÁGINA

        ====================================== */

        window.addEventListener(

            "scroll",

            () => {

                if (ultimoYMouse === null) {

                    return;

                }

                const area =

                    hero.getBoundingClientRect();

                if (

                    ultimoYMouse < area.top ||

                    ultimoYMouse > area.bottom

                ) {

                    voltarAoCentro();

                }

            },

            { passive: true }

        );

        /* ======================================

           9. REDIMENSIONAR A JANELA

        ====================================== */

        window.addEventListener(

            "resize",

            voltarAoCentro

        );

        /* ======================================

           10. INÍCIO DO TOQUE

        ====================================== */

        hero.addEventListener(

            "pointerdown",

            (evento) => {

                if (evento.pointerType === "mouse") {

                    return;

                }

                arrastando = true;

                moveu = false;

                inicioX = evento.clientX;

            }

        );

        /* ======================================

           11. ARRASTAR NO CELULAR

        ====================================== */

        hero.addEventListener(

            "pointermove",

            (evento) => {

                if (

                    evento.pointerType === "mouse" ||

                    !arrastando

                ) {

                    return;

                }

                // Ignorar movimentos muito pequenos

                if (

                    Math.abs(

                        evento.clientX - inicioX

                    ) <= 10

                ) {

                    return;

                }

                moveu = true;

                const area =

                    hero.getBoundingClientRect();

                const porcentagem = limitar(

                    (

                        (evento.clientX - area.left) /

                        area.width

                    ) * 100,

                    0,

                    100

                );

                atualizarAnimacao(

                    100 - porcentagem

                );

                // Movimento horizontal apenas

                atualizarParallax(

                    evento.clientX

                );



            },

            { passive: true }

        );

        /* ======================================

           12. FINAL DO TOQUE

        ====================================== */

        hero.addEventListener(

            "pointerup",

            (evento) => {

                if (evento.pointerType !== "mouse") {

                    arrastando = false;

                }

            }

        );

        /* ======================================

           13. CANCELAMENTO DO TOQUE

        ====================================== */

        hero.addEventListener(

            "pointercancel",

            () => {

                arrastando = false;

                voltarAoCentro();

            }

        );

        /* ======================================

           14. EVITAR CLIQUE APÓS ARRASTAR

        ====================================== */

        hero.addEventListener(

            "click",

            (evento) => {

                if (!moveu) {

                    return;

                }

                evento.preventDefault();

                evento.stopPropagation();

                moveu = false;

            },

            true

        );

        /* ======================================

           14.1. CLIQUE NA AREA VISUAL EXPANDIDA

           A foto pode ocupar mais de 50% da hero.
           Mesmo fora da metade fixa do link,
           o clique segue a divisao mostrada.

        ====================================== */

        hero.addEventListener("click", (evento) => {
            // Apenas cliques reais de mouse na hero desktop.
            // Cliques gerados via .click() continuam com o som original.
            if (!evento.isTrusted || window.innerWidth < 992 ||
                evento.defaultPrevented || evento.button !== 0 ||
                evento.ctrlKey || evento.metaKey ||
                evento.shiftKey || evento.altKey) return;

            const area = hero.getBoundingClientRect();
            if (evento.clientX < area.left || evento.clientX > area.right ||
                evento.clientY < area.top || evento.clientY > area.bottom) return;

            const divisaoAtual = parseFloat(
                hero.style.getPropertyValue("--divisao")
            );
            const porcentagem = Number.isFinite(divisaoAtual)
                ? divisaoAtual : 50;
            const limiteFoto = area.left + area.width * porcentagem / 100;

            const destino = evento.clientX < limiteFoto
                ? hero.querySelector(".link-fotografia")
                : hero.querySelector(".link-programacao");
            if (!destino) return;

            // Se o navegador ja clicou no link certo, manter o clique natural.
            if (evento.target === destino || destino.contains(evento.target)) return;

            // Encaminha para o link correto, com som e navegacao existentes.
            evento.preventDefault();
            evento.stopImmediatePropagation();
            destino.click();
        }, true);

        /* ======================================

           15. ESTADO INICIAL

        ====================================== */

        voltarAoCentro();

        /* ======================================

           16. RETORNO PELO NAVEGADOR

        ====================================== */

        window.addEventListener(

            "pageshow",

            voltarAoCentro

        );

    }

    /* ==========================================

       17. BOTÃO VOLTAR AO TOPO

    ========================================== */

    const botaoTopo =

        document.querySelector(".rodape-topo");

    if (botaoTopo) {

        botaoTopo.addEventListener(

            "click",

            (evento) => {

                evento.preventDefault();

                const inicio = window.scrollY;

                const duracao = 1200;

                let tempoInicial = null;

                function animarSubida(tempoAtual) {

                    if (tempoInicial === null) {

                        tempoInicial = tempoAtual;

                    }

                    const progresso = Math.min(

                        (tempoAtual - tempoInicial) /

                        duracao,

                        1

                    );

                    // Desaceleração suave

                    const suavizacao =

                        1 - Math.pow(

                            1 - progresso,

                            3

                        );

                    const posicao =

                        inicio * (1 - suavizacao);

                    window.scrollTo(

                        0,

                        posicao

                    );

                    if (progresso < 1) {

                        requestAnimationFrame(

                            animarSubida

                        );

                    }

                }

                // Respeita a preferência do usuário

                if (

                    window.matchMedia(

                        "(prefers-reduced-motion: reduce)"

                    ).matches

                ) {

                    window.scrollTo(0, 0);

                } else {

                    requestAnimationFrame(

                        animarSubida

                    );

                }

            }

        );

    }

    /* ==========================================

       18. SISTEMA DE EFEITOS SONOROS

    ========================================== */

    function configurarSom(seletor, arquivo) {

        const link =

            document.querySelector(seletor);

        if (!link) {

            console.warn(

                "Link não encontrado:",

                seletor

            );

            return;

        }

        // Criar áudio

        const audio = new Audio(arquivo);

        audio.preload = "auto";

        audio.volume = 0.7;

        let navegando = false;

        let navegacaoPendente = null;

        /* ======================================

           REATIVAR AO VOLTAR PARA A PÁGINA

        ====================================== */

        window.addEventListener(

            "pageshow",

            () => {

                navegando = false;

                if (navegacaoPendente) {

                    navegacaoPendente.cancelada = true;

                    clearTimeout(

                        navegacaoPendente.timer

                    );

                    navegacaoPendente = null;

                }

                audio.onended = null;

                audio.pause();

                audio.currentTime = 0;

            }

        );

        /* ======================================

           REPRODUZIR SOM AO CLICAR

        ====================================== */

        link.addEventListener(

            "click",

            (evento) => {

                if (

                    navegando ||

                    evento.defaultPrevented ||

                    evento.button !== 0 ||

                    evento.ctrlKey ||

                    evento.metaKey ||

                    evento.shiftKey ||

                    evento.altKey

                ) {

                    return;

                }

                const destino =

                    link.getAttribute("href");

                const outraPagina = Boolean(

                    destino &&

                    !destino.startsWith("#") &&

                    link.target !== "_blank"

                );

                // Se vai navegar, aguardar o som

                if (outraPagina) {

                    evento.preventDefault();

                    navegando = true;

                }

                // Reiniciar áudio

                audio.pause();

                audio.currentTime = 0;

                const tarefa = {

                    cancelada: false,

                    finalizada: false,

                    timer: null

                };

                if (outraPagina) {

                    navegacaoPendente = tarefa;

                }

                /* FUNÇÃO PARA NAVEGAR */

                function navegar() {

                    if (

                        !outraPagina ||

                        tarefa.cancelada ||

                        tarefa.finalizada

                    ) {

                        return;

                    }

                    tarefa.finalizada = true;

                    clearTimeout(tarefa.timer);

                    audio.onended = null;

                    window.location.href = destino;

                }

                /* AGUARDAR O SOM */

                if (outraPagina) {

                    audio.onended = navegar;

                    // Limite de 1,8 segundo

                    tarefa.timer = setTimeout(

                        navegar,

                        1800

                    );

                }

                /* REPRODUZIR ÁUDIO */

                audio.play().catch((erro) => {

                    console.warn(

                        "Não foi possível reproduzir:",

                        arquivo,

                        erro

                    );

                    // Se o áudio falhar,

                    // não impedir a navegação.

                    navegar();

                });

            }

        );

    }

    /* ==========================================
       CLIQUES NAS FAIXAS EXTERNAS DO BANNER
       Encaminhar ao link original para preservar
       os efeitos sonoros e o comportamento de clique.
    ========================================== */
    document.querySelectorAll(".hero-click-extra").forEach((faixa) => {
        faixa.addEventListener("click", (evento) => {
            // Cliques modificados mantêm a ação normal (nova aba etc.).
            if (evento.defaultPrevented || evento.button !== 0 ||
                evento.ctrlKey || evento.metaKey ||
                evento.shiftKey || evento.altKey) return;

            const seletor = faixa.classList.contains("hero-click-extra-foto")
                ? ".hero .link-fotografia"
                : ".hero .link-programacao";
            const linkOriginal = document.querySelector(seletor);
            if (!linkOriginal) return;

            evento.preventDefault();
            linkOriginal.click();
        });
    });

    /* ==========================================

       19. SOM DO FOTÓGRAFO

       LADO ESQUERDO

    ========================================== */

    configurarSom(

        ".link-fotografia",

        "sons/camera.wav"

    );

    /* ==========================================

       20. SOM DO CODER

       LADO DIREITO

    ========================================== */

    configurarSom(

        ".link-programacao",

        "sons/enter.mp3"

    );

});