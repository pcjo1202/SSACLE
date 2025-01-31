import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const EmailPage = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('email')

  // ✅ 페이지가 로드될 때, 로그인 페이지에서 전달된 `state.activeTab` 값이 있으면 반영
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location.state])

  return (
    // 제일 겉 컨테이너 -- 테두리 묶기
    <div className="w-full h-auto flex justify-center items-center px-[200px] mt-[100px]">
      {/* 컬럼을 나눌 컨테이너 -- 컬럼 12개로 쪼개고 갭 4씩*/}
      <div className="grid grid-cols-12 gap-4 w-full">
        {/* 컬럼 4개만 사용하게 하기 */}
        <div className="col-span-4 col-start-5">
          <h1 className="text-[#5194f6] text-3xl font-bold text-center mb-10">
            이메일 / 비밀번호 찾기
          </h1>
          {/* 탭 버튼 */}
          <div className="flex justify-center border-b">
            <button
              className={`w-1/2 px-4 py-2 text-center ${
                activeTab === 'email'
                  ? 'border-b-2 border-[#5194f6] text-[#242424] text-base font-medium'
                  : 'text-[#E5E5E5] text-base font-medium'
              }`}
              onClick={() => setActiveTab('email')}
            >
              이메일 찾기
            </button>
            <button
              className={`w-1/2 px-4 py-2 text-center ${
                activeTab === 'password'
                  ? 'border-b-2 border-[#5194f6] text-[#242424] text-base font-medium'
                  : 'text-[#E5E5E5] text-base font-medium'
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
                className="w-full h-[50px] bg-[#f4f4f4] rounded-full px-6 text-[#5194f6] text-base font-medium focus:outline-[#5194f6] mb-4"
              />
              <button className="w-full h-[50px] bg-[#5194f6] rounded-full text-white text-xl font-bold mb-4">
                확인
              </button>
            </div>
          ) : (
            <div className="pt-10">
              <input
                placeholder="싸피 학번을 입력 해주세요"
                className="w-full h-[50px] bg-[#f4f4f4] rounded-full px-6 text-[#5194f6] text-base font-medium focus:outline-[#5194f6] mb-4"
              />
              <input
                placeholder="이메일을 입력해 주세요"
                className="w-full h-[50px] bg-[#f4f4f4] rounded-full px-6 text-[#5194f6] text-base font-medium focus:outline-[#5194f6] mb-4"
              />
              <button className="w-full h-[50px] bg-[#5194f6] rounded-full text-white text-xl font-bold mb-4">
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
