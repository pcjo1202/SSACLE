import { useNavigate } from 'react-router-dom'

const SignupStep2 = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="w-full h-auto flex justify-center items-center px-[200px] mt-[100px]">
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-6 col-start-4">
            <h1 className="text-[#5195F7] text-3xl font-bold text-center mb-10">
              회원가입
            </h1>
            <p className="w-full border-b-4 border-[#f4f4f4] mb-6 text-[#E5E5E5] text-xs text-right ">
              *표시는 필수 입력 항목입니다.
            </p>
            <div className="grid grid-cols-6 gap-4">
              {/* 학번 */}
              <label className="col-span-2 text-[#242424] text-xl font-medium py-2">
                학번 *
              </label>
              <div className="col-span-4 col-start-3">
                <div className="h-[50px] bg-[#f4f4f4] rounded-full flex items-center px-6 text-lg text-[#242424]">
                  1234567
                </div>
                <p className="text-[#5194f6] text-sm mt-1">
                  인증이 완료되었습니다.
                </p>
              </div>

              {/* 이메일 */}
              <label className="col-span-2 text-[#242424] text-xl font-medium py-2">
                이메일 *
              </label>
              <div className="col-span-4 col-start-3">
                <div className="h-[50px] bg-[#f4f4f4] rounded-full flex items-center px-6 text-lg text-[#242424]">
                  ssafy@ssafy.com
                </div>
                <p className="text-[#5194f6] text-sm mt-1 mb-4">
                  인증이 완료되었습니다.
                </p>
              </div>
            </div>
            <div className="border-b-2 border-[#f4f4f4] my-6" />

            <div className="grid grid-cols-6 gap-4">
              {/* 닉네임 입력 */}
              <label className="col-span-2 text-[#242424] text-xl font-medium py-2">
                닉네임 *
              </label>
              <input
                type="text"
                placeholder="싸클에서 사용할 닉네임을 입력해 주세요."
                className="col-span-3 col-start-3 h-[50px] bg-[#f4f4f4] rounded-full flex items-center px-6 text-base text-[#5195F7] focus:outline-[#5195F7] mb-4"
              />
              <button className="col-span-1 col-start-6 h-[50px] bg-[#5195F7] rounded-full text-white text-base font-bold mb-4">
                중복확인
              </button>
            </div>
            <div className="border-b-2 border-[#f4f4f4] my-6" />

            <div className="grid grid-cols-6 gap-4">
              {/* 비밀번호 입력 */}
              <label className="col-span-2 text-[#242424] text-xl font-medium py-2">
                비밀번호 *
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                className="col-span-4 col-start-3 h-[50px] bg-[#f4f4f4] rounded-full flex items-center px-6 text-base text-[#5195F7] focus:outline-[#5195F7] mb-4"
              />
              {/* 비밀번호 재확인 */}
              <label className="col-span-2 text-[#242424] text-xl font-medium py-2">
                비밀번호 확인 *
              </label>
              <input
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요"
                className="col-span-4 col-start-3 h-[50px] bg-[#f4f4f4] rounded-full flex items-center px-6 text-base text-[#5195F7] focus:outline-[#5195F7] mb-4"
              />
            </div>
            <div className="border-b-2 border-[#f4f4f4] my-6" />

            {/* 약관 동의 */}
            <label className="flex items-center space-x-2 px-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-[#5195F7] checked:bg-[#5195F7] checked:border-transparent"
              />
              <span className="text-[#242424] text-base font-medium">
                서비스 이용 약관
              </span>
            </label>
            <label className="flex items-center space-x-2 mt-2 px-2">
              <input
                type="checkbox"
                className="w-5 h-5 text-[#5195F7] checked:bg-[#5195F7] checked:border-transparent"
              />
              <span className="text-[#242424] text-base font-medium">
                개인정보 수집 / 이용 동의
              </span>
            </label>
            <p className="text-[#f03939] text-sm px-2 mt-2 mb-10">
              필수 약관은 동의가 필요합니다.
            </p>

            {/* 회원가입 버튼 */}
            <div className="grid grid-cols-6 gap-4 mb-[50px]">
              <button
                className="col-span-2 col-start-3 h-[50px] bg-[#5195F7] rounded-full px-6 text-white text-center text-xl font-bold mb-4"
                onClick={() => navigate('/account/signup/interest')} // 다음 단계로 이동
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
