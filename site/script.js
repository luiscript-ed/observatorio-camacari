const galeria = document.getElementById("galeria");

// Elementos da barra lateral (buscados apenas uma vez, fora do loop)
const painelIA = document.getElementById("painelIA");
const fecharIA = document.getElementById("fecharBarra");
const resultadoMYA = document.getElementById("myaResultado");

const buttonAba = document.getElementById("abaEsquerda");
const fecharAba = document.getElementById("fecharEsq");
const painelEsq = document.getElementById("painelEsq")

// Evento para fechar a barra lateral
fecharIA.addEventListener("click", () => {
    painelIA.classList.remove("active");
});

buttonAba.addEventListener("click", () => {
    painelEsq.classList.add("active");
    painelIA.classList.remove("active");
});

fecharAba.addEventListener("click", () => {
    painelEsq.classList.remove("active");
});

fetch("../documentos-projeto/projetos-sociais.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar o arquivo JSON.");
        }
        return response.json();
    })
    .then(data => {
        data["projetos-sociais"].forEach(projeto => {

            const card = document.createElement("article");
            card.classList.add("card-img", "art-card");

            // Removemos o id="abrirBarra" daqui para evitar IDs duplicados
            card.innerHTML = `
                <div class="moldura">
                    <img
                        src="${projeto.imagens || "https://via.placeholder.com/500x350?text=Sem+Imagem"}"
                        alt="${projeto.nome}"
                        class="art-image">
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
                    <div class="eixos">
                        ${projeto.eixos.map(eixo =>
                            `<span class="tag">${eixo}</span>`
                        ).join("")}
                    </div>
                </div>
            `;

            // Quando clicar em QUALQUER lugar do card, abre a barra e atualiza os dados
            card.addEventListener("click", () => {
                
                // 1. Atualiza o conteúdo interno da barra lateral com os dados do projeto clicado
                resultadoMYA.innerHTML = `
                    <h4>${projeto.nome}</h4>
                    <h5> <strong>Categorias:</strong> ${projeto.categoria.join(", ")}</h5>
                    <p>${projeto.descricao}</p>
                `;

                // 2. Abre a barra lateral adicionando a classe CSS
                painelIA.classList.add("active");
                painelEsq.classList.remove("active");
            });

            // Adiciona o card na galeria
            galeria.appendChild(card);
        });
    })
    .catch(error => {
        galeria.innerHTML = `
            <h2 style="color:red;text-align:center;">
                Erro ao carregar os projetos sociais.
            </h2>
        `;
        console.error(error);
    });

