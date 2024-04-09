document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDesdeCSV();
    document.getElementById('accion').addEventListener('click', filtrarPorPais);
    document.getElementById('guardar').addEventListener('click', guardarComentarios);
});

function cargarImagenesDesdeCSV() {
    fetch('tabla_documentacion.csv')
        .then(response => response.text())
        .then(csvText => {
            window.imagenes = parseCSV(csvText);
            mostrarImagenes(window.imagenes);
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
    imgContainer.innerHTML = '';

    data.forEach(imagen => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-box');
        const imageURL = `https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/imagen_${imagen['id']}.png`;
        imgDiv.innerHTML = `
            <div>Nombre: imagen_${imagen['id']}.png</div>
            <div>País: ${imagen['pais']}</div>
            <a href="${imageURL}" target="_blank"><img src="${imageURL}" alt="Imagen" class="image"></a>
            <textarea placeholder="Añade un comentario..."></textarea>
        `;
        imgContainer.appendChild(imgDiv);
    });
}

function filtrarPorPais() {
    const paisSeleccionado = document.getElementById('pais').value;
    const imagenesFiltradas = window.imagenes.filter(imagen => imagen.pais === paisSeleccionado || paisSeleccionado === 'default');
    mostrarImagenes(imagenesFiltradas);
}

function guardarComentarios() {
    let datosCSV = 'Nombre Imagen,País,Fecha,Comentario\n'; // Encabezados del CSV
    document.querySelectorAll('.img-box').forEach(box => {
        const nombreImagen = box.children[0].textContent.replace('Nombre: ', '');
        const comentario = box.querySelector('textarea').value;
        const pais = box.children[1].textContent.replace('País: ', '');
        const fecha = new Date().toISOString();

        if (comentario) {
            datosCSV += `"${nombreImagen}","${pais}","${fecha}","${comentario}"\n`;
        }
    });

    const blob = new Blob([datosCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'evaluaciones.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    document.getElementById('banner').style.display = 'block';
    setTimeout(() => {
        document.getElementById('banner').style.display = 'none';
    }, 3000);
}
