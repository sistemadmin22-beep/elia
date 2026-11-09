"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       FUNÇÃO AUXILIAR
    ========================================================= */

    const $ = function (id) {
        return document.getElementById(id);
    };


    /* =========================================================
       ELEMENTOS
    ========================================================= */

    const paginaInicial = $("paginaInicial");
    const paginaManual = $("paginaManual");

    const manualBtn = $("manualBtn");
    const planilhaBtn = $("planilhaBtn");
    const voltarManual = $("voltarManual");

    const seletorUnidade = $("seletorUnidade");
    const unidadeAtual = $("unidadeAtual");
    const menuUnidades = $("menuUnidades");

    const codigoProdutoInput = $("codigoProduto");
    const nomeProdutoInput = $("nomeProduto");
    const loteInput = $("lote");
    const validadeInput = $("validade");
    const qtdProdutosInput = $("qtdProdutos");
    const qtdCaixasInput = $("qtdCaixas");

    const previsaoNumeracao = $("previsaoNumeracao");
    const textoNumeracao = $("textoNumeracao");

    const tamanhoSelecionado = $("tamanhoSelecionado");

    const cardsTamanho = Array.from(
        document.querySelectorAll(".card-tamanho")
    );

    const adicionarMaterialBtn = $("adicionarMaterialBtn");
    const listaMateriais = $("listaMateriais");
    const itensMateriais = $("itensMateriais");

    const resumoQuantidade = $("resumoQuantidade");
    const resumoMateriais = $("resumoMateriais");
    const resumoCaixas = $("resumoCaixas");
    const resumoEtiquetas = $("resumoEtiquetas");

    const emitirBtn = $("emitirBtn");

    const areaPreVisualizacao = $("areaPreVisualizacao");
    const containerEtiquetas = $("containerEtiquetas");

    const fecharPreview = $("fecharPreview");
    const editarEtiquetas = $("editarEtiquetas");


    /* =========================================================
       VARIÁVEIS
    ========================================================= */

    let materiais = [];

    let indiceEmEdicao = -1;

    let unidadeSelecionada =
        unidadeAtual
            ? unidadeAtual.textContent.trim()
            : "UPA Del Castilho";


    /* =========================================================
       ESCALAS
    ========================================================= */

    const ESCALA_ETIQUETA = {
        A4: 1,
        A5: 0.7071067812,
        A6: 0.5
    };


    const LARGURA_A4 = 900;

    const ALTURA_A4 =
        LARGURA_A4 *
        (210 / 297);


    /* =========================================================
       CONFIGURAÇÃO FÍSICA DAS FOLHAS
    ========================================================= */

    const CONFIG_PDF = {

        A4: {

            paginaLargura: 297,
            paginaAltura: 210,

            orientacao: "landscape",

            colunas: 1,
            linhas: 1,

            larguraEtiqueta: 297,
            alturaEtiqueta: 210
        },


        A5: {

            paginaLargura: 210,
            paginaAltura: 297,

            orientacao: "portrait",

            colunas: 1,
            linhas: 2,

            larguraEtiqueta: 210,
            alturaEtiqueta: 148.5
        },


        A6: {

            paginaLargura: 297,
            paginaAltura: 210,

            orientacao: "landscape",

            colunas: 2,
            linhas: 2,

            larguraEtiqueta: 148.5,
            alturaEtiqueta: 105
        }
    };


    /* =========================================================
       REMOVER ESTILO ANTERIOR
    ========================================================= */

    const estiloAnterior =
        $("estilo-etiqueta-final");

    if (estiloAnterior) {
        estiloAnterior.remove();
    }


    /* =========================================================
       CRIAR ESTILO
    ========================================================= */

    const estiloEtiqueta =
        document.createElement("style");

    estiloEtiqueta.id =
        "estilo-etiqueta-final";


    estiloEtiqueta.textContent =
    
/* =========================================================
   IMPRESSÃO FINAL
========================================================= */

@media print {

    /* -----------------------------------------------------
       CONFIGURAÇÃO DA FOLHA
    ----------------------------------------------------- */

    @page {
        margin: 0 !important;
    }


    /* -----------------------------------------------------
       DOCUMENTO
    ----------------------------------------------------- */

    html,
    body {
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;

        background: #ffffff !important;

        overflow: visible !important;
    }


    /* -----------------------------------------------------
       ESCONDER TUDO
       
       Durante a impressão, nada da interface deve
       ocupar espaço na página.
    ----------------------------------------------------- */

    body > * {
        display: none !important;
    }


    /* -----------------------------------------------------
       MOSTRAR SOMENTE A ÁREA DE PRÉ-VISUALIZAÇÃO
    ----------------------------------------------------- */

    #areaPreVisualizacao {
        display: block !important;

        position: static !important;

        width: 100% !important;

        margin: 0 !important;
        padding: 0 !important;

        background: #ffffff !important;

        box-shadow: none !important;

        overflow: visible !important;
    }


    /*
     * IMPORTANTE:
     *
     * Todos os elementos diretamente dentro da área
     * de pré-visualização ficam ocultos.
     *
     * Isso elimina definitivamente:
     *
     * + Inserir
     * cabeçalho
     * botões
     * ações
     * títulos
     * etc.
     */

    #areaPreVisualizacao > * {
        display: none !important;
    }


    /*
     * A única coisa que volta a aparecer é
     * o container das etiquetas.
     */

    #areaPreVisualizacao > #containerEtiquetas {
        display: block !important;
    }


    /* -----------------------------------------------------
       CONTAINER
    ----------------------------------------------------- */

    #containerEtiquetas {

        position: static !important;

        display: block !important;

        width: 100% !important;

        max-width: none !important;

        height: auto !important;

        margin: 0 !important;

        padding: 0 !important;

        overflow: visible !important;

        background: #ffffff !important;

        box-shadow: none !important;

        font-size: 0 !important;

        line-height: 0 !important;
    }


    /* =====================================================
       ETIQUETA BASE
    ===================================================== */

    #containerEtiquetas .etiqueta {

        position: relative !important;

        box-sizing: border-box !important;

        margin: 0 !important;

        padding: 0 !important;

        max-width: none !important;

        min-width: 0 !important;

        min-height: 0 !important;

        box-shadow: none !important;

        overflow: hidden !important;

        background: #ffffff !important;

        break-inside: avoid !important;

        page-break-inside: avoid !important;

        font-size: initial !important;

        line-height: normal !important;
    }


    /* =====================================================
       A4
       
       1 etiqueta por folha
    ===================================================== */

    #containerEtiquetas[data-tamanho="A4"] {

        width: 297mm !important;

        height: auto !important;
    }


    #containerEtiquetas[data-tamanho="A4"] .etiqueta {

        display: flex !important;

        width: 297mm !important;

        height: 210mm !important;

        min-width: 297mm !important;

        min-height: 210mm !important;

        max-width: 297mm !important;

        max-height: 210mm !important;

        --escala: 1 !important;

        page-break-after: always !important;

        break-after: page !important;
    }


    #containerEtiquetas[data-tamanho="A4"]
    .etiqueta:last-child {

        page-break-after: auto !important;

        break-after: auto !important;
    }


    /* =====================================================
       A5
       
       2 etiquetas por folha
       
       Uma em cima da outra.
    ===================================================== */

    #containerEtiquetas[data-tamanho="A5"] {

        width: 210mm !important;

        height: auto !important;

        font-size: 0 !important;
    }


    #containerEtiquetas[data-tamanho="A5"] .etiqueta {

        display: flex !important;

        width: 210mm !important;

        height: 148.5mm !important;

        min-width: 210mm !important;

        min-height: 148.5mm !important;

        max-width: 210mm !important;

        max-height: 148.5mm !important;

        --escala: 0.7071067812 !important;

        vertical-align: top !important;
    }


    /*
     * A primeira etiqueta de cada folha começa
     * normalmente.
     *
     * Depois da segunda, quebra.
     */

    #containerEtiquetas[data-tamanho="A5"]
    .etiqueta:nth-child(2n) {

        page-break-after: always !important;

        break-after: page !important;
    }


    #containerEtiquetas[data-tamanho="A5"]
    .etiqueta:last-child {

        page-break-after: auto !important;

        break-after: auto !important;
    }


    /* =====================================================
       A6
       
       4 etiquetas por folha.
       
       2 colunas × 2 linhas.
       
       Cada folha:
       
       ┌──────────────┬──────────────┐
       │ etiqueta 1  │ etiqueta 2  │
       ├──────────────┼──────────────┤
       │ etiqueta 3  │ etiqueta 4  │
       └──────────────┴──────────────┘
    ===================================================== */

    #containerEtiquetas[data-tamanho="A6"] {

        position: relative !important;

        display: block !important;

        width: 297mm !important;

        height: auto !important;

        margin: 0 !important;

        padding: 0 !important;

        font-size: 0 !important;

        line-height: 0 !important;

        overflow: visible !important;
    }


    /*
     * Cada etiqueta A6 possui exatamente metade
     * da largura e metade da altura de uma folha A4.
     */

    #containerEtiquetas[data-tamanho="A6"] .etiqueta {

        display: inline-flex !important;

        vertical-align: top !important;

        box-sizing: border-box !important;

        width: 148.5mm !important;

        height: 105mm !important;

        min-width: 148.5mm !important;

        min-height: 105mm !important;

        max-width: 148.5mm !important;

        max-height: 105mm !important;

        margin: 0 !important;

        padding: 0 !important;

        --escala: 0.5 !important;

        page-break-inside: avoid !important;

        break-inside: avoid !important;

        page-break-after: auto !important;

        break-after: auto !important;
    }


    /*
     * -----------------------------------------------------
     * QUEBRA DE FOLHA A CADA 4 ETIQUETAS
     * -----------------------------------------------------
     *
     * A etiqueta 4 termina a primeira folha.
     *
     * A etiqueta 8 termina a segunda folha.
     *
     * A etiqueta 12 termina a terceira folha.
     *
     * etc.
     */

    #containerEtiquetas[data-tamanho="A6"]
    .etiqueta:nth-child(4n) {

        page-break-after: always !important;

        break-after: page !important;
    }


    /*
     * A última etiqueta nunca cria uma página vazia.
     */

    #containerEtiquetas[data-tamanho="A6"]
    .etiqueta:last-child {

        page-break-after: auto !important;

        break-after: auto !important;
    }


    /* =====================================================
       CONTEÚDO INTERNO
    ===================================================== */

    #containerEtiquetas .etiqueta-cabecalho,
    #containerEtiquetas .etiqueta-corpo,
    #containerEtiquetas .dados-produto {

        overflow: visible !important;
    }


    /* -----------------------------------------------------
       AÇÕES E CONTROLES
    ----------------------------------------------------- */

    .acoes-material,
    .botao-editar-material,
    .botao-remover-material,
    .nao-imprimir {

        display: none !important;
    }


    /* -----------------------------------------------------
       LISTA DE MATERIAIS
    ----------------------------------------------------- */

    .lista-materiais,
    #listaMateriais,
    #itensMateriais {

        display: none !important;
    }


    /* -----------------------------------------------------
       BOTÕES
    ----------------------------------------------------- */

    button,
    input,
    select,
    textarea {

        display: none !important;
    }


    /* -----------------------------------------------------
       COR DA IMPRESSÃO
    ----------------------------------------------------- */

    * {

        -webkit-print-color-adjust: exact !important;

        print-color-adjust: exact !important;
    }
}`

        /* =====================================================
           PRÉ-VISUALIZAÇÃO
        ===================================================== */

        #containerEtiquetas {

            width: 100%;

            box-sizing: border-box;

            display: flex;

            flex-direction: column;

            align-items: center;

            gap: 24px;

            padding:
                12px
                8px
                30px
                8px;

            overflow-x: hidden;

            overflow-y: visible;

            max-width: 100%;
        }


        /* =====================================================
           ETIQUETA
        ===================================================== */

        .etiqueta {

            --escala: 1;

            position: relative;

            box-sizing: border-box;

            flex: 0 0 auto;

            width:
                calc(
                    ${LARGURA_A4}px *
                    var(--escala)
                );

            height:
                calc(
                    ${ALTURA_A4}px *
                    var(--escala)
                );

            max-width:
                calc(
                    100vw - 40px
                );

            background: #ffffff;

            color: #111827;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            overflow: hidden;

            display: flex;

            flex-direction: column;

            page-break-inside: avoid;

            break-inside: avoid;

            box-shadow:
                0 2px 10px
                rgba(0,0,0,.08);
        }


        .etiqueta-a4 {
            --escala: 1;
        }


        .etiqueta-a5 {
            --escala: 0.7071067812;
        }


        .etiqueta-a6 {
            --escala: 0.5;
        }


        /* =====================================================
           CABEÇALHO DA ETIQUETA
        ===================================================== */

        .etiqueta-cabecalho {

            position: relative;

            width: 100%;

            height: 27%;

            min-height: 0;

            box-sizing: border-box;

            display: grid;

            grid-template-columns:
                minmax(0,1fr)
                minmax(0,1fr);

            align-items: center;

            gap:
                calc(
                    30px *
                    var(--escala)
                );

            padding:
                calc(
                    24px *
                    var(--escala)
                )
                calc(
                    32px *
                    var(--escala)
                )
                calc(
                    16px *
                    var(--escala)
                )
                calc(
                    32px *
                    var(--escala)
                );
        }


        /* =====================================================
           LOGO
        ===================================================== */

        .etiqueta-logo-area {

            min-width: 0;

            width: 100%;

            height: 100%;

            display: flex;

            align-items: flex-start;

            justify-content: flex-start;

            overflow: hidden;
        }


        .logo-etiqueta {

            display: block;

            width:
                calc(
                    210px *
                    var(--escala)
                );

            height: auto;

            max-width: 100%;

            max-height: 100%;

            object-fit: contain;

            object-position:
                left top;
        }


        /* =====================================================
           UNIDADE
        ===================================================== */

        .etiqueta-unidade {

            min-width: 0;

            width: 100%;

            height: 100%;

            display: flex;

            align-items: flex-start;

            justify-content: flex-end;

            text-align: right;

            overflow: hidden;
        }


        .etiqueta-unidade strong {

            display: block;

            width: 100%;

            max-width: 100%;

            font-size:
                calc(
                    32px *
                    var(--escala)
                );

            line-height: 1.08;

            font-weight: 800;

            color: #111827;

            text-align: right;

            white-space: normal;

            overflow-wrap: break-word;

            word-break: normal;
        }


        /* =====================================================
           CORPO DA ETIQUETA
        ===================================================== */

        .etiqueta-corpo {

            position: relative;

            flex: 1 1 auto;

            min-height: 0;

            box-sizing: border-box;

            margin:
                0
                calc(
                    32px *
                    var(--escala)
                )
                calc(
                    30px *
                    var(--escala)
                )
                calc(
                    32px *
                    var(--escala)
                );

            padding:
                calc(
                    28px *
                    var(--escala)
                )
                calc(
                    30px *
                    var(--escala)
                );

            border:
                calc(
                    4px *
                    var(--escala)
                )
                solid
                #1d2935;

            border-radius:
                calc(
                    22px *
                    var(--escala)
                );

            background: #ffffff;

            display: flex;

            flex-direction: column;

            justify-content: center;

            align-items: flex-start;
        }


        /* =====================================================
           DADOS DO PRODUTO
        ===================================================== */

        .dados-produto {

            width: 100%;

            display: flex;

            flex-direction: column;

            align-items: flex-start;

            justify-content: center;

            gap:
                calc(
                    18px *
                    var(--escala)
                );

            padding-right:
                calc(
                    50px *
                    var(--escala)
                );

            box-sizing: border-box;
        }


        .linha-etiqueta {

            width: 100%;

            display: flex;

            align-items: baseline;

            justify-content: flex-start;

            gap:
                calc(
                    14px *
                    var(--escala)
                );

            font-size:
                calc(
                    25px *
                    var(--escala)
                );

            line-height: 1.22;

            margin: 0;

            padding: 0;

            border: 0;
        }


        .linha-nome {

            font-size:
                calc(
                    29px *
                    var(--escala)
                );
        }


        .linha-etiqueta .rotulo {

            flex: 0 0 auto;

            font-weight: 800;

            color: #111827;

            white-space: nowrap;
        }


        .linha-etiqueta .valor {

            min-width: 0;

            flex: 0 1 auto;

            font-weight: 500;

            color: #111827;

            overflow-wrap: anywhere;

            word-break: break-word;
        }


        .linha-nome .valor {
            font-weight: 600;
        }


        .linha-qtd .valor {
            font-weight: 800;
        }


        /* =====================================================
           NUMERAÇÃO
        ===================================================== */

        .numeracao-caixa {

            position: absolute;

            right:
                calc(
                    18px *
                    var(--escala)
                );

            bottom:
                calc(
                    14px *
                    var(--escala)
                );

            z-index: 20;

            font-size:
                calc(
                    25px *
                    var(--escala)
                );

            line-height: 1;

            font-weight: 800;

            color: #111827;

            background: #ffffff;

            padding:
                calc(
                    3px *
                    var(--escala)
                )
                calc(
                    6px *
                    var(--escala)
                );
        }


        /* =====================================================
           A6
        ===================================================== */

        .etiqueta-a6 .etiqueta-corpo {

            margin-bottom:
                calc(
                    38px *
                    var(--escala)
                );
        }


        /* =====================================================
           RESPONSIVO
        ===================================================== */

        @media (max-width: 940px) {

            .etiqueta {

                max-width:
                    calc(
                        100vw - 40px
                    );
            }


            .etiqueta-a4 {

                width:
                    calc(
                        100vw - 40px
                    );

                height: auto;

                aspect-ratio:
                    297 / 210;
            }
        }


        @media (max-width: 700px) {

            #containerEtiquetas {

                padding-left: 4px;

                padding-right: 4px;
            }


            .etiqueta {

                max-width:
                    calc(
                        100vw - 20px
                    );
            }


            .etiqueta-a4 {

                width:
                    calc(
                        100vw - 20px
                    );
            }
        }


        /* =====================================================
           LISTA DE MATERIAIS
        ===================================================== */

        .item-material {
            position: relative;
        }


        .acoes-material {

            display: flex;

            align-items: center;

            gap: 8px;

            margin-left: auto;
        }


        .botao-editar-material,
        .botao-remover-material {

            width: 38px;

            height: 38px;

            border: 0;

            border-radius: 8px;

            cursor: pointer;

            display: inline-flex;

            align-items: center;

            justify-content: center;

            font-size: 18px;

            line-height: 1;
        }


        .botao-editar-material {

            background: #eef4f7;

            color: #195777;
        }


        .botao-remover-material {

            background: #fbecec;

            color: #b42318;
        }


        /* =====================================================
           =====================================================
           IMPRESSÃO
           =====================================================
        ===================================================== */

        @media print {

            /* -------------------------------------------------
               CONFIGURAÇÃO DA PÁGINA
            ------------------------------------------------- */

            @page {
                margin: 0;
            }


            /* -------------------------------------------------
               DOCUMENTO
            ------------------------------------------------- */

            html,
            body {

                margin: 0 !important;

                padding: 0 !important;

                width: 100% !important;

                height: auto !important;

                background: #ffffff !important;

                overflow: visible !important;
            }


            /* -------------------------------------------------
               REGRA PRINCIPAL
               
               Tudo fica invisível.
               
               Depois liberamos SOMENTE a área das etiquetas.
               
               Isso impede que "+ Inserir", cabeçalhos,
               botões, resumos ou outros elementos ocupem
               espaço físico na primeira página.
            ------------------------------------------------- */

            body * {

                visibility: hidden !important;
            }


            #areaPreVisualizacao,
            #areaPreVisualizacao * {

                visibility: visible !important;
            }


            /* -------------------------------------------------
               ÁREA DE PREVISUALIZAÇÃO
            ------------------------------------------------- */

            #areaPreVisualizacao {

                display: block !important;

                position: static !important;

                width: 100% !important;

                height: auto !important;

                margin: 0 !important;

                padding: 0 !important;

                background: #ffffff !important;

                box-shadow: none !important;

                overflow: visible !important;
            }


            /* -------------------------------------------------
               CONTAINER DAS ETIQUETAS
               
               IMPORTANTE:
               
               O container passa a ser o único elemento que
               determina o posicionamento físico das etiquetas.
            ------------------------------------------------- */

            #containerEtiquetas {

                box-sizing: border-box !important;

                margin: 0 !important;

                padding: 0 !important;

                gap: 0 !important;

                max-width: none !important;

                overflow: visible !important;

                background: #ffffff !important;

                box-shadow: none !important;
            }


            /* -------------------------------------------------
               ETIQUETA BASE
            ------------------------------------------------- */

            #containerEtiquetas .etiqueta {

                box-sizing: border-box !important;

                margin: 0 !important;

                padding: 0 !important;

                max-width: none !important;

                max-height: none !important;

                box-shadow: none !important;

                overflow: hidden !important;

                break-inside: avoid !important;

                page-break-inside: avoid !important;
            }


            /* =================================================
               A4
               
               1 etiqueta por folha
            ================================================= */

            #containerEtiquetas[data-tamanho="A4"] {

                display: block !important;

                width: 297mm !important;

                height: auto !important;

                margin: 0 !important;

                padding: 0 !important;
            }


            #containerEtiquetas[data-tamanho="A4"]
            .etiqueta {

                display: flex !important;

                width: 297mm !important;

                min-width: 297mm !important;

                max-width: 297mm !important;

                height: 210mm !important;

                min-height: 210mm !important;

                max-height: 210mm !important;

                --escala: 1 !important;

                page-break-after: always !important;

                break-after: page !important;
            }


            #containerEtiquetas[data-tamanho="A4"]
            .etiqueta:last-child {

                page-break-after: auto !important;

                break-after: auto !important;
            }


            /* =================================================
               A5
               
               2 etiquetas por folha
               
               Uma em cima da outra.
            ================================================= */

            #containerEtiquetas[data-tamanho="A5"] {

                display: flex !important;

                flex-direction: column !important;

                align-items: flex-start !important;

                width: 210mm !important;

                height: auto !important;

                margin: 0 !important;

                padding: 0 !important;
            }


            #containerEtiquetas[data-tamanho="A5"]
            .etiqueta {

                display: flex !important;

                flex: 0 0 auto !important;

                width: 210mm !important;

                min-width: 210mm !important;

                max-width: 210mm !important;

                height: 148.5mm !important;

                min-height: 148.5mm !important;

                max-height: 148.5mm !important;

                --escala: 0.7071067812 !important;
            }


            /*
             * Depois da segunda etiqueta,
             * inicia uma nova folha.
             */

            #containerEtiquetas[data-tamanho="A5"]
            .etiqueta:nth-child(2n) {

                page-break-after: always !important;

                break-after: page !important;
            }


            #containerEtiquetas[data-tamanho="A5"]
            .etiqueta:last-child {

                page-break-after: auto !important;

                break-after: auto !important;
            }


            /* =================================================
               A6
               
               4 etiquetas por folha:
               
               ┌──────────┬──────────┐
               │    1     │    2     │
               ├──────────┼──────────┤
               │    3     │    4     │
               └──────────┴──────────┘
            ================================================= */

            #containerEtiquetas[data-tamanho="A6"] {

                display: grid !important;

                grid-template-columns:
                    148.5mm
                    148.5mm !important;

                grid-template-rows:
                    105mm
                    105mm !important;

                grid-auto-rows:
                    105mm !important;

                width: 297mm !important;

                height: auto !important;

                margin: 0 !important;

                padding: 0 !important;

                gap: 0 !important;

                align-items: start !important;

                justify-items: start !important;
            }


            #containerEtiquetas[data-tamanho="A6"]
            .etiqueta {

                display: flex !important;

                width: 148.5mm !important;

                min-width: 148.5mm !important;

                max-width: 148.5mm !important;

                height: 105mm !important;

                min-height: 105mm !important;

                max-height: 105mm !important;

                --escala: 0.5 !important;

                margin: 0 !important;

                padding: 0 !important;

                page-break-after: auto !important;

                break-after: auto !important;

                break-inside: avoid !important;

                page-break-inside: avoid !important;
            }


            /*
             * A cada grupo de 4 etiquetas, quebramos
             * explicitamente a página.
             *
             * O quarto item não é duplicado.
             * Ele apenas força a próxima etiqueta a
             * começar em uma nova folha.
             */

            #containerEtiquetas[data-tamanho="A6"]
            .etiqueta:nth-child(4n) {

                page-break-after: always !important;

                break-after: page !important;
            }


            /*
             * A última etiqueta nunca deve criar
             * uma folha vazia.
             */

            #containerEtiquetas[data-tamanho="A6"]
            .etiqueta:last-child {

                page-break-after: auto !important;

                break-after: auto !important;
            }


            /* -------------------------------------------------
               CONTEÚDO INTERNO
            ------------------------------------------------- */

            .etiqueta-cabecalho,
            .etiqueta-corpo,
            .dados-produto {

                overflow: visible !important;
            }


            /* -------------------------------------------------
               ELEMENTOS QUE NÃO FAZEM PARTE DA ETIQUETA
            ------------------------------------------------- */

            .nao-imprimir {

                display: none !important;

                visibility: hidden !important;
            }


            /*
             * "+ Inserir"
             */

            #adicionarMaterialBtn {

                display: none !important;

                visibility: hidden !important;
            }


            /*
             * Lista de materiais
             */

            #listaMateriais,
            #itensMateriais,
            .lista-materiais {

                display: none !important;

                visibility: hidden !important;
            }


            /*
             * Botões de ação
             */

            .acoes-material,
            .botao-editar-material,
            .botao-remover-material {

                display: none !important;

                visibility: hidden !important;
            }


            /*
             * Botões da interface
             */

            #emitirBtn,
            #fecharPreview,
            #editarEtiquetas,
            .cabecalho-preview,
            .acoes-preview {

                display: none !important;

                visibility: hidden !important;
            }


            /*
             * Inputs e controles
             */

            button,
            input,
            select,
            textarea {

                display: none !important;

                visibility: hidden !important;
            }


            /* -------------------------------------------------
               CORES
            ------------------------------------------------- */

            * {

                -webkit-print-color-adjust: exact !important;

                print-color-adjust: exact !important;
            }
        }
    `;


    document.head.appendChild(
        estiloEtiqueta
    );


    /* =========================================================
       FUNÇÕES DE INTERFACE
    ========================================================= */

    function mostrarPaginaManual() {

        if (paginaInicial) {
            paginaInicial.style.display = "none";
        }

        if (paginaManual) {
            paginaManual.style.display = "block";
        }
    }


    function mostrarPaginaInicial() {

        if (paginaManual) {
            paginaManual.style.display = "none";
        }

        if (paginaInicial) {
            paginaInicial.style.display = "block";
        }
    }


    /* =========================================================
       BOTÃO MANUAL
    ========================================================= */

    if (manualBtn) {

        manualBtn.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                mostrarPaginaManual();
            }
        );
    }


    /* =========================================================
       BOTÃO PLANILHA
    ========================================================= */

    if (planilhaBtn) {

        planilhaBtn.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                console.log(
                    "Importação por planilha selecionada."
                );
            }
        );
    }


    /* =========================================================
       VOLTAR
    ========================================================= */

    if (voltarManual) {

        voltarManual.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                mostrarPaginaInicial();
            }
        );
    }


    /* =========================================================
       ESCAPAR HTML
    ========================================================= */

    function escaparHTML(valor) {

        return String(
            valor == null
                ? ""
                : valor
        )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
    }


    /* =========================================================
       MOSTRAR ERRO
    ========================================================= */

    function mostrarErro(mensagem) {

        console.error(
            mensagem
        );

        const elemento =
            $("mensagem");

        if (elemento) {

            elemento.textContent =
                mensagem;

            elemento.style.display =
                "block";
        }
    }


    /* =========================================================
       LIMPAR ERRO
    ========================================================= */

    function limparErro() {

        const elemento =
            $("mensagem");

        if (elemento) {

            elemento.textContent =
                "";

            elemento.style.display =
                "none";
        }
    }


    /* =========================================================
       OBTER TAMANHO SELECIONADO
    ========================================================= */

    function obterTamanhoSelecionado() {

        if (
            tamanhoSelecionado &&
            tamanhoSelecionado.value
        ) {

            return String(
                tamanhoSelecionado.value
            ).toUpperCase();
        }


        const cardSelecionado =
            cardsTamanho.find(
                function (card) {

                    return card.classList.contains(
                        "selecionado"
                    ) ||
                    card.classList.contains(
                        "ativo"
                    );
                }
            );


        if (cardSelecionado) {

            const tamanho =
                cardSelecionado.dataset.tamanho ||
                cardSelecionado.getAttribute(
                    "data-tamanho"
                );


            if (tamanho) {

                return String(
                    tamanho
                ).toUpperCase();
            }
        }


        return "A4";
    }


    /* =========================================================
       SELEÇÃO DE TAMANHO
    ========================================================= */

    cardsTamanho.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    cardsTamanho.forEach(
                        function (outroCard) {

                            outroCard.classList.remove(
                                "selecionado"
                            );

                            outroCard.classList.remove(
                                "ativo"
                            );
                        }
                    );


                    card.classList.add(
                        "selecionado"
                    );


                    const tamanho =
                        card.dataset.tamanho ||
                        card.getAttribute(
                            "data-tamanho"
                        );


                    if (
                        tamanhoSelecionado &&
                        tamanho
                    ) {

                        tamanhoSelecionado.value =
                            String(
                                tamanho
                            ).toUpperCase();
                    }


                    invalidarPreVisualizacao();
                }
            );
        }
    );


    /* =========================================================
       UNIDADE
    ========================================================= */

    if (
        seletorUnidade &&
        menuUnidades
    ) {

        seletorUnidade.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                menuUnidades.classList.toggle(
                    "aberto"
                );
            }
        );


        menuUnidades
            .querySelectorAll(
                "[data-unidade]"
            )
            .forEach(
                function (item) {

                    item.addEventListener(
                        "click",
                        function () {

                            const unidade =
                                item.dataset.unidade;


                            if (unidade) {

                                unidadeSelecionada =
                                    unidade;


                                if (unidadeAtual) {

                                    unidadeAtual.textContent =
                                        unidade;
                                }
                            }


                            menuUnidades.classList.remove(
                                "aberto"
                            );


                            invalidarPreVisualizacao();
                        }
                    );
                }
            );
    }


    /* =========================================================
       PREVISÃO DA NUMERAÇÃO
    ========================================================= */

    function atualizarPrevisaoNumeracao() {

        if (!previsaoNumeracao) {
            return;
        }


        const qtd =
            Number(
                qtdCaixasInput
                    ? qtdCaixasInput.value
                    : 0
            ) || 0;


        const numerar =
            document.querySelector(
                'input[name="numerar"]:checked'
            );


        if (
            numerar &&
            numerar.value === "sim" &&
            qtd > 0
        ) {

            previsaoNumeracao.style.display =
                "block";


            if (textoNumeracao) {

                textoNumeracao.textContent =
                    `As caixas serão numeradas de 1/${qtd} até ${qtd}/${qtd}.`;
            }

        } else {

            previsaoNumeracao.style.display =
                "none";
        }
    }


    if (qtdCaixasInput) {

        qtdCaixasInput.addEventListener(
            "input",
            function () {

                atualizarPrevisaoNumeracao();

                atualizarResumoQuantidade();
            }
        );
    }


    /* =========================================================
       RESUMO DA QUANTIDADE
    ========================================================= */

    function atualizarResumoQuantidade() {

        const quantidade =
            Number(
                qtdProdutosInput
                    ? qtdProdutosInput.value
                    : 0
            ) || 0;


        if (resumoQuantidade) {

            resumoQuantidade.textContent =
                String(
                    quantidade
                );
        }
    }


    if (qtdProdutosInput) {

        qtdProdutosInput.addEventListener(
            "input",
            function () {

                atualizarResumoQuantidade();
            }
        );
    }


    /* =========================================================
       ADICIONAR MATERIAL
    ========================================================= */

    if (adicionarMaterialBtn) {

        adicionarMaterialBtn.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                evento.stopPropagation();


                const tamanho =
                    obterTamanhoSelecionado();


                const nomeProduto =
                    nomeProdutoInput
                        ? nomeProdutoInput.value.trim()
                        : "";


                const lote =
                    loteInput
                        ? loteInput.value.trim()
                        : "";


                const validade =
                    validadeInput
                        ? validadeInput.value.trim()
                        : "";


                const qtdProdutos =
                    qtdProdutosInput
                        ? qtdProdutosInput.value.trim()
                        : "";


                const qtdCaixas =
                    qtdCaixasInput
                        ? qtdCaixasInput.value.trim()
                        : "";


                if (!nomeProduto) {

                    mostrarErro(
                        "Informe o nome do produto."
                    );

                    return;
                }


                if (!qtdCaixas) {

                    mostrarErro(
                        "Informe a quantidade de caixas."
                    );

                    return;
                }


                const numerarRadio =
                    document.querySelector(
                        'input[name="numerar"]:checked'
                    );


                const numerar =
                    numerarRadio
                        ? numerarRadio.value === "sim"
                        : false;


                const material = {

                    unidade:
                        unidadeSelecionada,

                    nomeProduto:
                        nomeProduto,

                    lote:
                        lote,

                    validade:
                        validade,

                    qtdProdutos:
                        qtdProdutos,

                    qtdCaixas:
                        Number(qtdCaixas),

                    tamanho:
                        tamanho,

                    numerar:
                        numerar
                };


                if (
                    indiceEmEdicao >= 0 &&
                    indiceEmEdicao < materiais.length
                ) {

                    materiais[
                        indiceEmEdicao
                    ] = material;

                    indiceEmEdicao = -1;

                } else {

                    materiais.push(
                        material
                    );
                }


                renderizarListaMateriais();

                invalidarPreVisualizacao();

                limparErro();
            }
        );
    }


    /* =========================================================
       RENDERIZAR LISTA DE MATERIAIS
    ========================================================= */

    function renderizarListaMateriais() {

        if (!itensMateriais) {
            return;
        }


        itensMateriais.innerHTML =
            "";


        let totalCaixas = 0;

        let totalEtiquetas = 0;


        materiais.forEach(
            function (material, indice) {

                const quantidade =
                    Number(
                        material.qtdCaixas
                    ) || 0;


                totalCaixas +=
                    quantidade;


                totalEtiquetas +=
                    quantidade;


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "item-material";


                item.innerHTML = `

                    <div class="dados-item-material">

                        <strong>
                            ${escaparHTML(
                                material.nomeProduto
                            )}
                        </strong>

                        <span>
                            ${escaparHTML(
                                material.tamanho
                            )}
                        </span>

                        <span>
                            ${quantidade}
                            ${
                                quantidade === 1
                                    ? "caixa"
                                    : "caixas"
                            }
                        </span>

                    </div>

                    <div class="acoes-material">

                        <button
                            type="button"
                            class="botao-editar-material"
                            data-indice="${indice}"
                        >
                            ✎
                        </button>

                        <button
                            type="button"
                            class="botao-remover-material"
                            data-indice="${indice}"
                        >
                            ×
                        </button>

                    </div>
                `;


                itensMateriais.appendChild(
                    item
                );
            }
        );


        /* =====================================================
           EDITAR
        ===================================================== */

        itensMateriais
            .querySelectorAll(
                ".botao-editar-material"
            )
            .forEach(
                function (botao) {

                    botao.addEventListener(
                        "click",
                        function (evento) {

                            evento.preventDefault();

                            evento.stopPropagation();


                            const indice =
                                Number(
                                    botao.dataset.indice
                                );


                            if (
                                !Number.isInteger(indice) ||
                                indice < 0 ||
                                indice >= materiais.length
                            ) {
                                return;
                            }


                            const material =
                                materiais[indice];


                            if (nomeProdutoInput) {

                                nomeProdutoInput.value =
                                    material.nomeProduto || "";
                            }


                            if (loteInput) {

                                loteInput.value =
                                    material.lote || "";
                            }


                            if (validadeInput) {

                                validadeInput.value =
                                    material.validade || "";
                            }


                            if (qtdProdutosInput) {

                                qtdProdutosInput.value =
                                    material.qtdProdutos || "";
                            }


                            if (qtdCaixasInput) {

                                qtdCaixasInput.value =
                                    material.qtdCaixas || "";
                            }


                            if (
                                tamanhoSelecionado &&
                                material.tamanho
                            ) {

                                tamanhoSelecionado.value =
                                    material.tamanho;
                            }


                            cardsTamanho.forEach(
                                function (card) {

                                    card.classList.remove(
                                        "selecionado"
                                    );

                                    card.classList.remove(
                                        "ativo"
                                    );


                                    const tamanhoCard =
                                        String(
                                            card.dataset.tamanho ||
                                            ""
                                        ).toUpperCase();


                                    if (
                                        tamanhoCard ===
                                        String(
                                            material.tamanho
                                        ).toUpperCase()
                                    ) {

                                        card.classList.add(
                                            "selecionado"
                                        );
                                    }
                                }
                            );


                            indiceEmEdicao =
                                indice;


                            atualizarPrevisaoNumeracao();

                            mostrarPaginaManual();
                        }
                    );
                }
            );


    /* =========================================================
       EXCLUIR
    ========================================================= */

    itensMateriais
        .querySelectorAll(
            ".botao-remover-material"
        )
        .forEach(
            function (botao) {

                botao.addEventListener(
                    "click",
                    function (evento) {

                        evento.preventDefault();

                        evento.stopPropagation();


                        const indice =
                            Number(
                                botao.dataset.indice
                            );


                        if (
                            !Number.isInteger(indice) ||
                            indice < 0 ||
                            indice >= materiais.length
                        ) {
                            return;
                        }


                        materiais.splice(
                            indice,
                            1
                        );


                        indiceEmEdicao =
                            -1;


                        renderizarListaMateriais();

                        invalidarPreVisualizacao();
                    }
                );
            }
        );


        /* =====================================================
           RESUMOS
        ===================================================== */

        if (resumoMateriais) {

            resumoMateriais.textContent =
                `${materiais.length} ${
                    materiais.length === 1
                        ? "material"
                        : "materiais"
                }`;
        }


        if (resumoCaixas) {

            resumoCaixas.textContent =
                `${totalCaixas} ${
                    totalCaixas === 1
                        ? "caixa"
                        : "caixas"
                }`;
        }


        if (resumoEtiquetas) {

            resumoEtiquetas.textContent =
                `${totalEtiquetas} ${
                    totalEtiquetas === 1
                        ? "etiqueta"
                        : "etiquetas"
                }`;
        }


        if (listaMateriais) {

            listaMateriais.style.display =
                materiais.length > 0
                    ? "block"
                    : "none";
        }


        if (emitirBtn) {

            emitirBtn.disabled =
                materiais.length === 0;
        }
    }


    /* =========================================================
       INVALIDAR PRÉ-VISUALIZAÇÃO
    ========================================================= */

    function invalidarPreVisualizacao() {

        /*
         * Não apagamos a lista de etiquetas imediatamente.
         *
         * Apenas informamos que ela precisa ser regenerada.
         */

        limparErro();
    }


    /* =========================================================
       LOGO RIO SAÚDE
    ========================================================= */

    function criarLogoHTML() {

        return `

            <img
                class="logo-etiqueta"
                src="./logo-rio-saude.png"
                alt="Rio Saúde"
                decoding="sync"
            >

        `;
    }


    /* =========================================================
       NOME DA UNIDADE
    ========================================================= */

    function formatarNomeUnidade(
        unidade
    ) {

        const texto =
            String(
                unidade || ""
            ).trim();


        if (!texto) {
            return "";
        }


        const palavras =
            texto.split(/\s+/);


        if (
            palavras.length <= 1
        ) {

            return escaparHTML(
                texto
            );
        }


        let melhorQuebra = 1;

        let menorDiferenca =
            Infinity;


        for (
            let i = 1;
            i < palavras.length;
            i++
        ) {

            const linha1 =
                palavras
                    .slice(0, i)
                    .join(" ");


            const linha2 =
                palavras
                    .slice(i)
                    .join(" ");


            const diferenca =
                Math.abs(
                    linha1.length -
                    linha2.length
                );


            if (
                diferenca <
                menorDiferenca
            ) {

                menorDiferenca =
                    diferenca;

                melhorQuebra =
                    i;
            }
        }


        const linha1 =
            palavras
                .slice(
                    0,
                    melhorQuebra
                )
                .join(" ");


        const linha2 =
            palavras
                .slice(
                    melhorQuebra
                )
                .join(" ");


        return (
            escaparHTML(linha1) +
            "<br>" +
            escaparHTML(linha2)
        );
    }


    /* =========================================================
       CRIAR ETIQUETA
    ========================================================= */

    function criarEtiquetaHTML(
        material,
        numeroCaixa
    ) {

        const tamanho =
            String(
                material.tamanho ||
                "A4"
            ).toUpperCase();


        if (
            ![
                "A4",
                "A5",
                "A6"
            ].includes(tamanho)
        ) {

            throw new Error(
                "Tamanho de etiqueta inválido: " +
                tamanho
            );
        }


        const classeTamanho =
            "etiqueta-" +
            tamanho.toLowerCase();


        const escala =
            ESCALA_ETIQUETA[tamanho];


        const unidadeFormatada =
            formatarNomeUnidade(
                material.unidade
            );


        let numeracaoHTML =
            "";


        if (material.numerar) {

            numeracaoHTML = `

                <div
                    class="numeracao-caixa"
                    aria-label="Numeração da caixa"
                >
                    ${escaparHTML(
                        numeroCaixa
                    )}/${escaparHTML(
                        material.qtdCaixas
                    )}
                </div>

            `;
        }


        return `

            <div
                class="
                    etiqueta
                    ${classeTamanho}
                "

                data-tamanho="${escaparHTML(
                    tamanho
                )}"

                style="
                    --escala:${escala};
                "
            >

                <div
                    class="etiqueta-cabecalho"
                >

                    <div
                        class="etiqueta-logo-area"
                    >

                        ${criarLogoHTML()}

                    </div>


                    <div
                        class="etiqueta-unidade"
                    >

                        <strong>
                            ${unidadeFormatada}
                        </strong>

                    </div>

                </div>


                <div
                    class="etiqueta-corpo"
                >

                    <div
                        class="dados-produto"
                    >

                        <div
                            class="
                                linha-etiqueta
                                linha-nome
                            "
                        >

                            <span
                                class="rotulo"
                            >
                                NOME:
                            </span>


                            <span
                                class="valor"
                            >
                                ${escaparHTML(
                                    material.nomeProduto
                                )}
                            </span>

                        </div>


                        <div
                            class="linha-etiqueta"
                        >

                            <span
                                class="rotulo"
                            >
                                LOTE:
                            </span>


                            <span
                                class="valor"
                            >
                                ${escaparHTML(
                                    material.lote
                                )}
                            </span>

                        </div>


                        <div
                            class="linha-etiqueta"
                        >

                            <span
                                class="rotulo"
                            >
                                VALIDADE:
                            </span>


                            <span
                                class="valor"
                            >
                                ${escaparHTML(
                                    material.validade
                                )}
                            </span>

                        </div>


                        <div
                            class="
                                linha-etiqueta
                                linha-qtd
                            "
                        >

                            <span
                                class="rotulo"
                            >
                                QTD:
                            </span>


                            <span
                                class="valor"
                            >
                                ${escaparHTML(
                                    material.qtdProdutos
                                )}
                            </span>

                        </div>

                    </div>


                    ${numeracaoHTML}

                </div>

            </div>

        `;
    }


    /* =========================================================
       GERAR PRÉ-VISUALIZAÇÃO
    ========================================================= */

    function gerarPreVisualizacao() {

        if (!containerEtiquetas) {

            mostrarErro(
                "O espaço da pré-visualização não foi encontrado."
            );

            return false;
        }


        if (!materiais.length) {

            mostrarErro(
                "Adicione pelo menos um material antes de gerar as etiquetas."
            );

            return false;
        }


        containerEtiquetas.innerHTML =
            "";


        try {

            /*
             * O sistema trabalha com um único tamanho
             * por geração.
             */

            const tamanho =
                String(
                    materiais[0].tamanho ||
                    "A4"
                ).toUpperCase();


            containerEtiquetas.dataset.tamanho =
                tamanho;


            /*
             * UMA etiqueta por caixa.
             *
             * NÃO multiplicamos pelo número de posições
             * da folha.
             *
             * A posição da etiqueta na folha será definida
             * somente no momento da impressão.
             */

            materiais.forEach(
                function (material) {

                    const quantidadeCaixas =
                        Number(
                            material.qtdCaixas
                        ) || 0;


                    for (
                        let caixa = 1;
                        caixa <= quantidadeCaixas;
                        caixa++
                    ) {

                        containerEtiquetas.insertAdjacentHTML(
                            "beforeend",

                            criarEtiquetaHTML(
                                material,
                                caixa
                            )
                        );
                    }
                }
            );

        } catch (erro) {

            console.error(
                "Erro ao gerar pré-visualização:",
                erro
            );


            containerEtiquetas.innerHTML =
                "";


            mostrarErro(
                erro.message ||
                "Não foi possível gerar as etiquetas."
            );


            return false;
        }


        if (
            !containerEtiquetas.children.length
        ) {

            mostrarErro(
                "Nenhuma etiqueta foi criada."
            );


            return false;
        }


        if (areaPreVisualizacao) {

            areaPreVisualizacao.style.display =
                "block";
        }


        setTimeout(
            function () {

                if (areaPreVisualizacao) {

                    areaPreVisualizacao.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            },
            100
        );


        return true;
    }


    /* =========================================================
       BOTÃO GERAR ETIQUETAS
    ========================================================= */

    if (emitirBtn) {

        emitirBtn.type =
            "button";


        emitirBtn.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                evento.stopPropagation();


                if (!materiais.length) {

                    mostrarErro(
                        "Adicione pelo menos um material antes de gerar as etiquetas."
                    );


                    return;
                }


                gerarPreVisualizacao();
            }
        );
    }


    /* =========================================================
       FECHAR PRÉ-VISUALIZAÇÃO
    ========================================================= */

    if (fecharPreview) {

        fecharPreview.type =
            "button";


        fecharPreview.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                evento.stopPropagation();


                if (areaPreVisualizacao) {

                    areaPreVisualizacao.style.display =
                        "none";
                }
            }
        );
    }


    /* =========================================================
       EDITAR ETIQUETAS
    ========================================================= */

    if (editarEtiquetas) {

        editarEtiquetas.type =
            "button";


        editarEtiquetas.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                evento.stopPropagation();


                if (areaPreVisualizacao) {

                    areaPreVisualizacao.style.display =
                        "none";
                }


                mostrarPaginaManual();
            }
        );
    }

        /* =========================================================
       BOTÃO GERAR ETIQUETAS
    ========================================================= */

    if (emitirBtn) {

        emitirBtn.type = "button";

        emitirBtn.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();
                evento.stopPropagation();

                if (!materiais.length) {

                    mostrarErro(
                        "Adicione pelo menos um material antes de gerar as etiquetas."
                    );

                    return;
                }

                gerarPreVisualizacao();
            }
        );
    }


    /* =========================================================
       FECHAR PRÉ-VISUALIZAÇÃO
    ========================================================= */

    if (fecharPreview) {

        fecharPreview.type = "button";

        fecharPreview.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();
                evento.stopPropagation();

                if (areaPreVisualizacao) {

                    areaPreVisualizacao.style.display =
                        "none";
                }
            }
        );
    }


    /* =========================================================
       EDITAR ETIQUETAS
    ========================================================= */

    if (editarEtiquetas) {

        editarEtiquetas.type = "button";

        editarEtiquetas.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();
                evento.stopPropagation();

                if (areaPreVisualizacao) {

                    areaPreVisualizacao.style.display =
                        "none";
                }

                mostrarPaginaManual();
            }
        );
    }


    /* =========================================================
       CONFIGURAÇÃO FÍSICA DO PDF
    ========================================================= */

    const CONFIG_PDF = {

        A4: {

            paginaLargura: 297,
            paginaAltura: 210,

            orientacao: "landscape",

            colunas: 1,
            linhas: 1,

            larguraEtiqueta: 297,
            alturaEtiqueta: 210,

            etiquetasPorFolha: 1
        },


        A5: {

            paginaLargura: 210,
            paginaAltura: 297,

            orientacao: "portrait",

            colunas: 1,
            linhas: 2,

            larguraEtiqueta: 210,
            alturaEtiqueta: 148.5,

            etiquetasPorFolha: 2
        },


        A6: {

            paginaLargura: 297,
            paginaAltura: 210,

            orientacao: "landscape",

            colunas: 2,
            linhas: 2,

            larguraEtiqueta: 148.5,
            alturaEtiqueta: 105,

            etiquetasPorFolha: 4
        }

    };


    /* =========================================================
       FUNÇÃO ESPERAR
    ========================================================= */

    function esperar(milissegundos) {

        return new Promise(
            function (resolve) {

                setTimeout(
                    resolve,
                    milissegundos
                );
            }
        );
    }


    /* =========================================================
       FONTES
    ========================================================= */

    async function aguardarFontes() {

        if (
            document.fonts &&
            document.fonts.ready
        ) {

            try {

                await document.fonts.ready;

            } catch (erro) {

                console.warn(
                    "Não foi possível aguardar as fontes:",
                    erro
                );
            }
        }
    }


    /* =========================================================
       VERIFICAR BIBLIOTECAS
    ========================================================= */

    function verificarBibliotecas() {

        if (
            !window.jspdf ||
            typeof window.jspdf.jsPDF !== "function"
        ) {

            throw new Error(
                "A biblioteca jsPDF não foi carregada."
            );
        }


        if (
            typeof window.html2canvas !== "function"
        ) {

            throw new Error(
                "A biblioteca html2canvas não foi carregada."
            );
        }
    }


    /* =========================================================
       CAPTURAR ETIQUETA
    ========================================================= */

    async function capturarEtiqueta(elemento) {

        if (!elemento) {

            throw new Error(
                "Elemento da etiqueta não encontrado."
            );
        }


        if (
            typeof window.html2canvas !== "function"
        ) {

            throw new Error(
                "A biblioteca html2canvas não foi carregada."
            );
        }


        await aguardarFontes();

        await esperar(200);


        /*
         * Aguarda todas as imagens da etiqueta.
         */

        const imagens =
            Array.from(
                elemento.querySelectorAll("img")
            );


        await Promise.all(

            imagens.map(
                function (imagem) {

                    return new Promise(
                        function (resolve) {

                            if (
                                imagem.complete &&
                                imagem.naturalWidth > 0
                            ) {

                                resolve();

                                return;
                            }


                            imagem.addEventListener(
                                "load",
                                resolve,
                                {
                                    once: true
                                }
                            );


                            imagem.addEventListener(
                                "error",
                                resolve,
                                {
                                    once: true
                                }
                            );

                        }
                    );

                }
            )

        );


        await aguardarFontes();

        await esperar(150);


        const retangulo =
            elemento.getBoundingClientRect();


        const largura =
            Math.round(
                retangulo.width
            );


        const altura =
            Math.round(
                retangulo.height
            );


        if (
            !largura ||
            !altura
        ) {

            throw new Error(
                "Não foi possível obter as dimensões da etiqueta na pré-visualização."
            );
        }


        /*
         * Escala de captura.
         */

        const escala =
            Math.max(
                3,
                Math.min(
                    4,
                    (window.devicePixelRatio || 1) * 2
                )
            );


        /*
         * Captura SOMENTE a etiqueta.
         *
         * Nenhum cabeçalho, botão ou elemento
         * externo ao .etiqueta entra aqui.
         */

        const canvas =
            await window.html2canvas(
                elemento,
                {

                    scale: escala,

                    backgroundColor: "#ffffff",

                    useCORS: true,

                    allowTaint: false,

                    logging: false,

                    imageTimeout: 0,

                    removeContainer: true,

                    foreignObjectRendering: false,

                    scrollX: 0,

                    scrollY: 0,

                    /*
                     * Garante que a captura use
                     * exatamente o tamanho do elemento.
                     */

                    width: largura,

                    height: altura
                }
            );


        if (
            !canvas ||
            !canvas.width ||
            !canvas.height
        ) {

            throw new Error(
                "Não foi possível capturar a etiqueta."
            );
        }


        return {

            imagem:
                canvas.toDataURL(
                    "image/png"
                ),

            larguraPx:
                largura,

            alturaPx:
                altura
        };
    }


    /* =========================================================
       GERAR PDF DAS ETIQUETAS
    ========================================================= */

    async function gerarPDFDasEtiquetas() {

        verificarBibliotecas();


        if (!containerEtiquetas) {

            throw new Error(
                "A área de pré-visualização não foi encontrada."
            );
        }


        /*
         * IMPORTANTE:
         *
         * Pegamos o tamanho diretamente do container.
         */

        const tamanho =
            String(
                containerEtiquetas.dataset.tamanho ||
                obterTamanhoSelecionado() ||
                ""
            ).toUpperCase();


        if (
            !CONFIG_PDF[tamanho]
        ) {

            throw new Error(
                "Selecione o tamanho da etiqueta antes de imprimir."
            );
        }


        /*
         * SOMENTE etiquetas reais.
         *
         * O + Inserir nunca entra nessa coleção.
         */

        const etiquetas =
            Array.from(
                containerEtiquetas.children
            ).filter(
                function (elemento) {

                    return elemento.classList.contains(
                        "etiqueta"
                    );
                }
            );


        if (!etiquetas.length) {

            throw new Error(
                "Nenhuma etiqueta foi gerada para impressão."
            );
        }


        const configuracao =
            CONFIG_PDF[tamanho];


        const JsPDF =
            window.jspdf.jsPDF;


        /*
         * Cria o PDF no tamanho físico correto.
         */

        const pdf =
            new JsPDF({

                orientation:
                    configuracao.orientacao,

                unit:
                    "mm",

                format: [

                    configuracao.paginaLargura,

                    configuracao.paginaAltura

                ],

                compress: true
            });


        /*
         * =====================================================
         * CAPACIDADE DA FOLHA
         * =====================================================
         *
         * A4 = 1
         * A5 = 2
         * A6 = 4
         */

        const etiquetasPorFolha =
            configuracao.etiquetasPorFolha;


        /*
         * =====================================================
         * PROCESSAMENTO
         * =====================================================
         */

        for (
            let indice = 0;
            indice < etiquetas.length;
            indice++
        ) {

            /*
             * -------------------------------------------------
             * NOVA PÁGINA
             * -------------------------------------------------
             *
             * A primeira etiqueta sempre usa a página
             * inicial criada pelo jsPDF.
             *
             * Depois disso:
             *
             * A4 -> nova página a cada 1
             * A5 -> nova página a cada 2
             * A6 -> nova página a cada 4
             */

            if (
                indice > 0 &&
                indice % etiquetasPorFolha === 0
            ) {

                pdf.addPage(
                    [
                        configuracao.paginaLargura,
                        configuracao.paginaAltura
                    ],
                    configuracao.orientacao
                );
            }


            /*
             * -------------------------------------------------
             * CAPTURA
             * -------------------------------------------------
             */

            const captura =
                await capturarEtiqueta(
                    etiquetas[indice]
                );


            /*
             * -------------------------------------------------
             * POSIÇÃO NA FOLHA
             * -------------------------------------------------
             */

            const posicaoNaFolha =
                indice %
                etiquetasPorFolha;


            /*
             * COLUNA
             */

            const coluna =
                posicaoNaFolha %
                configuracao.colunas;


            /*
             * LINHA
             */

            const linha =
                Math.floor(
                    posicaoNaFolha /
                    configuracao.colunas
                );


            /*
             * -------------------------------------------------
             * COORDENADAS
             * -------------------------------------------------
             */

            const x =
                coluna *
                configuracao.larguraEtiqueta;


            const y =
                linha *
                configuracao.alturaEtiqueta;


            /*
             * -------------------------------------------------
             * INSERIR NO PDF
             * -------------------------------------------------
             */

            pdf.addImage(

                captura.imagem,

                "PNG",

                x,

                y,

                configuracao.larguraEtiqueta,

                configuracao.alturaEtiqueta,

                undefined,

                "FAST"
            );
        }


        /*
         * =====================================================
         * NOME DO ARQUIVO
         * =====================================================
         */

        const nomeArquivo =
            "etiquetas-" +
            tamanho.toLowerCase() +
            ".pdf";


        /*
         * =====================================================
         * SALVAR
         * =====================================================
         */

        pdf.save(
            nomeArquivo
        );
    }

/* =========================================================
   IMPRESSÃO DA PRÉ-VISUALIZAÇÃO
========================================================= */

function imprimirPreVisualizacao() {

    if (!containerEtiquetas) {

        mostrarErro(
            "A área de pré-visualização não foi encontrada."
        );

        return;
    }


    /*
     * SOMENTE elementos .etiqueta são considerados.
     *
     * O "+ Inserir" não participa desta coleção.
     */

    const etiquetas =
        Array.from(
            containerEtiquetas.children
        ).filter(
            function (elemento) {

                return elemento.classList.contains(
                    "etiqueta"
                );
            }
        );


    if (!etiquetas.length) {

        mostrarErro(
            "Nenhuma etiqueta foi gerada para impressão."
        );

        return;
    }


    /*
     * Garante o tamanho da impressão.
     */

    if (
        !containerEtiquetas.dataset.tamanho
    ) {

        const tamanho =
            obterTamanhoSelecionado();


        if (tamanho) {

            containerEtiquetas.dataset.tamanho =
                tamanho;
        }
    }


    /*
     * Mostra a área de pré-visualização.
     */

    if (areaPreVisualizacao) {

        areaPreVisualizacao.style.display =
            "block";
    }


    /*
     * Prepara a impressão.
     */

    prepararElementosParaImpressao();


    /*
     * Pequeno intervalo para o navegador
     * aplicar todas as alterações antes
     * de abrir a impressão.
     */

    setTimeout(
        function () {

            try {

                window.print();

            } catch (erro) {

                console.error(
                    "Erro ao abrir impressão:",
                    erro
                );


                restaurarElementosAposImpressao();


                mostrarErro(
                    "Não foi possível abrir a janela de impressão."
                );
            }

        },
        300
    );
}


/* =========================================================
   ELEMENTOS TEMPORARIAMENTE REMOVIDOS DA IMPRESSÃO
========================================================= */

/*
 * Aqui guardamos os elementos que forem retirados
 * temporariamente do DOM.
 *
 * Depois da impressão eles serão recolocados
 * exatamente na posição original.
 */

let elementosRemovidosDaImpressao = [];


/* =========================================================
   ENCONTRAR "+ INSERIR"
========================================================= */

function encontrarElementosInserir() {

    const encontrados = [];


    /*
     * Procuramos em toda a página.
     *
     * Não dependemos de:
     *
     * - id
     * - classe
     * - posição
     * - nome do elemento
     *
     * O único critério é o texto visível.
     */

    const todos =
        Array.from(
            document.body.querySelectorAll("*")
        );


    todos.forEach(
        function (elemento) {

            /*
             * Nunca mexer dentro de uma etiqueta.
             *
             * As etiquetas são intocáveis.
             */

            if (
                elemento.closest(".etiqueta")
            ) {

                return;
            }


            const texto =
                (
                    elemento.textContent ||
                    ""
                )
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();


            /*
             * Procuramos especificamente
             * pelo texto "+ inserir".
             */

            if (
                texto === "+ inserir"
            ) {

                /*
                 * Se o próprio elemento possui
                 * esse texto, ele é o elemento
                 * que queremos retirar.
                 */

                encontrados.push(
                    elemento
                );
            }
        }
    );


    /*
     * Remove duplicidades.
     */

    return Array.from(
        new Set(encontrados)
    );
}


/* =========================================================
   PREPARAR ELEMENTOS PARA IMPRESSÃO
========================================================= */

function prepararElementosParaImpressao() {

    /*
     * Primeiro limpamos qualquer preparação
     * anterior.
     */

    restaurarElementosAposImpressao();


    /*
     * -------------------------------------------------------
     * 1. REMOVER FISICAMENTE O "+ INSERIR"
     * -------------------------------------------------------
     *
     * Esta é a correção principal.
     *
     * Não estamos apenas colocando:
     *
     * display:none
     *
     * ou:
     *
     * visibility:hidden
     *
     * O elemento é realmente retirado do DOM
     * enquanto o Chrome monta a página de impressão.
     */

    const elementosInserir =
        encontrarElementosInserir();


    elementosInserir.forEach(
        function (elemento) {

            if (
                !elemento ||
                !elemento.parentNode
            ) {

                return;
            }


            /*
             * Guardamos o pai.
             */

            const pai =
                elemento.parentNode;


            /*
             * Guardamos o próximo irmão.
             *
             * Assim podemos devolver o elemento
             * exatamente ao lugar original.
             */

            const proximoIrmao =
                elemento.nextSibling;


            elementosRemovidosDaImpressao.push({

                elemento:
                    elemento,

                pai:
                    pai,

                proximoIrmao:
                    proximoIrmao
            });


            /*
             * REMOVE FISICAMENTE.
             */

            pai.removeChild(
                elemento
            );
        }
    );


    /*
     * -------------------------------------------------------
     * 2. MARCAR ELEMENTOS DE INTERFACE
     * -------------------------------------------------------
     *
     * Isso continua apenas para os demais controles
     * da interface.
     *
     * NÃO altera nenhuma etiqueta.
     */

    const elementosNaoImprimir =
        document.querySelectorAll(
            [
                "#paginaInicial",
                "#paginaManual",
                "#listaMateriais",
                "#itensMateriais",
                "#resumoEtiqueta",
                "#adicionarMaterialBtn",
                "#emitirBtn",
                "#mensagem",
                ".cabecalho-preview",
                ".acoes-preview",
                ".acoes-material",
                ".botao-editar-material",
                ".botao-remover-material"
            ].join(", ")
        );


    elementosNaoImprimir.forEach(
        function (elemento) {

            /*
             * Nunca esconder o container.
             */

            if (
                elemento ===
                containerEtiquetas
            ) {

                return;
            }


            /*
             * Nunca esconder uma etiqueta.
             */

            if (
                elemento.classList.contains(
                    "etiqueta"
                )
            ) {

                return;
            }


            elemento.classList.add(
                "nao-imprimir"
            );
        }
    );
}


/* =========================================================
   RESTAURAR ELEMENTOS APÓS A IMPRESSÃO
========================================================= */

function restaurarElementosAposImpressao() {

    /*
     * -------------------------------------------------------
     * 1. DEVOLVER O "+ INSERIR"
     * -------------------------------------------------------
     */

    elementosRemovidosDaImpressao.forEach(
        function (registro) {

            if (
                !registro ||
                !registro.elemento ||
                !registro.pai
            ) {

                return;
            }


            /*
             * Se o próximo irmão ainda existe
             * no mesmo pai, colocamos o elemento
             * exatamente antes dele.
             */

            if (
                registro.proximoIrmao &&
                registro.proximoIrmao.parentNode ===
                    registro.pai
            ) {

                registro.pai.insertBefore(
                    registro.elemento,
                    registro.proximoIrmao
                );

            } else {

                /*
                 * Caso o irmão não exista mais,
                 * colocamos no final do pai.
                 */

                registro.pai.appendChild(
                    registro.elemento
                );
            }
        }
    );


    /*
     * Limpamos a lista.
     */

    elementosRemovidosDaImpressao = [];


    /*
     * -------------------------------------------------------
     * 2. RESTAURAR CLASSES
     * -------------------------------------------------------
     */

    document
        .querySelectorAll(
            ".nao-imprimir"
        )
        .forEach(
            function (elemento) {

                elemento.classList.remove(
                    "nao-imprimir"
                );
            }
        );
}


/* =========================================================
   EVENTO BEFOREPRINT
========================================================= */

window.addEventListener(
    "beforeprint",
    function () {

        /*
         * O Chrome também pode abrir a impressão
         * diretamente com Ctrl + P.
         *
         * Por isso fazemos a remoção aqui também,
         * independentemente do botão de imprimir.
         */

        prepararElementosParaImpressao();
    }
);


/* =========================================================
   EVENTO AFTERPRINT
========================================================= */

window.addEventListener(
    "afterprint",
    function () {

        /*
         * Depois que o usuário fecha a janela
         * de impressão, o "+ Inserir" volta
         * para o lugar original.
         */

        restaurarElementosAposImpressao();
    }
);


/* =========================================================
   EXPOR FUNÇÕES
========================================================= */

window.imprimirEtiquetas =
    imprimirPreVisualizacao;


window.gerarPDFDasEtiquetas =
    gerarPDFDasEtiquetas;


/* =========================================================
   ESTADO INICIAL
========================================================= */

atualizarPrevisaoNumeracao();

atualizarResumoQuantidade();

renderizarListaMateriais();