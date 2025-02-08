document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (!hamburger || !nav) {
        console.error('Hamburger or nav elements not found');
        return;
    }

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        console.log('Menu clicked, nav classes:', nav.classList);
    });
});