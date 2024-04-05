document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes realizar acciones iniciales, como cargar opciones dinámicamente si es necesario.
});

// Función para simular la búsqueda de datos basada en los filtros seleccionados por el usuario.
function buscarDatos() {
    const cultivoSeleccionado = document.getElementById('crop').value;
    const paisSeleccionado = document.getElementById('pais').value;
    const usuarioSeleccionado = document.getElementById('usuario').value;

    // Simula mostrar la fecha y hora de consulta
    const contenedorFechaHora = document.getElementById('fechaHora');
    contenedorFechaHora.innerHTML = 'Fecha y Hora de Consulta: ' + obtenerFechaHoraActual();

    // Aquí asumiremos que tienes un endpoint en tu backend que puede acceder a los datos.
    // Como no podemos realizar peticiones reales a un servidor sin detalles específicos, este es un ejemplo conceptual.
    // Reemplaza '/api/buscar' con tu endpoint real.
    const url = `/api/buscar?cultivo=${encodeURIComponent(cultivoSeleccionado)}&pais=${encodeURIComponent(paisSeleccionado)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta de red no fue ok.');
            }
            return response.json();
        })
        .then(datos => {
            mostrarResultados(datos, usuarioSeleccionado);
        })
        .catch(error => {
            console.error('Error al realizar la petición:', error);
        });
}

// Función para mostrar los resultados obtenidos del servidor
function mostrarResultados(datos, usuario) {
    const contenedorResultados = document.getElementById('resultados');
    contenedorResultados.innerHTML = ''; // Limpiar resultados anteriores

    datos.forEach(dato => {
        const elemento = document.createElement('div');
        elemento.classList.add('resultado');
        elemento.innerHTML = `
            <p>Usuario: ${usuario}</p>
            <p>ID: ${dato.id}, Cultivo: ${dato.cultivo}, País: ${dato.pais}</p>
            <img src="${dato.urlImagen}" alt="Imagen del Cultivo" style="width: 100px; height: auto;">
            <p>Fecha y Hora de Consulta: ${obtenerFechaHoraActual()}</p>
            <textarea rows="4" cols="50">${dato.comentario || ''}</textarea>
        `;
        contenedorResultados.appendChild(elemento);
    });
}

// Función para obtener la fecha y hora actual en formato local
function obtenerFechaHoraActual() {
    const ahora = new Date();
    return ahora.toLocaleString();
}

// Agregar el listener al botón de buscar para iniciar la búsqueda cuando se haga clic
document.querySelector('button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir la recarga de la página
    buscarDatos();
});
