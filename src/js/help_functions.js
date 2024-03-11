export function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// Функція, що показує, або скриває кнопку поверення на початок сторінки
export function scrollTracker(btnScroll) {
    const offset = window.pageYOffset;
    const documentHeight = document.documentElement.clientHeight;
    if (offset > documentHeight) {
            btnScroll.classList.remove('is-hidden-btn');
        } else {
            btnScroll.classList.add('is-hidden-btn');
        }
}