import { useState } from 'react'

const SprintTechStackDropdown = ({ selectedStacks, setSelectedStacks }) => {
  const [isOpen, setIsOpen] = useState(false)
  const categories = ['Front-end', 'Back-end', 'Mobile', 'Infra', 'DB'] // 상단 필터 탭
  const stacks = {
    'Front-end': [
      'React',
      'JavaScript',
      'TypeScript',
      'Vue',
      'Svelte',
      'Nextjs',
    ],
    'Back-end': ['Node.js', 'Express', 'NestJS', 'Django', 'Spring', 'Laravel'],
    Mobile: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    Infra: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    DB: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  }

  const [activeCategory, setActiveCategory] = useState('Front-end')

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (stack) => {
    if (selectedStacks.includes(stack)) {
      setSelectedStacks(selectedStacks.filter((s) => s !== stack)) // 선택 해제
    } else {
      setSelectedStacks([...selectedStacks, stack]) // 선택 추가
    }
  }

  return (
    <div className="relative">
      {/* 필터 버튼 */}
      <button
        className={`border rounded px-3 py-1 flex items-center transition text-[12px] font-[350] ${
          isOpen
            ? 'border-blue-500 text-blue-500'
            : selectedStacks.length > 0
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-900'
        }`}
        onClick={toggleDropdown}
      >
        기술스택
        <span
          className={`ml-1 transition ${isOpen ? 'text-blue-500' : 'text-gray-400'}`}
        >
          ▾
        </span>
      </button>

      {/* 기술스택 선택 박스 */}
      {isOpen && (
        <div className="absolute left-0 mt-2 min-w-[500px] bg-white border rounded-lg shadow-lg p-3 flex flex-col gap-3 z-10">
          {/* 상단 카테고리 */}
          <div className="flex gap-4 border-b pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`text-[13px] font-medium ${
                  activeCategory === category
                    ? 'text-black border-b-2 border-blue-500 pb-1'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 기술스택 선택 버튼 */}
          <div className="flex flex-wrap gap-2 mt-2">
            {stacks[activeCategory].map((stack) => (
              <button
                key={stack}
                className={`px-3 py-1.5 rounded-lg border text-[11px] transition flex items-center gap-2 ${
                  selectedStacks.includes(stack)
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => handleSelect(stack)}
              >
                {/* 선택된 경우 아이콘 추가 */}
                <span
                  className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${
                    selectedStacks.includes(stack)
                      ? 'border-blue-500 text-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  ●
                </span>
                {stack}
              </button>
            ))}
          </div>

          {/* 선택된 태그 (드롭다운 내부) */}
          {selectedStacks.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedStacks.map((stack) => (
                <span
                  key={stack}
                  className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 text-[10px] font-medium flex items-center gap-1"
                >
                  {stack}
                  <button
                    className="text-gray-800 hover:text-gray-600 ml-1 text-[10px]"
                    onClick={() =>
                      setSelectedStacks(
                        selectedStacks.filter((s) => s !== stack)
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

export default SprintTechStackDropdown
