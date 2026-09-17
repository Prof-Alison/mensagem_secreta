const frases = [

    // FRASE 1
    "O ORGULHO NAO É O OPOSTO DA VERGONHA MAS SIM A SUA FONTE A VERDADEIRA HUMILDADE É O ÚNICO ANTÍDOTO PARA A VERGONHA",

    // FRASE 2
    "ÀS VEZES A VIDA É COMO UM TÚNEL ESCURO VOCÊ NEM SEMPRE CONSEGUE VER A LUZ NO FIM DO CAMINHO MAS SE CONTINUAR SE MOVENDO CHEGARÁ A UM LUGAR MELHOR",

    // FRASES 3 A 10
    "É IMPORTANTE RETIRAR A SABEDORIA DE MUITOS LUGARES DIFERENTES SE VOCÊ A RETIRAR DE APENAS UM LUGAR ELA SE TORNA RÍGIDA E OBSOLETA",
    "É FÁCIL SE DESESPERAR QUANDO SE OLHA PARA TUDO O QUE ESTÁ ERRADO MAS SE VOCÊ PROCURAR POR ESPERANÇA VAI ENCONTRAR",
    "A PERFEIÇÃO É UMA ILUSÃO O IMPORTANTE É O QUE ESTÁ DENTRO DO SEU CORAÇÃO E AS ESCOLHAS QUE VOCÊ FAZ TODOS OS DIAS",
    "AS VEZES A MELHOR MANEIRA DE RESOLVER SEUS PRÓPRIOS PROBLEMAS É AJUDANDO OUTRA PESSOA A RESOLVER OS DELA",
    "DESTINO É UM TERMO ENGRAÇADO VOCÊ NUNCA SABE PARA ONDE ELE VAI TE LEVAR MAS QUANDO VOCÊ SEGUE O SEU CORAÇÃO TUDO FAZ SENTIDO",
    "QUANDO ATINGIMOS O NOSSO PONTO MAIS BAIXO ESTAMOS ABERTOS A MAIOR DAS TRANSFORMAÇÕES",
    "NUNCA DESISTA DA ESPERANÇA A ESPERANÇA É ALGO QUE VOCÊ DA A SI MESMO QUANDO AS COISAS PARECEM MAIS SOMBRIAS",
    "A VERDADEIRA CORAGEM NÃO É NÃO TER MEDO MAS SIM AGIR APESAR DELE PARA PROTEGER QUEM VOCÊ AMA",
    "SAO AS NOSSAS ESCOLHAS MUITO MAIS DO QUE AS NOSSAS CAPACIDADES QUE REVELAM QUEM REALMENTE SOMOS NAO VALE A PENA MERGULHAR NOS SONHOS E SE ESQUECER DE VIVER NO MUNDO REAL",
    "TUDO O QUE TEMOS DE DECIDIR E O QUE FAZER COM O TEMPO QUE NOS E DADO NESTE MUNDO. HA OUTRAS FORCAS AGINDO QUE NAO A DA VONTADE DO MAL, E ISSO E BASTANTE CONFORTANTE",
    "FACA OU NAO FACA A TENTATIVA NAO EXISTE O MEDO E O CAMINHO PARA O LADO SOMBRIO O MEDO LEVA A RAIVA A RAIVA LEVA AO ODIO E O ODIO LEVA AO SOFRIMENTO",
    "TODO MUNDO QUER UM FIM DIGNO NAO E MAS NEM SEMPRE AS COISAS SAEM COMO PLANEJADO PARTE DA JORNADA E O FIM MAS O IMPORTANTE E O QUE VOCE FAZ COM O TEMPO QUE RESTOU",
    "O PASSADO PODE DOER MAS DO JEITO QUE EU VEJO VOCE PODE FUGIR DELE OU APRENDER COM ELE A DECISAO DE SEGUIR EM FRENTE E MUDAR A SUA HISTORIA E TOTALMENTE SUA",
    "EXISTE UMA GRANDE DIFERENCA ENTRE CONHECER O CAMINHO E PERCORRER O CAMINHO CEDO OU TARDE VOCE VAI APRENDER ASSIM COMO EU QUE EXISTE UMA DIFERENCA ENTRE SABER A ROTA E CAMINHAR POR ELA",
    "O SEU FUTURO AINDA NAO FOI ESCRITO O DE NINGUEM FOI O SEU FUTURO E O QUE VOCE FIZER DELE! ENTAO FACA UM BOM FUTURO PARA VOCE E PARA AS PESSOAS QUE VOCE AMA",
    "QUANDO A VIDA TE DECEPCIONA E VOCE NAO SABE O QUE FAZER QUAL E A UNICA SOLUCAO? APENAS CONTINUE A NADAR CONTINUE A NADAR PARA ACHAR A SAIDA E ENCONTRAR NOVOS CAMINHOS",
    "VOCE PRECISA DEIXAR DE LADO A ILUSAO DO CONTROLE O ONTEM E HISTORIA O AMANHA E UM MISTERIO MAS O HOJE E UMA DAVIDA DIVINA E EXATAMENTE POR ISSO QUE ELE SE CHAMA PRESENTE",
    "O AMOR E A UNICA COISA QUE SOMOS CAPAZES DE PERCEBER QUE TRANSCENDE AS DIMENSOES DO TEMPO E DO ESPACO NOS SEMPRE ENCONTRAMOS UM JEITO DE SUPERAR OS MAIORES DESAFIOS"
];


const resposta = document.getElementById("resposta");
const feedback = document.getElementById("feedback");
const botao = document.getElementById("botaoDescobrir");

const telaDesafio = document.getElementById("telaDesafio");
const telaMapa = document.getElementById("telaMapa");


// =====================================================
// NORMALIZAR TEXTO
// =====================================================

function normalizar(texto) {

    return texto
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escaparHTML(texto) {

    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =====================================================
// PEGAR TEXTO DIGITADO
// =====================================================

function pegarTexto() {

    return resposta.innerText || "";
}


// =====================================================
// VERIFICAR SE É UMA DAS 10 FRASES
// =====================================================

function encontrarFraseCorreta(texto) {

    const textoNormalizado = normalizar(texto);

    return frases.findIndex(function(frase) {

        return normalizar(frase) === textoNormalizado;

    });
}


// =====================================================
// ENCONTRAR A FRASE MAIS PARECIDA
// =====================================================

function encontrarMelhorFrase(texto) {

    const textoNormalizado = normalizar(texto);

    let melhorFrase = "";
    let maiorPontuacao = -1;

    frases.forEach(function(frase) {

        const fraseNormalizada = normalizar(frase);

        let pontuacao = 0;

        const limite = Math.min(
            textoNormalizado.length,
            fraseNormalizada.length
        );

        for (let i = 0; i < limite; i++) {

            if (textoNormalizado[i] === fraseNormalizada[i]) {
                pontuacao++;
            }

        }

        // Se o começo está correto, dá prioridade
        if (fraseNormalizada.startsWith(textoNormalizado)) {
            pontuacao += 10000;
        }

        if (pontuacao > maiorPontuacao) {

            maiorPontuacao = pontuacao;
            melhorFrase = fraseNormalizada;

        }

    });

    return melhorFrase;
}


// =====================================================
// ATUALIZAR CORES
// =====================================================

function atualizarCores() {

    const textoOriginal = pegarTexto();

    if (textoOriginal.length === 0) {

        resposta.innerHTML = "";

        feedback.textContent = "";
        feedback.className = "";

        return;
    }


    const melhorFrase = encontrarMelhorFrase(textoOriginal);

    const textoNormalizado = normalizar(textoOriginal);

    let resultado = "";
    let indiceNormalizado = 0;
    let possuiErro = false;


    for (let i = 0; i < textoOriginal.length; i++) {

        const caractereOriginal = textoOriginal[i];


        // ESPAÇO
        if (caractereOriginal === " ") {

            resultado += " ";

            indiceNormalizado++;

            continue;
        }


        const caractereNormalizado =
            normalizar(caractereOriginal).charAt(0);


        const caractereEsperado =
            melhorFrase.charAt(indiceNormalizado);


        if (caractereNormalizado === caractereEsperado) {

            resultado +=
                `<span class="caractere-correto">${escaparHTML(caractereOriginal)}</span>`;

        } else {

            resultado +=
                `<span class="caractere-errado">${escaparHTML(caractereOriginal)}</span>`;

            possuiErro = true;
        }


        indiceNormalizado++;
    }


    // Atualiza somente se realmente necessário
    resposta.innerHTML = resultado;


    // Coloca o cursor novamente no final
    colocarCursorNoFinal();


    // =================================================
    // FEEDBACK
    // =================================================

    const correta =
        encontrarFraseCorreta(textoOriginal);


    if (correta !== -1) {

        feedback.className = "feedback-certo";

        feedback.textContent =
            "✓ MENSAGEM CORRETA!";

        return;
    }


    if (possuiErro) {

        feedback.className = "feedback-erro";

        feedback.textContent =
            "✗ Existem caracteres incorretos. Confira os vermelhos.";

    } else {

        feedback.className = "feedback-certo";

        feedback.textContent =
            "✓ Você está no caminho certo!";
    }
}


// =====================================================
// COLOCAR CURSOR NO FINAL
// =====================================================

function colocarCursorNoFinal() {

    const selecao = window.getSelection();

    const range = document.createRange();

    range.selectNodeContents(resposta);

    range.collapse(false);

    selecao.removeAllRanges();

    selecao.addRange(range);
}


// =====================================================
// DIGITAÇÃO
// =====================================================

resposta.addEventListener("input", function() {

    atualizarCores();

});


// =====================================================
// BOTÃO DESCOBRIR
// =====================================================

botao.addEventListener("click", verificarResposta);


// =====================================================
// ENTER
// =====================================================

resposta.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        verificarResposta();

    }

});


// =====================================================
// VERIFICAR RESPOSTA
// =====================================================

function verificarResposta() {

    const texto = pegarTexto();

    const fraseEncontrada =
        encontrarFraseCorreta(texto);


    // QUALQUER UMA DAS 10 FRASES
    // ABRE O MESMO DESTINO

    if (fraseEncontrada !== -1) {

        feedback.className =
            "feedback-certo";

        feedback.textContent =
            "🎉 VOCÊ DESCOBRIU A MENSAGEM!";


        resposta.contentEditable = "false";

        botao.disabled = true;


        setTimeout(function() {

            mostrarMapa();

        }, 1200);


    } else {

        feedback.className =
            "feedback-erro";

        feedback.textContent =
            "✗ A frase ainda não está correta. Observe os caracteres vermelhos.";

    }
}


// =====================================================
// MOSTRAR MAPA
// =====================================================

function mostrarMapa() {

    telaDesafio.style.display = "none";

    telaMapa.classList.remove("escondida");

}
