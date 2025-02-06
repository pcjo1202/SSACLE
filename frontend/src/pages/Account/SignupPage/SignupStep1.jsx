import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupStep1 = () => {
  const navigate = useNavigate()
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [step, setStep] = useState(1) // 🔥 현재 단계를 관리하는 상태 (1단계 / 2단계)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[80%] max-w-[1200px] flex flex-col md:flex-row items-center justify-between">
        
        {/* 🔥 좌측 컨텐츠 (1단계 / 2단계) */}
        <div className="w-full md:w-[45%] bg-gray-100 p-6 rounded-lg shadow-md text-center md:text-left">
          <h2 className="text-lg font-bold text-ssacle-blue mb-4">SSAFY인 인증하는 방법</h2>
          <p className="text-sm text-gray-700 mb-2">{step}단계</p>

          {step === 1 ? (
            <ol className="text-sm text-gray-600 list-disc list-inside">
              <li>싸피 MatterMost에서 원하는 서버를 클릭</li>
              <li>인증 코드를 받을 Private 채널을 만든다</li>
              <ol className="list-disc list-inside pl-4">
                <li>새로운 채널 생성 후 Private Channel 클릭</li>
                <li>채널 만들기</li>
              </ol>
            </ol>
          ) : (
            <ol className="text-sm text-gray-600 list-disc list-inside">
              <li>채널을 만든 서버를 잘 선택해서 접속한다</li>
              <li>MatterMost 로그인</li>
              <li>앱 설정 → Incoming Webhook 메뉴 클릭</li>
              <li>Incoming Webhook을 새로 추가</li>
              <li>새로운 자동 메시지 전송을 설정</li>
              <li>생성된 Webhook URL을 복사</li>
              <li>MM 가입한 이메일을 입력해 인증 코드 받기</li>
            </ol>
          )}

          {/* 🔄 화살표 네비게이션 */}
          <div className="flex justify-center mt-4">
            <button
              className={`w-6 h-6 ${step === 1 ? 'text-gray-400' : 'text-ssacle-blue'}`}
              disabled={step === 1} // 1단계에서는 비활성화
              onClick={() => setStep(1)}
            >
              ◀️
            </button>
            <button
              className={`w-6 h-6 ml-4 ${step === 2 ? 'text-gray-400' : 'text-ssacle-blue'}`}
              disabled={step === 2} // 2단계에서는 비활성화
              onClick={() => setStep(2)}
            >
              ▶️
            </button>
          </div>
        </div>

        {/* 우측 회원가입 폼 */}
        <div className="w-full md:w-[45%] flex flex-col items-center">
          <h1 className="text-ssacle-blue text-3xl font-bold text-center mb-10">
            회원가입
          </h1>

          {/* 이메일 입력 필드 */}
          <input
            type="email"
            placeholder="Mattermost를 가입한 이메일을 입력해주세요"
            className="w-full max-w-[400px] h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-medium text-base focus:outline-ssacle-blue mb-4"
          />

          {/* 인증 코드 입력 필드 (버튼 클릭시 출력) */}
          {showCodeInput && (
            <input
              type="text"
              placeholder="인증 코드를 입력하세요"
              className="w-full max-w-[400px] h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base text-medium focus:outline-ssacle-blue mb-4"
            />
          )}

          {/* 인증 코드 요청 버튼 */}
          <button
            className={`w-full max-w-[400px] h-12 rounded-full text-center text-xl font-bold mb-4 transition-colors duration-300 ${
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
              className="w-full max-w-[400px] h-12 bg-ssacle-blue rounded-full px-6 text-white text-center text-xl font-bold mb-4"
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
