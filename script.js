document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDesdeCSV();
});

// URL del archivo CSV en GitHub
const csvURL = 'https://raw.githubusercontent.com/agritecgeo/evaluate_photo_api/main/tabla_documentacion.csv';

// Función para cargar y procesar el archivo CSV
function cargarImagenesDesdeCSV() {
    fetch(csvURL)
        .then(response => response.text())
        .then(csvText => {
            // Procesar el contenido del CSV
            procesarCSV(csvText);
        })
        .catch(error => {
            console.error('Error al cargar el archivo CSV:', error);
        });
}

// Función para procesar el contenido del CSV
function procesarCSV(csvText) {
    const lineas = csvText.trim().split('\n');
    const cabeceras = lineas.shift().split(',');

    const datos = lineas.map(linea => {
        const campos = linea.split(',');
        return cabeceras.reduce((obj, clave, index) => {
            obj[clave] = campos[index];
            return obj;
        }, {});
    });

    // Mostrar las imágenes en la página
    mostrarImagenes(datos);
}

// Función para mostrar las imágenes en la página
function mostrarImagenes(datos) {
    const imgContainer = document.getElementById('img-container');
    imgContainer.innerHTML = '';

    datos.forEach(imagen => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-box');
        imgDiv.innerHTML = `
            <img src="https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/${imagen['nombre']}" alt="${imagen['cultivo']}" class="image">
            <textarea placeholder="Añade un comentario..."></textarea>
        `;
        imgContainer.appendChild(imgDiv);
    });
}

// Añade evento de clic al botón "Filtrar"
document.getElementById('accion').addEventListener('click', filtrarImagenes);

// Añade evento de clic al botón "Guardar"
document.getElementById('guardar').addEventListener('click', function() {
    const comentarios = [];
    document.querySelectorAll('.img-box').forEach(box => {
        const nombreImagen = box.querySelector('img').src.split('/').pop();
        const comentario = box.querySelector('textarea').value;
        const usuario = document.getElementById('usuario').value;
        const fecha = new Date().toISOString();

        if (comentario) {
            comentarios.push({nombreImagen, fecha, usuario, comentario});
        }
    });

    // Simula enviar los comentarios al "servidor"
    console.log("Comentarios para guardar:", comentarios);
    alert('Comentarios preparados para guardar (revisa la consola)');

    // Refresca la página
    location.reload();
});

// Función para filtrar imágenes basado en selecciones de país o cultivo
function filtrarImagenes() {
    const paisSeleccionado = document.getElementById('pais').value;
    const cultivoSeleccionado = document.getElementById('cultivo').value; // Asegúrate de que este ID esté presente en tu HTML.

    const imagenesFiltradas = window.imagenes.filter(imagen => {
        const filtraPorPais = paisSeleccionado === 'default' || imagen.pais === paisSeleccionado;
        const filtraPorCultivo = cultivoSeleccionado === 'default' || imagen.cultivo === cultivoSeleccionado;
        return filtraPorPais && filtraPorCultivo;
    });

    mostrarImagenes(imagenesFiltradas);
}
