import UserProfile from '@/components/AdminPage/UserProfile'
import SsaprintInfo from '@/components/AdminPage/SsaprintManagement/SsaprintDetail/SsaprintInfo'
import SsaprintContent from '@/components/AdminPage/SsaprintManagement/SsaprintDetail/SsaprintContent'
import SasprintQuestionTable from '@/components/AdminPage/SsaprintManagement/SsaprintDetail/SsaprintQuestionTable'
import BackButton from '@/components/AdminPage/BackButton'

const SsaprintDetail = () => {
  const sprintData = {
    title: 'useState 스프린트 1차',
    topic: 'Front-end > React > useState',
    period: '2025.01.27 - 2025.02.02',
    description: 'React의 useState에 대해 3일간 공부해요!!!!!!!!!!!!!11',
    learningSchedule: `
      DAY1: 기초 이론과 기본 사용법
      DAY2: 다양한 상태 업데이트 로직
      DAY3: 고급 활용법 정리
    `,
    goal: `
      - 상태 관리에 대한 이해 증진
      - 실제 프로젝트에서 useState를 효과적으로 활용하는 방법 학습
    `,
    members: [
      { id: 1, nickname: '미셸', imageUrl: '' },
      { id: 2, nickname: '쥬니', imageUrl: '' },
      { id: 3, nickname: '펠릭', imageUrl: '' },
      { id: 4, nickname: '시베리아', imageUrl: '' },
    ],
  }

  return (
    <div className="max-w-full min-w-max flex flex-col justify-center items-center p-6 gap-6">
      <h1 className="text-2xl font-bold text-center">싸프린트 상세 조회</h1>

      {/* 스프린트 기본 정보 */}
      <SsaprintInfo
        title={sprintData.title}
        topic={sprintData.topic}
        period={sprintData.period}
        description={sprintData.description}
      />

      {/* 스프린트 멤버 */}
      <div className="mt-6">
        <h2 className="text-ssacle-blue text-lg font-semibold text-center">
          스프린트 멤버
        </h2>
        <div className="flex justify-center gap-4">
          {sprintData.members.map((member) => (
            <UserProfile
              key={member.id}
              imageUrl={member.imageUrl}
              nickname={member.nickname}
            />
          ))}
        </div>
      </div>

      {/* 스프린트 상세 내용 */}
      <div>
        <h2 className="text-ssacle-blue text-lg font-semibold text-center my-4">
          스프린트 상세 내용
        </h2>
        <SsaprintContent
          learningSchedule={sprintData.learningSchedule}
          goal={sprintData.goal}
        />
      </div>

      {/* 질문 카드 테이블 */}
      <div className="max-w-3xl w-full mx-auto px-4">
        <SasprintQuestionTable />
      </div>

      <BackButton />
    </div>
  )
}

export default SsaprintDetail
