// 여기에 axios 인스턴스 생성

import axios from 'axios'

// Axios 인스턴스 생성
const httpCommon = axios.create({
  baseURL: 'http://localhost:5174/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  withCredentials: true,
})

// 응답 인터셉터: 공통적인 에러 처리
httpCommon.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      if (status === 401) {
        console.error('401 Unauthorized: 인증 실패')
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
