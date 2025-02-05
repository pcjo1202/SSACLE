import { useState } from 'react'
import SprintPositionDropdown from './SprintPositionDropdown'
import SprintTechStackDropdown from './SprintStackDropdown'
import SprintSelectedTags from './SprintSelectedTags'

const SprintFilter = () => {
  const [selectedPositions, setSelectedPositions] = useState([])
  const [selectedStacks, setSelectedStacks] = useState([])

  return (
    <div className="flex flex-col gap-2 pb-1">
      {/* 상단 탭 (참여 가능 / 참여 완료) */}
      <div className="flex gap-6 text-[14px] font-medium">
        <button className="text-black border-b-2 border-black">
          참여 가능
        </button>
        <button className="text-gray-400">참여 완료</button>
      </div>

      {/* 구분선 */}
      <hr className="border-gray-200" />

      {/* 필터 드롭다운 + 검색창 */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {/* 포지션 필터 */}
          <SprintPositionDropdown
            selectedPositions={selectedPositions}
            setSelectedPositions={setSelectedPositions}
          />
          {/* 기술스택 필터 */}
          <SprintTechStackDropdown
            selectedStacks={selectedStacks}
            setSelectedStacks={setSelectedStacks}
          />
        </div>

        {/* 검색창 */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="검색어 입력"
            className="w-full border rounded px-3 py-1 bg-white pl-3 text-[12px] font-light"
          />
        </div>
      </div>

      {/* 구분선 */}
      <hr className="border-gray-200" />

      {/* 선택된 태그 리스트 */}
      <SprintSelectedTags
        selectedPositions={selectedPositions}
        setSelectedPositions={setSelectedPositions}
        selectedStacks={selectedStacks}
        setSelectedStacks={setSelectedStacks}
      />

      {/* 구분선 */}
      <hr className="border-gray-200 mt-0" />
    </div>
  )
}

export default SprintFilter
