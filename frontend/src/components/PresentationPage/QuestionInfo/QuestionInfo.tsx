import type { FC } from 'react'

interface QuestionInfoProps {}

const QuestionInfo: FC<QuestionInfoProps> = ({}) => {
  return (
    <div className="flex justify-between w-5/6 px-4 py-2 mx-auto text-center bg-black/20">
      <div aria-label="화이트 박스"></div>
      <div>
        <span className="mr-2 text-lg">Q.</span>
        <span className="text-lg">질문 내용</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span>답변자</span>
        <span className="text-xl">000</span>
      </div>
    </div>
  )
}
export default QuestionInfo
