import httpCommon from './http-common' // Axios 인스턴스 사용
import { AUTH_END_POINT } from './endPoints'

// 1. 싸피인 인증 (GET)
export const fetchSsafyAuth = () => httpCommon.get(AUTH_END_POINT.SSAFY_AUTH)

// 2. 이메일 체크 (GET)
export const fetchCheckEmail = (email) =>
  httpCommon.get(AUTH_END_POINT.CHECK_EMAIL(email))

// 3. 이메일 인증 (GET)
export const fetchVerifyEmail = (token) =>
  httpCommon.get(AUTH_END_POINT.VERIFY_EMAIL(token))

// 4. 비밀번호 형식 체크 (GET)
export const fetchCheckPassword = (password) =>
  httpCommon.get(AUTH_END_POINT.CHECK_PASSWORD(password))

// 5. 닉네임 중복 체크 (GET)
export const fetchCheckNickname = (nickname) =>
  httpCommon.get(AUTH_END_POINT.CHECK_NICKNAME(nickname))

// 6. 관심사 체크 (GET)
export const fetchCheckInterest = (interests) =>
  httpCommon.get(AUTH_END_POINT.CHECK_INTERESTS(interests))

// 7. 회원가입 (POST)
export const fetchRegister = (userData = {}) =>
  httpCommon.post(AUTH_END_POINT.SIGNUP, userData)

// 8. 로그인 (POST)
export const fetchLogin = (credentials = {}) =>
  httpCommon.post(AUTH_END_POINT.LOGIN, credentials)

// 9. 로그아웃 (POST)
export const fetchLogout = () =>
  httpCommon.post(AUTH_END_POINT.LOGOUT).then(() => {
    window.location.href = '/login' // 로그인 페이지로 이동
  })
