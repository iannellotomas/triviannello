let nAciertos = 0;
let nFallos = 0;
let nSinTiempo = 0;
let porcentajeAciertos = 0;
let delayAlContestar = 3000; // 3000
let tiempoLimite = 15000; // 20000

let pregunta;
let respuesta;
let posibles_respuestas;
btn_correspondiente = [
    select_id("opt1"),
    select_id("opt2"),
    select_id("opt3"),
    select_id("opt4")
];
let npreguntas = [];
let preguntas_hechas = 0;
let detenerContador = false;
let limitePreguntas = 0;

// Al elegir las respuestas
const oprimir_btn = i => {
    $('.opcion').addClass('deshabilitar');
    detenerContador = true;

    if (posibles_respuestas[i] == pregunta.respuesta) { // al pulsar correcta
        hacerSonido('correcta');
        setTimeout(() => {
            nAciertos++;
            btn_correspondiente[i].parentNode.classList.add('botonCorrecto');
            mostrarCorrecion(1);
        }, 100)
    } else { // al pulsar incorrecta
        hacerSonido('incorrecta');
        setTimeout(() => {
            nFallos++;
            btn_correspondiente[i].parentNode.classList.add('botonIncorrecto');
            mostrarCorrecion(0);
            for (let j = 0; j < 4; j++) { // mostrar correcta igualmente
                if (posibles_respuestas[j] == pregunta.respuesta) {
                    btn_correspondiente[j].parentNode.classList.add('botonCorrecto');
                    break;
                }
            }
        }, 150)
    }

    setTimeout(() => {
        $('.opcion').removeClass('botonIncorrecto botonCorrecto');
        $('.opcion').removeClass('mostrarOpcion');
    }, 2000);
    setTimeout(() => {
        reiniciar();
    }, delayAlContestar);
}

function reiniciar() {
    preguntas_hechas++;
    for (const btn of btn_correspondiente) {
        $(this, '.opcion').removeAttr('class');
    }
    document.querySelector('.iconoCorreccion').innerHTML = ``;
    document.querySelector('.iconoCorreccion').style.background = "none";
    document.querySelector('.pregunta').style.backgroundImage = "none";
    document.querySelector('.pregunta p').classList.remove('preguntaConImagen')
    document.querySelector('.correccion').classList.remove('mostrarCorrecion');
    $('.opcion').removeClass('botonCorrecto botonIncorrecto botonSinTiempo deshabilitar');
    elegirPreguntaAleatoria();
}


// Elegir pregunta al azar
function elegirPreguntaAleatoria() {
    if (preguntas_hechas >= limitePreguntas) {
        return mostrarPantallaFinal();
    }

    let n = Math.floor(Math.random() * interprete_bp.length);

    while (npreguntas.includes(n)) {
        n++;
        if (n >= interprete_bp.length) {
            n = 0;
        }
        npreguntas = [];
    }
    npreguntas.push(n);
    nueva_pregunta(n);
}


// Para pasar a nueva pregunta
const nueva_pregunta = n => {
    pregunta = interprete_bp[n];
    darColorCategoria(pregunta.categoria);
    select_id("preguntaTexto").innerHTML = pregunta.pregunta;
    document.querySelector(".pregunta p").classList.remove('desaparecerTextoTrivia')
    desordenarRespuestas(pregunta); // agrega y desordena las opciones
    if (pregunta.imagen) {
        document.querySelector('.pregunta p').classList.add('preguntaConImagen')
        document.querySelector('.pregunta').style.backgroundImage = "url(" + pregunta.imagen + ")";
    }
    document.querySelector('.trivia').classList.add('aparecerTrivia');

    detenerContador = false;
    contar_tiempo();
}


// Desordenar opciones
const desordenarRespuestas = pregunta => {
    posibles_respuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3,
    ];
    posibles_respuestas.sort(() => Math.random() - 0.5);
    respuesta = pregunta.respuesta
    select_id("opt1").innerHTML = posibles_respuestas[0];
    select_id("opt2").innerHTML = posibles_respuestas[1];
    select_id("opt3").innerHTML = posibles_respuestas[2];
    select_id("opt4").innerHTML = posibles_respuestas[3];

    setTimeout(() => {
        hacerSonido('opciones');
        $('.respuestas button').addClass('mostrarOpcion');
    }, 500)

    // Agregar atributo title a las opciones
    let opciones = document.querySelectorAll('.opcion p');

    for (let i = 0; i < 4; i++) {
        let textTitle = opciones[i].textContent;
        opciones[i].parentNode.setAttribute('title', textTitle);
        opciones[i].classList.remove('desaparecerTextoTrivia');
    }
}

// Dar color a categoria
const darColorCategoria = categoria => {
    let colores = new Map([
        ['Arte', '#f42731'],
        ['Historia', '#f8de41'],
        ['Ciencia', '#1fc868'],
        ['Geografía', '#1575cf'],
        ['Deportes', '#ff9400'],
        ['Entretenimiento', '#f452af'],
    ]);

    colores.forEach((value, key) => {
        categoria == key ? document.querySelector('.categoria').style.background = value : null;
    });
    document.querySelector('.categoria p').innerHTML = sacarTildes(pregunta.categoria);
}

// Muestra el icono de correcion (correcto, incorrecto, sin tiempo)
const mostrarCorrecion = respuesta => {
    let correctaIcono = `<box-icon name='check' size='md'></box-icon>`;
    let incorrectaIcono = `<box-icon name='x' size='md'></box-icon>`;
    let sinTiempoIcono = `<box-icon name='time' size='md'></box-icon>`;

    let iconoRespuesta, colorFondoIcono;

    if (respuesta == 0) {
        iconoRespuesta = incorrectaIcono;
        colorFondoIcono = "#ff3c2e";
    }
    if (respuesta == 1) {
        iconoRespuesta = correctaIcono;
        colorFondoIcono = "#25c1a3";
    }
    if (respuesta == 2) {
        iconoRespuesta = sinTiempoIcono;
        colorFondoIcono = "#db8828";
    }

    document.querySelector('.iconoCorreccion').innerHTML = iconoRespuesta;
    document.querySelector('.iconoCorreccion').style.background = colorFondoIcono;
    document.querySelector('.correccion').classList.add('mostrarCorrecion');
}


const mostrarPantallaFinal = () => {
    hacerSonido("pantallaFinal");
    completarEstadisticas();

    // aparecer contenedor
    document.querySelector('.usuarioNombre').textContent = nombreUsuario;
    document.querySelector('.pantallaFinal').classList.add('aparecerPantallaFinal');

    // aparecer progreso
    setTimeout(() => {
        document.querySelector('.progreso').classList.add('estadisticaMostrar');
        setTimeout(() => {
            circleBar.animate(porcentajeAciertos, { duration: 1500 }); // animar circulo de progreso
            document.querySelector('.progreso__texto').classList.add('aparecerTextoProgreso');
        }, 300)
    }, 500)


    // aparecer cada detalle
    setTimeout(() => {
        document.querySelector('.det1').classList.add('estadisticaMostrar');
    }, 1800)
    setTimeout(() => {
        document.querySelector('.det2').classList.add('estadisticaMostrar');
    }, 2200)
    setTimeout(() => {
        document.querySelector('.det3').classList.add('estadisticaMostrar');
    }, 2600)

    // aparecer botones
    setTimeout(() => {
        document.querySelector('.botonExportar').classList.add('aparecerbotonExportar');
    }, 4200)
    setTimeout(() => {
        document.querySelector('.botonReiniciarJuego').classList.add('aparecerbotonExportar');
    }, 4500)
}


const completarEstadisticas = () => {
    if (nAciertos != 1) {
        document.getElementById('aciertos').parentNode.innerHTML = `<span id="aciertos" class="numeroEst aciertos"></span> correctas`;
    }
    if (nFallos != 1) {
        document.getElementById('fallos').parentNode.innerHTML = `<span id="fallos" class="numeroEst fallos"></span> incorrectas`;
    }

    let spanAciertos = document.getElementById('aciertos');
    let spanFallos = document.getElementById('fallos');
    let spanSinTiempo = document.getElementById('sinTiempo');

    porcentajeAciertos = nAciertos / preguntas_hechas;
    spanAciertos.textContent = nAciertos;
    spanFallos.textContent = nFallos;
    spanSinTiempo.textContent = nSinTiempo;
};

document.querySelector('.botonExportar').addEventListener('click', () => {
    hacerSonido('boton3');
    print();
})

document.querySelector('.botonReiniciarJuego').addEventListener('click', () => {
    hacerSonido('boton1');
    setTimeout(() => {
        window.location.reload();
    }, 500)
});

$('.modal__input').on('input', function() {
    if (document.querySelector('.modal__input').value.length >= 5) {
        $('.modal__aviso').addClass('ocultar-modal__aviso')
        $('.guardarUsuario').removeClass('guardarUsuario-deshabilitado')
    } else {
        $('.modal__aviso').removeClass('ocultar-modal__aviso')
        $('.guardarUsuario').addClass('guardarUsuario-deshabilitado')
    }
})

// Funciones para minimizar sentencias
function select_id(id) {
    return document.getElementById(id);
}

function style(id) {
    return select_id(id).style;
}

const sacarTildes = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}