const galeria = document.getElementById("galeria");

// Elementos da barra lateral
const painelIA = document.getElementById("painelIA");
const fecharIA = document.getElementById("fecharBarra");
const resultadoMYA = document.getElementById("myaResultado");

const buttonAba = document.getElementById("abaEsquerda");
const fecharAba = document.getElementById("fecharEsq");
const painelEsq = document.getElementById("painelEsq");

const painelFilter = document.getElementById("painelFilter");
const buttonFilter = document.getElementById("buttonFilter");
const listaCategorias = document.getElementById("listaCategorias");


buttonFilter.addEventListener("click", () => {
    painelFilter.classList.toggle("active");
    painelEsq.classList.remove("active");
    painelIA.classList.remove("active");
});


fecharIA.addEventListener("click", () => {
    painelIA.classList.remove("active");
});

buttonAba.addEventListener("click", () => {
    painelEsq.classList.toggle("active");
    painelIA.classList.remove("active");
    painelFilter.classList.remove("active");
});

fecharAba.addEventListener("click", () => {
    painelEsq.classList.remove("active");
});

function aplicarFiltros() {

    const categoriasSelecionadas = [];

    document
        .querySelectorAll(".categoria input:checked")
        .forEach(check => {
            categoriasSelecionadas.push(check.value);
        });

    document.querySelectorAll(".art-card").forEach(card => {

        const categoria = card.dataset.categoria;

        const categoriaOk = categoriasSelecionadas.includes(categoria);
        const bairroOk = true

        if (categoriaOk && bairroOk) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }

    });

}

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

        
const categorias = [
    ...new Set(
        projetos.flatMap(p => p.categoria)
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
.forEach(check=>{

    check.addEventListener("change", aplicarFiltros);

});

document
.querySelectorAll(".bairro input")
.forEach(check=>{

    check.addEventListener("change", aplicarFiltros);

});


        projetos.forEach(projeto => {
            const card = document.createElement("article");
            card.classList.add("card-img", "art-card");
            card.dataset.categoria = projeto.categoria[0];
            const urlCapa = obterCapaYoutube(projeto.imagens);
            
            const categoriasStr = projeto.categoria.map(c => c.toLowerCase()).join(" ");
            card.setAttribute("data-categorias", categoriasStr);

            card.innerHTML = `
                <div class="moldura">
                    <img src="${urlCapa}" alt="${projeto.nome}" class="art-image">
                </div>

                <div class="informacoes">
                    <span class="categoria">
                        ${projeto.categoria[0]}
                    </span>
                    <h2 class="art-name">
                        ${projeto.nome}
                    </h2>
                    <p class="descricao">
                        ${projeto.descricao}
                    </p>
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

        aplicarFiltros();

    })
    .catch(error => {
        galeria.innerHTML = `
            <h2 style="color:red;text-align:center;grid-column: 1/-1;">
                Erro ao carregar os projetos sociais.
            </h2>
        `;
        console.error(error);
    });
