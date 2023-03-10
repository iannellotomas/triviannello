// Cuenta regresiva
const contar_tiempo = () => {
    let nuevoTiempo = new Date().getTime() + tiempoLimite;
    let limite = new Date(nuevoTiempo);
    document.querySelector('.tiempo').style.color = "#fff";

    actualizarContador = setInterval(() => {
        let t = obtenerTiempoRestante(limite);

        if (t.tiempoRestante >= 0 && t.tiempoRestante <= 6) {
            hacerSonido('ultSegundos');
            document.querySelector('.tiempo').style.color = "#d64443";
        }

        document.querySelector('.tiempo').classList.remove('tiempoFuera');
        document.querySelector('.numeroTiempo').textContent = t.segundosRestantes;

        comprobarRespuesta = setInterval(() => {
            if (detenerContador) {
                clearInterval(comprobarRespuesta);
                clearInterval(actualizarContador);
                document.querySelector('.tiempo').classList.add('tiempoFuera');
                document.querySelector('.numeroTiempo').textContent = 15;
            }
        }, 100)

        if (t.tiempoRestante <= 1) {
            clearInterval(comprobarRespuesta);
            clearInterval(actualizarContador);
            hacerSonido('sinTiempo');
            $('.opcion').addClass('deshabilitar');

            setTimeout(() => {
                nSinTiempo++;
                document.querySelector('.tiempo').classList.add('tiempoFuera');
                document.querySelector('.opcion').classList.add('botonSinTiempo');
                mostrarCorrecion(2);

                setTimeout(() => {
                    $('.opcion').removeClass('botonSinTiempo');
                    $('.opcion').removeClass('mostrarOpcion');
                }, 2000);
                setTimeout(() => {
                    reiniciar();
                }, delayAlContestar);
            }, 400)
        }
    }, 1000)
}



const obtenerTiempoRestante = limite => {
    let now = new Date()
    var tiempoRestante = (new Date(limite) - now + 1000) / 1000;
    var segundosRestantes = ('' + Math.floor(tiempoRestante % 60)).slice(-2);

    return {
        segundosRestantes,
        tiempoRestante
    }
};