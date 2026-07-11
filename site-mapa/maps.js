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
    mapa.setView(encontrado.marcador.getLatLng(), 15); // CORRIGIDO: 'encontrado' (estava encontrador) e zoom 15
}

function aplicarFiltros() {

    // Pega todas as categorias marcadas
    const categoriasSelecionadas = [];

    document
        .querySelectorAll(".categoria input:checked")
        .forEach(check => {

            categoriasSelecionadas.push(check.value);

        });

    marcadores.forEach(item => {

        const categoriaProjeto = item.projeto.categoria;

        if (categoriasSelecionadas.includes(categoriaProjeto)) {
            item.marcador.addTo(mapa);
            item.card.style.display = "block";
        } else {
            mapa.removeLayer(item.marcador);
            item.card.style.display = "none";

        }

    });

}

if (btnPesquisa) {
    btnPesquisa.addEventListener('click', pesquisarProjeto);
}

const listaCategorias =
document.getElementById("listaCategorias");

// Busca os dados do JSON
fetch("../m/localidades.json")
    .then(resposta => resposta.json())
    .then(projetos => {
        const categorias = [
        ...new Set(
        projetos.map(p => p.categoria)
    )
];

        categorias.forEach(categoria => {

            const div =
            document.createElement("div");

            div.className = "categoria";

            div.innerHTML = `
                <input
                    type="checkbox"
                    value="${categoria}"
                    checked>

                <label>${categoria}</label>
            `;
            document
            .querySelectorAll(".categoria input")
            .forEach(check => {

            check.addEventListener("change", aplicarFiltros);

});

    listaCategorias.appendChild(div);

});
        document
            .querySelectorAll(".categoria input")
            .forEach(check => {

            check.addEventListener("change", aplicarFiltros);

        });

        projetos.forEach(projeto => {
            // Criando o marcador no mapa
            const marcador = L.marker([
                projeto.latitude,
                projeto.longitude
            ])
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

            // 2. CORRIGIDO: Criando fisicamente a div do card antes de usar
            const card = document.createElement("div");
            card.className = "cardProjeto";

            // Montando o HTML interno do card (removi a div duplicada)
            card.innerHTML = `
                <img src="${projeto.imagem}" alt="${projeto.nome}">
                <div>
                    <h3>${projeto.nome}</h3>
                    <span>${projeto.categoria}</span>
                </div>
                <p>📍 ${projeto.bairro}</p>
            `;

            // Adiciona o card na lista lateral
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
        });
    }) 
    .catch(erro => console.error("Erro ao carregar as localidades:", erro));