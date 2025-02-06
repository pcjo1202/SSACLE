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

// 요청 인터셉터: 모든 요청에 `Authorization` 헤더 추가
httpCommon.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken') // 저장된 액세스 토큰 가져오기
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}` // 헤더에 추가
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터: 공통적인 에러 처리 + 액세스 토큰 갱신
httpCommon.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, config } = error.response

      // 401 Unauthorized: 액세스 토큰 만료 → 리프레시 토큰으로 갱신
      if (status === 401) {
        console.error('🔄 401 Unauthorized: 액세스 토큰 갱신 시도')

        try {
          // 액세스 토큰 갱신 요청 (body 없이 요청)
          const { data } = await axios.post('http://localhost:5174/api/v1/refreshtoken')

          // 새로운 액세스 & 리프레시 토큰 저장
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken) // 새 리프레시 토큰도 저장

          // 원래 요청을 새로운 액세스 토큰으로 재시도
          config.headers['Authorization'] = `Bearer ${data.accessToken}`
          return httpCommon(config) // 기존 요청 다시 보내기
        } catch (refreshError) {
          console.error('❌ 토큰 갱신 실패:', refreshError)
          window.location.href = '/login' // 로그인 페이지로 이동
          return Promise.reject(refreshError)
        }
      }

      // 500 이상 서버 오류 → 에러 페이지로 이동
      if (status >= 500) {
        console.error('🚨 서버 오류 발생!')
        window.location.href = '/error'
      }
    }
    return Promise.reject(error)
  }
)

export default httpCommon
