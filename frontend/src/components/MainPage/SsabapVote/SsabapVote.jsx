import { useState } from 'react'

const SsabapVote = () => {
  // 투표 여부와 투표 결과를 관리하는 상태
  const [hasVoted, setHasVoted] = useState(false)
  const [votes, setVotes] = useState({
    menu1: 72, // 첫 번째 메뉴의 득표율
    menu2: 28, // 두 번째 메뉴의 득표율
  })

  // 투표 처리 함수
  const handleVote = (menu) => {
    setHasVoted(true)
    // 여기서 실제 투표 로직 구현
  }

  return (
    <div>
      {/* 제목 영역 */}
      <p className="tracking-tighter text-xl font-bold text-ssacle-black mb-6 flex gap-2">
        오늘의 싸밥 🍚
      </p>

      {/* 투표 컨테이너 */}
      <div className="flex gap-4">
        {/* 왼쪽 메뉴 */}
        <div className="flex-1 flex flex-col items-center">
          {/* 메뉴 이미지 */}
          <img
            src="/src/mocks/menu1.png"
            alt="비지찌개&떡볶이"
            className="w-50 h-40 object-cover rounded-lg mb-3"
          />
          {/* 투표 버튼: 투표 전에는 물음표, 투표 후에는 득표율 표시.
          투표 후 더 많은 표를 받은 메뉴는 파란색, 적은 메뉴는 회색으로 표시 */}
          <button
            onClick={() => handleVote('menu1')}
            className={`flex-1 w-full p-3 rounded-lg text-center font-medium ${
              hasVoted
                ? votes.menu1 > votes.menu2
                  ? 'bg-blue-500 text-white'
                  : 'bg-ssacle-gray'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={hasVoted} // 투표 완료 시 버튼 비활성화
          >
            {hasVoted ? `${votes.menu1}%` : '?'}
          </button>
          {/* 메뉴 이름 */}
          <p className="text-ssacle-black text-center mt-2 font-medium text-base">
            비지찌개 & 햄채소스크램블에그
          </p>
        </div>

        {/* VS 표시 */}
        <div className="flex items-center text-xl font-bold text-ssacle-blue">
          VS
        </div>

        {/* 투표 버튼: 투표 전에는 물음표, 투표 후에는 득표율 표시.
        투표 후 더 많은 표를 받은 메뉴는 파란색, 적은 메뉴는 회색으로 표시 */}
        <div className="flex-1 flex flex-col items-center">
          <img
            src="/src/mocks/menu2.png"
            alt="장조림비빔밥"
            className="w-50 h-40 object-cover rounded-lg mb-3"
          />
          <button
            onClick={() => handleVote('menu2')}
            className={`w-full p-3 rounded-lg text-center font-medium ${
              hasVoted
                ? votes.menu2 > votes.menu1
                  ? 'bg-blue-500 text-white'
                  : 'bg-ssacle-gray'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={hasVoted}
          >
            {hasVoted ? `${votes.menu2}%` : '?'}
          </button>
          <p className="text-ssacle-black text-center mt-2 font-medium text-base">
            장조림버터밥 & 쫄면채소무침
          </p>
        </div>
      </div>
    </div>
  )
}

export default SsabapVote
