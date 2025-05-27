document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Закрываем меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.burger-menu') && !event.target.closest('.nav-links')) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}); 