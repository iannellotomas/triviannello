var nombreUsuario = "";

window.onload = function () {
    base_preguntas = readText("../bd/base-preguntas.json");
    interprete_bp = JSON.parse(base_preguntas);
    document.querySelector('header a').setAttribute('href', window.location)

    setTimeout(() => {
        document.querySelector('.preloader').classList.add('ocultarLoader');
    }, 300);
};

$('#jugar').click(function () {
    hacerSonido('boton1');
    document.querySelector('.modalFondo').classList.add('aparecerFondoModal');
    document.querySelector('.modal').classList.add('aparecerModal');
})

document.querySelector('.guardarUsuario').addEventListener('click', () => {
    nombreUsuario = document.querySelector('.modal__input').value;
    prepararJuego();
});

const prepararJuego = () => {
    // establecer límite de preguntas seleccionado
    const select = document.querySelector('.limite-preguntas select');
    if (nombreUsuario.length >= 5) {
        limitePreguntas = parseInt(select.options[select.selectedIndex].value);
        hacerSonido('boton2');

        document.querySelector('.modalFondo').classList.remove('aparecerFondoModal');
        document.querySelector('.modal').classList.remove('aparecerModal');
        document.querySelector('.pantallaInicio').classList.add('ocultarPantallaInicio');

        setTimeout(() => {
            document.querySelector('.categoria').style.transform = "translateY(0)";
            elegirPreguntaAleatoria();
            setTimeout(() => {
                document.querySelector('.numeroTiempo').textContent = 15;
                document.querySelector('.tiempo').classList.remove('tiempoFuera');
            }, 300)
        }, 300);

    }
}

function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
    }
    return texto;
}


addEventListener("beforeunload", (e) => {
    let aparecioFinal = document.querySelector('.pantallaFinal').classList.contains('aparecerPantallaFinal');
    console.log(aparecioFinal);
    if (nombreUsuario != "" && aparecioFinal==false) {
        e.preventDefault();
        e.returnValue = "";
        return "";
    }
});