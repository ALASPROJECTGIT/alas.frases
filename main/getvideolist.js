const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Ruta de la carpeta de videos
const rutaVideos = './videos';

// Función para buscar los archivos de video en la carpeta
function buscarVideosEnCarpeta() {
    return new Promise((resolve, reject) => {
        // Leer la lista de archivos en la carpeta
        fs.readdir(rutaVideos, (err, archivos) => {
            if (err) {
                reject(err);
                return;
            }

            // Filtrar solo los archivos de video
            const videosEnCarpeta = archivos.filter(archivo => archivo.endsWith('.mp4'));

            // Construir la lista de videos dinámicamente
            const allVideos = videosEnCarpeta.map((nombreVideo, index) => ({
                name: nombreVideo,
                src: `${rutaVideos}/${nombreVideo}`,
                id: `vid_${index + 1}`
            }));

            resolve(allVideos);
        });
    });
}

// Endpoint para obtener la lista de videos
app.get('/videos', async (req, res) => {
    try {
        const videos = await buscarVideosEnCarpeta();
        res.json(videos);
    } catch (error) {
        console.error('Error al buscar videos en la carpeta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Servidor escuchando en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
