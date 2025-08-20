/*
 * Website JavaScript logic
 * Handles navigation, form validation, dessert popup modal & shopping cart
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Page Navigation
    // =========================
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('main section');

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const activePage = document.getElementById(pageId);
        if (activePage) activePage.classList.add('active');

        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`a[data-page="${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageId = event.target.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // =========================
    // Copy Shipping → Billing
    // =========================
    const copyAddressButton = document.getElementById('copy-address-button');
    if (copyAddressButton) {
        copyAddressButton.addEventListener('click', () => {
            document.getElementById('billing-address').value = document.getElementById('shipping-address').value;
            document.getElementById('billing-zip').value = document.getElementById('shipping-zip').value;
        });
    }

    // =========================
    // Adaptive Credit Card
    // =========================
    const cardTypeSelect = document.getElementById('card-type');
    const creditCardInput = document.getElementById('credit-card');
    if (cardTypeSelect && creditCardInput) {
        cardTypeSelect.addEventListener('change', () => {
            const cardType = cardTypeSelect.value;
            switch (cardType) {
                case 'visa':
                case 'mastercard':
                    creditCardInput.maxLength = 16;
                    creditCardInput.placeholder = "XXXX XXXX XXXX XXXX";
                    break;
                case 'amex':
                    creditCardInput.maxLength = 15;
                    creditCardInput.placeholder = "XXXX XXXXXX XXXXX";
                    break;
                default:
                    creditCardInput.maxLength = '';
                    creditCardInput.placeholder = "";
            }
        });
    }

    // =========================
    // Registration Form Validation
    // =========================
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let formIsValid = true;
            const formGroups = registrationForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));

            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                nameInput.closest('.form-group').classList.add('error');
                formIsValid = false;
            }

            const emailInput = document.getElementById('email');
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(emailInput.value)) {
                emailInput.closest('.form-group').classList.add('error');
                formIsValid = false;
            }

            const passwordInput = document.getElementById('password');
            if (passwordInput.value.length < 8) {
                passwordInput.closest('.form-group').classList.add('error');
                formIsValid = false;
            }

            const zipPattern = /^\d{5}$/;
            if (!zipPattern.test(document.getElementById('shipping-zip').value)) {
                document.getElementById('shipping-zip').closest('.form-group').classList.add('error');
                formIsValid = false;
            }
            if (!zipPattern.test(document.getElementById('billing-zip').value)) {
                document.getElementById('billing-zip').closest('.form-group').classList.add('error');
                formIsValid = false;
            }

            if (cardTypeSelect.value === '') {
                cardTypeSelect.closest('.form-group').classList.add('error');
                formIsValid = false;
            }

            const creditCardNumber = creditCardInput.value.replace(/\s/g, '');
            if (creditCardNumber.length !== creditCardInput.maxLength || isNaN(creditCardNumber)) {
                creditCardInput.closest('.form-group').classList.add('error');
                formIsValid = false;
            }

            if (formIsValid) {
                alert('🎉 Registration successful! You can now place an order.');
                registrationForm.reset();
                showPage('home');
            } else {
                alert('⚠️ Please correct the highlighted errors before submitting.');
            }
        });
    }

    // =========================
    // Dessert Popup Modal
    // =========================
    const dessertItems = document.querySelectorAll('.dessert-item');

    // create modal structure
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3 id="modal-title"></h3>
            <img id="modal-img" src="" alt="">
            <p id="modal-info"></p>
            <p class="price" id="modal-price"></p>
            <p class="ingredients" id="modal-ingredients"></p>
            <button class="order-btn">🛒 Order Now</button>
        </div>
    `;
    document.body.appendChild(modal);

    const modalTitle = modal.querySelector('#modal-title');
    const modalImg = modal.querySelector('#modal-img');
    const modalInfo = modal.querySelector('#modal-info');
    const modalPrice = modal.querySelector('#modal-price');
    const modalIngredients = modal.querySelector('#modal-ingredients');
    const closeBtn = modal.querySelector('.close');

    dessertItems.forEach(item => {
        item.addEventListener('click', () => {
            modalTitle.textContent = item.dataset.title || item.querySelector('h3').textContent;
            modalImg.src = item.dataset.img || item.querySelector('img').src;

            const infoText = item.dataset.info || item.querySelector('p').textContent;
            const parts = infoText.split("Price:");
            modalInfo.textContent = parts[0].trim();
            modalPrice.textContent = parts[1] ? "💲 " + parts[1].trim() : "";

            if (item.dataset.ingredients) {
                modalIngredients.textContent = "Ingredients: " + item.dataset.ingredients;
            } else {
                modalIngredients.textContent = "";
            }

            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });

    // =========================
    // Shopping Cart
    // =========================
    let cart = [];
    const cartCountEl = document.querySelector('.cart-count');
    const cartItemsEl = document.querySelector('.cart-items');

    function updateCart() {
        cartCountEl.textContent = cart.length;
        cartItemsEl.innerHTML = "";
        if (cart.length === 0) {
            cartItemsEl.innerHTML = `<li class="empty-msg">Your cart is empty</li>`;
            return;
        }
        cart.forEach((item, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.title}</span>
                <span>${item.price || ''}</span>
            `;
            cartItemsEl.appendChild(li);
        });
    }

    modal.querySelector('.order-btn').addEventListener('click', () => {
        const dessert = {
            title: modalTitle.textContent,
            price: modalPrice.textContent
        };
        cart.push(dessert);
        updateCart();
        modal.style.display = 'none';
    });

    updateCart();
});