import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()

  // 이메일, 비밀번호, 에러 메시지를 위한 상태 관리
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 로그인 버튼 클릭 시 실행될 함수
  const handleLogin = () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.')
    } else {
      setError('')
      // TODO: 로그인 처리 로직
    }
  }

  return (
    <div className="w-full h-auto flex justify-center items-center mt-24">
      <div className="grid grid-cols-12 gap-4 w-full ">
        {/* 중앙 4개의 컬럼을 차지하는 컨테이너 */}
        <div className="col-span-4 col-start-5">
          <h1 className="text-ssacle-blue text-3xl font-bold text-center mb-10">
            로그인
          </h1>

          {/* 이메일 입력란 */}
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="이메일 주소를 입력해 주세요"
              className="w-full h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base font-medium focus:outline-ssacle-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력란 */}
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="w-full h-12 bg-ssacle-gray-sm rounded-full px-6 text-ssacle-blue text-base font-medium focus:outline-ssacle-blue"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 이메일 찾기 / 비밀번호 찾기 */}
          <div className="flex justify-end items-center mb-4">
            {/* 이메일 찾기 */}
            <button
              onClick={() =>
                navigate('/account/help', { state: { type: 'email' } })
              }
              className="text-ssacle-black text-base font-medium mr-2"
            >
              이메일 찾기
            </button>

            <div className="w-px h-4 bg-neutral-200 mx-2"></div>

            {/* 비밀번호 찾기 */}
            <button
              onClick={() =>
                navigate('/account/help', { state: { type: 'password' } })
              }
              className="text-ssacle-black text-base font-medium"
            >
              비밀번호 찾기
            </button>
          </div>

          {/* 에러 메시지를 조건부로 표시 */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {/* 로그인 버튼 */}
          <button
            onClick={handleLogin}
            className="w-full h-12 bg-ssacle-blue rounded-full text-white text-xl font-bold mb-4"
          >
            로그인
          </button>

          {/* 회원가입 버튼 */}
          <button
            className="w-full h-12 bg-ssacle-sky rounded-full text-ssacle-blue text-xl font-bold"
            onClick={() => navigate('/account/signup')}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
