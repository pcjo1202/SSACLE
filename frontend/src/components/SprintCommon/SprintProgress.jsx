const SprintProgress = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">
        싸프린트 진행 방식
      </h2>
      <p className="text-sm text-gray-700">
        싸프린트는{' '}
        <span className="font-semibold">학습 → 발표 & 질문/답변 → 투표</span>의
        순서로 진행됩니다.
      </p>
      <ul className="list-none space-y-1 mt-2">
        <li className="text-sm text-gray-700 flex items-start gap-2">
          📚{' '}
          <span>
            싸프린트 기간 동안{' '}
            <span className="font-semibold">
              제공되는 ToDo를 바탕으로 단계별 학습
            </span>
            을 진행합니다.
          </span>
        </li>
        <li className="text-sm text-gray-700 flex items-start gap-2">
          📝{' '}
          <span>
            <span className="font-semibold">
              참여자들은 학습 중 각각 2개의 질문
            </span>
            을 등록합니다.
          </span>
        </li>
        <li className="text-sm text-gray-700 flex items-start gap-2">
          🎤{' '}
          <span>
            <span className="font-semibold">마지막 날</span>, 배운 내용을
            발표하고 질문에 답변하는 시간을 가집니다.
          </span>
        </li>
        <li className="text-sm text-gray-700 flex items-start gap-2">
          👨‍🏫{' '}
          <span>
            <span className="font-semibold">발표자는 한 명</span>이며, 발표 세션
            시작 시 랜덤으로 선정됩니다.
          </span>
        </li>
        <li className="text-sm text-gray-700 flex items-start gap-2">
          🎯{' '}
          <span>
            <span className="font-semibold">발표 후</span>, 참여자들은 사전에
            등록한 질문 카드 중 하나를 랜덤으로 뽑아 답변합니다.
          </span>
        </li>
        <li className="text-sm text-gray-700 flex items-start gap-2">
          🏆{' '}
          <span>
            <span className="font-semibold">모든 과정이 끝나면</span>, 우수
            발표자를 투표로 선정하고 포인트를 지급합니다.
          </span>
        </li>
      </ul>
    </div>
  )
}

export default SprintProgress
