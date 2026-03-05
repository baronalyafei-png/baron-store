// js/auth.js
// وظائف تسجيل الدخول وإنشاء الحساب وتسجيل الخروج
window.auth = (function() {
  // الحالة
  let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // عناصر واجهة المستخدم
  const userNameSpan = document.getElementById('userName');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // تحديث واجهة المستخدم حسب حالة تسجيل الدخول
  function updateUI() {
    if (isLoggedIn) {
      userNameSpan.textContent = 'مستخدم 1';
      logoutBtn.style.display = 'block';
    } else {
      userNameSpan.textContent = 'زائر';
      logoutBtn.style.display = 'none';
    }
    // تحديث المتغير العام
    window.app.isLoggedIn = isLoggedIn;
  }
  
  // تسجيل الدخول (محاكاة)
  function login(email, password) {
    // هنا سنقوم بالتحقق من Firebase لاحقاً
    console.log('تسجيل الدخول', email, password);
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    updateUI();
    return Promise.resolve();
  }
  
  // إنشاء حساب
  function register(name, email, password) {
    console.log('إنشاء حساب', name, email, password);
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    updateUI();
    return Promise.resolve();
  }
  
  // تسجيل الخروج
  function logout() {
    console.log('تسجيل الخروج');
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    updateUI();
  }
  
  // تهيئة
  function init() {
    updateUI();
    
    // ربط الأحداث
    document.getElementById('loginBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      login(email, password).then(() => {
        // إغلاق المودال
        document.getElementById('authModal').classList.remove('show');
      });
    });
    
    document.getElementById('registerBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      register(name, email, password).then(() => {
        document.getElementById('authModal').classList.remove('show');
      });
    });
    
    logoutBtn.addEventListener('click', logout);
  }
  
  return {
    init,
    login,
    register,
    logout,
    isLoggedIn: () => isLoggedIn
  };
})();
