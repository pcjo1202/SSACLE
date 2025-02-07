import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { fetchCheckNickname } from '@/services/userService'

const SignupStep2 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const confirmPasswordRef = useRef(null)

  // 닉네임 상태
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(false) // 닉네임 인증 상태

  // 비밀번호 상태
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false) // 비밀번호 불일치 메시지

  // 닉네임 중복 확인 Mutation
  const nicknameMutation = useMutation({
    mutationFn: () => fetchCheckNickname(nickname),
    onSuccess: (data) => {
      if (data) {
        alert('이미 사용 중인 닉네임입니다.')
        setIsNicknameValid(false)
      } else {
        setIsNicknameValid(true)
      }
    },
    onError: (error) => {
      console.error('닉네임 중복 확인 상태:', error)
      alert('닉네임 확인 중 오류가 발생했습니다. 다시 시도해주세요.')
    },
  })

  // 비밀번호 확인 함수
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (password && e.target.value && password !== e.target.value) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  // 회원가입 버튼 클릭 시 최종 검증
  const handleSignup = () => {
    if (!password || !confirmPassword) {
      setPasswordError(true)
      confirmPasswordRef.current.focus()
      return
    }
    if (password !== confirmPassword) {
      setPasswordError(true)
      confirmPasswordRef.current?.focus() // 🔥 불일치 시 포커스 이동
      confirmPasswordRef.current?.classList.add('animate-shake') // 🔥 깜빡이게 애니메이션 추가
      setTimeout(() => {
        confirmPasswordRef.current?.classList.remove('animate-shake') // 0.5초 후 제거
      }, 500)

      return
    }
    navigate('/account/signup/interest')
  }

  return (
    <>
      <div className="w-full h-auto flex justify-center items-center mt-24">
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-6 col-start-4">
            <h1 className="text-ssacle-blue text-3xl font-bold text-center mb-10">
              회원가입
            </h1>
            <p className="w-full border-b-4 border-ssacle-gray-sm mb-6 text-ssacle-gray text-xs text-right ">
              *표시는 필수 입력 항목입니다.
            </p>
            <div className="grid grid-cols-6 gap-4">
              {/* 학번 */}
              <label className="col-span-2 text-ssacle-black text-xl font-medium py-2">
                학번 *
              </label>
              <input
                type="text"
                placeholder="학번을 입력하세요."
                className="col-span-3 col-start-3 h-12 bg-ssacle-gray-sm rounded-full flex items-center px-6 text-base text-ssacle-blue focus:outline-ssacle-blue mb-4"
              />
              <button className="col-span-1 col-start-6 h-12 bg-ssacle-blue rounded-full text-white text-base font-bold mb-4">
                중복확인
              </button>

              {/* 이메일 */}
              <label className="col-span-2 text-ssacle-black text-xl font-medium py-2">
                이메일 *
              </label>
              <div className="col-span-4 col-start-3">
                <div className="h-12 bg-ssacle-gray-sm rounded-full flex items-center px-6 text-lg text-ssacle-black">
                  ssafy@ssafy.com
                </div>
                <p className="text-ssacle-blue text-sm mt-1 mb-4">
                  인증이 완료되었습니다.
                </p>
              </div>
            </div>
            <div className="border-b-2 border-ssacle-gray-sm my-6" />

            <div className="grid grid-cols-6 gap-4">
              {/* 닉네임 입력 */}
              <label className="col-span-2 text-ssacle-black text-xl font-medium py-2">
                닉네임 *
              </label>
              <input
                type="text"
                placeholder="사용할 닉네임을 입력해 주세요."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="col-span-3 col-start-3 h-12 bg-ssacle-gray-sm rounded-full flex items-center px-6 text-base text-ssacle-blue focus:outline-ssacle-blue mb-4"
              />

              <button
                className="col-span-1 col-start-6 h-12 bg-ssacle-blue rounded-full text-white text-base font-bold mb-4"
                onClick={() => nicknameMutation.mutate()} // ✅ 닉네임 중복 확인 실행
                disabled={nicknameMutation.isLoading} // 로딩 중이면 버튼 비활성화
              >
                {nicknameMutation.isLoading ? '확인 중...' : '중복확인'}
              </button>
            </div>
            <div className="border-b-2 border-ssacle-gray-sm my-6" />

            <div className="grid grid-cols-6 gap-4">
              {/* 비밀번호 입력 */}
              <label className="col-span-2 text-ssacle-black text-xl font-medium py-2">
                비밀번호 *
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-4 col-start-3 h-12 bg-ssacle-gray-sm rounded-full flex items-center px-6 text-base text-ssacle-blue focus:outline-ssacle-blue mb-4"
              />
              {/* 비밀번호 재확인 */}
              <label className="col-span-2 text-ssacle-black text-xl font-medium py-2">
                비밀번호 확인 *
              </label>
              <input
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} // 실시간 검증 함수 호출
                ref={confirmPasswordRef}
                className="col-span-4 col-start-3 h-12 bg-ssacle-gray-sm rounded-full flex items-center px-6 text-base text-ssacle-blue focus:outline-ssacle-blue mb-4"
              />

              {/* 비밀번호 불일치 메세지 */}
              {passwordError && (
                <p className="col-span-4 col-start-3 text-red-500 text-sm">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
            <div className="border-b-2 border-ssacle-gray-sm my-6" />

            {/* 약관 동의 */}
            <label className="flex items-center space-x-2 px-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-ssacle-blue checked:bg-ssacle-blue checked:border-transparent"
              />
              <span className="text-ssacle-black text-base font-medium">
                서비스 이용 약관
              </span>
            </label>
            <label className="flex items-center space-x-2 mt-2 px-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-ssacle-blue checked:bg-ssacle-blue checked:border-transparent"
              />
              <span className="text-ssacle-black text-base font-medium">
                개인정보 수집 / 이용 동의
              </span>
            </label>
            <p className="text-[#f03939] text-sm px-2 mt-2 mb-10">
              필수 약관은 동의가 필요합니다.
            </p>

            {/* 회원가입 버튼 */}
            <div className="grid grid-cols-6 gap-4 mb-12">
              <button
                className="col-span-2 col-start-3 h-12 bg-ssacle-blue rounded-full px-6 text-white text-center text-xl font-bold mb-4"
                onClick={handleSignup}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupStep2
