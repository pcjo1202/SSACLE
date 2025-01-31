import { USER_END_POINT } from './endPoints'

// 로그인
export const fetchLogin = async () => {
  return axios.get(USER_END_POINT.PROFILE)
}
// 로그아웃
export const fetchLogout = async () => {
  return axios.get(USER_END_POINT.LOGOUT)
}
// 회원가입
export const fetchRegister = async () => {
  return axios.get(USER_END_POINT.REGISTER)
}

// 회원정보 조회

// 회원정보 수정

// 회원정보 삭제
