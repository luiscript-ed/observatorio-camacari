document.addEventListener("DOMContentLoaded", () => {

    /* Economia */
    criarGraficoPIB();
    criarGraficoRenda();
    criarGraficoTrabalho();
    criarGraficoReceita();

    /* Segurança */
    criarGraficoCrimes();
    criarGraficoIndicadores();

    /* Habitação */
    criarGraficoHab();
    criarGraficoInfra();

    /* Povos Tradicionais */
    criarGraficoTerreiros();
    criarGraficoLiderancas();

});

function criar(canvasID, config){

    const canvas = document.getElementById(canvasID);

    if(!canvas){
        console.warn(`Canvas "${canvasID}" não encontrado.`);
        return;
    }

    new Chart(canvas, config);

}

/* ===========================================================
                        ECONOMIA
=========================================================== */

function criarGraficoPIB(){

    criar("graficoPIB",{

        type:"bar",

        data:{

            labels:[
                "Indústria",
                "Serviços",
                "Administração",
                "Agropecuária"
            ],

            datasets:[{

                label:"Participação (%)",

                data:[
                    60.5,
                    34.1,
                    5.4,
                    0.1
                ],

                backgroundColor:[
                    "#FF7E28",
                    "#FFB347",
                    "#3CB371",
                    "#00C896"
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

/* ---------------------------- */

function criarGraficoRenda(){

    criar("graficoRenda",{

        type:"pie",

        data:{

            labels:[
                "Classe D/E",
                "Classe C",
                "Classe A/B"
            ],

            datasets:[{

                data:[
                    39.2,
                    42.6,
                    18.2
                ],

                backgroundColor:[
                    "#FF7E28",
                    "#FFC107",
                    "#2BB673"
                ]

            }]

        },

        options:{
            responsive:true
        }

    });

}

/* ---------------------------- */

function criarGraficoTrabalho(){

    criar("graficoTrabalho",{

        type:"doughnut",

        data:{

            labels:[
                "Informal",
                "Formal"
            ],

            datasets:[{

                data:[
                    52.8,
                    46.2
                ],

                backgroundColor:[
                    "#FF7E28",
                    "#0F4C81"
                ]

            }]

        },

        options:{

            responsive:true,

            cutout:"60%"

        }

    });

}

/* ---------------------------- */

function criarGraficoReceita(){

    criar("graficoReceita",{

        type:"bar",

        data:{

            labels:[
                "Previsão",
                "Arrecadado",
                "Acumulado"
            ],

            datasets:[{

                label:"R$",

                data:[
                    2343407569,
                    119213008,
                    1272498086
                ],

                backgroundColor:[
                    "#0F4C81",
                    "#2BB673",
                    "#FF7E28"
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

/* ===========================================================
                        SEGURANÇA
=========================================================== */

function criarGraficoCrimes(){

    criar("graficoCrimes",{

        type:"line",

        data:{

            labels:[
                "2022",
                "2024",
                "2026"
            ],

            datasets:[{

                label:"Mortes violentas por 100 mil habitantes",

                data:[
                    82.1,
                    74.8,
                    52.2
                ],

                borderColor:"#E53935",

                backgroundColor:"rgba(229,57,53,.20)",

                fill:true,

                tension:.35,

                pointRadius:5,

                pointBackgroundColor:"#E53935"

            }]

        },

        options:{

            responsive:true,

            plugins:{
                legend:{
                    display:true
                }
            }

        }

    });

}


/* ===========================================================
                        SEGURANÇA
=========================================================== */

function criarGraficoIndicadores(){

    criar("graficoViolencia",{

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
                    "#D32F2F",
                    "#EF5350",
                    "#FFA726",
                    "#FFD54F",
                    "#29B6F6"
                ],

                borderWidth:2,
                borderColor:"#ffffff"

            }]

        },

        options:{

            responsive:true,

            cutout:"60%",

            plugins:{
                legend:{
                    position:"bottom"
                }
            }

        }

    });

}

/* ===========================================================
                        HABITAÇÃO
=========================================================== */

function criarGraficoHab(){

    criar("graficoInfraestrutura",{

        type:"bar",

        data:{

            labels:[
                "Água",
                "Esgoto",
                "Lixo",
                "Iluminação"
            ],

            datasets:[{

                label:"Cobertura (%)",

                data:[
                    94.1,
                    67.47,
                    98.7,
                    92.4
                ],

                backgroundColor:[
                    "#2196F3",
                    "#26C6DA",
                    "#43A047",
                    "#FB8C00"
                ],

                borderRadius:8

            }]

        },

        options:{

            responsive:true,

            scales:{
                y:{
                    beginAtZero:true,
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


function criarGraficoInfra(){

    criar("graficoUrbanizacao",{

        type:"line",

        data:{

            labels:[
                "1991",
                "2000",
                "2010",
                "2022"
            ],

            datasets:[{

                label:"Habitantes",

                data:[
                    113690,
                    161727,
                    242970,
                    300372
                ],

                borderColor:"#0F4C81",

                backgroundColor:"rgba(15,76,129,.15)",

                fill:true,

                tension:.35,

                pointRadius:5,

                pointBackgroundColor:"#0F4C81"

            }]

        },

        options:{
            responsive:true
        }

    });

}

/* ===========================================================
                    POVOS DE TERREIRO
=========================================================== */

function criarGraficoTerreiros(){

    criar("graficoTerreiros",{

        type:"bar",

        data:{

            labels:[
                "Povos de Terreiro",
                "Quilombolas",
                "Indígenas"
            ],

            datasets:[{

                label:"População",

                data:[
                    3371,
                    1619,
                    4837
                ],

                backgroundColor:[
                    "#8E24AA",
                    "#FFB300",
                    "#26A69A"
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

function criarGraficoLiderancas(){

    criar("graficoLiderancas",{

        type:"doughnut",

        data:{

            labels:[
                "Terreiros",
                "No mapa",
                "Templos",
                "Lideranças"
            ],

            datasets:[{

                data:[
                    46,
                    28,
                    210,
                    71
                ],

                backgroundColor:[
                    "#8E24AA",
                    "#AB47BC",
                    "#FFB300",
                    "#26A69A"
                ],

                borderWidth:2,
                borderColor:"#ffffff"

            }]

        },

        options:{

            responsive:true,

            cutout:"60%",

            plugins:{
                legend:{
                    position:"bottom"
                }
            }

        }

    });

}