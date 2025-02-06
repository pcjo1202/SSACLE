import axios from './http-common' // Axios 인스턴스 사용
import { AUTH_END_POINT } from './endPoints'

// 2. 이메일 중복 체크 (GET)
export const fetchCheckEmail = (email) =>
  axios.get(AUTH_END_POINT.CHECK_EMAIL(email))

// 3. 인증 코드 전송 (웹훅 사용) (POST)
export const fetchSendVerification = (email, webhookUrl) =>
  axios.post(AUTH_END_POINT.SEND_VERIFICATION(email), { email, webhookUrl })

// 4. 비밀번호 형식 체크 (POST) 🔥 [보안 강화: GET → POST 변경]
export const fetchCheckPassword = (password, confirmPassword) =>
  axios.post(AUTH_END_POINT.CHECK_PASSWORD(password, confirmPassword), { password, confirmPassword })

// 5. 닉네임 중복 체크 (GET)
export const fetchCheckNickname = (nickname) =>
  axios.get(AUTH_END_POINT.CHECK_NICKNAME(nickname))

// 6. 관심사 체크 (GET)
export const fetchCheckInterest = (interests) =>
  axios.get(AUTH_END_POINT.CHECK_INTERESTS(interests))

// 7. 회원가입 (POST)
export const fetchRegister = (userData) => axios.post(AUTH_END_POINT.SIGNUP, userData)

// 8. 로그인 (POST)
export const fetchLogin = (credentials) => axios.post(AUTH_END_POINT.LOGIN, credentials)

// 9. 로그아웃 (POST)
export const fetchLogout = async () => {
  try {
    await axios.post(AUTH_END_POINT.LOGOUT)
    window.location.href = '/login' // 성공 후 페이지 이동
  } catch (error) {
    console.error('❌ 로그아웃 실패:', error)
  }
}

// 10. Refresh Token 재발급 (POST)
export const fetchRefreshToken = async () => {
  try {
    const { data } = await axios.post(AUTH_END_POINT.REFRESH_TOKEN)
    localStorage.setItem('accessToken', data.accessToken) // 새로운 액세스 토큰 저장
    localStorage.setItem('refreshToken', data.refreshToken) // 새로운 리프레시 토큰 저장
    return data
  } catch (error) {
    console.error('❌ 토큰 갱신 실패:', error)
    throw error
  }
}
