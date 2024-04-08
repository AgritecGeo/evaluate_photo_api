document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDesdeCSV();
});

// Función para cargar y mostrar imágenes desde datos CSV
function cargarImagenesDesdeCSV() {
    fetch('https://raw.githubusercontent.com/agritecgeo/evaluate_photo_api/main/tabla_documentacion.csv')
        .then(response => response.text())
        .then(csvText => {
            const imagenes = parseCSV(csvText);
            window.imagenes = imagenes; // Hacer global para uso en filtrarImagenes
            mostrarImagenes(imagenes);
        })
        .catch(err => console.error('Error al cargar y parsear el CSV:', err));
}

// Función para parsear texto CSV y convertirlo a objetos de JavaScript
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines.shift().split(',');
    return lines.map(line => {
        const data = line.split(',');
        return headers.reduce((obj, nextKey, index) => {
            obj[nextKey] = data[index];
            return obj;
        }, {});
    });
}

// Función para mostrar imágenes en la página
function mostrarImagenes(data) {
    const imgContainer = document.getElementById('img-container');
    imgContainer.innerHTML = ''; // Limpia el contenedor antes de añadir nuevas imágenes

    data.forEach(imagen => {
        if (imagen.nombre && imagen.cultivo) { // Asegura que el nombre y cultivo existan
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('img-box');

            // Ajuste de URL para compatibilidad con la estructura de directorios de imágenes
            const imageURL = `https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/${encodeURIComponent(imagen.nombre.trim())}`;
            imgDiv.innerHTML = `
                <img src="${imageURL}" alt="Imagen de ${imagen.cultivo}" class="image">
                <textarea placeholder="Añade un comentario..."></textarea>
            `;
            imgContainer.appendChild(imgDiv);
        }
    });
}

// Añade evento de clic al botón "Filtrar"
document.getElementById('accion').addEventListener('click', filtrarImagenes);

// Añade evento de clic al botón "Guardar"
document.getElementById('guardar').addEventListener('click', function() {
    const comentarios = [];
    document.querySelectorAll('.img-box').forEach(box => {
        const nombreImagen = box.querySelector('img').src.split('/').pop();
        const comentario = box.querySelector('textarea').value.trim();
        const usuario = document.getElementById('usuario').value.trim();
        const fecha = new Date().toISOString();

        if (comentario) {
            comentarios.push({nombreImagen, fecha, usuario, comentario});
        }
    });

    console.log("Comentarios para guardar:", comentarios);
    alert('Comentarios preparados para guardar (revisa la consola)');
    // Aquí podrías implementar una función para enviar estos datos a un servidor o API
});

// Función para filtrar imágenes basado en selecciones de país o cultivo
function filtrarImagenes() {
    const paisSeleccionado = document.getElementById('pais').value;
    const cultivoSeleccionado = document.getElementById('cultivo').value;

    const imagenesFiltradas = window.imagenes.filter(imagen => {
        const filtraPorPais = paisSeleccionado === 'default' || imagen.pais === paisSeleccionado;
        const filtraPorCultivo = cultivoSeleccionado === 'default' || imagen.cultivo === cultivoSeleccionado;
        return filtraPorPais && filtraPorCultivo;
    });

    mostrarImagenes(imagenesFiltradas);
}
