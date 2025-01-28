import { CheckIcon, Circle } from 'lucide-react'

const Progress = ({
  steps = [],
  activeStep = 0, // 현재 진행 단계
  activeColor = 'bg-gray-400', // 현재 진행 단계 색상
  completedColor = 'bg-ssacle-blue', // 완료 단계 색상
  inactiveColor = 'bg-white', // 미완료 단계 색상
  lineColor = 'bg-gray-700', // 선 색상
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className} gap-16`}>
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${
                  idx < activeStep // 완료 단계
                    ? completedColor
                    : idx === activeStep // 진행 단계
                      ? activeColor
                      : inactiveColor // 미완료 단계
                }`}
            >
              {/* 완료 단계 */}
              {idx < activeStep && <CheckIcon className="size-4" />}
              {/* 진행 단계 */}
              {idx === activeStep && <Circle className="size-4" />}
            </div>
            <span className="text-sm text-gray-500">{step.step}</span>
          </div>
          {/* 선 */}
          {idx < steps.length - 1 && (
            <div
              className={`w-16 h-1 ${lineColor} absolute left-full top-1/4`}
            ></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Progress
