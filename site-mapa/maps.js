// Coordenadas de Camaçari
const mapa = L.map('map').setView([-12.699, -38.326], 12);

// Mapa do OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(mapa); 

const marcadores = [];
let cardSelecionado = null; // 1. CORRIGIDO: Declarando a variável de seleção globalmente

// Elementos do HTML
const inputPesquisa = document.getElementById("pesquisaProjeto");
const btnPesquisa = document.getElementById("btnPesquisar");
const listaProjetos = document.getElementById("listaProjetos");
const contadorResultados = document.getElementById("contadorResultados");

// Função de pesquisa
    function pesquisarProjeto(){
    const texto = inputPesquisa.value.toLowerCase();

    const encontrado = marcadores.find(item =>
        item.projeto.nome.toLowerCase().includes(texto)
    );

    if(!encontrado){
        alert("Projeto não encontrado.");
        return;
    }

    encontrado.marcador.openPopup();
    mapa.setView(encontrado.marcador.getLatLng(), 15); 
}

function aplicarFiltros() {
    let quantidade = 0;
    // Pega todas as categorias marcadas
    const categoriasSelecionadas = [];

    document
        .querySelectorAll(".categoria input:checked")
        .forEach(check => {

            categoriasSelecionadas.push(check.value);

        });

        const bairrosSelecionados=[];

        document
        .querySelectorAll(".bairro input:checked")
        .forEach(check=>{

         bairrosSelecionados.push(check.value);

        });

    marcadores.forEach(item => {
        

        const categoriaProjeto = item.projeto.categoria;

        const categoriaOk =
        categoriasSelecionadas.includes(item.projeto.categoria);

        const bairroOk =
        bairrosSelecionados.includes(item.projeto.bairro);

        if(categoriaOk && bairroOk){
            quantidade++;
            item.marcador.addTo(mapa);
            item.card.style.display = "block";
        } else {
            mapa.removeLayer(item.marcador);
            item.card.style.display = "none";

        }

    });
        contadorResultados.textContent = `${quantidade} projeto${quantidade != 1 ? "s" : ""}`;
}

aplicarFiltros()

if (btnPesquisa) {
    btnPesquisa.addEventListener('click', pesquisarProjeto);
}

const listaCategorias =
document.getElementById("listaCategorias");

const listaBairros =
document.getElementById("listaBairros");
//Função para criar os icones de cada categoira
function obterIcone(categoria){

    let icone = "fa-location-dot";
    let cor = "#7E57C2";

    switch(categoria){

        case "Educação":
            icone = "fa-graduation-cap";
            cor = "#3F51B5";
            break;

        case "Educação e Cultura":
            icone = "fa-book-open";
            cor = "#5E35B1";
            break;

        case "Arte-Educação":
            icone = "fa-palette";
            cor = "#8E24AA";
            break;

        case "Cultura Afro-Brasileira":
            icone = "fa-drum";
            cor = "#6D4C41";
            break;

        case "Assistência Social":
            icone = "fa-hand-holding-heart";
            cor = "#26A69A";
            break;

        case "Saúde":
            icone = "fa-heart-pulse";
            cor = "#E53935";
            break;

        case "Cidadania":
            icone = "fa-people-group";
            cor = "#039BE5";
            break;

        case "Desenvolvimento Local":
            icone = "fa-seedling";
            cor = "#43A047";
            break;

        case "Política Pública":
            icone = "fa-landmark";
            cor = "#546E7A";
            break;

        case "Patrimônio Cultural":
            icone = "fa-monument";
            cor = "#FF9800";
            break;

    }

    return L.divIcon({

        className: "iconeMapa",

        html: `
            <div class="iconeMarcador"
                 style="background:${cor}">
                <i class="fa-solid ${icone}"></i>
            </div>
        `,

        iconSize:[42,42],
        iconAnchor:[21,42],
        popupAnchor:[0,-35]

    });

}
// Busca os dados do JSON
fetch("../m/localidades.json")
    .then(resposta => resposta.json())
    .then(projetos => {
        const categorias = [
        ...new Set(
        projetos.map(p => p.categoria)
    )
];

        const bairros = [
    ...new Set(
        projetos.map(p => p.bairro)
    )
        ];

        categorias.forEach(categoria => {

    const div = document.createElement("div");

    div.className = "categoria";

    div.innerHTML = `
        <input
            type="checkbox"
            value="${categoria}"
            checked>

        <label>${categoria}</label>
    `;

    listaCategorias.appendChild(div);

        });
            document
            .querySelectorAll(".categoria input")
            .forEach(check => {

            check.addEventListener("change", aplicarFiltros);

            });
        

                bairros.forEach(bairro => {

                const div = document.createElement("div");

                div.className = "bairro";

                div.innerHTML = `
                     <input
                        type="checkbox"
                        value="${bairro}"
                        checked>

                    <label>${bairro}</label>
                `;

    listaBairros.appendChild(div);

            });

            document
            .querySelectorAll(".bairro input")
            .forEach(check => {

            check.addEventListener("change", aplicarFiltros);

        });

        projetos.forEach(projeto => {
            // Criando o marcador no mapa
        const marcador = L.marker(
                [
                projeto.latitude,
                projeto.longitude
                ],
            {
                icon: obterIcone(projeto.categoria)
            }
)
            .addTo(mapa)
            .bindPopup(`
                <div class="popup">
                    <img src="${projeto.imagem}" class="popup-img">
                    <h3>${projeto.nome}</h3>
                    <p><strong>Categoria:</strong> ${projeto.categoria}</p>
                    <p><strong>Bairro:</strong> ${projeto.bairro}</p>
                    <p>${projeto.descricao}</p>
                    <button class="popup-btn">Ver Projeto</button>
                </div>
            `);

           // Criando fisicamente a div do card antes de usar
            const card = document.createElement("div");
            card.className = "cardProjeto";

            // Montando o HTML interno do card 
            card.innerHTML = `
                <img src="${projeto.imagem}" alt="${projeto.nome}">
                <div>
                    <h3>${projeto.nome}</h3>
                    <span>${projeto.categoria}</span>
                </div>
                <p>📍 ${projeto.bairro}</p>
            `;

            // Adicionando o card na lista lateral
            listaProjetos.appendChild(card);

            // Evento de clique no card
            card.addEventListener("click", () => {
                if (cardSelecionado) {
                    cardSelecionado.classList.remove("ativo");
                }

                card.classList.add("ativo");
                cardSelecionado = card;

                mapa.setView(
                    [projeto.latitude, projeto.longitude],
                    16,
                    {
                        animate: true,
                        duration: 1.2
                    }
                );

                marcador.openPopup();
            });

            // Guarda no array para o sistema de busca funcionar
            marcadores.push({
            projeto,
            marcador,
            card

            });
            aplicarFiltros();
        });
    }) 
    .catch(erro => console.error("Erro ao carregar as localidades:", erro));

document.addEventListener("DOMContentLoaded", function () {
  const botaoAbrir = document.getElementById("buttonFilter");
  const painel = document.querySelector(".painelFiltros");

  const painelMapa = document.getElementById("painelEsq");
  const botaoAbrirPainel = document.getElementById("button");
  const mapaAba = document.querySelector(".container-mapa");
  const buttonAbrirHamburger = document.getElementById("btnPesquisar1");
  const painelHamburger = document.getElementById("sidebar");
  const listaProjetos =
document.getElementById("listaProjetos");

  if (!botaoAbrir) {
    console.warn("Botão com id 'buttonFilter' não encontrado.");
    return;
  }
  if (!painel) {
    console.warn("Elemento com classe 'painelFiltros' não encontrado.");
    return;
  }

  buttonAbrirHamburger.addEventListener("click", function(){

    painelHamburger.classList.toggle("active");
    listaProjetos.classList.toggle("active");
    inputPesquisa.classList.toggle("active")
    setTimeout(()=>{

        mapa.invalidateSize();

    },300);

});

  document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    pesquisarProjeto()
  }
});


  botaoAbrir.addEventListener("click", function (e) {
    e.preventDefault();
    painel.classList.toggle("active");
    mapaAba.classList.toggle("active");
    setTimeout(() => {

        mapa.invalidateSize();

    },350);
  });

  botaoAbrirPainel.addEventListener("click", function (e) {
    e.preventDefault();
    painelMapa.classList.toggle("active");
    mapaAba.classList.toggle("active");
    setTimeout(() => {

        mapa.invalidateSize();

    },350);
  });

});
