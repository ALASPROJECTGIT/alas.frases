const frases = [
    'Abril lee un libro',
    'Adrián entrega un regalo a Julia',
    'Ale recoge la basura',
    'Alex canta una canción',
    'Alex y Carlos se empujan',
    'Ana abre el coche',
    'Ana arma los cubos',
    'Ana exprime el limón',
    'Beto toma fotografías',
    'César compara 2 latas de comida',
    'Dana mira la computadora',
    'Danna y Pablo discuten',
    'El agua hierve en la taza',
    'El bate es azul',
    'El cabello es negro',
    'El calcetín es azul',
    'El delantal es rojo',
    'El globo es azul',
    'El lápiz es amarillo',
    'El limón es verde',
    'El niño llora',
    'El papel es rojo',
    'El pastel es blanco',
    'El pato es de peluche',
    'El peine es azul',
    'El perro come',
    'El perro está acostado',
    'El piso es de madera',
    'El portafolio es de madera',
    'El recipiente es grande',
    'El suéter de katia es café',
    'El supeter de lis es amarillo',
    'El tomate es rojo',
    'El trompo gira',
    'Él vacía el café',
    'El vestido de Kari es blanco',
    'El volante del coche es negro',
    'Elda carga una planta',
    'Elia tira una lata',
    'Ella espolvorea la harina',
    'Ella está empacando',
    'Felipe lanza el balón',
    'Fer esquiva el balón',
    'Frida mastica chicle',
    'Gaby atrapa el balón',
    'Joel bebe agua',
    'Juan empuja la caja',
    'Julia entrega una caja a Paola',
    'La alcancía es azul',
    'La alfombra es gris',
    'La bicileta es roja',
    'La blusa de Ana es blanca',
    'La blusa de Ana es blanca_1',
    'La bolsa es blanca',
    'La cámara es pequeña',
    'La camisa es azul',
    'La camiseta es negra',
    'La cebolla es blanca',
    'La chamarra es verde',
    'La clabija es negra',
    'La coladera es roja',
    'La corona navideña es dorada',
    'La crayola es verde',
    'La estufa es blanca',
    'La flor es roja',
    'La hija abriga a la mamá',
    'La leña está ardiendo',
    'La llave gotea',
    'La maleta es gris',
    'La manzana es roja',
    'La moneda gira',
    'La paleta es roja',
    'La pizza es redonda',
    'La sandía es verde por fuera y roja por dentro',
    'La sudadera de Eloy es negra',
    'La ventana es blanca',
    'La ventana está limpia',
    'La yema del huevo es amarilla',
    'Las copas son de vidrio',
    'Las letras son azules',
    'Lea y Ariel cruzan la calle',
    'Los árboles son verdes',
    'Los hielos se derriten',
    'Lucía toma una selfie',
    'Lucy compra flores',
    'Luis empuja las pesas',
    'Luis engrapa un sobre morado',
    'Luis mira dos telefonos celulares',
    'Luis y Sara discuten',
    'Luisa abre la puerta',
    'Luisa come una galleta',
    'María acomoda los botes de comida',
    'Nadia reparte mandarinas_1',
    'Nico busca las tijeras',
    'Nicolás arrastra las pesas',
    'Paco y Pepe discuten',
    'Paula empuja a Noe',
    'Rosa muerde la manzana.',
    'Sandra lame la paleta',
    'Sara entrega un regalo a Mara',
    'Sara exprime la jerga',
    'Vale tiene 10 dedos'  
  ];
  
  const baseURL = 'https://alas.uv.mx/portal/interior/video/frases/';
  

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
const siguienteBtn = document.getElementById('siguiente-btn');
const reintentarBtn = document.getElementById('reintentar-btn');
const reiniciarBtn = document.getElementById('reiniciar-btn');

function cargarPregunta() {
    siguienteBtn.style.display = 'none';
    reintentarBtn.style.display = 'none';

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
            deshabilitarOpciones();
        };
        opcionesContainer.appendChild(videoOpcion);
    });
}

function verificarRespuesta(src) {
    const preguntaActual = preguntas[indicePreguntaActual];
    const respuestaNormalizada = new URL(preguntaActual.respuesta).href;
    const seleccionNormalizada = new URL(src).href;

    if (seleccionNormalizada === respuestaNormalizada) {
        resultado.textContent = '¡Respuesta Correcta!';
        resultado.style.color = '#28a745';
        mostrarBotonSiguiente();
    } else {
        resultado.textContent = 'Respuesta Incorrecta';
        resultado.style.color = '#dc3545';
        mostrarBotonReintentar();
    }
}

function mostrarBotonSiguiente() {
    siguienteBtn.style.display = 'block';
    siguienteBtn.href = "http://127.0.0.1:5500/index.html"; // Reemplaza con la URL deseada
}

function mostrarBotonReintentar() {
    reintentarBtn.style.display = 'block';
}

function deshabilitarOpciones() {
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach(opcion => {
        opcion.onclick = null; // Deshabilitar el evento de clic
        opcion.style.pointerEvents = 'none'; // Deshabilitar los eventos del ratón
        opcion.style.opacity = '0.5'; // Cambiar la opacidad para indicar que están deshabilitados
    });
}

function reiniciarPrueba() {
    indicePreguntaActual = 0;
    resultado.textContent = '';
    cargarPregunta();
}

reiniciarBtn.addEventListener('click', function() {
    indicePreguntaActual = 0;
    $('#finModal').modal('hide');
    cargarPregunta();
});

cargarPregunta();
ss