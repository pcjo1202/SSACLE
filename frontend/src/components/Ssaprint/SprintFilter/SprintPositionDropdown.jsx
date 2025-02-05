import { useState } from 'react'

const SprintPositionDropdown = ({
  selectedPositions,
  setSelectedPositions,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const positions = ['Front-end', 'Back-end', 'Mobile', 'Infra', 'DB'] // 필터 목록

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (position) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(selectedPositions.filter((p) => p !== position)) // 선택 해제
    } else {
      setSelectedPositions([...selectedPositions, position]) // 선택 추가
    }
  }

  // 필터가 적용되었는지 확인
  const isFiltered = selectedPositions.length > 0

  return (
    <div className="relative">
      {/* 필터 버튼 */}
      <button
        className={`border rounded px-3 py-1 flex items-center transition text-[12px] font-[350] ${
          isOpen
            ? 'border-blue-500 text-blue-500' // 드롭다운이 열렸을 때 스타일
            : isFiltered
              ? 'bg-blue-100 border-blue-500 text-blue-700' // 필터가 적용된 상태
              : 'border-gray-300 text-gray-900' // 기본 상태
        }`}
        onClick={toggleDropdown}
      >
        포지션
        <span
          className={`ml-1 transition ${
            isOpen
              ? 'text-blue-500'
              : isFiltered
                ? 'text-blue-700'
                : 'text-gray-400'
          }`}
        >
          ▾
        </span>
      </button>

      {/* 포지션 선택 박스 */}
      {isOpen && (
        <div className="absolute left-0 mt-2 min-w-[350px] bg-white border rounded-lg shadow-lg p-3 flex flex-col gap-3 z-10">
          {/* 포지션 선택 버튼 */}
          <div className="flex flex-wrap gap-2">
            {positions.map((position) => (
              <button
                key={position}
                className={`px-4 py-1 rounded-full border text-[12px] transition ${
                  selectedPositions.includes(position)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => handleSelect(position)}
              >
                {position}
              </button>
            ))}
          </div>

          {/* 선택된 태그 (드롭다운 내부) */}
          {selectedPositions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedPositions.map((position) => (
                <span
                  key={position}
                  className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-medium flex items-center gap-1"
                >
                  {position}
                  <button
                    className="text-blue-800 hover:text-blue-600 ml-1"
                    onClick={() =>
                      setSelectedPositions(
                        selectedPositions.filter((p) => p !== position)
                      )
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SprintPositionDropdown
