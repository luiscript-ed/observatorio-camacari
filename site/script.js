const galeria = document.getElementById("galeria");

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
