import { createContext, useContext, useState } from 'react'

const DEFAULT_END_TIME = 'T20:00:00'
const DEFAULT_START_TIME = 'T00:00:00'

// Context 생성
const SsaprintContext = createContext()

// Provider 컴포넌트
export const SsaprintProvider = ({ children }) => {
  const [selectedMain, setSelectedMain] = useState({ id: null, name: '' })
  const [selectedMid, setSelectedMid] = useState({ id: null, name: '' })
  const [selectedSub, setSelectedSub] = useState({ id: null, name: '' })

  // LocalDateTime 변환 함수 (종료 날짜는 20:00:00 설정)
  const formatToLocalDateTime = (dateString, isEndDate = false) => {
    if (!dateString) return null
    const date = new Date(dateString)

    // ✅ 종료 날짜는 20:00:00, 시작 날짜는 현재 시간 유지
    if (isEndDate) {
      date.setHours(20, 0, 0, 0) 
    }

    return date.toISOString()
  }

  // 화면 출력용 (YYYY-MM-DD)
  const formatToDisplayDate = (dateString) => {
    if (!dateString) return ''
    if (dateString.includes('T')) return dateString.split('T')[0] // ✅ LocalDateTime 형식이면 변환
    return dateString
  }

  // 시작 날짜 최소값 (내일)
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // 상태 저장 (raw 값)
  const [rawStartDate, setRawStartDate] = useState('')
  const [rawEndDate, setRawEndDate] = useState('')

  // context에 LocalDateTime 형식으로 저장
  const startDate = rawStartDate ? formatToLocalDateTime(rawStartDate) : ''
  const endDate = rawEndDate ? formatToLocalDateTime(rawEndDate, true) : ''

  // 목데이터 추가 (기본 설명, 상세 설명, 권장 사항, todos)
  const [description, setDescription] = useState({
    basic: '기본 설명 예제 데이터입니다.',
    detailed: '상세 설명 예제 데이터입니다.',
    recommended: '권장 사항 예제 데이터입니다.',
    todos: 'TODO 리스트 예제 데이터입니다.',
  })

  return (
    <SsaprintContext.Provider
      value={{
        selectedMain,
        setSelectedMain,
        selectedMid,
        setSelectedMid,
        selectedSub,
        setSelectedSub,
        startDate,
        setStartDate: setRawStartDate,
        endDate,
        setEndDate: setRawEndDate,
        getTomorrowDate, // ✅ 최소 시작 날짜
        formatToDisplayDate, // ✅ 날짜 표시용 포맷 함수
        description,
        setDescription,
      }}
    >
      {children}
    </SsaprintContext.Provider>
  )
}

// Context 사용을 위한 Hook
export const useSsaprint = () => useContext(SsaprintContext)
