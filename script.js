document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDesdeCSV();
});

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

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines.shift().split(',');
    return lines.map(line => {
        const data = line.split(',');
        return headers.reduce((obj, nextKey, index) => {
            obj[nextKey] = data[index].trim();
            return obj;
        }, {});
    });
}

function mostrarImagenes(data) {
    const imgContainer = document.getElementById('img-container');
    imgContainer.innerHTML = ''; // Limpia el contenedor antes de añadir nuevos elementos

    data.forEach(imagen => {
        if (imagen.nombre && imagen.cultivo) { // Asegura que el nombre y cultivo existan
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('img-box');
            
            const imageURL = `https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/${encodeURIComponent(imagen.nombre)}`;
            imgDiv.innerHTML = `
                <a href="${imageURL}" target="_blank">Ver imagen de ${imagen.cultivo}</a>
                <textarea placeholder="Añade un comentario..."></textarea>
            `;
            imgContainer.appendChild(imgDiv);
        }
    });
}

document.getElementById('accion').addEventListener('click', filtrarImagenes);

document.getElementById('guardar').addEventListener('click', function() {
    const comentarios = [];
    document.querySelectorAll('.img-box').forEach(box => {
        const enlaceImagen = box.querySelector('a').href;
        const comentario = box.querySelector('textarea').value.trim();
        const usuario = document.getElementById('usuario').value.trim();
        const fecha = new Date().toISOString();

        if (comentario) {
            comentarios.push({enlaceImagen, fecha, usuario, comentario});
        }
    });

    console.log("Comentarios para guardar:", comentarios);
    alert('Comentarios preparados para guardar (revisa la consola)');
    // Aquí podrías implementar una función para enviar estos datos a un servidor o API
});

function filtrarImagenes() {
    const paisSeleccionado = document.getElementById('pais').value;
    const cultivoSeleccionado = document.getElementById('cultivo').value;

    const imagenesFiltradas = window.imagenes.filter(imagen => {
        return (paisSeleccionado === 'default' || imagen.pais === paisSeleccionado) && 
               (cultivoSeleccionado === 'default' || imagen.cultivo === cultivoSeleccionado);
    });

    mostrarImagenes(imagenesFiltradas);
}
