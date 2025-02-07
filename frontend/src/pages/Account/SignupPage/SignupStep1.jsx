import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSendVerification } from '@/services/userService'
import { useMutation, useQuery } from '@tanstack/react-query'

const SignupStep1 = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 현재 단계를 관리하는 상태 (1단계 / 2단계)
  const [webhookUrl, setWebhookUrl] = useState(
    'https://meeting.ssafy.com/hooks/kb7fwmnuj7ymx81g1gsk4szaur'
  ) // ✅ 웹훅 URL 상태 추가
  const [email, setEmail] = useState('ssafy@ssafy.com') // ✅ 이메일 상태 추가
  const [showCodeInput, setShowCodeInput] = useState(false) // 인증 코드 입력창 표시 여부
  const [isLoading, setIsLoading] = useState(false) // ✅ 요청 중 상태
  const [errorMessage, setErrorMessage] = useState('') // ✅ 오류 메시지 상태 추가

  // useEffect(() => {
  //   const test = async () => {
  //     const resonse = await fetchSendVerification()

  //     const data = resonse.json()
  //   }

  //   test()
  // }, [])

  const muatation = useMutation({
    mutationFn: (email) => fetchSendVerification(email),
  })

  console.log(muatation)

  // ✅ 인증 코드 요청 함수
  const handleSendVerification = async () => {
    if (!webhookUrl || !email) {
      setErrorMessage('웹훅 URL과 이메일을 모두 입력해주세요.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      // await fetchSendVerification(email, webhookUrl)
      muatation.mutate()
      setShowCodeInput(true) // ✅ 성공하면 인증 코드 입력창 표시
    } catch (error) {
      setErrorMessage('인증 코드 전송에 실패했습니다. 다시 시도해주세요.')
      console.error('❌ 인증 코드 전송 실패:', error)
    } finally {
      setIsLoading(false) // ✅ 요청 완료 후 로딩 상태 해제
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[80%] max-w-[1200px] flex flex-col md:flex-row items-center justify-between">
        {/* 좌측 컨텐츠 */}
        <div className="w-full md:w-[45%] bg-white p-12 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold text-ssacle-blue mb-4">
            SSAFY인 인증하는 방법
          </h2>
          <p className="text-sm text-ssacle-black font-bold mb-2">{step}단계</p>
          <div className="text-left">
            {step === 1 ? (
              <ol className="text-sm text-ssacle-black list-disc list-inside">
                <li>싸피 MatterMost에서 원하는 서버를 클릭</li>
                <li>인증 코드를 받을 Private 채널을 만든다</li>
                <ol className="list-disc list-inside pl-4">
                  <li>채널 하단 Add channels 클릭</li>
                  <li>새로운 채널 생성</li>
                  <li>이름 자유롭게 작성 후 Private Channel 클릭</li>
                  <li>채널 만들기</li>
                </ol>
              </ol>
            ) : (
              <ol className="text-sm text-ssacle-black list-disc list-inside">
                <li>
                  채널을 만든 서버를 켠 상태에서 좌측 상단 MatterMost 로고 클릭
                </li>
                <li>‘통합’ 클릭</li>
                <li>'전체 Incoming Webhook' 메뉴 클릭</li>
                <li>'Incoming Webhook 추가하기' 버튼 클릭</li>
                <li>
                  ‘제목’ 자유롭게 입력 후 ‘채널’을 클릭하여 방금 만든 채널을
                  선택 후 저장
                </li>
                <li>화면에 뜨는 URL 복사하여 우측 Webhook URL에 붙여넣기</li>
                <li>
                  MM 가입한 이메일을 입력 후 인증 코드 받기 버튼을 누르면
                  만들어놓은 채널에 인증 코드가 전송됩니다!
                </li>
              </ol>
            )}
          </div>

          {/* 화살표 네비게이션 */}
          <div className="flex justify-center mt-4">
            <button
              className={`w-6 h-6 ${step === 1 ? 'text-ssacle-gray' : 'text-ssacle-blue'}`}
              disabled={step === 1}
              onClick={() => setStep(1)}
            >
              ◀️
            </button>
            <button
              className={`w-6 h-6 ml-4 ${step === 2 ? 'text-ssacle-gray' : 'text-ssacle-blue'}`}
              disabled={step === 2}
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

          {/* 웹훅 URL 입력 필드 */}
          <input
            type="url"
            placeholder="Webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)} // ✅ 입력값 업데이트
            className="w-full max-w-[400px] h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-medium text-base focus:outline-ssacle-blue mb-4"
          />

          {/* 이메일 입력 필드 */}
          <input
            type="email"
            placeholder="Mattermost에 가입한 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // ✅ 입력값 업데이트
            className="w-full max-w-[400px] h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-medium text-base focus:outline-ssacle-blue mb-4"
          />

          {/* 오류 메시지 출력 */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* 인증 코드 요청 버튼 */}
          <button
            className={`w-full max-w-[400px] h-12 rounded-full text-center text-xl font-bold mb-4 transition-colors duration-300 ${
              isLoading ? 'bg-gray-400' : 'bg-ssacle-blue text-white'
            }`}
            onClick={handleSendVerification}
            disabled={isLoading} // ✅ 로딩 중이면 버튼 비활성화
          >
            {isLoading ? '전송 중...' : 'Mattermost로 인증 코드 받기'}
          </button>

          {/* 인증 코드 입력 필드 */}
          {showCodeInput && (
            <input
              type="text"
              placeholder="인증 코드를 입력하세요"
              className="w-full max-w-[400px] h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base text-medium focus:outline-ssacle-blue mb-4"
            />
          )}

          {showCodeInput && (
            <button
              className="w-full max-w-[400px] h-12 bg-ssacle-blue rounded-full px-6 text-white text-center text-xl font-bold mb-4"
              onClick={() => navigate('step2')} // ✅ 다음 단계로 이동
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
