// Elementos da barra lateral (Painel IA)
const painelIA = document.getElementById("painelIA");
const fecharIA = document.getElementById("fecharBarra");

// Elementos da aba de Importância (Esquerda)
const buttonAba = document.getElementById("abaEsquerda");
const fecharAba = document.getElementById("fecharEsq");
const painelEsq = document.getElementById("painelEsq");


// --- Eventos do Painel IA (Direito) ---
fecharIA.addEventListener("click", () => {
    painelIA.classList.remove("active");
});


// --- Eventos do Painel Importância da Pesquisa (Esquerdo) ---
buttonAba.addEventListener("click", () => {
    // Abre a aba esquerda e garante que a aba de IA feche para não encavalar
    painelEsq.classList.add("active");
    painelIA.classList.remove("active");
});

fecharAba.addEventListener("click", () => {
    painelEsq.classList.remove("active");
});