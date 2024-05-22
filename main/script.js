// Obtener el índice del video desde la URL
const urlParams = new URLSearchParams(window.location.search);
const videoIndexParam = urlParams.get('videoIndex');
let videoIndex = videoIndexParam ? parseInt(videoIndexParam, 10) : 0;

// Arreglo de frases para los nombres de los videos
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

// URL base para los videos
const baseURL = 'https://alas.uv.mx/portal/interior/video/frases/';

// Arreglo de objetos de videos con nombre, fuente y ID
const allVideos = frases.map((frase, index) => {
  return {
    name: `${frase}.mp4`,
    src: `${baseURL}${encodeURIComponent(frase)}.mp4`,
    id: `vid_${index + 1}`
  };
});

// Inicializar Plyr con autoplay
const player = new Plyr('#main-Video', {
  controls: ['play', 'pause', 'progress', 'restart', 'fullscreen'],
  autoplay: true
});

// Obtener el botón de "Evaluación"
const evaluacionBtn = document.getElementById('evaluacionBtn');
const videoTitle = document.getElementById('videoTitle');
const playlist = document.getElementById('playlist');

// Función para cargar y reproducir el video
function loadVideo(index) {
  const video = allVideos[index];
  const videoSrc = video.src;
  player.source = {
    type: 'video',
    sources: [
      {
        src: videoSrc,
        type: 'video/mp4'
      }
    ]
  };
  // Mantener el título oculto
  videoTitle.style.display = 'none';
  updateEvaluationButtonUrl(index);
}

// Función para manejar la indicación visual del video actualmente reproduciéndose
function playingNow() {
  const allLiTags = playlist.querySelectorAll('li');
  allLiTags.forEach((liTag, index) => {
    if (index === videoIndex) {
      liTag.classList.add('playing');
    } else {
      liTag.classList.remove('playing');
    }
  });
}

// Función para actualizar el href del botón "Evaluación"
function updateEvaluationButtonUrl(index) {
  evaluacionBtn.href = `http://127.0.0.1:5500/quiz/index.html?videoIndex=${index}`;
}

// Event listeners

// Event listener para cada elemento de la lista de reproducción
window.addEventListener('load', () => {
  allVideos.forEach((video, index) => {
    let liTag = document.createElement('li');
    liTag.setAttribute('li-index', index);
    liTag.innerHTML = `
      <div class="row">
        <span>${index + 1}. ${video.name}</span>
      </div>
    `;
    liTag.addEventListener('click', () => {
      videoIndex = index;
      loadVideo(videoIndex);
      playingNow();
      player.play();
    });
    playlist.appendChild(liTag);
  });

  // Cargar el video inicial basado en videoIndex
  loadVideo(videoIndex);
  playingNow();
});

// Event listener 'ready' del reproductor Plyr
player.on('ready', () => {
  player.play();
});

// Event listener 'ended' del reproductor Plyr
player.on('ended', () => {
  mostrarBotonEvaluacion();
});

// Función para mostrar el botón "Evaluación"
function mostrarBotonEvaluacion() {
  evaluacionBtn.style.display = 'block';
}
