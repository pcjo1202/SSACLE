import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import httpCommon from '@/services/http-common'

const GuardedRoute = () => {
  const [isValidating, setIsValidating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['validateToken'],
    queryFn: async () => {
      try {
        const response = await httpCommon.get('/user/summary')
        // 응답에서 닉네임을 저장
        if (response.data && response.data.nickname) {
          localStorage.setItem('userNickname', response.data.nickname)
        }
        return response.data
      } catch (error) {
        // 인증 실패 시 토큰과 닉네임 모두 제거
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userNickname')
        return false
      }
    },
    retry: false,
  })

  useEffect(() => {
    setIsValidating(true)

    if (!isLoading) {
      // 데이터와 저장된 닉네임 모두 확인
      const hasNickname = !!localStorage.getItem('userNickname')
      setIsAuthenticated(data && hasNickname)
      setIsValidating(false)
    }
  }, [data, isLoading])

  if (isValidating) {
    return <div>인증 확인 중...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/account/login" replace />
}

export default GuardedRoute
