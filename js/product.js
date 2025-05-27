document.addEventListener('DOMContentLoaded', function() {
    // Инициализация бургер-меню
    initBurgerMenu();
    
    // Инициализация выбора размера
    initSizeSelector();
    
    // Загрузка данных из XML
    loadProductData();
    
    // Инициализация корзины
    initCart();

    document.querySelectorAll('.size-selector').forEach(function(selector) {
        const options = selector.querySelectorAll('.size-option');
        options.forEach(function(btn) {
            btn.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
});

// Функция инициализации бургер-меню
function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Закрываем меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.burger-menu') && !event.target.closest('.nav-links')) {
            burgerMenu.setAttribute('aria-expanded', 'false');
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Функция инициализации выбора размера
function initSizeSelector() {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Функция загрузки данных из XML
function loadProductData() {
    const xmlData = document.getElementById('productData').textContent;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

    // Загружаем основные данные товара
    updateProductInfo(xmlDoc);

    // После генерации кнопок инициализируем выбор размера
    initSizeSelector();
}

// Функция обновления информации о товаре
function updateProductInfo(xmlDoc) {
    // Обновляем цену
    const price = xmlDoc.querySelector('price').textContent;
    const currency = xmlDoc.querySelector('currency').textContent;
    document.querySelector('.price').textContent = `${price} ${currency}`;

    // Обновляем описание
    const description = xmlDoc.querySelector('description').textContent;
    document.querySelector('.description p').textContent = description;

    // Обновляем размеры
    const sizes = xmlDoc.querySelectorAll('size');
    const sizeSelector = document.querySelector('.size-selector');
    sizeSelector.innerHTML = '';
    
    sizes.forEach((size, idx) => {
        const button = document.createElement('button');
        button.className = 'size-option';
        button.setAttribute('aria-label', `Размер ${size.textContent}`);
        button.textContent = size.textContent;
        if (idx === 0) button.classList.add('selected'); // первая кнопка выделена
        sizeSelector.appendChild(button);
    });
}

// Функция инициализации корзины
function initCart() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    
    addToCartBtn.addEventListener('click', function() {
        const selectedSize = document.querySelector('.size-option.selected');
        
        if (!selectedSize) {
            alert('Пожалуйста, выберите размер');
            return;
        }
        
        const productContainer = document.querySelector('.product-info');
        const productId = productContainer.dataset.productId;
        const productName = productContainer.querySelector('h1').textContent;
        const productPrice = parseInt(productContainer.querySelector('.price span:first-child').textContent);
        const productImage = document.querySelector('.product-image-container img').src;
        
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            size: selectedSize.textContent,
            quantity: 1,
            image: productImage
        };
        
        cart.addItem(product);
        
        // Анимация добавления в корзину
        this.classList.add('added');
        setTimeout(() => this.classList.remove('added'), 1000);
    });
} 