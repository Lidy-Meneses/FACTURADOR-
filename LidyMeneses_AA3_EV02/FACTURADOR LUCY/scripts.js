document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // Aquí iría la lógica para validar las credenciales
    const isValid = validarCredenciales(username, password); // Esta función la defines tú

    if (isValid) {
        window.location.href = 'programacionjuegos.html';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
});

function validarCredenciales(username, password) {
    // Validación de ejemplo
    return username === "admin" && password === "1234";
}

// metoritos
document.addEventListener("DOMContentLoaded", function() {
    const meteorShower = document.querySelector('.meteor-shower');

    // Genera 20 meteoritos
    for (let i = 0; i < 20; i++) {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');

        // Posición inicial y duración de la animación
        meteor.style.left = Math.random() * 100 + 'vw';
        meteor.style.animationDuration = Math.random() * 2 + 3 + 's'; // Duración aleatoria entre 3s y 5s
        meteor.style.animationDelay = Math.random() * 5 + 's'; // Retraso aleatorio

        meteorShower.appendChild(meteor);
    }
});

// CICLO PARA MOSTRAR TARJETAS DE PROGRAMACION 
