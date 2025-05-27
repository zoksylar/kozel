document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');

    // Открытие/закрытие меню по клику на бургер
    burgerButton.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Закрытие меню по клику на крестик
    closeButton.addEventListener('click', function() {
        burgerButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Обработка кликов по ссылкам в мобильном меню
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Если ссылка ведет на якорь на текущей странице
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Закрываем меню
                burgerButton.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Плавная прокрутка к элементу
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !burgerButton.contains(e.target)) {
            burgerButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}); 