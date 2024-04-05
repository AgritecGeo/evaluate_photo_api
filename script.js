document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el formulario al cargar la página
    inicializarFormulario();
});

function inicializarFormulario() {
    // Aquí podrías hacer una solicitud al servidor para obtener las opciones disponibles
    // y luego dinámicamente llenar las opciones de los selectores de cultivo y país.
    // Por ahora, las opciones ya están definidas en el HTML.
}

function buscarDatos() {
    // Aquí deberías realizar una solicitud al servidor para obtener los datos filtrados.
    // Como no podemos hacer eso directamente, simularemos la carga de datos.
    
    console.log("Buscando datos...");
    
    // Simular la obtención de datos
    setTimeout(function() {
        // Simula la respuesta del servidor
        const datosFicticios = [
            { id: 1, cultivo: 'Frijol', país: 'Colombia', comentario: '', fechaConsulta: obtenerFechaHoraActual() },
            // Agrega más objetos según necesites para simular los datos
        ];

        mostrarResultados(datosFicticios);
    }, 1000); // Retraso ficticio de 1 segundo
}

function obtenerFechaHoraActual() {
    const ahora = new Date();
    return ahora.toLocaleString(); // Formato de fecha y hora local
}

function mostrarResultados(datos) {
    const contenedorResultados = document.getElementById('resultados');
    contenedorResultados.innerHTML = ''; // Limpiar resultados anteriores

    // Crear y agregar los elementos HTML para mostrar los datos
    datos.forEach(dato => {
        const elemento = document.createElement('div');
        elemento.classList.add('resultado');
        elemento.innerHTML = `
            <p>Cultivo: ${dato.cultivo}, País: ${dato.país}</p>
            <p>Fecha y Hora de Consulta: ${dato.fechaConsulta}</p>
            <textarea rows="4" cols="50">${dato.comentario}</textarea>
        `;
        contenedorResultados.appendChild(elemento);
    });
}

// Función para ser llamada cuando se haga clic en el botón de buscar
document.querySelector('button').addEventListener('click', buscarDatos);