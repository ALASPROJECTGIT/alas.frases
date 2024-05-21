// Inicializar Plyr con autoplay
const player = new Plyr('#main-Video', {
    controls: ['play', 'pause', 'progress', 'restart', 'fullscreen'],
    autoplay: true
});

// Obtener el botón de "Siguiente" y "Evaluación"
const nextBtn = document.getElementById('nextBtn');
const evaluacionBtn = document.getElementById('evaluacionBtn');

// Inicializar índice de video
let videoIndex = 0;

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
    // Mostrar el título del video (aunque esté oculto, se necesita para el script)
    videoTitle.innerHTML = `${index + 1}. ${video.name}`;
}

// Función para cambiar al siguiente video
function changeVideo(direction) {
    videoIndex += direction;
    if (videoIndex < 0) {
        videoIndex = allVideos.length - 1;
    } else if (videoIndex >= allVideos.length) {
        videoIndex = 0;
    }
    loadVideo(videoIndex);
    playingNow();
}

// Escuchar el evento clic del botón "Siguiente"
nextBtn.addEventListener('click', () => {
    changeVideo(1); // Cambiar al siguiente video
});

// Función para manejar la indicación visual del video actualmente reproduciéndose
function playingNow() {
    const allLiTags = playlist.querySelectorAll('li');
    for (let j = 0; j < allLiTags.length; j++) {
        if (allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove("playing");
        }
        if (allLiTags[j].getAttribute('li-index') == videoIndex) {
            allLiTags[j].classList.add('playing');
        }
    }
}

// Al cargar la página, crear la lista de reproducción y cargar el primer video
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
            player.play(); // Reproducir el video cuando se hace clic en un elemento de la lista
        });
        playlist.appendChild(liTag);
    });

    loadVideo(videoIndex);
    playingNow();
});

// Escuchar el evento 'ready' del reproductor Plyr para iniciar la reproducción
player.on('ready', () => {
    player.play(); // Reproducir el video cuando el reproductor está listo
});

// Escuchar el evento 'ended' del reproductor Plyr para mostrar el botón "Evaluación"
player.on('ended', () => {
    mostrarBotonEvaluacion();
});

// Función para mostrar el botón "Evaluación"
function mostrarBotonEvaluacion() {
    evaluacionBtn.style.display = 'block';
}
