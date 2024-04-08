document.addEventListener('DOMContentLoaded', function() {
    cargarImagenes();
});

function cargarImagenes() {
    const urlCSV = 'https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/tabla_documentacion.csv';

    fetch(urlCSV)
        .then(response => response.text())
        .then(data => {
            const imagenes = procesarCSV(data);
            mostrarImagenes(imagenes);
        })
        .catch(error => console.error('Error al cargar el archivo CSV:', error));
}

function procesarCSV(dataCSV) {
    const lineas = dataCSV.split('\n').slice(1); // Excluye el encabezado del CSV
    return lineas.map(linea => {
        const [id, cultivo, nombreImagen] = linea.split(',');
        return { id, cultivo, nombreImagen: nombreImagen.trim() };
    }).filter(imagen => imagen.nombreImagen); // Filtra líneas vacías
}

function mostrarImagenes(imagenes) {
    const contenedor = document.getElementById('resultados');
    contenedor.innerHTML = ''; // Limpiar resultados anteriores

    imagenes.forEach(imagen => {
        const elementoImagen = document.createElement('div');
        elementoImagen.setAttribute('data-id', imagen.id);
        elementoImagen.innerHTML = `
            <img src="https://filedn.com/lRAMUKU4tN3HUnQqI5npg4H/Plantix/Imagenes/${imagen.nombreImagen}" alt="${imagen.cultivo}">
            <textarea rows="4" cols="50" placeholder="Añade un comentario..."></textarea>
            <button onclick="guardarComentario('${imagen.id}', '${imagen.nombreImagen}')">Guardar Comentario</button>
        `;
        contenedor.appendChild(elementoImagen);
    });
}

function guardarComentario(idImagen, nombreImagen) {
    const contenedorImagen = document.querySelector(`div[data-id="${idImagen}"]`);
    const comentario = contenedorImagen.querySelector('textarea').value;
    const fecha = new Date().toISOString();

    // Aquí se debería implementar la lógica para enviar el comentario a tu servidor,
    // incluyendo el ID de la imagen, el nombre de la imagen, y el comentario.
    console.log(`Datos a guardar: ID: ${idImagen}, Nombre de la imagen: ${nombreImagen}, Comentario: ${comentario}, Fecha: ${fecha}`);

    // Simulación: Mostrar un mensaje de éxito
    alert('Comentario guardado (simulado). En una implementación real, este comentario se enviaría a tu servidor para su procesamiento.');
}
