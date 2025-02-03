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

// 부가 기능 (메인페이지) -> mainService
export const MAIN_END_POINT = {
  BANNER: '/main/banner',
  NOTICE: '/main/notice',
  FAQ: '/main/faq',
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
