// 회원 기능 -> authService
export const AUTH_END_POINT = {
  SSAFY_AUTH: '/api/v1/auth/ssafy', // 싸피 인증
  CHECK_EMAIL: (email) => `/api/v1/auth/check-email?email=${email}`, // 이메일 체크
  VERIFY_EMAIL: (token) => `/api/v1/auth/verify-email?token=${token}`, // 이메일 인증
  CHECK_PASSWORD: (password) =>
    `/api/v1/auth/check-password?password=${password}`, // 비밀번호 형식 체크
  CHECK_NICKNAME: (nickname) =>
    `/api/v1/auth/check-nickname?nickname=${nickname}`, // 닉네임 중복 체크
  CHECK_INTERESTS: (interests) =>
    `/api/v1/auth/check-interest?${interests.map((i) => `interests=${i}`).join('&')}`, // 관심사 체크

  SIGNUP: '/api/v1/auth/signup', // 회원가입
  LOGIN: '/api/v1/auth/login', // 로그인
  LOGOUT: '/api/v1/auth/logout', // 로그아웃
}

// 유저 관련 -> userService
export const USER_END_POINT = {
  PROFILE: '/user/profile',
  UPDATE: '/user/update',
  DELETE: '/user/delete',
  PASSWORD: '/user/password',
}

// 메인페이지 -> mainService
export const MAIN_END_POINT = {
  // GET 요청 - 로그인한 사용자의 기본 정보 조회
  USER_INFO: (userId) => `/api/v1/user/${userId}`,

  // GET 요청 - 참여중인 싸프린트, 싸드컵 리스트 조회
  // NOW_MYSSAPRINT: '/api/v1/mylist',
  NOW_MYSSAPRINT: '/api/v1/',

  // 싸프린트 관련 엔드포인트
  // POST 요청 - 관심사 기반 싸프린트 리스트 조회
  // SSAPRINT_LIST: '/api/v1/ssaprint/interest',
  SSAPRINT_LIST: '/api/v1/',

  // 싸드컵 관련 엔드포인트
  // POST 요청 - 관심사 기반 싸드컵 리스트 조회
  // SSADCUP_LIST: '/api/v1/ssadcup/interest',
  SSADCUP_LIST: '/api/v1/',

  // 싸밥 관련 엔드포인트
  // GET 요청 - 오늘의 싸밥(식단) 정보 조회
  LUNCH_INFO: '/api/v1/lunch',

  // PATCH 요청 - 싸밥 투표 (투표자 전용)
  LUNCH_VOTE: '/api/v1/vote',

  // GET 요청 - 싸밥 투표 결과 조회 (투표자 전용)
  LUNCH_VOTE_RESULT: '/api/v1/vote/check-result',

  // AI 기사 관련
  // GET 요청 - 금일 AI 기사 전체 아티클 조회
  AI_NEWS: (newId) => `/api/v1/news/${newId}`,
}

// 싸프린트 -> ssaprintService
export const SSAPRINT_END_POINT = {
  LIST: '/api/v1/ssaprint', // 전체 싸프린트 목록 조회
  LIST_WITH_FILTER: (major, sub) =>
    `/api/v1/ssaprint?major=${major}&sub=${sub}`, // 조건별 싸프린트 조회
  DETAIL: (id) => `/api/v1/ssaprint/${id}`, // 특정 싸프린트 상세 조회 (참가 이전/이후/완료 동일)

  CREATE: '/api/v1/ssaprint', // 싸프린트 생성
  UPDATE: (id) => `/api/v1/ssaprint/${id}`, // 싸프린트 수정
  DELETE: (id) => `/api/v1/ssaprint/${id}`, // 싸프린트 삭제

  JOIN: (id) => `/api/v1/ssaprint/${id}/join`, // 싸프린트 참가
  CANCEL: (id) => `/api/v1/ssaprint/${id}/cancel`, // 싸프린트 참가 취소

  PRESENTATION_PARTICIPANTS: (id) =>
    `/api/v1/ssaprint/${id}/presentation/participants`, // 발표 참가자 목록 조회
  PRESENTATION_CARDS: (id) => `/api/v1/ssaprint/${id}/presentation/cards`, // 발표 질문 카드 목록 조회
  PRESENTATION_CARD_DETAIL: (id, cardId) =>
    `/api/v1/ssaprint/${id}/presentation/cards/${cardId}`, // 특정 질문 카드 상세 조회
  PRESENTATION_EXIT: (id) => `/api/v1/ssaprint/${id}/presentation/exit`, // 발표 종료

  TODO_STATUS: (ssaprintId, todoId) =>
    `/api/v1/ssaprint/${ssaprintId}/todo/${todoId}`, // TODO 상태 수정
}

// 싸드컵 -> ssadcupService
export const SSADCUP_END_POINT = {
  TOURNAMENTS: '/ssadcup/tournaments',
  MATCHES: '/ssadcup/matches',
  TEAMS: '/ssadcup/teams',
  PLAYERS: '/ssadcup/players',
}

// 관리자 -> adminService
export const ADMIN_END_POINT = {
  USERS: '/admin/users',
  REPORTS: '/admin/reports',
  SETTINGS: '/admin/settings',
  STATS: '/admin/statistics',
}

// 게시판 -> boardService
export const BOARD_END_POINT = {
  LIST: '/board/list',
  POST: '/board/post',
  COMMENT: '/board/comment',
  SEARCH: '/board/search',
}

// 노션 관련 -> notionService
export const NOTION_END_POINT = {
  PAGES: '/notion/pages',
  SYNC: '/notion/sync',
  CONTENT: '/notion/content',
}

// 아래는 예시
