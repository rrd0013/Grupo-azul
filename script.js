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

document.addEventListener("DOMContentLoaded", () => {

    const carrusel = document.getElementById("carrusel");
    const items = document.querySelectorAll(".carrusel-item");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    let index = 0;

    function actualizarCarrusel() {
        carrusel.style.transform = `translateX(-${index * 100}%)`;
    }

    btnNext.addEventListener("click", () => {
        index = (index + 1) % items.length;
        actualizarCarrusel();
    });

    btnPrev.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        actualizarCarrusel();
    });

});
const carrusel = document.getElementById("carruselZoom");

window.addEventListener("scroll", () => {
    const rect = carrusel.getBoundingClientRect();
    const alturaPantalla = window.innerHeight;

    // Cuando el carrusel entra en pantalla → agrandar
    if (rect.top < alturaPantalla * 0.6 && rect.bottom > alturaPantalla * 0.2) {
        carrusel.classList.add("activo");
        carrusel.classList.remove("pequeno");
    }
    // Cuando ya lo pasaste → hacerlo pequeño otra vez
    else if (rect.top < 0) {
        carrusel.classList.add("pequeno");
        carrusel.classList.remove("activo");
    }
    // Cuando aún no llegaste a él → pequeño
    else {
        carrusel.classList.remove("activo");
        carrusel.classList.add("pequeno");
    }
});
