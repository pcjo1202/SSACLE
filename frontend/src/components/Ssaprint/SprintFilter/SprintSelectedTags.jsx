const SprintSelectedTags = ({
  selectedPositions,
  setSelectedPositions,
  selectedStacks,
  setSelectedStacks,
}) => {
  return (
    <div className="flex flex-wrap items-center min-h-[1.5rem] px-2 py-0 rounded-md">
      {/* 태그가 없을 때 높이를 유지하기 위한 숨겨진 요소 */}
      {selectedPositions.length === 0 && selectedStacks.length === 0 && (
        <span className="invisible px-2 py-0.5 rounded-full text-[10px]">
          Placeholder
        </span>
      )}

      {/* 선택된 포지션 태그 */}
      {selectedPositions.length > 0 && (
        <div className="flex gap-1">
          {selectedPositions.map((position) => (
            <span
              key={position}
              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1"
            >
              {position}
              <button
                className="text-blue-800 hover:text-blue-600 ml-1 text-[10px]"
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

      {/* 선택된 기술 스택 태그 */}
      {selectedStacks.length > 0 && (
        <div className="flex gap-1 ml-2">
          {selectedStacks.map((stack) => (
            <span
              key={stack}
              className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1"
            >
              {stack}
              <button
                className="text-gray-800 hover:text-gray-600 ml-1 text-[10px]"
                onClick={() =>
                  setSelectedStacks(selectedStacks.filter((s) => s !== stack))
                }
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default SprintSelectedTags
