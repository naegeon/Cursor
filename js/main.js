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
                // 무료 상담 신청 폼인 경우 (contact-form)
                if (formId === 'contact-form') {
                    // 폼 데이터 수집
                    const name = document.getElementById('name').value;
                    const phone = document.getElementById('phone').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;
                    
                    // 이미지 데이터 수집 (미리보기 이미지)
                    const previewContainer = document.getElementById('image-preview');
                    const images = [];
                    
                    if (previewContainer) {
                        const previewImages = previewContainer.querySelectorAll('img');
                        previewImages.forEach(img => {
                            images.push(img.src);
                        });
                    }
                    
                    // 상담 신청 객체 생성
                    const inquiry = {
                        id: 'inq_' + Date.now(),
                        date: new Date().toISOString(),
                        name: name,
                        phone: phone,
                        subject: subject,
                        message: message,
                        status: 'new',
                        images: images,
                        response: ''
                    };
                    
                    // localStorage에 상담 신청 저장
                    saveInquiry(inquiry);
                    
                    console.log('상담 신청이 저장되었습니다:', inquiry);
                }
                
                // 성공 메시지 표시
                if (successMsg) {
                    successMsg.style.display = 'block';
                    form.reset();
                    
                    // 이미지 미리보기 초기화
                    const previewContainer = document.getElementById('image-preview');
                    if (previewContainer) {
                        previewContainer.innerHTML = '';
                    }
                    
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
});

// 상담 신청 저장 함수
function saveInquiry(inquiry) {
    // localStorage에서 기존 상담 신청 목록 가져오기
    let inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    
    // 새 상담 신청 추가
    inquiries.push(inquiry);
    
    // localStorage에 저장
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    
    // 콘솔에 로그 출력
    console.log('======= 상담 신청이 저장되었습니다 =======');
    console.log('이름:', inquiry.name);
    console.log('연락처:', inquiry.phone);
    console.log('제목:', inquiry.subject);
    console.log('내용:', inquiry.message);
    console.log('상담 신청 시간:', new Date(inquiry.date).toLocaleString());
    console.log('현재 총 상담 신청 수:', inquiries.length);
} 