// --- Lógica del Sobre Inicial ---
const pantallaSobre = document.getElementById('pantalla-sobre');
const sobre = document.querySelector('.sobre');

sobre.addEventListener('click', function() {
    // 1. Añadimos la clase para que haga la animación de abrirse
    sobre.classList.add('abierto');
    
    // 2. Esperamos 1 segundo para que termine la animación y luego ocultamos la pantalla
    setTimeout(() => {
        pantallaSobre.classList.add('oculto');
        
        // 3. Como el usuario ya interactuó, reproducimos la música automáticamente
        if (reproductor) {
            reproductor.play();
            btnMusica.innerText = '⏸️ Pausar Música';
            estaReproduciendo = true;
        }
    }, 1000);
});

// Seleccionamos los elementos del HTML
const reproductor = document.getElementById('musica');
const btnMusica = document.getElementById('btn-musica');

// Variable para saber si la música está sonando o no
let estaReproduciendo = false;

// Evento al hacer clic en el botón
btnMusica.addEventListener('click', function() {
    if (estaReproduciendo) {
        reproductor.pause(); // Pausa la canción
        btnMusica.innerText = '🎵 Reproducir Música';
        estaReproduciendo = false;
    } else {
        reproductor.play(); // Inicia la canción
        btnMusica.innerText = '⏸️ Pausar Música';
        estaReproduciendo = true;
    }
});

// --- Lógica de la Cuenta Regresiva ---

// Configura la fecha exacta de la fiesta
// Formato: Año, Mes (OJO: Enero es 0 y Diciembre es 11), Día, Hora, Minutos
// Ejemplo: 15 de Diciembre de 2026 a las 20:00 hrs
const fechaFiesta = new Date(2026, 07, 15, 19, 0, 0).getTime();

const actualizarContador = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaFiesta - ahora;

    // Cálculos matemáticos para días, horas, minutos y segundos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Enviar los resultados al HTML (añadiendo un cero si es menor a 10)
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

    // Si la fecha ya pasó, mostrar un mensaje
    if (distancia < 0) {
        clearInterval(actualizarContador);
        document.getElementById("contador").innerHTML = "<h3>¡Llegó el gran día!</h3>";
    }
}, 1000); // Se actualiza cada 1000 milisegundos (1 segundo)

// --- Efectos de Pétalos Mágicos ---
function crearPetalo() {
    const contenedor = document.getElementById('contenedor-petalos');
    if (!contenedor) return; // Evita errores si no encuentra el contenedor

    const petalo = document.createElement('div');
    petalo.classList.add('petalo');

    // Tamaño aleatorio (entre 10px y 25px)
    const tamaño = Math.random() * 15 + 10; 
    petalo.style.width = `${tamaño}px`;
    petalo.style.height = `${tamaño}px`;

    // Posición horizontal aleatoria de izquierda a derecha
    petalo.style.left = `${Math.random() * 100}vw`;

    // Duración de la caída aleatoria (entre 5 y 10 segundos)
    const duracion = Math.random() * 5 + 5;
    petalo.style.animationDuration = `${duracion}s`;

    contenedor.appendChild(petalo);

    // Eliminar el pétalo después de que termine de caer
    setTimeout(() => {
        petalo.remove();
    }, duracion * 1000);
}

// Crear un pétalo nuevo cada 400 milisegundos (Puedes bajar el número para que caigan más)
setInterval(crearPetalo, 400);