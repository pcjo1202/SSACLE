import httpCommon from './http-common' // Axios 인스턴스 사용
import { AUTH_END_POINT } from './endPoints'

// 1. 싸피인 인증 (GET)
export const fetchSsafyAuth = async () => {
  try {
    const response = await httpCommon.get(AUTH_END_POINT.SSAFY_AUTH)
    return response.data
  } catch (error) {
    console.error('싸피인 인증 실패:', error)
    throw error
  }
}

// 2. 이메일 체크 (GET)
export const fetchCheckEmail = async (email) => {
  try {
    const response = await httpCommon.get(AUTH_END_POINT.CHECK_EMAIL(email))
    return response.data
  } catch (error) {
    console.error('이메일 체크 실패:', error)
    throw error
  }
}

// 3. 이메일 인증 (GET)
export const fetchVerifyEmail = async (token) => {
  try {
    const response = await httpCommon.get(AUTH_END_POINT.VERIFY_EMAIL(token))
    return response.data
  } catch (error) {
    console.error('이메일 인증 실패:', error)
    throw error
  }
}

// 4. 비밀번호 형식 체크 (GET)
export const fetchCheckPassword = async (password) => {
  try {
    const response = await httpCommon.get(
      AUTH_END_POINT.CHECK_PASSWORD(password)
    )
    return response.data
  } catch (error) {
    console.error('비밀번호 형식 체크 실패:', error)
    throw error
  }
}

// 5. 닉네임 중복 체크 (GET)
export const fetchCheckNickname = async (nickname) => {
  try {
    const response = await httpCommon.get(
      AUTH_END_POINT.CHECK_NICKNAME(nickname)
    )
    return response.data
  } catch (error) {
    console.error('닉네임 중복 체크 실패:', error)
    throw error
  }
}

// 6. 관심사 체크 (GET)
export const fetchCheckInterest = async (interests) => {
  try {
    const response = await httpCommon.get(
      AUTH_END_POINT.CHECK_INTERESTS(interests)
    )
    return response.data
  } catch (error) {
    console.error('관심사 체크 실패:', error)
    throw error
  }
}

// 7. 회원가입 (POST)
export const fetchRegister = async (userData = {}) => {
  try {
    const response = await httpCommon.post(AUTH_END_POINT.SIGNUP, userData)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}

// 8. 로그인 (POST)
export const fetchLogin = async (credentials = {}) => {
  try {
    const response = await httpCommon.post(AUTH_END_POINT.LOGIN, credentials)
    return response.data
  } catch (error) {
    console.error('로그인 실패:', error)
    throw error
  }
}

// 9. 로그아웃 (POST)
export const fetchLogout = async () => {
  try {
    await httpCommon.post(AUTH_END_POINT.LOGOUT)
    window.location.href = '/login' // 로그인 페이지로 이동
  } catch (error) {
    console.error('로그아웃 실패:', error)
    throw error
  }
}
