// script.js

// Dữ liệu người dùng (lưu trữ tạm thời trong bộ nhớ)
let user = {
    isLoggedIn: false,
    username: ''
};

// Dữ liệu sản phẩm
const products = [
    {
        id: 'airpods',
        name: 'Tai Nghe AirPod',
        image: 'https://cdn.tgdd.vn/Products/Images/54/315014/s16/tai-nghe-bluetooth-airpods-pro-2nd-gen-usb-c-charge-apple-thumb-12-1-650x650.png',
        originalPrice: 2500000,
        salePrice: 2000000,
        featured: true,
        onSale: true
    },
    {
        id: 'wired-headphone',
        name: 'Tai Nghe Có Dây',
        image: 'https://www.tncstore.vn/media/product/9257-tai-nghe-razer-co-day.jpg',
        originalPrice: 500000,
        salePrice: 400000,
        featured: true,
        onSale: false
    },
    {
        id: 'gaming-headset',
        name: 'Tai Nghe Gaming',
        image: 'https://zidli.vn/wp-content/uploads/2024/11/CBC28-01.jpg',
        originalPrice: 1500000,
        salePrice: 1200000,
        featured: false,
        onSale: true
    },
    {
        id: 'mechanical-keyboard',
        name: 'Bàn Phím Cơ',
        image: 'https://pcmarket.vn/media/product/12004_dareu_ek75_rt_rapid_trigge_5.png',
        originalPrice: 2000000,
        salePrice: 1600000,
        featured: true,
        onSale: false
    },
    {
        id: 'gaming-mouse',
        name: 'Chuột Gaming',
        image: 'https://hanoicomputercdn.com/media/product/67487_chuot_game_khong_day_razer_basilisk_v3_pro_ergonomic_wireless_usb_rgb_rz01_04620100_r3a1.jpg',
        originalPrice: 800000,
        salePrice: 640000,
        featured: false,
        onSale: true
    },
    {
        id: 'ergonomic-mouse',
        name: 'Chuột Công Thái Học',
        image: 'https://www.vitinhchicuong.vn/public/images/sanpham/chuot-cong-thai-hoc-logitech-lift-vertical-nguyenvu_store-1.jpg',
        originalPrice: 1000000,
        salePrice: 800000,
        featured: false,
        onSale: false
    },
    {
        id: 'monitor',
        name: 'Màn Hình 24inch',
        image: 'https://www.tncstore.vn/media/product/250-9786-man-msi-g2412f-1.png',
        originalPrice: 4000000,
        salePrice: 3200000,
        featured: true,
        onSale: true
    },
    {
        id: 'laptop',
        name: 'Máy tính xách tay',
        image: 'https://cdn.24h.com.vn/upload/4-2020/images/2020-10-10/Top-may-tinh-xach-tay-tot-nhat-nam-2020-1-1602283040-377-width660height369.jpg',
        originalPrice: 25000000,
        salePrice: 22000000,
        featured: false,
        onSale: false
    },
    {
        id: 'smart-watch',
        name: 'Đồng hồ thông minh',
        image: 'https://phukiendienthoaigiasi.vn/wp-content/uploads/2024/08/dong-ho-thong-minh-dinh-vi-tre-em-Y63-1.jpg',
        originalPrice: 4000000,
        salePrice: 3500000,
        featured: true,
        onSale: true
    },
    {
        id: 'drone',
        name: 'Drone Markvic III',
        image: 'https://www-cdn.djiits.com/cms/uploads/ae5d8b9987be8d5ecdeb5d502a1e887c.png',
        originalPrice: 15000000,
        salePrice: 12500000,
        featured: false,
        onSale: false
    }
];

// Dữ liệu mã giảm giá
const discountCodes = {
    'SALE20': 0.20, // Giảm 20%
    'FREESHIP': 0 // Ví dụ cho mã freeship, có thể thay đổi logic
};

let appliedDiscount = null;

// Dữ liệu bình luận mẫu (chỉ để hiển thị ban đầu)
const sampleComments = [
    {
        name: "Nguyễn Thu Thảo",
        initials: "NT",
        rating: 5,
        date: "20/07/2024",
        comment: "Sản phẩm rất tốt, giao hàng nhanh chóng. Tôi rất hài lòng với trải nghiệm mua sắm này."
    },
    {
        name: "Phạm Hoàng Nam",
        initials: "PH",
        rating: 5,
        date: "18/07/2024",
        comment: "Chất lượng sản phẩm đúng như mô tả. Đội ngũ hỗ trợ nhiệt tình, giải đáp mọi thắc mắc của tôi."
    },
    {
        name: "Trần Thị Ánh",
        initials: "TT",
        rating: 4,
        date: "15/07/2024",
        comment: "Sản phẩm dùng được, nhưng tôi nghĩ có thể cải thiện một chút về bao bì để trông chuyên nghiệp hơn."
    }
];

// Hàm định dạng tiền tệ
function formatCurrency(price) {
    const formattedPrice = Math.max(0, price);
    return formattedPrice.toLocaleString('vi-VN') + '₫';
}

// Hàm mở modal thông báo chung
function alertMessage(message) {
    const alertModal = document.getElementById('alertModal');
    const alertMessageElement = document.getElementById('alert-message');
    if (alertModal && alertMessageElement) {
        alertMessageElement.innerText = message;
        alertModal.style.display = 'flex';
    }
}

// Hàm đóng modal thông báo chung
window.closeAlertModal = function() {
    const alertModal = document.getElementById('alertModal');
    if (alertModal) {
        alertModal.style.display = 'none';
    }
}

// Mở modal đăng nhập
window.openLoginModal = function() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'flex';
    }
}

// Đóng modal đăng nhập
window.closeLoginModal = function() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'none';
    }
}

// Xử lý khi gửi form đăng nhập
window.handleLogin = function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (username && email && password) {
        user.isLoggedIn = true;
        user.username = username;
        alertMessage(`Đăng nhập thành công với tên: ${username}`);
        updateHeaderUI();
        closeLoginModal();
    } else {
        alertMessage('Vui lòng điền đầy đủ thông tin để đăng nhập.');
    }
}

// Cập nhật giao diện header dựa trên trạng thái đăng nhập
function updateHeaderUI() {
    const loginBtn = document.getElementById('login-btn');
    const userInfoSpan = document.getElementById('user-info');
    if (loginBtn && userInfoSpan) {
        if (user.isLoggedIn) {
            loginBtn.style.display = 'none';
            userInfoSpan.style.display = 'block';
            userInfoSpan.innerText = `Chào, ${user.username}`;
        } else {
            loginBtn.style.display = 'block';
            userInfoSpan.style.display = 'none';
        }
    }
}

// Thêm sản phẩm vào giỏ hàng
window.addToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alertMessage(`Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`);
}

// Cập nhật số lượng trên icon giỏ hàng
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.innerText = totalQuantity;
    }
}

// Hiển thị danh sách sản phẩm
function renderProducts(productsToRender, page, targetId) {
    const productGrid = document.getElementById(targetId);
    if (!productGrid) return;
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; color: #888; width: 100%;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <a href="#" class="product-name">${product.name}</a>
                <div class="product-price">
                    <span class="sale-price">${formatCurrency(product.salePrice)}</span>
                    <span class="original-price">${formatCurrency(product.originalPrice)}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(products.find(p => p.id === '${product.id}'))">Thêm vào giỏ</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Hàm để áp dụng lọc và sắp xếp trên trang sản phẩm
function applyFiltersAndSort() {
    const productSearchInput = document.getElementById('product-search');
    const allProductsGrid = document.getElementById('all-products-grid');

    if (!productSearchInput || !allProductsGrid) {
        return; // Chỉ chạy trên trang sản phẩm
    }

    let filteredProducts = [...products];

    // Cập nhật: Lọc theo thanh tìm kiếm (không cần nhập chính xác)
    const searchTerm = productSearchInput.value.trim().toLowerCase();
    if (searchTerm) {
        // Tách chuỗi tìm kiếm thành các từ riêng lẻ
        const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0);
        
        // Lọc các sản phẩm mà tên của chúng chứa TẤT CẢ các từ khóa tìm kiếm
        filteredProducts = filteredProducts.filter(p => {
            const productNameLower = p.name.toLowerCase();
            return searchWords.every(word => productNameLower.includes(word));
        });
    }
    
    // Lọc theo mức giá
    const priceFilter = document.querySelector('input[name="price-filter"]:checked');
    if (priceFilter) {
        const filterValue = priceFilter.value;
        if (filterValue === 'under1m') {
            filteredProducts = filteredProducts.filter(p => p.salePrice < 1000000);
        } else if (filterValue === '1to5m') {
            filteredProducts = filteredProducts.filter(p => p.salePrice >= 1000000 && p.salePrice <= 5000000);
        } else if (filterValue === 'over5m') {
            filteredProducts = filteredProducts.filter(p => p.salePrice > 5000000);
        }
    }

    // Sắp xếp
    const priceSort = document.getElementById('price-sort');
    if (priceSort) {
        const sortValue = priceSort.value;
        if (sortValue === 'asc') {
            filteredProducts.sort((a, b) => a.salePrice - b.salePrice);
        } else if (sortValue === 'desc') {
            filteredProducts.sort((a, b) => b.salePrice - b.salePrice);
        }
    }
    renderProducts(filteredProducts, 'all', 'all-products-grid');
}

// Mở modal giỏ hàng
window.openCartModal = function() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        renderCartItems();
        cartModal.style.display = 'flex';
    }
}

// Đóng modal giỏ hàng
window.closeCartModal = function() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Áp dụng mã giảm giá
window.applyDiscountCode = function() {
    const discountCodeInput = document.getElementById('discount-code-input');
    const code = discountCodeInput.value.toUpperCase();
    if (discountCodes[code] !== undefined) {
        appliedDiscount = code;
        alertMessage(`Mã giảm giá "${code}" đã được áp dụng!`);
    } else {
        appliedDiscount = null;
        alertMessage(`Mã giảm giá "${code}" không hợp lệ.`);
    }
    renderCartItems();
}


// Hiển thị các sản phẩm trong giỏ hàng
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let subtotalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">Giỏ hàng của bạn đang trống.</p>';
        totalPriceElement.innerText = formatCurrency(0);
        // Có thể ẩn nút thanh toán nếu giỏ hàng trống
        const checkoutBtn = document.querySelector('#cart-total .checkout-btn');
        if (checkoutBtn) checkoutBtn.style.display = 'none';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${formatCurrency(item.salePrice)}</div>
                </div>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button onclick="changeCartItemQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeCartItemQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItemFromCart('${item.id}')">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            subtotalPrice += item.salePrice * item.quantity;
        });

        let finalPrice = subtotalPrice;

        // Áp dụng mã giảm giá nếu có
        if (appliedDiscount && discountCodes[appliedDiscount] !== undefined) {
            const discountValue = discountCodes[appliedDiscount];
            if (typeof discountValue === 'number') {
                finalPrice = finalPrice - (finalPrice * discountValue);
            }
        }
        
        totalPriceElement.innerText = formatCurrency(finalPrice);
        const checkoutBtn = document.querySelector('#cart-total .checkout-btn');
        if (checkoutBtn) checkoutBtn.style.display = 'inline-block';
    }
}

// Xóa một sản phẩm khỏi giỏ hàng
window.removeItemFromCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Thay đổi số lượng sản phẩm trong giỏ
window.changeCartItemQuantity = function(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeItemFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            updateCartCount();
        }
    }
}

// Mở modal thanh toán
window.openCheckoutModal = function() {
    const checkoutModal = document.getElementById('checkoutModal');
    const cartModal = document.getElementById('cartModal');
    if (user.isLoggedIn) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length > 0) {
            if (cartModal) cartModal.style.display = 'none';
            if (checkoutModal) checkoutModal.style.display = 'flex';
        } else {
            alertMessage('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
        }
    } else {
        if (cartModal) closeCartModal();
        alertMessage('Bạn cần đăng nhập để tiến hành thanh toán.');
    }
}

// Đóng modal thanh toán
window.closeCheckoutModal = function() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.style.display = 'none';
    }
}

// Mở modal xác nhận đặt hàng
window.openConfirmationModal = function() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
    }
}

// Đóng modal xác nhận đặt hàng
window.closeConfirmationModal = function() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
        confirmationModal.style.display = 'none';
    }
}

// Xử lý khi gửi form thanh toán
window.submitOrder = function(event) {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length > 0) {
        localStorage.setItem('cart', '[]');
        closeCheckoutModal();
        updateCartCount();
        openConfirmationModal();
        appliedDiscount = null; // Reset mã giảm giá sau khi đặt hàng
    } else {
        alertMessage('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
        closeCheckoutModal();
    }
}

// Xử lý khi gửi form liên hệ
window.submitContactForm = function(event) {
    event.preventDefault();
    const contactForm = document.getElementById('contact-form');
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (name && email && message) {
        console.log('Thông tin liên hệ đã được gửi:');
        console.log(`Tên: ${name}, Email: ${email}, Tin nhắn: ${message}`);
        openContactConfirmationModal();
        if (contactForm) {
            contactForm.reset();
        }
    } else {
        console.error('Lỗi: Vui lòng điền đầy đủ thông tin vào form liên hệ.');
    }
}

// Mở modal xác nhận liên hệ
window.openContactConfirmationModal = function() {
    const contactConfirmationModal = document.getElementById('contactConfirmationModal');
    if (contactConfirmationModal) {
        contactConfirmationModal.style.display = 'flex';
    }
}

// Đóng modal xác nhận liên hệ
window.closeContactConfirmationModal = function() {
    const contactConfirmationModal = document.getElementById('contactConfirmationModal');
    if (contactConfirmationModal) {
        contactConfirmationModal.style.display = 'none';
    }
}

// Hiển thị các bình luận mẫu
function renderComments() {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;

    commentsContainer.innerHTML = ''; // Clear old comments
    
    // Tạo HTML cho từng bình luận mẫu
    sampleComments.forEach(comment => {
        const commentCard = document.createElement('div');
        commentCard.className = 'comment-card';

        let starIcons = '';
        const fullStars = Math.floor(comment.rating);
        const hasHalfStar = (comment.rating % 1 !== 0);

        // Hiển thị sao đầy
        for (let i = 0; i < fullStars; i++) {
            starIcons += '<i class="fas fa-star"></i>';
        }
        // Hiển thị sao nửa
        if (hasHalfStar) {
            starIcons += '<i class="fas fa-star-half-alt"></i>';
        }
        // Hiển thị sao rỗng còn lại
        const emptyStars = 5 - Math.ceil(comment.rating);
        for (let i = 0; i < emptyStars; i++) {
            starIcons += '<i class="far fa-star"></i>';
        }

        commentCard.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar">${comment.initials}</div>
                <div class="comment-author-info">
                    <p class="author-name">${comment.name}</p>
                    <p class="comment-date">${comment.date}</p>
                </div>
            </div>
            <div class="comment-rating">${starIcons}</div>
            <p class="comment-text">${comment.comment}</p>
        `;
        commentsContainer.appendChild(commentCard);
    });
}

// Xử lý sự kiện click vào các ngôi sao
let selectedRating = 0;
function handleStarRatingClick(event) {
    const star = event.target.closest('i');
    if (!star) return;

    selectedRating = parseInt(star.getAttribute('data-value'));
    const stars = document.querySelectorAll('.star-rating i');
    
    stars.forEach(s => {
        const sValue = parseInt(s.getAttribute('data-value'));
        if (sValue <= selectedRating) {
            s.classList.remove('far');
            s.classList.add('fas');
        } else {
            s.classList.remove('fas');
            s.classList.add('far');
        }
    });
}

// Hàm hiển thị alert box tùy chỉnh
function showCustomAlert(message, type = 'success') {
    let alertBox = document.getElementById('custom-alert');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'custom-alert';
        alertBox.className = 'custom-alert-box';
        document.body.appendChild(alertBox);
    }
    
    // Set color based on type
    alertBox.style.backgroundColor = type === 'success' ? '#48bb78' : '#f56565';
    alertBox.textContent = message;
    alertBox.classList.add('show');

    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

// Xử lý khi gửi form phản hồi
function handleFeedbackSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('feedback-name').value || "Khách hàng ẩn danh";
    const comment = document.getElementById('feedback-comment').value;

    if (comment.trim() === "" || selectedRating === 0) {
        showCustomAlert("Vui lòng nhập bình luận và chọn số sao đánh giá.", 'error');
        return;
    }

    const newComment = {
        name: name,
        initials: name.split(' ').map(n => n[0]).join('').toUpperCase(),
        rating: selectedRating,
        date: new Date().toLocaleDateString('vi-VN'),
        comment: comment
    };

    // Add new comment to the top of the list
    sampleComments.unshift(newComment);
    renderComments();

    // Reset form and rating
    document.getElementById('feedback-form').reset();
    selectedRating = 0;
    document.querySelectorAll('.star-rating i').forEach(s => {
        s.classList.remove('fas');
        s.classList.add('far');
    });

    // Hiển thị thông báo thành công
    showCustomAlert("Cảm ơn bạn đã phản hồi!");
}

// Hàm xử lý tìm kiếm trên trang chủ
function handleHeaderSearch(event) {
    // Nếu người dùng nhấn Enter
    if (event.key === "Enter") {
        const searchTerm = document.getElementById('header-product-search').value.trim();
        if (searchTerm) {
            // Encode từ khóa tìm kiếm để an toàn khi truyền qua URL
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            // Chuyển hướng đến trang product.html với tham số tìm kiếm
            window.location.href = `product.html?search=${encodedSearchTerm}`;
        }
        // Ngăn chặn form submit nếu có
        event.preventDefault(); 
    }
}

// Khởi tạo trang khi tải xong
window.addEventListener('load', function() {
    console.log('Trang đã tải xong.');
    updateCartCount();
    updateHeaderUI();
    
    // Hiển thị sản phẩm nổi bật trên trang chủ
    const featuredProducts = products.filter(p => p.featured);
    renderProducts(featuredProducts, 'featured', 'featured-products-grid');

    // Hiển thị sản phẩm ưu đãi trên trang chủ
    const saleProducts = products.filter(p => p.onSale);
    renderProducts(saleProducts, 'sale', 'sale-products-grid');

    // Hiển thị bình luận trên trang chủ
    renderComments();

    // Thêm trình nghe sự kiện cho thanh tìm kiếm ở header
    const headerSearch = document.getElementById('header-product-search');
    if (headerSearch) {
        // Sử dụng event 'keydown' để bắt sự kiện phím Enter
        headerSearch.addEventListener('keydown', handleHeaderSearch);
    }
    
    // Thêm các trình nghe sự kiện cho bộ lọc, sắp xếp và tìm kiếm (chỉ trên trang sản phẩm)
    // Phần này chỉ chạy trên product.html, không chạy trên index.html
    const productSearch = document.getElementById('product-search');
    if (productSearch) {
        // Lấy từ khóa tìm kiếm từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        if (searchTerm) {
            // Điền từ khóa tìm kiếm vào ô input
            productSearch.value = decodeURIComponent(searchTerm);
        }
        applyFiltersAndSort();
        productSearch.addEventListener('input', applyFiltersAndSort);
    }

    const priceFilters = document.getElementsByName('price-filter');
    priceFilters.forEach(filter => filter.addEventListener('change', applyFiltersAndSort));

    const priceSort = document.getElementById('price-sort');
    if (priceSort) {
        priceSort.addEventListener('change', applyFiltersAndSort);
    }
    
    const allProductsGrid = document.getElementById('all-products-grid');
    if (allProductsGrid) {
        // Nếu ở trang sản phẩm, chạy lọc ban đầu
        applyFiltersAndSort();
    }

    // Thêm trình nghe sự kiện cho form phản hồi và đánh giá sao
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }
    const starRatingContainer = document.querySelector('.star-rating');
    if (starRatingContainer) {
        starRatingContainer.addEventListener('click', handleStarRatingClick);
    }
});

// Đóng modal khi bấm ra ngoài
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const alertModal = document.getElementById('alertModal');
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const contactConfirmationModal = document.getElementById('contactConfirmationModal');

    if (event.target === loginModal) { closeLoginModal(); }
    if (event.target === alertModal) { closeAlertModal(); }
    if (event.target === cartModal) { closeCartModal(); }
    if (event.target === checkoutModal) { closeCheckoutModal(); }
    if (event.target === confirmationModal) { closeConfirmationModal(); }
    if (event.target === contactConfirmationModal) { closeContactConfirmationModal(); }
}
