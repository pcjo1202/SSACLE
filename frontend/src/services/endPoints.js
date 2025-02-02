// 회원 기능 -> authService
export const AUTH_END_POINT = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
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
  LIST: '/ssaprint/list',
  DETAIL: '/ssaprint/detail',
  CREATE: '/ssaprint/create',
  UPDATE: '/ssaprint/update',
  DELETE: '/ssaprint/delete',
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
