/* let allVideos = // 20240501131020
// http://localhost:3000/videos

[
  {
    name: "Adrián entrega un regalo a Julia.mp4",
    src: "https://alas.uv.mx/portal/interior/video/frases/Adria%CC%81n%20entrega%20un%20regalo%20a%20julia.mp4",
    id: "vid_1"
  },
  {
    name: "Ana exprime limón.mp4",
    src: "https://alas.uv.mx/portal/interior/video/frases/Ana exprime limón.mp4",
    id: "vid_2"
  },

];

// Función para generar el código JavaScript a partir de la lista de videos recibida
function generarCodigoJavaScript(allVideos) {
    let jsCode = 'let allVideos = [\n';
    allVideos.forEach(video => {
        // Escapar las comillas simples en el nombre y la src
        let escapedName = video.name.replace(/'/g, "\\'");
        let escapedSrc = video.src.replace(/'/g, "\\'");
        
        // Agregar el objeto de video al código JavaScript
        jsCode += `   {\n`;
        jsCode += `      name: '${escapedName}',\n`;
        jsCode += `      src: '${escapedSrc}',\n`;
        jsCode += `      id: '${video.id}'\n`;
        jsCode += `   },\n`;
    });
    jsCode += `];\n`;

    console.log(jsCode); // Mostrar el código generado en la consola
}

// Llamar a la función para generar el código JavaScript
generarCodigoJavaScript(allVideos);
 */




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

const allVideos = frases.map((frase, index) => {
  return {
      name: `${frase}.mp4`,
      src: `${baseURL}${encodeURIComponent(frase)}.mp4`,
      id: `vid_${index + 1}`
  };
});