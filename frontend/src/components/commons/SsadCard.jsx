const stackLogos = {
  React: '/src/mocks/react-logo.png',
  Python: '/src/mocks/python-logo.png',
}

const SsadCard = ({ sprintData }) => {
  const {
    title,
    category,
    status,
    requiredSkills,
    currentMembers,
    maxMembers,
    startDate,
    endDate,
  } = sprintData

  const logoPath =
    stackLogos[requiredSkills[0]] || '/src/mocks/default-logo.png'

  return (
    <div className="bg-gradient-to-bl from-cyan-400 via-cyan-500 to-cyan-600 h-54 w-full rounded-xl p-5  relative">
      <div className="text-white">
        <p className="text-2xl font-bold mb-3">{requiredSkills[0]}</p>
        <p className="text-l font-semibold mb-3">{title}</p>
        <p className="text-sm font-medium">시작일 {startDate}</p>
        <p className="text-sm font-medium">종료일 {endDate}</p>
        <p className="text-sm font-medium mb-3">
          {status}{' '}
          <span>
            {currentMembers} / {maxMembers}
          </span>
        </p>
        <p className="text-cyan-600 text-sm font-semibold bg-white w-20 h-7 rounded-md flex items-center justify-center">
          신청하기
        </p>
      </div>
      <div className="absolute bottom-5 right-5">
        <img src={logoPath} alt={`${category} logo`} className="w-20 h-20" />
      </div>
    </div>
  )
}

export default SsadCard
