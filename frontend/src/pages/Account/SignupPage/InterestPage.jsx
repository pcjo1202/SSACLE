import { useState } from "react"
import { useNavigate } from "react-router-dom";

const InterestPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(new Set())
  const userNickname = '싸피인' // 실제 데이터와 연결 필요

  const toggleSelection = (interest) => {
    setSelected((prev) => {
      const newSelection = new Set(prev)
      if (newSelection.has(interest)) {
        newSelection.delete(interest)
      } else {
        newSelection.add(interest)
      }
      return newSelection
    })
  }

  const mainCategories = ['백엔드', '프론트엔드', '데이터', '모바일', '네트워크', '보안']
  const subCategories = ['Swift', 'Kotlin', 'MySQL', 'C++', 'Python', 'Java', 'Django', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js']

  return (
    <div className="w-full h-auto bg-white flex flex-col items-center py-10 px-[200px]">
      <p className="text-[#E5E5E5] text-xl font-noto-sans-kr font-light mb-2">
        거의 다 됐어요!
      </p>
      <h2 className="text-[#242424] text-2xl font-noto-sans-kr font-light mb-2">
        <span className="font-bold">{userNickname}</span>님의 관심 주제를 알려주세요!
      </h2>
      <p className="text-center text-[#242424] text-2xl font-noto-sans-kr font-light mb-2">
        <p>해당 키워드를 바탕으로, </p>
        <p>훨씬 수월하게 콘텐츠를 고를 수 있어요!</p>
      </p>
      <p className="text-[#E5E5E5] text-xl font-noto-sans-kr font-light mb-20">
        마이페이지에서 언제든 수정할 수 있어요!
      </p>

      {/* 주요 카테고리 */}
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-start-5 col-span-4 flex flex-wrap justify-center gap-4 mb-10">
          {mainCategories.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleSelection(interest)}
              className={`px-6 py-2 rounded-full text-xl font-bold font-montserrat transition-colors duration-200 ${selected.has(interest) ? 'bg-[#5195f7] text-white' : 'bg-[#e5f0ff] text-[#5194f6]'}`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[20px] border-b-4 border-[#f4f4f4] mb-10"></div>

      {/* 서브 카테고리 */}
      <div className="grid grid-cols-12 gap-4 w-full mb-10">
        <div className="col-start-4 col-span-6 flex flex-wrap justify-center gap-4">
          {subCategories.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleSelection(interest)}
              className={`px-6 py-2 rounded-full text-xl font-bold font-montserrat transition-colors duration-200 ${selected.has(interest) ? 'bg-[#5195f7] text-white' : 'bg-[#e5f0ff] text-[#5194f6]'}`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mt-10 px-10 py-3 bg-[#242424] text-white text-xl font-bold font-noto-sans-kr rounded-full"
        onClick={() => navigate("/account/signup/success")} // 다음 단계로 이동
      >
        저장하기
      </button>
    </div>
  )
}

export default InterestPage
