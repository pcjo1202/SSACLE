const MySsaprintList = ({ currentSprintsData }) => {
  return (
    <div className="bg-white w-full h-60 rounded-xl pt-3 pl-6 text-ssacle-black">
      <div className="flex flex-col">
        {/* 제목 영역 */}
        <p className="tracking-tighter text-xl font-bold mb-8">
          나의 싸프린트 & 싸드컵 🌟
        </p>

        {/* currentSprintsData 배열을 순회하며 각 스프린트 정보 표시 */}
        {currentSprintsData.map((sprint) => {
          // 현재 날짜와 종료 날짜 비교
          const currentDate = new Date()
          const endDate = new Date(sprint.endDate)
          const isActive = currentDate <= endDate // 현재 진행중이면 true

          // 상태에 따른 색상 설정 (진행중: 녹색, 종료: 회색)
          const statusColor = isActive ? 'bg-green-500' : 'bg-ssacle-gray'

          // 뱃지 너비 동적 설정
          const badgeWidth = sprint.cls === '싸프린트' ? 'w-20' : 'w-16'
          const dateBadgeWidth = sprint.progressDate.includes('일')
            ? 'w-10'
            : 'w-14'

          return (
            // 각 스프린트 항목
            <div
              key={sprint.sprintId}
              className="flex flex-row gap-x-2 mb-2 items-center"
            >
              {/* 상태 표시 점 */}
              <div
                className={`${statusColor} w-1.5 h-1.5 rounded-xl self-start`}
              ></div>

              {/* 스프린트 제목 */}
              <p className="tracking-tighter text-l font-medium mr-2">
                {sprint.title}
              </p>

              {/* 분류 뱃지 */}
              <p
                className={`${statusColor} ${badgeWidth} font-medium h-6 rounded-xl text-center text-white text-sm`}
              >
                {sprint.cls}
              </p>

              {/* 진행 기간 뱃지 */}
              <p
                className={`${statusColor} ${dateBadgeWidth} font-medium h-6 rounded-xl text-center text-white text-sm`}
              >
                {sprint.progressDate}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MySsaprintList
