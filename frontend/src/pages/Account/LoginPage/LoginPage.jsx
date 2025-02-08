import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.')
    } else {
      setError('')
      // TODO: 로그인 처리 로직
    }
  }

  return (
    <div className="min-w-max h-full flex justify-center items-center">
      <div className="flex flex-col gap-[1rem] w-[30rem] shrink-0 px-[1rem]">
        <h1 className="text-ssacle-blue text-3xl font-bold text-center mb-5">
          로그인
        </h1>

        <div className="relative">
          <input
            type="email"
            placeholder="이메일 주소를 입력해 주세요"
            className="w-full h-[3rem] bg-ssacle-gray-sm rounded-full px-[1.5rem] text-ssacle-blue text-base font-medium focus:outline-ssacle-blue"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            className="w-full h-[3rem] bg-ssacle-gray-sm rounded-full px-[1.5rem] text-ssacle-blue text-base font-medium focus:outline-ssacle-blue"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end items-center">
          <button
            onClick={() =>
              navigate('/account/help', { state: { activeTab: 'email' } })
            }
            className="text-ssacle-black text-base font-medium mr-[0.5rem]"
          >
            이메일 찾기
          </button>
          <div className="w-[0.0625rem] h-[1rem] bg-neutral-200 mx-[0.5rem]"></div>
          <button
            onClick={() =>
              navigate('/account/help', { state: { activeTab: 'password' } })
            }
            className="text-ssacle-black text-base font-medium"
          >
            비밀번호 찾기
          </button>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <button
          onClick={handleLogin}
          className="w-full h-[3rem] bg-ssacle-blue rounded-full text-white text-xl font-bold"
        >
          로그인
        </button>

        <button
          className="w-full h-[3rem] bg-ssacle-sky rounded-full text-ssacle-blue text-xl font-bold"
          onClick={() => navigate('/account/signup')}
        >
          회원가입
        </button>
      </div>
    </div>
  )
}

export default LoginPage
