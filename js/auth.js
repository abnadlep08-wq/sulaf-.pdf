// تهيئة صفحة المصادقة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق مما إذا كان المستخدم مسجل الدخول بالفعل
    checkLoginStatus();
    
    // إعداد أحداث صفحة تسجيل الدخول
    if (document.getElementById('loginForm')) {
        setupLoginForm();
    }
    
    // إعداد أحداث صفحة التسجيل
    if (document.getElementById('registerForm')) {
        setupRegisterForm();
    }
    
    // إعداد زر عرض/إخفاء كلمة المرور
    setupPasswordToggle();
});

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('sulaf_user_logged_in');
    
    // إذا كان المستخدم مسجلاً الدخول وكان في صفحة تسجيل الدخول أو التسجيل
    // يتم توجيهه إلى الصفحة الرئيسية
    if (isLoggedIn && (window.location.pathname.includes('login.html') || 
                       window.location.pathname.includes('register.html'))) {
        window.location.href = '../index.html';
    }
}

// إعداد نموذج تسجيل الدخول
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const remember = document.getElementById('remember').checked;
        
        // التحقق من صحة الإدخال
        if (!validateEmail(email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        if (password.length < 6) {
            alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            return;
        }
        
        // محاكاة تسجيل الدخول
        const loginSuccess = loginUser(email, password);
        
        if (loginSuccess) {
            // حفظ تفضيل "تذكرني"
            if (remember) {
                localStorage.setItem('sulaf_remember_me', 'true');
            }
            
            // في التطبيق الحقيقي، هنا سيتم توجيه المستخدم تلقائياً
        } else {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
    });
}

// إعداد نموذج التسجيل
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        
        // التحقق من صحة الإدخال
        if (name.length < 3) {
            alert('الاسم يجب أن يكون 3 أحرف على الأقل');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        if (password.length < 6) {
            alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('كلمتا المرور غير متطابقتين');
            return;
        }
        
        // محاكاة التسجيل
        const registerSuccess = registerUser(name, email, password);
        
        if (registerSuccess) {
            // في التطبيق الحقيقي، هنا سيتم توجيه المستخدم تلقائياً
        } else {
            alert('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
        }
    });
}

// إعداد زر عرض/إخفاء كلمة المرور
function setupPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // تغيير الأيقونة
            const icon = togglePassword.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
}

// دالة التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
