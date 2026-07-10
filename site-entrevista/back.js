const galeria = document.getElementById("galeria");

// Elementos da barra lateral
const painelIA = document.getElementById("painelIA");
const fecharIA = document.getElementById("fecharBarra");
const resultadoMYA = document.getElementById("myaResultado");

const buttonAba = document.getElementById("abaEsquerda");
const fecharAba = document.getElementById("fecharEsq");
const painelEsq = document.getElementById("painelEsq");

const painelFilter = document.getElementById("painelFilter");
const fecharFilter = document.getElementById("fecharFilter");
const buttonFilter = document.getElementById("buttonFilter");
const filterCategory = document.getElementById("filterCategory");

// Evento pra fechar/abrir a barra de filtro
fecharFilter.addEventListener("click", () => {
    painelFilter.classList.remove("active");
});

buttonFilter.addEventListener("click", () => {
    painelFilter.classList.add("active");
    painelEsq.classList.remove("active");
    painelIA.classList.remove("active");
});


fecharIA.addEventListener("click", () => {
    painelIA.classList.remove("active");
});

buttonAba.addEventListener("click", () => {
    painelEsq.classList.add("active");
    painelIA.classList.remove("active");
    painelFilter.classList.remove("active");
});

fecharAba.addEventListener("click", () => {
    painelEsq.classList.remove("active");
});

function obterCapaYoutube(url) {
    if (!url) return "";

    const regExp = /(?:youtube\.com\/(?:.*[?&]v=|embed\/|v\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);

    if (match && match[1]) {
        const idVideo = match[1];
        console.log(url);
        console.log(match);
        console.log(idVideo);
        return `https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`;
    }

    return "";
}




fetch("../documentos-entrevista/entrevistas.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar o arquivo JSON.");
        }
        return response.json();
    })
    .then(data => {
        const projetos = data["entrevistas"];

        const listaCategorias = new Set();
        projetos.forEach(projeto => {
            projeto.categoria.forEach(cat => listaCategorias.add(cat));
        });

        listaCategorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.toLowerCase();
            option.textContent = cat;
            filterCategory.appendChild(option);
        });

    
        projetos.forEach(projeto => {
    const card = document.createElement("article");
    card.classList.add("card-img", "art-card");

    const categoriasStr = projeto.categoria.map(c => c.toLowerCase()).join(" ");
    card.setAttribute("data-categorias", categoriasStr);

    // CRIA UMA VARIÁVEL COM A CAPA TRATADA PELA FUNÇÃO
    const urlCapa = obterCapaYoutube(projeto.imagens);

    card.innerHTML = `
        <div class="moldura">
            <!-- O link 'href' continua levando para o vídeo do YouTube -->
            <a href="${projeto.imagens}" target="_blank"> 
                <!-- O 'src' agora usa a URL correta da imagem da capa -->
                <img src="${urlCapa}" alt="${projeto.nome}" class="art-image">
            </a>
        </div>

        <div class="informacoes">
            <span class="categoria">${projeto.categoria[0]}</span>
            <h2 class="art-name">${projeto.nome}</h2>
            <p class="descricao">${projeto.descricao}</p>
            <div class="eixos">
                ${projeto.eixos.map(eixo => `<span class="tag">${eixo}</span>`).join("")}
            </div>
        </div>
    `;

    
            card.addEventListener("click", () => {
                resultadoMYA.innerHTML = `
                    <h3>${projeto.nome}</h3>
                    <h5> <strong>Categorias:</strong> ${projeto.categoria.join(", ")}</h5>
                    <p>${projeto.descricaoDetalhada}</p>
                `;
                painelIA.classList.add("active");
                painelEsq.classList.remove("active");
                painelFilter.classList.remove("active");
            });

            galeria.appendChild(card);
        });

        filterCategory.addEventListener("change", () => {
            const filtroSelecionado = filterCategory.value;
            const cards = document.querySelectorAll(".art-card");

            cards.forEach(card => {
                const categoriasDoCard = card.getAttribute("data-categorias");

                
                if (filtroSelecionado === "todos" || categoriasDoCard.includes(filtroSelecionado)) {
                    card.classList.remove("hidden"); 
                } else {
                    card.classList.add("hidden");
                }
            });
        });

    })
    .catch(error => {
        galeria.innerHTML = `
            <h2 style="color:red;text-align:center;grid-column: 1/-1;">
                Erro ao carregar os projetos sociais.
            </h2>
        `;
        console.error(error);
    });
