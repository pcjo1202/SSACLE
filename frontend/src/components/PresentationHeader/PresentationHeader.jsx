import Progress from '@/components/Progress/Progress'

const PresentationHeader = () => {
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
