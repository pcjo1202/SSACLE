import SprintBasicInfo from '@/components/SprintCommon/SprintBasicInfo'
import SprintSummary from '@/components/SprintCommon/SprintSummary'

const SsaprintDetailLayout = ({ sprintData }) => {
  if (!sprintData || !sprintData.sprint) {
    return (
      <p className="text-gray-500 text-center">
        스프린트 정보를 불러오는 중...
      </p>
    )
  }

  return (
    <div className="mt-16 flex flex-col gap-4">
      {/* 싸프린트 Info 제목 + 두꺼운 선 */}
      <h2 className="text-lg font-semibold flex items-center gap-2 pb-2 border-b-4 border-gray-200 w-full">
        싸프린트 Info{' '}
        <span role="img" aria-label="lightbulb">
          💡
        </span>
      </h2>

      <div className="flex justify-between items-stretch gap-4 h-auto">
        {/* 기본 정보 (가로 길이 증가) */}
        <div className="flex-1 h-auto">
          <SprintBasicInfo sprint={sprintData.sprint} />
        </div>

        {/* 요약 정보 (높이 맞춤) */}
        <div className="w-[18rem] flex-shrink-0 h-auto flex">
          <SprintSummary
            recommendedFor={sprintData.recommended_for}
            benefits={sprintData.benefits}
            participation={sprintData.sprint.participation}
            recruit={sprintData.sprint.recruit}
          />
        </div>
      </div>

      {/* 상세 정보 컨테이너 */}
    </div>
  )
}

export default SsaprintDetailLayout
