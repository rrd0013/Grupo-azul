(function() {
const contenedorScroll = document.querySelector('.scroll-container');
const contenedor = document.querySelector('.revelado-tattoo');
if (!contenedorScroll || !contenedor) return;

const btnIzq = contenedor.querySelector('.btn-izq');
const btnDer = contenedor.querySelector('.btn-der');
const imagenes = Array.from(contenedor.querySelectorAll('.imagen-revelada'));
let indiceActivo = 0;

const lineaTop = contenedor.querySelector('.linea-superior');
const lineaBottom = contenedor.querySelector('.linea-inferior');

let alturaContenedor, finalImageHeight;

function cambiarImagen(nuevoIndice) {
    if (nuevoIndice === indiceActivo) return;
    imagenes[indiceActivo].classList.remove('activa');
    imagenes[nuevoIndice].classList.add('activa');
    indiceActivo = nuevoIndice;
    calcularMedidas();
    actualizarProgreso();
}

btnIzq.addEventListener('click', (e) => {
    e.stopPropagation();
    let nuevo = indiceActivo - 1;
    if (nuevo < 0) nuevo = imagenes.length - 1;
    cambiarImagen(nuevo);
});

btnDer.addEventListener('click', (e) => {
    e.stopPropagation();
    let nuevo = indiceActivo + 1;
    if (nuevo >= imagenes.length) nuevo = 0;
    cambiarImagen(nuevo);
});

function calcularMedidas() {
    alturaContenedor = contenedor.offsetHeight;
    finalImageHeight = 500;
}

const imgActivaInicial = imagenes[indiceActivo];
if (imgActivaInicial.complete) {
    calcularMedidas();
} else {
    imgActivaInicial.addEventListener('load', calcularMedidas);
}
window.addEventListener('resize', calcularMedidas);

function actualizarProgreso() {
    if (!finalImageHeight || !alturaContenedor) return;

    const rectScroll = contenedorScroll.getBoundingClientRect();
    const wh = window.innerHeight;
    const sh = contenedorScroll.offsetHeight;

    let progresoBase = (wh - rectScroll.top) / (wh + sh);
    progresoBase = Math.min(Math.max(progresoBase, 0), 1);

    const inicio = 0.3;
    const fin = 0.45;

    let progreso;
    if (progresoBase <= inicio) {
    progreso = 0;
    } else if (progresoBase >= fin) {
    progreso = 1;
    } else {
    progreso = (progresoBase - inicio) / (fin - inicio);
    }

    const imgActiva = imagenes[indiceActivo];
    if (imgActiva) {
    imgActiva.style.transform = `translate(-50%, -50%) scale(${progreso})`;

    btnIzq.style.opacity = progreso;
    btnIzq.style.transform = `translateY(-50%) scale(${progreso})`;
    btnIzq.style.pointerEvents = progreso === 1 ? 'auto' : 'none';

    btnDer.style.opacity = progreso;
    btnDer.style.transform = `translateY(-50%) scale(${progreso})`;
    btnDer.style.pointerEvents = progreso === 1 ? 'auto' : 'none';
    }

    let desplazamiento = (finalImageHeight / 2) * progreso;
    const maxDesplazamiento = alturaContenedor / 2 - 2;
    desplazamiento = Math.min(desplazamiento, maxDesplazamiento);

    const contenedorRect = contenedor.getBoundingClientRect();
    const centroY = contenedorRect.top + alturaContenedor / 2;

    lineaTop.style.top = `${centroY - desplazamiento}px`;
    lineaTop.style.transform = 'none';

    lineaBottom.style.top = `${centroY + desplazamiento}px`;
    lineaBottom.style.transform = 'none';
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
    window.requestAnimationFrame(() => {
        actualizarProgreso();
        ticking = false;
    });
    ticking = true;
    }
});

actualizarProgreso();
})();