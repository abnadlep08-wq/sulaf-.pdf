// بيانات وهمية للروايات
const booksData = [
    {
        id: 1,
        title: "ساحر القصر المفقود",
        author: "أحمد العتيبي",
        rating: 4.8,
        downloads: 12543,
        pages: 320,
        category: "سحر وشعوذة",
        color: "#6C63FF"
    },
    {
        id: 2,
        title: "فارس الظلال",
        author: "سارة القحطاني",
        rating: 4.6,
        downloads: 9872,
        pages: 285,
        category: "فانتازيا قتالية",
        color: "#FF6584"
    },
    {
        id: 3,
        title: "ملكة الكنوز القديمة",
        author: "محمد الشمري",
        rating: 4.9,
        downloads: 15678,
        pages: 412,
        category: "فانتازيا ملحمية",
        color: "#36D1DC"
    },
    {
        id: 4,
        title: "عوالم متقاطعة",
        author: "فاطمة الزهراني",
        rating: 4.5,
        downloads: 8321,
        pages: 356,
        category: "عوالم بديلة",
        color: "#FFB347"
    },
    {
        id: 5,
        title: "وريث العرش المظلم",
        author: "خالد الحربي",
        rating: 4.7,
        downloads: 11234,
        pages: 398,
        category: "فانتازيا ملحمية",
        color: "#C471ED"
    },
    {
        id: 6,
        title: "أسرار الغابة المسحورة",
        author: "نورة السعد",
        rating: 4.4,
        downloads: 7654,
        pages: 267,
        category: "سحر وشعوذة",
        color: "#4CAF50"
    }
];

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عرض الروايات المميزة
    displayFeaturedBooks();
    
    // إعداد أحداث القائمة الجانبية للجوال
    setupMobileMenu();
    
    // إعداد أحداث البحث
    setupSearch();
    
    // إعداد نافذة المصادقة
    setupAuthModal();
    
    // إعداد أحداث التنزيل
    setupDownloadButtons();
    
    // إعداد رسالة ترحيب
    showWelcomeMessage();
});

// دالة عرض الروايات المميزة
function displayFeaturedBooks() {
    const booksGrid = document.querySelector('.books-grid');
    if (!booksGrid) return;
    
    booksGrid.innerHTML = '';
    
    booksData.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover" style="background-color: ${book.color}20">
                <i class="fas fa-book"></i>
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <div class="book-author">
                    <i class="fas fa-user-pen"></i>
                    ${book.author}
                </div>
                <div class="book-stats">
                    <span><i class="fas fa-star"></i> ${book.rating}</span>
                    <span><i class="fas fa-download"></i> ${formatNumber(book.downloads)}</span>
                    <span><i class="fas fa-file"></i> ${book.pages}</span>
                </div>
                <div class="book-actions">
                    <button class="btn-read" data-id="${book.id}">
                        <i class="fas fa-book-open"></i> قراءة
                    </button>
                    <button class="btn-download" data-id="${book.id}">
                        <i class="fas fa-download"></i> تحميل
                    </button>
                </div>
            </div>
        `;
        
        booksGrid.appendChild(bookCard);
    });
}

// دالة تنسيق الأرقام
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// إعداد القائمة الجانبية للجوال
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('open');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
        });
    }
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('open');
        }
    });
}

// إعداد وظيفة البحث
function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // في التطبيق الحقيقي، هنا سيتم إرسال طلب إلى الخادم
        alert(`سيتم البحث عن: "${query}"\n\nفي التطبيق الكامل، سيتم عرض نتائج البحث هنا.`);
        // إعادة توجيه إلى صفحة البحث مع الاستعلام
        // window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
    } else {
        alert('يرجى إدخال نص للبحث');
        searchInput.focus();
    }
}

// إعداد نافذة المصادقة
function setupAuthModal() {
    const authModal = document.getElementById('authModal');
    const closeAuth = document.getElementById('closeAuth');
    
    // عرض نافذة المصادقة بعد 5 ثواني من تحميل الصفحة
    setTimeout(() => {
        // التحقق مما إذا كان المستخدم قد سجل دخوله بالفعل
        const isLoggedIn = localStorage.getItem('sulaf_user_logged_in');
        if (!isLoggedIn && authModal) {
            authModal.classList.add('show');
        }
    }, 5000);
    
    if (closeAuth) {
        closeAuth.addEventListener('click', function() {
            authModal.classList.remove('show');
        });
    }
    
    // إغلاق النافذة عند النقر خارجها
    if (authModal) {
        authModal.addEventListener('click', function(event) {
            if (event.target === authModal) {
                authModal.classList.remove('show');
            }
        });
    }
}

// إعداد أحداث أزرار التنزيل
function setupDownloadButtons() {
    // نستخدم تفويض الأحداث لأن الأزرار قد يتم إنشاؤها ديناميكيًا
    document.addEventListener('click', function(event) {
        // زر التحميل
        if (event.target.classList.contains('btn-download') || 
            event.target.closest('.btn-download')) {
            const button = event.target.classList.contains('btn-download') ? 
                event.target : event.target.closest('.btn-download');
            const bookId = button.getAttribute('data-id');
            downloadBook(bookId);
        }
        
        // زر القراءة
        if (event.target.classList.contains('btn-read') || 
            event.target.closest('.btn-read')) {
            const button = event.target.classList.contains('btn-read') ? 
                event.target : event.target.closest('.btn-read');
            const bookId = button.getAttribute('data-id');
            readBook(bookId);
        }
        
        // بطاقات الفئات
        if (event.target.closest('.category-card')) {
            const categoryCard = event.target.closest('.category-card');
            const categoryName = categoryCard.querySelector('h3').textContent;
            browseCategory(categoryName);
        }
        
        // بطاقات الكتب
        if (event.target.closest('.book-card') && !event.target.closest('.book-actions')) {
            const bookCard = event.target.closest('.book-card');
            const bookTitle = bookCard.querySelector('h3').textContent;
            viewBookDetails(bookTitle);
        }
    });
}

// دالة محاكاة تنزيل الكتاب
function downloadBook(bookId) {
    const book = booksData.find(b => b.id == bookId);
    if (!book) return;
    
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const isLoggedIn = localStorage.getItem('sulaf_user_logged_in');
    
    if (!isLoggedIn) {
        // إذا لم يكن مسجلاً، عرض نافذة المصادقة
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.classList.add('show');
        }
        alert('يجب تسجيل الدخول لتنزيل الروايات');
        return;
    }
    
    // محاكاة عملية التنزيل
    const downloadBtn = document.querySelector(`.btn-download[data-id="${bookId}"]`);
    if (downloadBtn) {
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        downloadBtn.disabled = true;
        
        // محاكاة تأخير التنزيل
        setTimeout(() => {
            // زيادة عدد التنزيلات
            book.downloads += 1;
            
            // عرض رسالة نجاح
            alert(`تم تحميل "${book.title}" بنجاح!\n\nسيتم حفظ الملف (${book.title}.pdf) في مجلد التنزيلات.`);
            
            // إعادة تعيين الزر
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            
            // تحديث عرض عدد التنزيلات
            const downloadCountElement = downloadBtn.closest('.book-card').querySelector('.book-stats span:nth-child(2)');
            if (downloadCountElement) {
                downloadCountElement.innerHTML = `<i class="fas fa-download"></i> ${formatNumber(book.downloads)}`;
            }
            
            // تسجيل التنزيل في localStorage
            const downloads = JSON.parse(localStorage.getItem('sulaf_downloads') || '[]');
            downloads.push({
                bookId: book.id,
                title: book.title,
                date: new Date().toISOString()
            });
            localStorage.setItem('sulaf_downloads', JSON.stringify(downloads));
            
        }, 1500);
    }
}

// دالة محاكاة قراءة الكتاب
function readBook(bookId) {
    const book = booksData.find(b => b.id == bookId);
    if (!book) return;
    
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const isLoggedIn = localStorage.getItem('sulaf_user_logged_in');
    
    if (!isLoggedIn) {
        // إذا لم يكن مسجلاً، عرض نافذة المصادقة
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.classList.add('show');
        }
        alert('يجب تسجيل الدخول لقراءة الروايات');
        return;
    }
    
    alert(`سيتم فتح قارئ الكتب لقراءة "${book.title}"\n\nفي التطبيق الكامل، سيتم فتح صفحة القراءة مع خيارات التمرير والإشارات المرجعية.`);
    
    // يمكن هنا توجيه المستخدم إلى صفحة القراءة
    // window.location.href = `pages/reader.html?book=${bookId}`;
}

// دالة استعراض الفئة
function browseCategory(categoryName) {
    alert(`سيتم عرض جميع روايات فئة "${categoryName}"\n\nفي التطبيق الكامل، سيتم توجيهك إلى صفحة الفئة مع قائمة بالروايات.`);
    
    // يمكن هنا توجيه المستخدم إلى صفحة الفئة
    // window.location.href = `pages/category.html?name=${encodeURIComponent(categoryName)}`;
}

// دالة عرض تفاصيل الكتاب
function viewBookDetails(bookTitle) {
    alert(`سيتم عرض تفاصيل الرواية "${bookTitle}"\n\nفي التطبيق الكامل، سيتم توجيهك إلى صفحة تفاصيل الكتاب مع وصف كامل ومراجعات.`);
    
    // يمكن هنا توجيه المستخدم إلى صفحة تفاصيل الكتاب
    // window.location.href = `pages/book-details.html?title=${encodeURIComponent(bookTitle)}`;
}

// دالة عرض رسالة ترحيب
function showWelcomeMessage() {
    // التحقق مما إذا كانت هذه أول زيارة للمستخدم
    const hasVisited = localStorage.getItem('sulaf_has_visited');
    
    if (!hasVisited) {
        setTimeout(() => {
            alert('مرحباً بك في Sulaf.PDF!\n\nأكبر مكتبة عربية لروايات الفانتازيا. استمتع بالقراءة والتنزيل مجاناً.');
            localStorage.setItem('sulaf_has_visited', 'true');
        }, 1000);
    }
}

// دالة تسجيل الدخول (ستستخدم من صفحة تسجيل الدخول)
function loginUser(email, password) {
    // في التطبيق الحقيقي، هنا سيتم إرسال طلب إلى الخادم للتحقق من بيانات الدخول
    // هذه محاكاة فقط
    
    if (email && password) {
        // حفظ حالة تسجيل الدخول
        localStorage.setItem('sulaf_user_logged_in', 'true');
        localStorage.setItem('sulaf_user_email', email);
        
        // عرض رسالة نجاح
        alert('تم تسجيل الدخول بنجاح!');
        
        // إعادة التوجيه إلى الصفحة الرئيسية
        window.location.href = '../index.html';
        
        return true;
    }
    
    return false;
}

// دالة تسجيل مستخدم جديد
function registerUser(name, email, password) {
    // في التطبيق الحقيقي، هنا سيتم إرسال طلب إلى الخادم لتسجيل المستخدم
    // هذه محاكاة فقط
    
    if (name && email && password) {
        // حفظ بيانات المستخدم
        const userData = {
            name: name,
            email: email,
            joined: new Date().toISOString()
        };
        
        localStorage.setItem('sulaf_user_data', JSON.stringify(userData));
        localStorage.setItem('sulaf_user_logged_in', 'true');
        localStorage.setItem('sulaf_user_email', email);
        
        // عرض رسالة نجاح
        alert(`مرحباً ${name}!\nتم إنشاء حسابك بنجاح.`);
        
        // إعادة التوجيه إلى الصفحة الرئيسية
        window.location.href = '../index.html';
        
        return true;
    }
    
    return false;
}

// دالة تسجيل الخروج
function logoutUser() {
    localStorage.removeItem('sulaf_user_logged_in');
    localStorage.removeItem('sulaf_user_email');
    
    alert('تم تسجيل الخروج بنجاح.');
    window.location.href = '../index.html';
}
