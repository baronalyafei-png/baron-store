// js/store.js
// بيانات المنتجات والاشتراكات والطلبات (ثابتة حالياً)
window.store = (function() {
  // بيانات المنتجات (موسعة)
  const storeProducts = [
    { id: 1, name: 'آيفون 15 برو', price: 4500, category: 'new', img: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400', 
      images: ['https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg', 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg', 'https://images.pexels.com/photos/18105/pexels-photo.jpg'],
      colors: ['#000000', '#C0C0C0', '#FFD700'], sku: 'AP-001', description: 'أحدث هواتف آبل بشريحة A17 Pro، كاميرا احترافية 48MP.' },
    { id: 2, name: 'سامسونج S24 ألترا', price: 4200, category: 'new', img: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg', 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'],
      colors: ['#000000', '#F5F5F5', '#8B4513'], sku: 'SS-024', description: 'هاتف سامسونج الرائد مع قلم S Pen وكاميرا 200MP.' },
    { id: 3, name: 'ماك بوك برو M3', price: 7200, category: 'new', img: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg', 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
      colors: ['#C0C0C0'], sku: 'MBP-M3', description: 'أقوى حاسوب محمول من آبل مع معالج M3.' },
    { id: 4, name: 'آيباد برو 12.9', price: 3800, category: 'new', img: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg', 'https://images.pexels.com/photos/18105/pexels-photo.jpg'],
      colors: ['#C0C0C0', '#FFC0CB'], sku: 'IP-129', description: 'شاشة ريتنا سائلة مع دعم القلم.' },
    { id: 5, name: 'آيفون 13 برو (مستعمل)', price: 2500, category: 'used', img: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'],
      colors: ['#000000', '#C0C0C0'], sku: 'AP-013U', description: 'حالة ممتازة، بطارية 90%.' },
    { id: 6, name: 'ماك بوك آير M1 (مستعمل)', price: 3800, category: 'used', img: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg'],
      colors: ['#C0C0C0'], sku: 'MBA-M1U', description: 'خفيف وأداء رائع.' },
    { id: 7, name: 'إيربودز برو 2', price: 850, category: 'accessories', img: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg'],
      colors: ['#FFFFFF'], sku: 'AP-02', description: 'سماعات لاسلكية مع عزل الضوضاء.' },
    { id: 8, name: 'ساعة أبل واتش 9', price: 1800, category: 'accessories', img: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg'],
      colors: ['#000000', '#C0C0C0', '#FFC0CB'], sku: 'AW-09', description: 'ساعة ذكية مع ميزات صحية.' },
    { id: 9, name: 'شاحن ماج سيف', price: 220, category: 'accessories', img: 'https://images.pexels.com/photos/3651955/pexels-photo-3651955.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/3651955/pexels-photo-3651955.jpeg'],
      colors: ['#FFFFFF'], sku: 'MG-01', description: 'شاحن مغناطيسي سريع.' },
    { id: 10, name: 'سماعات سوني XM5', price: 950, category: 'audio', img: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'],
      colors: ['#000000', '#C0C0C0'], sku: 'SN-XM5', description: 'سماعات لاسلكية مع عزل ضوضاء.' }
  ];

  const subscriptions = [
    { id: 101, name: 'نتفلكس أساسي', price: 120, period: 'شهرياً', category: 'netflix', img: 'https://picsum.photos/id/40/400/300', 
      images: ['https://picsum.photos/id/40/800/600', 'https://picsum.photos/id/40/800/600'], colors: ['#E50914'], sku: 'NFLX-BASIC', description: 'باقة نتفلكس الأساسية للاستمتاع بالمحتوى بدقة HD على شاشة واحدة.', features: ['دقة HD', 'شاشة واحدة', 'مكتبة كاملة'] },
    { id: 102, name: 'نتفلكس بريميوم', price: 240, period: 'شهرياً', category: 'netflix', img: 'https://picsum.photos/id/42/400/300',
      images: ['https://picsum.photos/id/42/800/600'], colors: ['#E50914'], sku: 'NFLX-PREMIUM', description: 'باقة نتفلكس بريميوم بدقة 4K على 4 شاشات.', features: ['دقة 4K', '4 شاشات', 'صوت محيطي'] },
    { id: 103, name: 'شاهد VIP', price: 90, period: 'شهرياً', category: 'shahid', img: 'https://picsum.photos/id/43/400/300',
      images: ['https://picsum.photos/id/43/800/600'], colors: ['#00A0B0'], sku: 'SHAHID-VIP', description: 'شاهد VIP بجودة عالية بدون إعلانات.', features: ['جودة عالية', 'مسلسلات حصرية', 'بدون إعلانات'] },
    { id: 104, name: 'شاهد VIP+', price: 150, period: 'شهرياً', category: 'shahid', img: 'https://picsum.photos/id/44/400/300',
      images: ['https://picsum.photos/id/44/800/600'], colors: ['#00A0B0'], sku: 'SHAHID-PLUS', description: 'شاهد VIP+ بدقة 4K على 3 أجهزة.', features: ['دقة 4K', 'عرض على 3 أجهزة', 'محتوى أطفال'] },
    { id: 105, name: 'PS Plus Essential', price: 200, period: 'شهرياً', category: 'games', img: 'https://picsum.photos/id/45/400/300',
      images: ['https://picsum.photos/id/45/800/600'], colors: ['#003791'], sku: 'PS-ESS', description: 'اشتراك PlayStation Plus Essential مع ألعاب شهرية.', features: ['ألعاب شهرية', 'تخزين سحابي', 'خصومات'] },
    { id: 106, name: 'Xbox Game Pass', price: 180, period: 'شهرياً', category: 'games', img: 'https://picsum.photos/id/46/400/300',
      images: ['https://picsum.photos/id/46/800/600'], colors: ['#107C10'], sku: 'XBOX-GP', description: 'Xbox Game Pass مكتبة ضخمة من الألعاب.', features: ['مكتبة ضخمة', 'EA Play', 'ألعاب يوم1'] },
    { id: 107, name: 'Adobe CC', price: 350, period: 'شهرياً', category: 'software', img: 'https://picsum.photos/id/47/400/300',
      images: ['https://picsum.photos/id/47/800/600'], colors: ['#FF0000'], sku: 'ADOBE-CC', description: 'جميع تطبيقات Adobe الإبداعية.', features: ['Photoshop, Premiere', '100GB تخزين'] },
    { id: 108, name: 'شحن جوجل بلاي', price: 50, period: 'مرة واحدة', category: 'software', img: 'https://picsum.photos/id/48/400/300',
      images: ['https://picsum.photos/id/48/800/600'], colors: ['#4285F4'], sku: 'GOOGLE-PLAY', description: 'شحن رصيد Google Play بقيمة 50 دينار.', features: ['شحن فوري', 'لجميع الألعاب'] }
  ];

  const orders = [
    { id: 'ORD-001', date: '2025-02-15', status: 'active', total: 330, items: ['نتفلكس بريميوم', 'شاهد VIP'] },
    { id: 'ORD-002', date: '2025-02-10', status: 'completed', total: 200, items: ['PS Plus'] },
    { id: 'ORD-003', date: '2025-02-05', status: 'active', total: 230, items: ['Xbox Game Pass', 'شحن جوجل بلاي'] },
    { id: 'ORD-004', date: '2025-01-28', status: 'completed', total: 650, items: ['آيفون 13 برو'] },
  ];

  // إنشاء بطاقة منتج (للمتجر)
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    const qty = window.app.quantities[product.id];
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="content">
        <h3>${product.name}</h3>
        <div class="price">${product.price} دينار</div>
        <button class="btn ${qty ? 'remove' : 'add'}" data-id="${product.id}">
          ${qty ? '<i class="fas fa-trash-alt"></i> حذف' : '<i class="fas fa-cart-plus"></i> إضافة'}
        </button>
      </div>
    `;
    // فتح التفاصيل عند النقر على البطاقة (عدا الزر)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return;
      if (!window.app.isLoggedIn) {
        window.ui.showAuthModal();
        return;
      }
      window.ui.showProductModal(product, 'product');
    });
    // زر الإضافة/الحذف
    card.querySelector('.btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!window.app.isLoggedIn) {
        window.ui.showAuthModal();
        return;
      }
      toggleProduct(product.id);
    });
    return card;
  }

  // إنشاء بطاقة اشتراك
  function createSubscriptionCard(sub) {
    const card = document.createElement('div');
    card.className = 'sub-card';
    card.dataset.id = sub.id;
    const qty = window.app.quantities[sub.id];
    card.innerHTML = `
      <img src="${sub.img}" alt="${sub.name}">
      <div class="content">
        <h3>${sub.name}</h3>
        <div class="price">${sub.price} دينار</div>
        <div class="period">${sub.period}</div>
        <button class="btn ${qty ? 'remove' : 'add'}" data-id="${sub.id}">
          ${qty ? '<i class="fas fa-trash-alt"></i> حذف' : '<i class="fas fa-cart-plus"></i> إضافة'}
        </button>
      </div>
    `;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return;
      if (!window.app.isLoggedIn) {
        window.ui.showAuthModal();
        return;
      }
      window.ui.showProductModal(sub, 'subscription');
    });
    card.querySelector('.btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!window.app.isLoggedIn) {
        window.ui.showAuthModal();
        return;
      }
      toggleProduct(sub.id);
    });
    return card;
  }

  // تبديل حالة المنتج (إضافة/حذف)
  function toggleProduct(id) {
    if (window.app.quantities[id]) {
      delete window.app.quantities[id];
    } else {
      window.app.quantities[id] = 1;
    }
    window.updateCartCount();
    // تحديث أزرار جميع البطاقات
    updateAllButtons();
  }

  // تحديث أزرار المنتجات حسب حالة السلة
  function updateAllButtons() {
    document.querySelectorAll('.product-card, .sub-card').forEach(card => {
      const id = card.dataset.id;
      if (!id) return;
      const btn = card.querySelector('.btn');
      if (window.app.quantities[id]) {
        btn.classList.remove('add');
        btn.classList.add('remove');
        btn.innerHTML = '<i class="fas fa-trash-alt"></i> حذف';
      } else {
        btn.classList.remove('remove');
        btn.classList.add('add');
        btn.innerHTML = '<i class="fas fa-cart-plus"></i> إضافة';
      }
    });
    if (window.app.currentModalProduct) {
      window.ui.updateModalButton();
    }
  }

  // عرض المتجر
  function renderStore(category = 'all', search = '') {
    const storeDiv = document.getElementById('store-products');
    storeDiv.innerHTML = '';
    let filtered = storeProducts.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (search && !p.name.includes(search)) return false;
      return true;
    });
    if (filtered.length === 0) {
      storeDiv.innerHTML = '<div class="no-results">لا توجد منتجات</div>';
      return;
    }
    filtered.forEach(p => storeDiv.appendChild(createProductCard(p)));
  }

  // عرض الاشتراكات
  function renderSubscriptions(category = 'all', search = '') {
    const subsDiv = document.getElementById('subscriptions-products');
    subsDiv.innerHTML = '';
    let filtered = subscriptions.filter(s => {
      if (category !== 'all' && s.category !== category) return false;
      if (search && !s.name.includes(search)) return false;
      return true;
    });
    if (filtered.length === 0) {
      subsDiv.innerHTML = '<div class="no-results">لا توجد اشتراكات</div>';
      return;
    }
    filtered.forEach(s => subsDiv.appendChild(createSubscriptionCard(s)));
  }

  // عرض الطلبات
  function renderOrders(search = '') {
    const ordersDiv = document.getElementById('orders-list');
    ordersDiv.innerHTML = '';
    let filtered = orders.filter(o => {
      if (search && !o.id.includes(search) && !o.items.join('').includes(search)) return false;
      return true;
    });
    if (filtered.length === 0) {
      ordersDiv.innerHTML = '<div class="no-results">لا توجد طلبات</div>';
      return;
    }
    filtered.forEach(o => {
      const card = document.createElement('div');
      card.className = 'order-card';
      card.innerHTML = `
        <div class="order-header">
          <div class="order-icon"><i class="fas fa-file-invoice"></i></div>
          <div class="order-info">
            <h3>طلب #${o.id}</h3>
            <div class="order-date"><i class="far fa-calendar-alt"></i> ${new Date(o.date).toLocaleDateString('ar-SA')}</div>
          </div>
        </div>
        <div class="order-body">
          <p>المنتجات: ${o.items.join('، ')}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
            <span class="order-total">${o.total} دينار</span>
            <span class="order-status ${o.status === 'active' ? 'status-pending' : 'status-completed'}">
              ${o.status === 'active' ? 'قيد التنفيذ' : 'مكتمل'}
            </span>
          </div>
        </div>
      `;
      ordersDiv.appendChild(card);
    });
  }

  return {
    storeProducts,
    subscriptions,
    orders,
    createProductCard,
    createSubscriptionCard,
    toggleProduct,
    updateAllButtons,
    renderStore,
    renderSubscriptions,
    renderOrders
  };
})();
