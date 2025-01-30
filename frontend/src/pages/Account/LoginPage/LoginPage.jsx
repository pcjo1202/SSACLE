import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full h-auto flex justify-center items-center px-[200px] mt-[100px]">
      <div className="grid grid-cols-12 gap-4 w-full ">
        {/* 중앙 4개의 컬럼을 차지하는 컨테이너 */}
        <div className="col-span-4 col-start-5">
          <h1 className="text-[#5194f6] text-3xl font-bold text-center mb-10">
            로그인
          </h1>

          {/* 이메일 입력란 */}
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="이메일 주소를 입력해 주세요"
              className="w-full h-[50px] bg-[#f4f4f4] rounded-full px-6 text-[#5194f6] text-base font-medium focus:outline-[#5194f6]"
            />
          </div>

          {/* 비밀번호 입력란 */}
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="w-full h-[50px] bg-[#f4f4f4] rounded-full px-6 text-[#5194f6] text-base font-medium focus:outline-[#5194f6]"
            />
          </div>

          {/* 이메일 찾기 / 비밀번호 찾기 */}
          <div className="flex justify-end items-center mb-4">
            {/* 이메일 찾기 */}
            <button
              onClick={() =>
                navigate('/account/help', { state: { type: 'email' } })
              }
              className="text-[#242424] text-base font-medium mr-2"
            >
              이메일 찾기
            </button>

            <div className="w-px h-4 bg-neutral-200 mx-2"></div>

            {/* 비밀번호 찾기 */}
            <button
              onClick={() =>
                navigate('/account/help', { state: { type: 'password' } })
              }
              className="text-[#242424] text-base font-medium"
            >
              비밀번호 찾기
            </button>
          </div>

          {/* 로그인 버튼 */}
          <button className="w-full h-[50px] bg-[#5194f6] rounded-full text-white text-xl font-bold mb-4">
            로그인
          </button>

          {/* 회원가입 버튼 */}
          <button
            className="w-full h-[50px] bg-[#e5f0ff] rounded-full text-[#5194f6] text-xl font-bold"
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
