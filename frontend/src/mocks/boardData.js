// 게시글 더미 데이터
export const posts = [
  {
    id: 1,
    title: '현대 오토에버 최종 합격 후기',
    content:
      '1차 면접은 기술 면접으로 진행되었고, 2차 면접은 임원 면접으로 진행되었습니다...',
    date: '2025-01-22',
    author: '김취준',
    views: 127,
    type: 'honor',
    tags: ['자소서', '면접후기'],
    comments: [
      {
        id: 1,
        content: '축하드립니다! 후기 잘 보았습니다.',
        author: '이직준비',
        date: '2025-01-22',
        replies: [
          {
            id: 11,
            content: '감사합니다!',
            author: '김취준',
            date: '2025-01-22',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Tailwind CSS를 사용하는 이유가 무엇인가요?',
    content:
      '프로젝트에서 Tailwind를 도입하려고 하는데, 기존 CSS와 비교했을 때 장단점이 궁금합니다.',
    date: '2025-01-22',
    author: '프론트개발자',
    views: 85,
    type: 'question',
    tags: ['Frontend', 'CSS'],
    comments: [],
  },
  {
    id: 3,
    title: '오늘 점심 뭐 먹을까요?',
    content: '회사 근처 맛집 추천 부탁드립니다!',
    date: '2025-01-22',
    author: '맛집탐험가',
    views: 42,
    type: 'free',
    comments: [],
  },
]

// 게시글 타입별 태그 옵션
export const tagOptions = {
  honor: ['자소서', '면접후기', '합격수기', '이직후기'],
  question: ['Frontend', 'Backend', 'CS', '알고리즘', 'Database', 'DevOps'],
  free: ['일상', '취미', '맛집', '잡담'],
  ssacle: ['공지', '이벤트', '질문'],
}

// 사용자 더미 데이터
export const users = [
  {
    id: 'user1',
    username: '김취준',
    pickle: 100,
    readPosts: [], // 읽은 명예의 전당 게시글 ID 배열
  },
  {
    id: 'user2',
    username: '이직준비',
    pickle: 3,
    readPosts: [1],
  },
  {
    id: 'user3',
    username: '프론트개발자',
    pickle: 50,
    readPosts: [],
  },
]

// 게시판 탭 설정
export const boardTabs = {
  study: [
    { id: 'honor', label: '명예의 전당' },
    { id: 'question', label: '질의응답' },
  ],
  free: [
    { id: 'free', label: '자유' },
    { id: 'ssacle', label: '싸구만' },
  ],
}

// API 응답 모사
export const getPost = (id) => {
  const post = posts.find((p) => p.id === Number(id))
  const currentIndex = posts.findIndex((p) => p.id === Number(id))

  return {
    post,
    prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export const getPosts = ({ type }) => {
  return posts.filter((post) => post.type === type)
}
