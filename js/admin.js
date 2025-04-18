// 관리자 인증 확인
function checkAdminAuth() {
    const isAdmin = localStorage.getItem('adminLoggedIn');
    if (!isAdmin && !window.location.href.includes('admin-login.html')) {
        window.location.href = 'admin-login.html';
    }
}

// 문서 로드 시 관리자 인증 확인
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in as admin
    checkAdminAuth();
    
    // Initialize sidebar toggle
    initSidebar();
    
    // Initialize logout functionality
    initLogout();
    
    // Initialize blog management if on blog page
    if (document.querySelector('.blog-management')) {
        initBlogManagement();
    }
    
    // Initialize blog category management if on category page
    if (document.querySelector('.blog-category-management')) {
        initBlogCategoryManagement();
    }
    
    // Initialize QnA category management if on QnA category page
    if (document.querySelector('.qna-category-management')) {
        initQnACategoryManagement();
    }
    
    // Initialize inquiry management if on inquiry page
    if (document.querySelector('.inquiry-management')) {
        loadInquiries();
    }
    
    // Initialize contact form submission if on contact page
    if (document.getElementById('contact-form')) {
        initContactForm();
    }
});

function initSidebar() {
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    if (toggleButton && sidebar && mainContent) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
}

function initLogout() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'admin-login.html';
        });
    }
}

// 블로그 관리 초기화
function initBlogManagement() {
    // Blog post form submission
    const blogForm = document.getElementById('blog-form');
    if (blogForm) {
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('blog-title').value;
            if (title.trim() !== '') {
                alert('블로그 포스트 "' + title + '"가 저장되었습니다.');
                blogForm.reset();
            }
        });
    }
    
    // Edit buttons for blog posts
    const editButtons = document.querySelectorAll('.edit-btn');
    if (editButtons) {
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const title = row.cells[0].textContent;
                // Here you would typically populate the form with the post data
                alert(title + ' 편집 기능 구현 예정');
            });
        });
    }
    
    // Delete buttons for blog posts
    const deleteButtons = document.querySelectorAll('.delete-btn');
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const title = row.cells[0].textContent;
                if (confirm(title + '을(를) 삭제하시겠습니까?')) {
                    row.remove();
                }
            });
        });
    }
    
    // View buttons for blog posts
    const viewButtons = document.querySelectorAll('.view-btn');
    if (viewButtons) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const title = row.cells[0].textContent;
                alert(title + ' 보기 기능 구현 예정');
            });
        });
    }
}

// 카테고리 관리 초기화
function initBlogCategoryManagement() {
    // Category form submission
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const categoryName = document.getElementById('category-name').value;
            if (categoryName.trim() !== '') {
                alert('카테고리 "' + categoryName + '"가 추가되었습니다.');
                categoryForm.reset();
            }
        });
    }
    
    // Tag form submission
    const tagForm = document.getElementById('tag-form');
    if (tagForm) {
        tagForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const tagName = document.getElementById('tag-name').value;
            if (tagName.trim() !== '') {
                alert('태그 "' + tagName + '"가 추가되었습니다.');
                tagForm.reset();
                
                // Add tag to the tag cloud (optional)
                const tagCloud = document.querySelector('.tag-cloud');
                if (tagCloud) {
                    const tagItem = document.createElement('span');
                    tagItem.className = 'tag-item';
                    tagItem.innerHTML = tagName + ' <a href="#" class="delete-tag">×</a>';
                    tagCloud.appendChild(tagItem);
                    
                    // Add delete event to the new tag
                    const deleteTag = tagItem.querySelector('.delete-tag');
                    deleteTag.addEventListener('click', function() {
                        if (confirm('태그 "' + tagName + '"을(를) 삭제하시겠습니까?')) {
                            tagItem.remove();
                        }
                    });
                }
            }
        });
    }
    
    // Edit buttons for categories
    const editButtons = document.querySelectorAll('.edit-btn');
    if (editButtons) {
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const name = row.cells[0].textContent;
                alert(name + ' 편집 기능 구현 예정');
            });
        });
    }
    
    // Delete buttons for categories
    const deleteButtons = document.querySelectorAll('.delete-btn');
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const name = row.cells[0].textContent;
                if (confirm(name + '을(를) 삭제하시겠습니까?')) {
                    row.remove();
                }
            });
        });
    }
    
    // Tag delete in cloud
    const deleteTagButtons = document.querySelectorAll('.delete-tag');
    if (deleteTagButtons) {
        deleteTagButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tagItem = this.closest('.tag-item');
                const tagName = tagItem.textContent.split(' ')[0];
                if (confirm('태그 "' + tagName + '"을(를) 삭제하시겠습니까?')) {
                    tagItem.remove();
                }
            });
        });
    }
}

// Q&A 관리 초기화
function initQnACategoryManagement() {
    // Category form submission
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const categoryName = document.getElementById('category-name').value;
            if (categoryName.trim() !== '') {
                alert('카테고리 "' + categoryName + '"가 추가되었습니다.');
                categoryForm.reset();
                
                // Add category to the table (optional)
                const categoryTable = document.querySelector('.category-table tbody');
                if (categoryTable) {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${categoryName}</td>
                        <td>${document.getElementById('category-desc').value || '설명 없음'}</td>
                        <td>${document.getElementById('category-icon').value || '아이콘 없음'}</td>
                        <td class="actions">
                            <button class="btn edit-btn">편집</button>
                            <button class="btn delete-btn">삭제</button>
                        </td>
                    `;
                    categoryTable.appendChild(newRow);
                    
                    // Add event listeners to new buttons
                    const newEditBtn = newRow.querySelector('.edit-btn');
                    const newDeleteBtn = newRow.querySelector('.delete-btn');
                    
                    newEditBtn.addEventListener('click', function() {
                        alert(categoryName + ' 편집 기능 구현 예정');
                    });
                    
                    newDeleteBtn.addEventListener('click', function() {
                        if (confirm(categoryName + '을(를) 삭제하시겠습니까?')) {
                            newRow.remove();
                        }
                    });
                }
            }
        });
    }
    
    // Tag form submission
    const tagForm = document.getElementById('tag-form');
    if (tagForm) {
        tagForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const tagName = document.getElementById('tag-name').value;
            if (tagName.trim() !== '') {
                alert('태그 "' + tagName + '"가 추가되었습니다.');
                tagForm.reset();
                
                // Add tag to the tag cloud (optional)
                const tagCloud = document.querySelector('.tag-cloud');
                if (tagCloud) {
                    const tagItem = document.createElement('span');
                    tagItem.className = 'tag-item';
                    tagItem.innerHTML = tagName + ' <a href="#" class="delete-tag">×</a>';
                    tagCloud.appendChild(tagItem);
                    
                    // Add delete event to the new tag
                    const deleteTag = tagItem.querySelector('.delete-tag');
                    deleteTag.addEventListener('click', function() {
                        if (confirm('태그 "' + tagName + '"을(를) 삭제하시겠습니까?')) {
                            tagItem.remove();
                        }
                    });
                }
            }
        });
    }
    
    // Edit buttons for categories
    const editButtons = document.querySelectorAll('.edit-btn');
    if (editButtons) {
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const name = row.cells[0].textContent;
                alert(name + ' 편집 기능 구현 예정');
            });
        });
    }
    
    // Delete buttons for categories
    const deleteButtons = document.querySelectorAll('.delete-btn');
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const name = row.cells[0].textContent;
                if (confirm(name + '을(를) 삭제하시겠습니까?')) {
                    row.remove();
                }
            });
        });
    }
    
    // Tag delete in cloud
    const deleteTagButtons = document.querySelectorAll('.delete-tag');
    if (deleteTagButtons) {
        deleteTagButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tagItem = this.closest('.tag-item');
                const tagName = tagItem.textContent.split(' ')[0];
                if (confirm('태그 "' + tagName + '"을(를) 삭제하시겠습니까?')) {
                    tagItem.remove();
                }
            });
        });
    }
}

// 블로그 포스트 저장 함수
function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(post);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// 블로그 포스트 불러오기 함수
function loadPosts() {
    const blogTable = document.querySelector('.blog-table tbody');
    if (!blogTable) return;
    
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    // 테이블 초기화
    blogTable.innerHTML = '';
    
    // 포스트가 없는 경우
    if (posts.length === 0) {
        blogTable.innerHTML = '<tr><td colspan="6" class="text-center">등록된, 블로그 글이 없습니다.</td></tr>';
        return;
    }
    
    // 포스트 목록 표시
    posts.forEach((post, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${posts.length - index}</td>
            <td>${post.title}</td>
            <td>${post.category}</td>
            <td>${post.date}</td>
            <td><span class="status-badge status-${post.status.toLowerCase()}">${post.status}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view-btn" data-id="${post.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" data-id="${post.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${post.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        blogTable.appendChild(row);
    });
    
    // 버튼 이벤트 연결
    attachPostButtonEvents();
}

// 블로그 포스트 버튼 이벤트 연결
function attachPostButtonEvents() {
    // 보기 버튼
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            viewPost(postId);
        });
    });
    
    // 수정 버튼
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            editPost(postId);
        });
    });
    
    // 삭제 버튼
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
                deletePost(postId);
            }
        });
    });
}

// 포스트 보기 함수
function viewPost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id == postId);
    
    if (post) {
        // 실제 구현에서는 상세 페이지로 이동하거나 모달창 표시
        alert(`제목: ${post.title}\n카테고리: ${post.category}\n내용: ${post.content}`);
    }
}

// 포스트 수정 함수
function editPost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id == postId);
    
    if (post) {
        // 실제 구현에서는 수정 폼으로 이동하거나 모달창 표시
        if (document.getElementById('blog-form')) {
            document.getElementById('blog-title').value = post.title;
            document.getElementById('blog-category').value = post.category;
            document.getElementById('blog-content').value = post.content;
            document.getElementById('blog-tags').value = post.tags || '';
            
            // 수정 중인 포스트 ID 저장
            document.getElementById('blog-form').setAttribute('data-edit-id', postId);
            
            // 버튼 텍스트 변경
            const submitBtn = document.querySelector('#blog-form button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = '수정하기';
            }
            
            // 폼으로 스크롤
            document.getElementById('blog-form').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// 포스트 삭제 함수
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts = posts.filter(p => p.id != postId);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    // 목록 새로고침
    loadPosts();
}

// 카테고리 저장 함수
function saveCategory(category) {
    let categories = JSON.parse(localStorage.getItem('blogCategories')) || [];
    categories.push(category);
    localStorage.setItem('blogCategories', JSON.stringify(categories));
}

// 카테고리 불러오기 함수
function loadCategories() {
    const categoryTable = document.querySelector('.category-table tbody');
    if (!categoryTable) return;
    
    const categories = JSON.parse(localStorage.getItem('blogCategories')) || [];
    
    // 테이블 초기화
    categoryTable.innerHTML = '';
    
    // 카테고리가 없는 경우
    if (categories.length === 0) {
        categoryTable.innerHTML = '<tr><td colspan="3" class="text-center">등록된 카테고리가 없습니다.</td></tr>';
        return;
    }
    
    // 카테고리 목록 표시
    categories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.name}</td>
            <td><span class="category-count">${category.count}</span></td>
            <td>
                <div class="table-actions">
                    <div class="action-icon edit-btn" data-id="${category.id}">
                        <i class="fas fa-edit"></i>
                    </div>
                    <div class="action-icon delete-btn" data-id="${category.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </td>
        `;
        categoryTable.appendChild(row);
    });
    
    // 카테고리 선택 옵션에도 추가
    updateCategoryOptions();
}

// 카테고리 선택 옵션 업데이트
function updateCategoryOptions() {
    const categorySelects = document.querySelectorAll('select[id$="category"]');
    if (categorySelects.length === 0) return;
    
    const categories = JSON.parse(localStorage.getItem('blogCategories')) || [];
    
    categorySelects.forEach(select => {
        // 기존 옵션 저장
        const defaultOption = select.querySelector('option[value=""]');
        
        // 카테고리 옵션 초기화 (기본 옵션은 유지)
        select.innerHTML = '';
        if (defaultOption) {
            select.appendChild(defaultOption);
        }
        
        // 카테고리 옵션 추가
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

// 태그 저장 함수
function saveTag(tag) {
    let tags = JSON.parse(localStorage.getItem('blogTags')) || [];
    tags.push(tag);
    localStorage.setItem('blogTags', JSON.stringify(tags));
}

// 태그 불러오기 함수
function loadTags() {
    const tagTable = document.querySelector('.tag-table tbody');
    if (!tagTable) return;
    
    const tags = JSON.parse(localStorage.getItem('blogTags')) || [];
    
    // 테이블 초기화
    tagTable.innerHTML = '';
    
    // 태그가 없는 경우
    if (tags.length === 0) {
        tagTable.innerHTML = '<tr><td colspan="3" class="text-center">등록된 태그가 없습니다.</td></tr>';
        return;
    }
    
    // 태그 목록 표시
    tags.forEach(tag => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tag.name}</td>
            <td><span class="tag-count">${tag.count}</span></td>
            <td>
                <div class="table-actions">
                    <div class="action-icon edit-btn" data-id="${tag.id}">
                        <i class="fas fa-edit"></i>
                    </div>
                    <div class="action-icon delete-btn" data-id="${tag.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </td>
        `;
        tagTable.appendChild(row);
    });
    
    // 태그 클라우드 업데이트
    updateTagCloud();
}

// 태그 클라우드 업데이트
function updateTagCloud() {
    const tagCloud = document.querySelector('.tag-list');
    if (!tagCloud) return;
    
    const tags = JSON.parse(localStorage.getItem('blogTags')) || [];
    
    // 태그 클라우드 초기화
    tagCloud.innerHTML = '';
    
    // 태그 아이템 추가
    tags.forEach(tag => {
        const tagItem = document.createElement('div');
        tagItem.className = 'tag-item';
        tagItem.innerHTML = `${tag.name} <span class="delete-tag"><i class="fas fa-times"></i></span>`;
        
        // 삭제 이벤트
        tagItem.querySelector('.delete-tag').addEventListener('click', function() {
            if (confirm(`태그 "${tag.name}"을(를) 삭제하시겠습니까?`)) {
                deleteTag(tag.id);
            }
        });
        
        tagCloud.appendChild(tagItem);
    });
}

// 태그 삭제 함수
function deleteTag(tagId) {
    let tags = JSON.parse(localStorage.getItem('blogTags')) || [];
    tags = tags.filter(t => t.id != tagId);
    localStorage.setItem('blogTags', JSON.stringify(tags));
    
    // 태그 목록 새로고침
    loadTags();
}

// Q&A 저장 함수
function saveQna(qna) {
    let qnas = JSON.parse(localStorage.getItem('qnas')) || [];
    qnas.push(qna);
    localStorage.setItem('qnas', JSON.stringify(qnas));
}

// Q&A 불러오기 함수
function loadQnas() {
    const qnaTable = document.querySelector('.qna-table tbody');
    if (!qnaTable) return;
    
    const qnas = JSON.parse(localStorage.getItem('qnas')) || [];
    
    // 테이블 초기화
    qnaTable.innerHTML = '';
    
    // Q&A가 없는 경우
    if (qnas.length === 0) {
        qnaTable.innerHTML = '<tr><td colspan="6" class="text-center">등록된 Q&A가 없습니다.</td></tr>';
        return;
    }
    
    // Q&A 목록 표시
    qnas.forEach((qna, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${qnas.length - index}</td>
            <td>${qna.question.substr(0, 30)}${qna.question.length > 30 ? '...' : ''}</td>
            <td>${qna.category}</td>
            <td>${qna.date}</td>
            <td><span class="status-badge status-${qna.status.toLowerCase()}">${qna.status}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view-btn" data-id="${qna.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" data-id="${qna.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${qna.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        qnaTable.appendChild(row);
    });
}

// 대시보드 통계 불러오기
function loadDashboardStats() {
    const postCount = document.getElementById('post-count');
    const categoryCount = document.getElementById('category-count');
    const qnaCount = document.getElementById('qna-count');
    
    if (postCount) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        postCount.textContent = posts.length;
    }
    
    if (categoryCount) {
        const categories = JSON.parse(localStorage.getItem('blogCategories')) || [];
        categoryCount.textContent = categories.length;
    }
    
    if (qnaCount) {
        const qnas = JSON.parse(localStorage.getItem('qnas')) || [];
        qnaCount.textContent = qnas.length;
    }
}

// WYSIWYG 에디터 초기화 (텍스트 영역을 리치 에디터로 변환)
function initWysiwygEditor() {
    const contentArea = document.getElementById('blog-content');
    if (contentArea) {
        // 에디터 툴바 생성
        const toolbar = document.createElement('div');
        toolbar.className = 'editor-toolbar';
        toolbar.innerHTML = `
            <button type="button" data-command="bold" title="굵게"><i class="fas fa-bold"></i></button>
            <button type="button" data-command="italic" title="기울임"><i class="fas fa-italic"></i></button>
            <button type="button" data-command="underline" title="밑줄"><i class="fas fa-underline"></i></button>
            <button type="button" data-command="insertUnorderedList" title="글머리 기호"><i class="fas fa-list-ul"></i></button>
            <button type="button" data-command="insertOrderedList" title="번호 매기기"><i class="fas fa-list-ol"></i></button>
            <button type="button" data-command="createLink" title="링크"><i class="fas fa-link"></i></button>
            <button type="button" data-command="insertImage" title="이미지"><i class="fas fa-image"></i></button>
        `;
        
        // 에디터 컨테이너 생성
        const editorContainer = document.createElement('div');
        editorContainer.className = 'editor-container';
        
        // 에디터 영역 생성
        const editorArea = document.createElement('div');
        editorArea.className = 'editor-area';
        editorArea.contentEditable = true;
        editorArea.innerHTML = contentArea.value;
        
        // 원래 텍스트 영역 대체
        contentArea.style.display = 'none';
        contentArea.parentNode.insertBefore(editorContainer, contentArea);
        
        // 에디터 구성
        editorContainer.appendChild(toolbar);
        editorContainer.appendChild(editorArea);
        
        // 에디터 명령 처리
        toolbar.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                const command = this.getAttribute('data-command');
                
                if (command === 'createLink') {
                    const url = prompt('링크 URL을 입력하세요:', 'http://');
                    if (url) {
                        document.execCommand(command, false, url);
                    }
                } else if (command === 'insertImage') {
                    const url = prompt('이미지 URL을 입력하세요:', 'http://');
                    if (url) {
                        document.execCommand(command, false, url);
                    }
                } else {
                    document.execCommand(command, false, null);
                }
                
                // 텍스트 영역 업데이트
                contentArea.value = editorArea.innerHTML;
            });
        });
        
        // 에디터 내용 변경 시 텍스트 영역 업데이트
        editorArea.addEventListener('input', function() {
            contentArea.value = this.innerHTML;
        });
        
        // 폼 제출 시 에디터 내용을 텍스트 영역에 복사
        const form = contentArea.closest('form');
        if (form) {
            form.addEventListener('submit', function() {
                contentArea.value = editorArea.innerHTML;
            });
        }
    }
}

// 페이지 로드 시 통계 및 에디터 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    initWysiwygEditor();
});

// 관리자 공통 JavaScript 기능
$(document).ready(function() {
    // 사이드바 토글 기능
    $('#toggle-sidebar').click(function() {
        $('#sidebar').toggleClass('collapsed');
        $('#main-content').toggleClass('expanded');
    });
    
    // 로그인 상태 확인
    checkLoginStatus();
    
    // 로그아웃 버튼 이벤트
    $('#logout-button').click(function(e) {
        e.preventDefault();
        if (confirm('로그아웃 하시겠습니까?')) {
            // 로그인 정보 삭제 및 로그인 페이지로 리디렉션
            localStorage.removeItem('isAdminLoggedIn');
            localStorage.removeItem('adminUsername');
            window.location.href = 'admin-login.html';
        }
    });
    
    // 카테고리 관리 관련 기능
    if ($('#category-form').length > 0) {
        setupCategoryFunctions();
    }
});

// 로그인 상태 확인 함수
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    
    // 현재 페이지가 로그인 페이지인지 확인
    const isLoginPage = window.location.href.includes('admin-login.html');
    
    if (!isLoggedIn && !isLoginPage) {
        // 로그인되지 않았고 로그인 페이지가 아니면 로그인 페이지로 리디렉션
        window.location.href = 'admin-login.html';
    } else if (isLoggedIn && isLoginPage) {
        // 이미 로그인된 상태에서 로그인 페이지에 접근하면 대시보드로 리디렉션
        window.location.href = 'admin-dashboard.html';
    }
    
    // 로그인된 경우 사용자 이름 표시
    if (isLoggedIn) {
        const username = localStorage.getItem('adminUsername') || '관리자';
        $('.admin-name').text(username);
        $('.user-dropdown span').text(username);
    }
}

// 카테고리 관리 함수 설정
function setupCategoryFunctions() {
    // 블로그 카테고리 로드
    const storageKey = window.location.href.includes('admin-blog-category.html') ? 'blogCategories' : 'qnaCategories';
    
    // 초기 데이터 로드
    loadCategories(storageKey);
    
    // 카테고리 추가 폼 제출
    $('#category-form').submit(function(e) {
        e.preventDefault();
        
        const categoryName = $('#category-name').val().trim();
        if (!categoryName) {
            alert('카테고리 이름을 입력해주세요.');
            return;
        }
        
        addCategory(categoryName, storageKey);
        $('#category-name').val(''); // 입력창 초기화
    });
    
    // 태그 추가 폼 제출
    $('#tag-form').submit(function(e) {
        e.preventDefault();
        
        const tagName = $('#tag-name').val().trim();
        if (!tagName) {
            alert('태그 이름을 입력해주세요.');
            return;
        }
        
        const storageTagKey = storageKey === 'blogCategories' ? 'blogTags' : 'qnaTags';
        addTag(tagName, storageTagKey);
        $('#tag-name').val(''); // 입력창 초기화
    });
}

// 카테고리 로드 함수
function loadCategories(storageKey) {
    // 카테고리 로드
    const categories = JSON.parse(localStorage.getItem(storageKey)) || [];
    const categoryList = $('#category-list');
    
    // 리스트 초기화
    categoryList.empty();
    
    if (categories.length === 0) {
        categoryList.append('<tr><td colspan="3" class="text-center">등록된 카테고리가 없습니다.</td></tr>');
    } else {
        categories.forEach((category, index) => {
            categoryList.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${category.name}</td>
                    <td>
                        <div class="table-actions">
                            <div class="action-icon edit-btn" onclick="editCategory(${index}, '${storageKey}')">
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="action-icon delete-btn" onclick="deleteCategory(${index}, '${storageKey}')">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </td>
                </tr>
            `);
        });
    }
    
    // 태그 로드
    const tagStorageKey = storageKey === 'blogCategories' ? 'blogTags' : 'qnaTags';
    const tags = JSON.parse(localStorage.getItem(tagStorageKey)) || [];
    const tagList = $('#tag-list');
    
    // 리스트 초기화
    tagList.empty();
    
    if (tags.length === 0) {
        tagList.append('<tr><td colspan="3" class="text-center">등록된 태그가 없습니다.</td></tr>');
    } else {
        tags.forEach((tag, index) => {
            tagList.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${tag.name}</td>
                    <td>
                        <div class="table-actions">
                            <div class="action-icon edit-btn" onclick="editTag(${index}, '${tagStorageKey}')">
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="action-icon delete-btn" onclick="deleteTag(${index}, '${tagStorageKey}')">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </td>
                </tr>
            `);
        });
    }
}

// 카테고리 추가 함수
function addCategory(name, storageKey) {
    const categories = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // 중복 체크
    if (categories.some(cat => cat.name === name)) {
        alert('이미 존재하는 카테고리입니다.');
        return;
    }
    
    categories.push({
        id: Date.now(),
        name: name
    });
    
    localStorage.setItem(storageKey, JSON.stringify(categories));
    loadCategories(storageKey);
}

// 카테고리 수정 함수
function editCategory(index, storageKey) {
    const categories = JSON.parse(localStorage.getItem(storageKey)) || [];
    const category = categories[index];
    
    const newName = prompt('카테고리 이름을 수정하세요:', category.name);
    if (newName !== null && newName.trim() !== '') {
        categories[index].name = newName.trim();
        localStorage.setItem(storageKey, JSON.stringify(categories));
        loadCategories(storageKey);
    }
}

// 카테고리 삭제 함수
function deleteCategory(index, storageKey) {
    if (confirm('이 카테고리를 삭제하시겠습니까?')) {
        const categories = JSON.parse(localStorage.getItem(storageKey)) || [];
        categories.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(categories));
        loadCategories(storageKey);
    }
}

// 태그 추가 함수
function addTag(name, storageKey) {
    const tags = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // 중복 체크
    if (tags.some(tag => tag.name === name)) {
        alert('이미 존재하는 태그입니다.');
        return;
    }
    
    tags.push({
        id: Date.now(),
        name: name
    });
    
    localStorage.setItem(storageKey, JSON.stringify(tags));
    
    // 카테고리 스토리지 키 기반으로 태그 로드에 필요한 스토리지 키 결정
    const categoryStorageKey = storageKey === 'blogTags' ? 'blogCategories' : 'qnaCategories';
    loadCategories(categoryStorageKey);
}

// 태그 수정 함수
function editTag(index, storageKey) {
    const tags = JSON.parse(localStorage.getItem(storageKey)) || [];
    const tag = tags[index];
    
    const newName = prompt('태그 이름을 수정하세요:', tag.name);
    if (newName !== null && newName.trim() !== '') {
        tags[index].name = newName.trim();
        localStorage.setItem(storageKey, JSON.stringify(tags));
        
        // 카테고리 스토리지 키 기반으로 태그 로드에 필요한 스토리지 키 결정
        const categoryStorageKey = storageKey === 'blogTags' ? 'blogCategories' : 'qnaCategories';
        loadCategories(categoryStorageKey);
    }
}

// 태그 삭제 함수
function deleteTag(index, storageKey) {
    if (confirm('이 태그를 삭제하시겠습니까?')) {
        const tags = JSON.parse(localStorage.getItem(storageKey)) || [];
        tags.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(tags));
        
        // 카테고리 스토리지 키 기반으로 태그 로드에 필요한 스토리지 키 결정
        const categoryStorageKey = storageKey === 'blogTags' ? 'blogCategories' : 'qnaCategories';
        loadCategories(categoryStorageKey);
    }
}

// 무료 상담 신청 폼 초기화 함수
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
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
        
        // 상담 신청 객체 생성
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
        
        // 로컬 스토리지에 저장
        saveInquiry(inquiry);
        
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

// 상담 신청 저장 함수
function saveInquiry(inquiry) {
    let inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    inquiries.push(inquiry);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
}

// 무료 상담 신청 관리 초기화 함수
function initInquiryManagement() {
    const inquiryTable = document.getElementById('inquiry-table');
    const refreshBtn = document.getElementById('refresh-btn');
    
    if (inquiryTable) {
        loadInquiries();
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', loadInquiries);
        }
        
        // 모달 닫기 버튼 이벤트 리스너 추가
        const closeModalBtn = document.getElementById('close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        // 응답 저장 버튼 이벤트 리스너 추가
        const saveResponseBtn = document.getElementById('save-response-btn');
        if (saveResponseBtn) {
            saveResponseBtn.addEventListener('click', function() {
                const inquiryId = this.getAttribute('data-id');
                if (inquiryId) {
                    saveInquiryResponse(inquiryId);
                }
            });
        }
        
        // 상태 선택 드롭다운이 없을 경우 추가
        const responseSection = document.querySelector('.response-section');
        if (responseSection && !document.getElementById('inquiry-status-select')) {
            const statusSelectDiv = document.createElement('div');
            statusSelectDiv.className = 'form-group';
            statusSelectDiv.innerHTML = `
                <label for="inquiry-status-select">상태 변경:</label>
                <select id="inquiry-status-select" class="form-control">
                    <option value="new">신규</option>
                    <option value="in-progress">처리중</option>
                    <option value="completed">완료</option>
                </select>
            `;
            responseSection.insertBefore(statusSelectDiv, document.getElementById('save-response-btn'));
        }
    }
}

// 상담 신청 불러오기 및 표시
function loadInquiries() {
    const tableBody = document.querySelector('#inquiry-table tbody');
    if (!tableBody) return;
    
    // 테이블 내용 초기화
    tableBody.innerHTML = '';
    
    // localStorage에서 상담 신청 목록 가져오기
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    
    // 날짜 내림차순으로 정렬 (최신순)
    inquiries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (inquiries.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="6" class="text-center">접수된 상담 신청이 없습니다.</td>';
        tableBody.appendChild(emptyRow);
        return;
    }
    
    // 상담 신청 목록 표시
    inquiries.forEach((inquiry, index) => {
        const row = document.createElement('tr');
        
        // 날짜 포맷팅
        const date = new Date(inquiry.date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        // 상태에 따른 배지 스타일
        let statusBadge = '';
        switch(inquiry.status) {
            case 'new':
                statusBadge = '<span class="badge badge-warning">신규</span>';
                break;
            case 'in-progress':
                statusBadge = '<span class="badge badge-primary">처리중</span>';
                break;
            case 'completed':
                statusBadge = '<span class="badge badge-success">완료</span>';
                break;
            default:
                statusBadge = '<span class="badge badge-secondary">기타</span>';
        }
        
        row.innerHTML = `
            <td>${inquiries.length - index}</td>
            <td>${inquiry.name || '이름 없음'}</td>
            <td>${inquiry.subject || inquiry.title || '제목 없음'}</td>
            <td>${formattedDate}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-primary view-inquiry" data-id="${inquiry.id}">보기</button>
                <button class="btn btn-sm btn-danger delete-inquiry" data-id="${inquiry.id}">삭제</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // 보기 버튼 이벤트 리스너 추가
    const viewButtons = document.querySelectorAll('.view-inquiry');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inquiryId = this.getAttribute('data-id');
            openInquiryModal(inquiryId);
        });
    });
    
    // 삭제 버튼 이벤트 리스너 추가
    const deleteButtons = document.querySelectorAll('.delete-inquiry');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inquiryId = this.getAttribute('data-id');
            if (confirm('정말로 이 상담 신청을 삭제하시겠습니까?')) {
                deleteInquiry(inquiryId);
            }
        });
    });
}

// 상담 신청 모달 열기
function openInquiryModal(inquiryId) {
    const modal = document.getElementById('inquiry-modal');
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const inquiry = inquiries.find(item => item.id === inquiryId);
    
    if (!inquiry || !modal) return;
    
    // 날짜 포맷팅
    const date = new Date(inquiry.date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // 상태에 따른 배지 스타일
    let statusBadge = '';
    switch(inquiry.status) {
        case 'new':
            statusBadge = '<span class="badge badge-warning">신규</span>';
            break;
        case 'in-progress':
            statusBadge = '<span class="badge badge-primary">처리중</span>';
            break;
        case 'completed':
            statusBadge = '<span class="badge badge-success">완료</span>';
            break;
        default:
            statusBadge = '<span class="badge badge-secondary">기타</span>';
    }
    
    // 모달 내용 업데이트
    document.getElementById('inquiry-name').textContent = inquiry.name || '이름 없음';
    document.getElementById('inquiry-phone').textContent = inquiry.phone || '연락처 없음';
    document.getElementById('inquiry-date').textContent = formattedDate;
    document.getElementById('inquiry-status').innerHTML = statusBadge;
    document.getElementById('modal-title').textContent = '무료 상담 신청 상세 정보: ' + (inquiry.subject || inquiry.title || '제목 없음');
    document.getElementById('inquiry-message').textContent = inquiry.message || '';
    
    // 이미지 표시
    const imageContainer = document.getElementById('inquiry-images');
    imageContainer.innerHTML = '';
    
    if (inquiry.images && inquiry.images.length > 0) {
        inquiry.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.classList.add('inquiry-image');
            imageContainer.appendChild(img);
        });
    } else {
        imageContainer.innerHTML = '<p>첨부된 이미지가 없습니다.</p>';
    }
    
    // 응답 영역 설정
    const responseTextarea = document.getElementById('inquiry-response');
    responseTextarea.value = inquiry.response || '';
    
    // 상태 선택 업데이트
    const statusSelect = document.getElementById('inquiry-status-select');
    if (statusSelect) {
        statusSelect.value = inquiry.status;
    }
    
    // 저장 버튼에 inquiryId 설정
    const saveResponseBtn = document.getElementById('save-response-btn');
    if (saveResponseBtn) {
        saveResponseBtn.setAttribute('data-id', inquiryId);
    }
    
    // 모달 표시
    modal.style.display = 'block';
}

// 상담 신청 응답 저장
function saveInquiryResponse(inquiryId) {
    const responseText = document.getElementById('inquiry-response').value;
    const statusSelect = document.getElementById('inquiry-status-select');
    const status = statusSelect ? statusSelect.value : 'in-progress';
    
    // localStorage에서 상담 신청 목록 가져오기
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const index = inquiries.findIndex(item => item.id === inquiryId);
    
    if (index !== -1) {
        // 상담 신청 정보 업데이트
        inquiries[index].response = responseText;
        inquiries[index].status = status;
        inquiries[index].updatedAt = new Date().toISOString();
        
        // localStorage에 저장
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        
        // 모달 닫고 목록 새로고침
        closeModal();
        loadInquiries();
        
        alert('응답이 저장되었습니다.');
    }
}

// 상담 신청 삭제
function deleteInquiry(inquiryId) {
    if (!confirm('정말 이 상담 신청을 삭제하시겠습니까?')) return;
    
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const filteredInquiries = inquiries.filter(item => item.id !== inquiryId);
    
    localStorage.setItem('inquiries', JSON.stringify(filteredInquiries));
    
    // 상담 신청 목록 새로고침
    loadInquiries();
    
    alert('상담 신청이 삭제되었습니다.');
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('inquiry-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 문서 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // 무료 상담 신청 관리 초기화
    initInquiryManagement();
    
    // 모바일 사이드바 토글
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
        });
    }
}); 