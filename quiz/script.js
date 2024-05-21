const frases = [

'borrar 1',
'cargar bolsa',
'abrir 2',
'adornar 1',
'alimentar 3',
'batear 3'

    
];



const baseURL = 'https://alas.uv.mx/portal/interior/video/Seleccion/';

const preguntas = frases.map(frase => {
    const opciones = obtenerOpcionesAleatorias(frases, frase);
    opciones.push(frase);
    opciones.sort(() => Math.random() - 0.5);

    return {
        pregunta: `${frase}`,
        opciones: opciones.map(opcion => `${baseURL}${opcion}.mp4`),
        respuesta: `${baseURL}${frase}.mp4`
    };
});

function obtenerOpcionesAleatorias(array, fraseActual) {
    const opciones = [];
    while (opciones.length < 2) {
        const opcion = array[Math.floor(Math.random() * array.length)];
        if (opcion !== fraseActual && !opciones.includes(opcion)) {
            opciones.push(opcion);
        }
    }
    return opciones;
}

let indicePreguntaActual = 0;
const preguntaTexto = document.getElementById('pregunta-texto');
const opcionesContainer = document.getElementById('opciones-container');
const resultado = document.getElementById('resultado');
const barraProgreso = document.getElementById('barra-progreso');
const reiniciarBtn = document.getElementById('reiniciar-btn');

function cargarPregunta() {
    if (indicePreguntaActual >= preguntas.length) {
        mostrarModalFin();
        return;
    }

    const preguntaActual = preguntas[indicePreguntaActual];
    preguntaTexto.textContent = preguntaActual.pregunta;

    opcionesContainer.innerHTML = '';
    preguntaActual.opciones.forEach(opcion => {
        const videoOpcion = document.createElement('video');
        videoOpcion.src = opcion;
        videoOpcion.autoplay = true;
        videoOpcion.loop = true;
        videoOpcion.muted = true;
        videoOpcion.classList.add('opcion');
        videoOpcion.onclick = function() {
            verificarRespuesta(videoOpcion.src);
        };
        opcionesContainer.appendChild(videoOpcion);
    });

    actualizarBarraProgreso();
}

function verificarRespuesta(src) {
    const preguntaActual = preguntas[indicePreguntaActual];
    const respuestaNormalizada = new URL(preguntaActual.respuesta).href;
    const seleccionNormalizada = new URL(src).href;

    if (seleccionNormalizada === respuestaNormalizada) {
        resultado.textContent = '¡Respuesta Correcta!';
        resultado.style.color = '#28a745';
    } else {
        resultado.textContent = 'Respuesta Incorrecta';
        resultado.style.color = '#dc3545';
    }
}

function cargarSiguientePregunta() {
    resultado.textContent = '';
    indicePreguntaActual++;
    cargarPregunta();
}

function actualizarBarraProgreso() {
    const progreso = ((indicePreguntaActual + 1) / preguntas.length) * 100;
    barraProgreso.style.width = `${progreso}%`;
    barraProgreso.setAttribute('aria-valuenow', progreso);
}

function mostrarModalFin() {
    $('#finModal').modal('show');
}

reiniciarBtn.addEventListener('click', function() {
    indicePreguntaActual = 0;
    $('#finModal').modal('hide');
    cargarPregunta();
});

cargarPregunta();
