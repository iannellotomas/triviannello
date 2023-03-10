// Importando audios
let rutaAudios = "../media/audio/";
let sonidoBoton_Tipo1 = new Audio(rutaAudios + "sonidoBotonTipo1.mp3");
let sonidoBoton_Tipo2 = new Audio(rutaAudios + "sonidoBotonTipo2.mp3");
let sonidoBoton_Tipo3 = new Audio(rutaAudios + "sonidoBotonTipo3.mp3");
let audioOpciones = new Audio(rutaAudios + "sonidoOpciones.mp3");
let audioCorrecta = new Audio(rutaAudios + "sonidoCorrecta.mp3");
let audioIncorrecta = new Audio(rutaAudios + "sonidoIncorrecta.mp3");
let audioSinTiempo = new Audio(rutaAudios + "sonidoSinTiempo.mp3");
let audioUltSegundos = new Audio(rutaAudios + "sonidoUltSegundos.mp3");
let audioPantallaFinal = new Audio(rutaAudios + "sonidoPantallaFinal.mp3");

// Ajustando volumen
let paginaMuteada = false;
sonidoBoton_Tipo1.volume = 0.3;
sonidoBoton_Tipo2.volume = 0.3;
sonidoBoton_Tipo3.volume = 0.3;
audioOpciones.volume = 0.3;
audioCorrecta.volume = 0.3;
audioIncorrecta.volume = 0.4;
audioSinTiempo.volume = 0.5;
audioUltSegundos.volume = 0.5;
audioPantallaFinal.volume = 0.3;

// Reproduciendo
const hacerSonido = (tipo) => {
	let sonidos = new Map([
		["boton1", sonidoBoton_Tipo1],
		["boton2", sonidoBoton_Tipo2],
		["boton3", sonidoBoton_Tipo3],
		["opciones", audioOpciones],
		["correcta", audioCorrecta],
		["incorrecta", audioIncorrecta],
		["sinTiempo", audioSinTiempo],
		["ultSegundos", audioUltSegundos],
		["pantallaFinal", audioPantallaFinal],
	]);

	if (!paginaMuteada) {
		sonidos.forEach((value, key) => {
			tipo == key ? value.play() : null;
		});
	}
};

// Al mutear
$(".mutearJuego").click(function () {
	paginaMuteada = !paginaMuteada;
	$(this).toggleClass("juegoMuteado");
	paginaMuteada
		? $(this).attr("title", "Desmutear")
		: $(this).attr("title", "Mutear");
});
