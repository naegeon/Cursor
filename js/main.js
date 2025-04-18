// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navList.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (navList.classList.contains('active') && !isClickInsideNav && !isClickOnMenuBtn) {
            navList.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });
});

// Scroll to top button
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

// Form validation
const validateForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return true;

    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
};

// Handle form submission
const handleFormSubmit = (formId, successMsgId) => {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successMsgId);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(formId)) {
                // Here you would normally send the form data via AJAX
                // For demonstration, we'll just show the success message
                if (successMsg) {
                    successMsg.style.display = 'block';
                    form.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
};

// Initialize form handlers
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmit('contact-form', 'form-success');
    
    // Input event listeners for validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    if (this.value.trim()) {
                        this.classList.remove('error');
                    }
                }
            });
        });
    });
});

// Main JS

document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 탑 버튼
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // 문의하기 폼 제출 처리
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 이미지 처리
            const imagePreview = document.getElementById('image-preview');
            const images = [];
            
            if (imagePreview && imagePreview.querySelectorAll('.preview-image')) {
                imagePreview.querySelectorAll('.preview-image').forEach(img => {
                    images.push(img.src);
                });
            }
            
            // 문의 객체 생성
            const inquiry = {
                id: 'inq_' + Date.now(),
                date: new Date().toISOString().slice(0, 10),
                name: name,
                phone: phone,
                title: subject,
                content: message,
                status: 'new',
                images: images,
                response: ''
            };
            
            // localStorage에 저장
            let inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
            inquiries.push(inquiry);
            localStorage.setItem('inquiries', JSON.stringify(inquiries));
            
            // 폼 초기화 및 성공 메시지 표시
            contactForm.reset();
            document.getElementById('image-preview').innerHTML = '';
            document.getElementById('form-success').style.display = 'block';
            
            // 성공 메시지 5초 후 숨김
            setTimeout(function() {
                document.getElementById('form-success').style.display = 'none';
            }, 5000);
        });
    }
}); 