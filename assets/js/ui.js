// js/ui.js
// واجهة المستخدم: التنقل بين الأقسام، المودالات، الهيدر
window.ui = (function() {
  // عناصر واجهة المستخدم
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const authModal = document.getElementById('authModal');
  const authClose = document.getElementById('authClose');
  const productModal = document.getElementById('productModal');
  const productModalClose = document.getElementById('productModalClose');
  const productModalContent = document.getElementById('productModalContent');
  const cartModal = document.getElementById('cartModal');
  const cartModalClose = document.getElementById('cartModalClose');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotalSpan = document.getElementById('cartTotal');
  const cartCheckout = document.getElementById('cartCheckout');
  const deliveryFeeSpan = document.getElementById('deliveryFee');
  const storePickupRadio = document.getElementById('storePickup');
  const homeDeliveryRadio = document.getElementById('homeDelivery');
  const deliveryFormContainer = document.getElementById('deliveryFormContainer');
  const deliveryName = document.getElementById('deliveryName');
  const deliveryAddress = document.getElementById('deliveryAddress');
  const deliveryPhone = document.getElementById('deliveryPhone');
  const accountBtn = document.getElementById('accountBtn');
  const accountDropdown = document.getElementById('accountDropdown');
  const cartBtn = document.getElementById('cartBtn');
  const footer = document.getElementById('main-footer');

  // تبديل الأقسام
  function showSection(sectionId) {
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-section="${sectionId.replace('-section', '')}"]`).classList.add('active');
    
    // إخفاء الفوتر إذا كنا في المتجر أو الاشتراكات
    if (sectionId === 'store-section' || sectionId === 'subscriptions-section') {
      footer.style.display = 'none';
    } else {
      footer.style.display = 'grid';
    }
  }

  // مودال تسجيل الدخول
  function showAuthModal() { authModal.classList.add('show'); }
  function hideAuthModal() { authModal.classList.remove('show'); }

  // مودال المنتج
  function showProductModal(item, type = 'product') {
    if (!window.app.isLoggedIn) {
      showAuthModal();
      return;
    }
    window.app.currentModalProduct = item;
    window.app.currentModalType = type;
    let html = '';
    const images = item.images || [item.img];
    const colors = item.colors || [];
    const features = item.features || [];

    html += `
      <div class="product-modal-images">
        <img src="${images[0]}" class="product-modal-main-image" id="modalMainImage">
        <div class="product-modal-thumbnails">
          ${images.map((img, i) => `<img src="${img}" class="product-modal-thumbnail" data-index="${i}" onclick="document.getElementById('modalMainImage').src=this.src; document.querySelectorAll('.product-modal-thumbnail').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join('')}
        </div>
      </div>
      <div class="product-modal-info">
        <h2>${item.name}</h2>
        <div class="product-modal-price">${item.price} دينار</div>
        ${item.period ? `<div class="product-modal-period">${item.period}</div>` : ''}
        <div class="product-modal-sku">رمز المنتج: ${item.sku || 'غير محدد'}</div>
        ${colors.length ? `
          <div class="product-modal-colors">
            ${colors.map(c => `<span class="color-circle" style="background-color:${c}" onclick="document.querySelectorAll('.color-circle').forEach(c=>c.classList.remove('selected')); this.classList.add('selected');"></span>`).join('')}
          </div>
        ` : ''}
        <p class="product-modal-description">${item.description || 'لا يوجد وصف'}</p>
        ${features.length ? `
          <ul class="product-modal-features">
            ${features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
          </ul>
        ` : ''}
        <button class="product-modal-btn ${window.app.quantities[item.id] ? 'remove' : 'add'}" id="productModalBtn">
          ${window.app.quantities[item.id] ? '<i class="fas fa-trash-alt"></i> حذف' : '<i class="fas fa-cart-plus"></i> إضافة'}
        </button>
      </div>
    `;
    productModalContent.innerHTML = html;
    productModal.classList.add('show');

    // إضافة مستمع لزر المودال
    document.getElementById('productModalBtn').addEventListener('click', () => {
      if (!window.app.isLoggedIn) {
        productModal.classList.remove('show');
        showAuthModal();
        return;
      }
      window.store.toggleProduct(item.id);
      updateModalButton();
    });

    // تفعيل الصور المصغرة
    setTimeout(() => {
      document.querySelectorAll('.product-modal-thumbnail')[0]?.classList.add('active');
    }, 100);
  }

  function hideProductModal() {
    productModal.classList.remove('show');
  }

  function updateModalButton() {
    const modalBtn = document.getElementById('productModalBtn');
    if (!modalBtn || !window.app.currentModalProduct) return;
    const id = window.app.currentModalProduct.id;
    if (window.app.quantities[id]) {
      modalBtn.classList.remove('add');
      modalBtn.classList.add('remove');
      modalBtn.innerHTML = '<i class="fas fa-trash-alt"></i> حذف';
    } else {
      modalBtn.classList.remove('remove');
      modalBtn.classList.add('add');
      modalBtn.innerHTML = '<i class="fas fa-cart-plus"></i> إضافة';
    }
  }

  // مودال السلة
  function renderCartModal() {
    const items = [];
    let total = 0;
    for (const [id, qty] of Object.entries(window.app.quantities)) {
      if (qty > 0) {
        let item = window.store.storeProducts.find(p => p.id == id) || window.store.subscriptions.find(s => s.id == id);
        if (item) {
          items.push({ ...item, qty });
          total += item.price * qty;
        }
      }
    }
    if (items.length === 0) {
      cartItemsContainer.innerHTML = '<p style="text-align: center;">السلة فارغة</p>';
      cartTotalSpan.textContent = '0 دينار';
      deliveryFeeSpan.textContent = '';
      cartCheckout.disabled = true;
      return;
    }
    let html = '';
    items.forEach(item => {
      html += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price} دينار</div>
          </div>
          <div class="cart-item-quantity">
            <button class="cart-decrease" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="cart-increase" data-id="${item.id}">+</button>
            <button class="cart-remove" data-id="${item.id}" style="background:#ff4444; margin-right:5px;">🗑️</button>
          </div>
        </div>
      `;
    });
    cartItemsContainer.innerHTML = html;
    updateDeliveryUI();

    document.querySelectorAll('.cart-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        window.app.quantities[id] = (window.app.quantities[id] || 0) + 1;
        window.updateCartCount();
        renderCartModal();
        window.store.updateAllButtons();
      });
    });
    document.querySelectorAll('.cart-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (window.app.quantities[id] > 1) {
          window.app.quantities[id] -= 1;
        } else {
          delete window.app.quantities[id];
        }
        window.updateCartCount();
        renderCartModal();
        window.store.updateAllButtons();
      });
    });
    document.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        delete window.app.quantities[id];
        window.updateCartCount();
        renderCartModal();
        window.store.updateAllButtons();
      });
    });
  }

  function updateDeliveryUI() {
    if (homeDeliveryRadio.checked) {
      deliveryFormContainer.style.display = 'block';
      deliveryFeeSpan.textContent = 'تكلفة التوصيل: +5 دينار';
      const total = calculateTotal();
      cartTotalSpan.textContent = (total + 5) + ' دينار';
    } else {
      deliveryFormContainer.style.display = 'none';
      deliveryFeeSpan.textContent = '';
      const total = calculateTotal();
      cartTotalSpan.textContent = total + ' دينار';
    }
    updateCheckoutButton();
  }

  function calculateTotal() {
    let total = 0;
    for (const [id, qty] of Object.entries(window.app.quantities)) {
      if (qty > 0) {
        let item = window.store.storeProducts.find(p => p.id == id) || window.store.subscriptions.find(s => s.id == id);
        if (item) total += item.price * qty;
      }
    }
    return total;
  }

  function updateCheckoutButton() {
    cartCheckout.disabled = !validateDeliveryForm();
  }

  function validateDeliveryForm() {
    if (homeDeliveryRadio.checked) {
      return deliveryName.value.trim() !== '' && deliveryAddress.value.trim() !== '' && deliveryPhone.value.trim() !== '';
    }
    return true;
  }

  function showCartModal() {
    if (!window.app.isLoggedIn) {
      showAuthModal();
      return;
    }
    renderCartModal();
    cartModal.classList.add('show');
  }

  function hideCartModal() {
    cartModal.classList.remove('show');
  }

  // تهيئة الأحداث
  function init() {
    // التنقل بين الأقسام
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        showSection(section + '-section');
      });
    });

    document.querySelectorAll('[data-section-link]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const section = btn.dataset.sectionLink;
        showSection(section + '-section');
      });
    });

    // مودال تسجيل الدخول
    authClose.addEventListener('click', hideAuthModal);
    window.addEventListener('click', (e) => {
      if (e.target === authModal) hideAuthModal();
    });

    // القائمة المنسدلة للحساب
    accountBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.app.isLoggedIn) {
        accountDropdown.classList.toggle('show');
      } else {
        showAuthModal();
      }
    });

    document.addEventListener('click', (e) => {
      if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
        accountDropdown.classList.remove('show');
      }
    });

    // مودال المنتج
    productModalClose.addEventListener('click', hideProductModal);
    window.addEventListener('click', (e) => {
      if (e.target === productModal) hideProductModal();
    });

    // مودال السلة
    cartBtn.addEventListener('click', showCartModal);
    cartModalClose.addEventListener('click', hideCartModal);
    window.addEventListener('click', (e) => {
      if (e.target === cartModal) hideCartModal();
    });

    // خيارات التوصيل
    storePickupRadio.addEventListener('change', () => {
      if (cartModal.classList.contains('show')) renderCartModal();
    });
    homeDeliveryRadio.addEventListener('change', () => {
      if (cartModal.classList.contains('show')) renderCartModal();
    });
    deliveryName.addEventListener('input', updateCheckoutButton);
    deliveryAddress.addEventListener('input', updateCheckoutButton);
    deliveryPhone.addEventListener('input', updateCheckoutButton);

    // زر إتمام الطلب
    cartCheckout.addEventListener('click', () => {
      if (!validateDeliveryForm()) return;
      window.app.quantities = {};
      window.updateCartCount();
      hideCartModal();
      window.store.updateAllButtons();
      alert('تم إتمام الطلب بنجاح!');
    });

    // أحداث البحث والفئات
    document.getElementById('store-search').addEventListener('input', (e) => {
      const activeCat = document.querySelector('#store-categories .category-btn.active').dataset.category;
      window.store.renderStore(activeCat, e.target.value);
    });

    document.querySelectorAll('#store-categories .category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#store-categories .category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const search = document.getElementById('store-search').value;
        window.store.renderStore(btn.dataset.category, search);
      });
    });

    document.getElementById('subs-search').addEventListener('input', (e) => {
      const activeCat = document.querySelector('#subs-categories .category-btn.active').dataset.category;
      window.store.renderSubscriptions(activeCat, e.target.value);
    });

    document.querySelectorAll('#subs-categories .category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#subs-categories .category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const search = document.getElementById('subs-search').value;
        window.store.renderSubscriptions(btn.dataset.category, search);
      });
    });

    document.getElementById('orders-search').addEventListener('input', (e) => {
      window.store.renderOrders(e.target.value);
    });
  }

  return {
    init,
    showSection,
    showAuthModal,
    hideAuthModal,
    showProductModal,
    hideProductModal,
    updateModalButton,
    showCartModal,
    hideCartModal
  };
})();
