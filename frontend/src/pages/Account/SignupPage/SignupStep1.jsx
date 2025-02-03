import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupStep1 = () => {
  const navigate = useNavigate()
  const [showCodeInput, setShowCodeInput] = useState(false)

  return (
    <div className="w-full h-auto flex justify-center items-center mt-24">
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-4 col-start-5">
          <h1 className="text-ssacle-blue text-3xl font-bold text-center mb-10">
            회원가입
          </h1>

          {/* 이메일 입력 필드 */}
          <input
            type="email"
            placeholder="Mattermost를 가입한 이메일을 입력해주세요"
            className="w-full h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-medium text-base focus:outline-ssacle-blue mb-4"
          />

          {/* 인증 코드 입력 필드 (버튼 클릭시 출력) */}
          {showCodeInput && (
            <input
              type="text"
              placeholder="인증 코드를 입력하세요"
              className="w-full h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base text-medium focus:outline-ssacle-blue mb-4"
            />
          )}

          {/* 인증 코드 요청 버튼 */}
          <button
            className={`w-full h-12 rounded-full text-center text-xl font-bold mb-4 transition-colors duration-300 ${
              showCodeInput
                ? 'bg-ssacle-sky text-ssacle-black'
                : 'bg-ssacle-blue text-white'
            }`}
            onClick={() => setShowCodeInput(true)}
          >
            Mattermost로 인증 코드 받기
          </button>

          {showCodeInput && (
            <button
              className="w-full h-12 bg-ssacle-blue rounded-full px-6 text-white text-center text-xl font-bold mb-4"
              onClick={() => navigate('step2')} // 다음 단계로 이동
            >
              SSAFY인 인증하기
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupStep1
