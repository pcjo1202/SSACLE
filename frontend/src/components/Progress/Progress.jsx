import { CheckIcon, Circle } from 'lucide-react'
import { useMemo } from 'react'

const Progress = ({
  steps = [],
  activeStep = '', // 현재 진행 단계
  activeColor = 'bg-gray-400', // 현재 진행 단계 색상
  completedColor = 'bg-ssacle-blue', // 완료 단계 색상
  inactiveColor = 'bg-white', // 미완료 단계 색상
  lineColor = 'bg-gray-700', // 선 색상
  className = '',
}) => {
  const activeStepIndex = useMemo(() => {
    return steps.findIndex((step) => step.status === activeStep)
  }, [steps, activeStep])

  console.log(activeStepIndex, activeStep)

  return (
    <div className={`flex items-center ${className} gap-16`}>
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex items-center justify-center ">
          <div className="flex flex-col items-center justify-center gap-1">
            <div
              className={`size-5 rounded-full flex items-center justify-center
                ${
                  idx < activeStepIndex // 완료 단계
                    ? completedColor
                    : idx === activeStepIndex // 진행 단계
                      ? activeColor
                      : inactiveColor // 미완료 단계
                }`}
            >
              {/* 완료 단계 */}
              {idx < activeStepIndex && <CheckIcon className="size-2" />}
              {/* 진행 단계 */}
              {idx === activeStepIndex && <Circle className="size-2" />}
            </div>
            <span className="text-sm text-gray-500">{step.step}</span>
          </div>
          {/* 선 */}
          {idx < steps.length - 1 && (
            <div
              className={`w-16 h-1 ${lineColor} absolute left-full top-2`}
            ></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Progress
