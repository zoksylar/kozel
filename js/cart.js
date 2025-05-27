// Функции для работы с корзиной
const cart = {
    // Получение данных корзины из localStorage
    getCart: function() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    },

    // Сохранение данных корзины в localStorage
    saveCart: function(cartData) {
        localStorage.setItem('cart', JSON.stringify(cartData));
    },

    // Добавление товара в корзину
    addItem: function(product) {
        const cartData = this.getCart();
        const existingItem = cartData.find(item => 
            item.id === product.id && item.size === product.size
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cartData.push(product);
        }

        this.saveCart(cartData);
        this.updateCartCount();
    },

    // Удаление товара из корзины
    removeItem: function(productId, size) {
        let cartData = this.getCart();
        cartData = cartData.filter(item => 
            !(item.id === productId && item.size === size)
        );
        this.saveCart(cartData);
        this.updateCartCount();
    },

    // Обновление количества товара
    updateQuantity: function(productId, size, quantity) {
        const cartData = this.getCart();
        const item = cartData.find(item => 
            item.id === productId && item.size === size
        );

        if (item) {
            item.quantity = quantity;
            this.saveCart(cartData);
            this.updateCartCount();
        }
    },

    // Обновление счетчика товаров в корзине
    updateCartCount: function() {
        const cartData = this.getCart();
        const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    },

    // Очистка корзины
    clearCart: function() {
        this.saveCart([]);
        this.updateCartCount();
    }
};

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем счетчик товаров в корзине
    const cartIcon = document.querySelector('.contact a:last-child');
    if (cartIcon) {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.style.display = 'none';
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(cartCount);
    }

    // Обновляем счетчик при загрузке
    cart.updateCartCount();

    // Обработчик для кнопок "В КОРЗИНУ"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.product-info');
            const productId = productContainer.dataset.productId;
            const productName = productContainer.querySelector('h1').textContent;
            const productPrice = parseInt(productContainer.querySelector('.price span:first-child').textContent);
            const selectedSize = productContainer.querySelector('.size-option.selected')?.textContent || 'M';

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                size: selectedSize,
                quantity: 1,
                image: document.querySelector('.product-image-container img').src
            };

            cart.addItem(product);
            
            // Показываем уведомление
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                left: 50%;
                bottom: 40px;
                transform: translateX(-50%);
                background: #000;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
                box-shadow: 0 4px 24px rgba(0,0,0,0.2);
            `;
            notification.textContent = 'Товар добавлен в корзину';
            document.body.appendChild(notification);

            // Удаляем уведомление через 3 секунды
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        });
    });

    // Добавляем стили для анимации уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}); 