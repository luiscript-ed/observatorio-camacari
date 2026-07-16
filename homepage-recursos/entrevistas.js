fetch("homepage-recursos/pj.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar o arquivo JSON.");
        }
        return response.json();
    })
    .then(data => {
        const projetos = data["entrevistas"];

        projetos.forEach(projeto => {
            const card = document.createElement("article");
            card.classList.add("card-img", "art-card");

            card.innerHTML = `
                <div class="moldura">
                    <img
                        src="${projeto.imagem || "https://via.placeholder.com/500x350?text=Sem+Imagem"}"
                        alt="${projeto.nome}"
                        class="art-image">
                </div>

                <div class="informacoes">
                    <span class="categoria">${projeto.categoria.join(", ")}</span>
                    <h2 class="art-name">${projeto.nome}</h2>
                    <p class="descricao">${projeto.descricao}</p>
                </div>
            `;

            card.addEventListener("click", () => {
                resultadoMYA.innerHTML = `
                    <h3>${projeto.nome}</h3>
                    <p><strong>Bairro:</strong> ${projeto.bairro}</p>
                    <p><strong>Categorias:</strong> ${projeto.categoria.join(", ")}</p>
                    <p>${projeto.descricao}</p>
                `;

                painelIA.classList.add("active");
                painelEsq.classList.remove("active");
                painelFilter.classList.remove("active");
            });

            galeria2.appendChild(card);
        });
    })
    .catch(error => {
        galeria2.innerHTML = `
            <h2 style="color:red;text-align:center;grid-column:1/-1;">
                Erro ao carregar os projetos sociais.
            </h2>
        `;
        console.error(error);
    });