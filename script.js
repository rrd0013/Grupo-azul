function actualizarMenu() {
    // Comprobamos la "llave" en la memoria del navegador
    const sesionIniciada = localStorage.getItem('usuarioLogueado') === 'true';

    const btnReservas = document.getElementById('menu-reservas');
    const btnPerfil = document.getElementById('menu-perfil');
    const btnLogin = document.getElementById('menu-login');

    if (sesionIniciada) {
        if(btnReservas) btnReservas.style.display = 'block';
        if(btnPerfil) btnPerfil.style.display = 'block';
        if(btnLogin) btnLogin.style.display = 'none';
    } else {
        if(btnReservas) btnReservas.style.display = 'none';
        if(btnPerfil) btnPerfil.style.display = 'none';
        if(btnLogin) btnLogin.style.display = 'block';
    }
}

// Esto ejecuta el código al cargar la página normalmente
document.addEventListener('DOMContentLoaded', actualizarMenu);

// ESTO ES LO NUEVO: Fuerza a la página a revisar la sesión al usar el botón "Atrás"
window.addEventListener('pageshow', function(event) {
    actualizarMenu();
});