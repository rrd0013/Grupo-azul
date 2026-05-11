const elementos = document.querySelectorAll('.fade');

let lastScroll = window.scrollY;

let primeraCarga = true;

window.addEventListener("load", () => {
    elementos.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight) {
        el.classList.add('visible');
    }
    });

    setTimeout(() => {
    primeraCarga = false;
    }, 100);
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > lastScroll;

    if (entry.isIntersecting && scrollingDown) {
        entry.target.classList.add('visible');
    }

    lastScroll = currentScroll;
    });
}, {
    threshold: 0.2
});

elementos.forEach(el => observer.observe(el));