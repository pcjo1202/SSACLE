import Progress from '@/components/Progress/Progress'
import { usePresentation } from '@/store/usePresentation'
import { PRESENTATION_STATUS } from '@/constants/presentationStatus'

const PresentationHeader = () => {
  const { setPresentationStatus } = usePresentation()

  const { BEFORE_PRESENTATION, PRESENTING, QUESTION_CARD, END_PRESENTATION } =
    PRESENTATION_STATUS

  const steps = [
    { step: '준비' },
    { step: '발표' },
    { step: '질문' },
    { step: '평가' },
    { step: '완료' },
  ]
  return (
    <header className="">
      <div className="flex items-center justify-between h-20 px-24">
        {/* logo */}
        <h1 className="text-2xl font-bold text-sky-400">SSACLE</h1>
        {/* 테스트를 위한 버튼 */}
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md bg-ssacle-gray-md text-ssacle-gray-sm hover:bg-gray-600"
            onClick={() => setPresentationStatus(BEFORE_PRESENTATION)}
          >
            준비
          </button>
          <button
            className="px-4 py-2 rounded-md bg-ssacle-gray-md text-ssacle-gray-sm hover:bg-gray-600"
            onClick={() => setPresentationStatus(PRESENTING)}
          >
            발표
          </button>
          <button
            className="px-4 py-2 rounded-md bg-ssacle-gray-md text-ssacle-gray-sm hover:bg-gray-600"
            onClick={() => setPresentationStatus(QUESTION_CARD)}
          >
            질문
          </button>
          <button
            className="px-4 py-2 rounded-md bg-ssacle-gray-md text-ssacle-gray-sm hover:bg-gray-600"
            onClick={() => setPresentationStatus(END_PRESENTATION)}
          >
            완료
          </button>
        </div>
        {/* progress UI */}
        <Progress //
          steps={steps}
          activeStep={1} // 현재 진행 단계
          className="my-4"
        />
      </div>
    </header>
  )
}
export default PresentationHeader
