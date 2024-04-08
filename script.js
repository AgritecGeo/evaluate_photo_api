document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDesdeCSV();
});

// Función para cargar y mostrar imágenes desde datos CSV
function cargarImagenesDesdeCSV() {
    fetch('https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/tabla_documentacion.csv')
        .then(response => response.text())
        .then(csvText => {
            const imagenes = parseCSV(csvText);
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
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-box');
        imgDiv.innerHTML = `
            <img src="https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/${imagen['nombre']}" alt="${imagen['cultivo']}" class="image">
            <textarea placeholder="Añade un comentario..."></textarea>
        `;
        imgContainer.appendChild(imgDiv);
    });
}

document.getElementById('accion').addEventListener('click', filtrarImagenes);

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

function filtrarImagenes() {
    // Implementa la lógica de filtrado basado en los valores seleccionados para país o cultivo
    // Esta función necesitaría ajustarse para trabajar con los datos actuales del CSV y las selecciones del usuario
}
