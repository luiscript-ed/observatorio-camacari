document.addEventListener("DOMContentLoaded", () => {

    criarGraficoPIB();
    criarGraficoSeguranca();
    criarGraficoHab();
    criarGraficoTerreiros();
    criarGraficoEconomia();

});

function criar(canvasID, config){

    const canvas = document.getElementById(canvasID);

    if(!canvas){
        console.warn("Canvas não encontrado:", canvasID);
        return;
    }

    new Chart(canvas, config);

}

/* ---------------- PIB ---------------- */

function criarGraficoPIB(){

    criar("graficoPIB",{

        type:"bar",

        data:{
            labels:[
                "PIB per capita",
                "Renda Média",
                "Bolsa Família"
            ],

            datasets:[{

                label:"R$",

                data:[
                    91283,
                    1108,
                    672
                ],

                backgroundColor:[
                    "#ff7e28",
                    "#ffc107",
                    "#2bb673"
                ],

                borderRadius:8

            }]
        },

        options:{
            responsive:true,

            plugins:{
                legend:{
                    display:false
                }
            }
        }

    });

}


/* ---------------- Segurança ---------------- */

function criarGraficoSeguranca(){

    criar("graficoSeguranca",{

        type:"doughnut",

        data:{

            labels:[
                "Homicídios",
                "Violência Doméstica",
                "Violência Sexual",
                "Feminicídios",
                "Tentativas"
            ],

            datasets:[{

                data:[
                    132,
                    1284,
                    112,
                    4,
                    23
                ],

                backgroundColor:[
                    "#E53935",
                    "#EF5350",
                    "#FFA726",
                    "#FFD54F",
                    "#4DD0E1"
                ]

            }]
        },

        options:{
            responsive:true
        }

    });

}


/* ---------------- Habitação ---------------- */

function criarGraficoHab(){

    criar("graficoHabitacao",{

        type:"bar",

        data:{

            labels:[
                "Água",
                "Esgoto",
                "Lixo",
                "Iluminação"
            ],

            datasets:[{

                data:[
                    94.1,
                    67.47,
                    98.7,
                    92.4
                ],

                backgroundColor:[
                    "#42A5F5",
                    "#26C6DA",
                    "#66BB6A",
                    "#FFA726"
                ],

                borderRadius:8

            }]
        },

        options:{

            scales:{
                y:{
                    max:100
                }
            },

            plugins:{
                legend:{
                    display:false
                }
            }

        }

    });

}


/* ---------------- Terreiros ---------------- */

function criarGraficoTerreiros(){

    criar("graficoTerreiros",{

        type:"polarArea",

        data:{

            labels:[
                "Terreiros",
                "Patrimônio",
                "Intolerância"
            ],

            datasets:[{

                data:[
                    46,
                    3,
                    17
                ],

                backgroundColor:[
                    "#8E24AA",
                    "#FFB300",
                    "#EF5350"
                ]

            }]
        },

        options:{
            responsive:true
        }

    });

}


/* ---------------- Economia ---------------- */

function criarGraficoEconomia(){

    criar("graficoEconomia",{

        type:"line",

        data:{

            labels:[
                "PIB",
                "Receita",
                "Despesa"
            ],

            datasets:[{

                label:"Bilhões",

                data:[
                    9.12,
                    2.51,
                    2.40
                ],

                borderColor:"#ff7e28",

                backgroundColor:"rgba(255,126,40,.2)",

                fill:true,

                tension:.35

            }]
        },

        options:{
            responsive:true
        }

    });

}