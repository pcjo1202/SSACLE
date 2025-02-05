import { useState } from 'react'
import SprintCard from './SprintCard'
import SprintPagination from './SprintPagination'

const SprintList = ({ sprints }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 // 한 페이지당 카드 개수

  // 현재 페이지에서 보여줄 데이터만 slice()로 자르기
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSprints = sprints.slice(indexOfFirstItem, indexOfLastItem)

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(sprints.length / itemsPerPage)

  return (
    <div>
      {/* 스프린트 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {currentSprints.length > 0 ? (
          currentSprints.map((sprint) => (
            <SprintCard key={sprint.id} sprint={sprint} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-4">
            조건에 맞는 스프린트가 없습니다.
          </p>
        )}
      </div>

      {/* 페이지네이션 컴포넌트 */}
      <SprintPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default SprintList
