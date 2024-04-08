document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDesdeCSV();
});

function cargarImagenesDesdeCSV() {
    fetch('https://raw.githubusercontent.com/agritecgeo/evaluate_photo_api/main/tabla_documentacion.csv')
        .then(response => response.text())
        .then(csvText => {
            const imagenes = parseCSV(csvText);
            mostrarImagenes(imagenes);
        })
        .catch(err => console.error('Error al cargar y parsear el CSV:', err));
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines.shift().split(',').map(header => header.trim());
    return lines.map(line => {
        const data = line.split(',').map(cell => cell.trim());
        return headers.reduce((obj, header, index) => {
            obj[header] = data[index] || ''; // Asigna una cadena vacía si el dato es undefined
            return obj;
        }, {});
    });
}

function mostrarImagenes(data) {
    const imgContainer = document.getElementById('img-container');
    imgContainer.innerHTML = ''; // Limpia el contenedor antes de añadir nuevos elementos

    data.forEach(imagen => {
        if (imagen.nombre) { // Verifica que haya un nombre de imagen para mostrar
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('img-box');

            const imageURL = `https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/${encodeURIComponent(imagen.nombre)}`;
            imgDiv.innerHTML = `
                <div>Nombre: ${imagen.nombre}</div>
                <a href="${imageURL}" target="_blank">Ver imagen</a>
                <textarea placeholder="Añade un comentario..."></textarea>
            `;
            imgContainer.appendChild(imgDiv);
        }
    });
}
