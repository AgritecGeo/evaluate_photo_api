document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDesdeCSV();
});

function cargarImagenesDesdeCSV() {
    fetch('tabla_documentacion.csv')
        .then(response => response.text())
        .then(csvText => {
            const imagenes = parseCSV(csvText);
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
            obj[nextKey] = data[index];
            return obj;
        }, {});
    });
}

function mostrarImagenes(data) {
    const imgContainer = document.getElementById('img-container');
    imgContainer.innerHTML = ''; // Limpia el contenedor antes de añadir nuevas imágenes

    data.forEach(imagen => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-box');
        // Asegúrate de ajustar la URL de la imagen según la ubicación y el nombre real de tus archivos de imagen
        const imageURL = `https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/imagen_${imagen.id}.png`;
        imgDiv.innerHTML = `
            <div><strong>Nombre:</strong> ${imagen.id}</div>
            <div><strong>País:</strong> ${imagen.pais}</div>
            <div><strong>Cultivo:</strong> ${imagen.cultivo}</div>
            <a href="${imageURL}" target="_blank"><img src="${imageURL}" alt="Imagen de ${imagen.cultivo}" class="image"></a>
            <textarea placeholder="Añade un comentario..."></textarea>
        `;
        imgContainer.appendChild(imgDiv);
    });
}
