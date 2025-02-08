import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchFindEmail, fetchFindPassword } from '@/services/userService'
import { useMutation } from '@tanstack/react-query'

const EmailPage = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('email')

  // 🔥 이메일 찾기용 상태
  const [studentNumber, setStudentNumber] = useState('') // 학번 입력값
  const [foundEmail, setFoundEmail] = useState('') // 조회된 이메일

  // 로그인 페이지에서 전달된 `state.activeTab` 값이 있으면 반영
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location.state])

  // 🔥 (1) 이메일 찾기 뮤테이션
  const findEmailMutation = useMutation({
    mutationFn: fetchFindEmail, // 실제 API 호출
    onSuccess: (response) => {
      // API가 200 OK를 응답하면, 이메일 문자열을 전달한다고 가정
      if (response.status === 200) {
        // 예: response.data === "example@naver.com"
        setFoundEmail(response.data) // 이메일 상태에 저장
      }
    },
    onError: (error) => {
      console.error('❌ 이메일 찾기 실패:', error)
      setFoundEmail('') // 혹시 이전 상태가 남았으면 초기화
      alert('이메일을 찾을 수 없습니다. 학번을 확인해주세요.')
    },
  })

  // 🔥 (2) "이메일 찾기" 버튼 클릭 시 실행할 함수
  const handleFindEmail = () => {
    if (!studentNumber.trim()) {
      alert('싸피 학번을 입력해주세요!')
      return
    }
    // mutationFn(fetchFindEmail)에 { studentNumber } 객체를 전달 → POST Body로 전송
    findEmailMutation.mutate({ studentNumber })
  }

  return (
    // 제일 겉 컨테이너 -- 테두리 묶기
    <div className="w-full h-auto flex justify-center items-center mt-24">
      {/* 컬럼을 나눌 컨테이너 -- 컬럼 12개로 쪼개고 갭 4씩*/}
      <div className="grid grid-cols-12 gap-4 w-full">
        {/* 컬럼 4개만 사용하게 하기 */}
        <div className="col-span-4 col-start-5">
          <h1 className="text-ssacle-blue text-3xl font-bold text-center mb-10">
            이메일 / 비밀번호 찾기
          </h1>
          {/* 탭 버튼 */}
          <div className="flex justify-center border-b">
            <button
              className={`w-1/2 px-4 py-2 text-center ${
                activeTab === 'email'
                  ? 'border-b-2 border-ssacle-blue text-ssacle-black text-base font-medium'
                  : 'text-ssacle-gray text-base font-medium'
              }`}
              onClick={() => setActiveTab('email')}
            >
              이메일 찾기
            </button>
            <button
              className={`w-1/2 px-4 py-2 text-center ${
                activeTab === 'password'
                  ? 'border-b-2 border-ssacle-blue text-ssacle-black text-base font-medium'
                  : 'text-ssacle-gray text-base font-medium'
              }`}
              onClick={() => setActiveTab('password')}
            >
              비밀번호 찾기
            </button>
          </div>

          {/* 탭 버튼 시 나올 화면 */}
          {activeTab === 'email' ? (
            <div className="pt-10">
              <input
                placeholder="싸피 학번을 입력 해주세요"
                className="w-full h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base font-medium focus:outline-ssacle-blue mb-4"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
              <button
                onClick={handleFindEmail}
                className="w-full h-12 bg-ssacle-blue rounded-full text-white text-xl font-bold mb-4"
              >
                이메일 찾기
              </button>

              {/* 이메일 찾기 성공 시, foundEmail로 표시 */}
              {foundEmail && (
                <div className="text-center text-ssacle-blue font-medium">
                  찾으신 이메일: {foundEmail}
                </div>
              )}
            </div>
          ) : (
            <div className="pt-10">
              <input
                placeholder="싸피 학번을 입력 해주세요"
                className="w-full h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base font-medium focus:outline-ssacle-blue mb-4"
              />
              <input
                placeholder="이메일을 입력해 주세요"
                className="w-full h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base font-medium focus:outline-ssacle-blue mb-4"
              />
              <button className="w-full h-12 bg-ssacle-blue rounded-full text-white text-xl font-bold mb-4">
                이메일 인증하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailPage
