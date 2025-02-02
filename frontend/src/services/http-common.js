// 여기에 axios 인스턴스 생성

import axios from 'axios'

// Axios 인스턴스 생성
const httpCommon = axios.create({
  baseURL: 'http://localhost:5174/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5초 타임아웃 설정
  withCredentials: false, // 쿠키 인증 불필요 (JWT 사용)
})

// 요청 인터셉터: 모든 요청에 JWT 토큰 자동 추가
httpCommon.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // 저장된 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // 문자열 템플릿 오류 수정
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터: 공통적인 에러 처리
httpCommon.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      if (status === 401) {
        console.error('401 Unauthorized: 인증 실패')
        localStorage.removeItem('token') // 토큰 삭제
        window.location.href = '/login' // 로그인 페이지로 이동
      } else if (status >= 500) {
        console.error('서버 오류 발생!')
        window.location.href = '/error' // 에러 페이지로 이동
      }
    }
    return Promise.reject(error)
  }
)

export default httpCommon
