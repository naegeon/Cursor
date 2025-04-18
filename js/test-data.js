// 테스트용 무료 상담 신청 데이터 생성
function createTestInquiries() {
    const testInquiries = [
        {
            id: 'inq_1',
            date: new Date('2025-04-18').toISOString(),
            name: '홍길동',
            phone: '010-1234-5678',
            subject: '누수 상담 문의드립니다',
            message: '화장실에서 물이 새는 것 같아 상담 문의드립니다. 언제 방문 가능한지요?',
            status: 'new',
            images: [],
            response: ''
        },
        {
            id: 'inq_2',
            date: new Date('2025-04-17').toISOString(),
            name: '김철수',
            phone: '010-9876-5432',
            subject: '베란다 누수 문제',
            message: '최근 비가 오면 베란다에서 물이 새고 있습니다. 확인 부탁드립니다.',
            status: 'in-progress',
            images: [],
            response: '안녕하세요. 김철수님, 문의 감사합니다. 베란다 누수의 경우 방문 점검이 필요합니다. 내일 오전 10시에 방문 가능할까요?'
        },
        {
            id: 'inq_3',
            date: new Date('2025-04-16').toISOString(),
            name: '이영희',
            phone: '010-5555-1234',
            subject: '욕실 리모델링 상담',
            message: '욕실 리모델링을 계획 중인데 견적 상담을 받고 싶습니다.',
            status: 'completed',
            images: [],
            response: '이영희님, 상담 요청 감사합니다. 욕실 리모델링 견적을 위해 현장 방문이 필요합니다. 방문 일정은 협의되었으며, 견적서를 이메일로 발송해드렸습니다. 추가 문의사항 있으시면 연락주세요.'
        }
    ];

    // 기존 데이터 확인
    let inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    
    // 같은 ID가 있는지 확인하고 없으면 추가
    testInquiries.forEach(testInquiry => {
        if (!inquiries.some(inquiry => inquiry.id === testInquiry.id)) {
            inquiries.push(testInquiry);
        }
    });
    
    // 로컬스토리지에 저장
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    
    console.log('테스트 데이터가 추가되었습니다!');
    return inquiries.length;
}

// 테스트 데이터 생성 실행
const totalInquiries = createTestInquiries();
alert(`테스트 데이터가 생성되었습니다. 총 ${totalInquiries}개의 상담 데이터가 있습니다.`); 