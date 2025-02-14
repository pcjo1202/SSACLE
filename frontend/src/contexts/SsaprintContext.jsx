import { createContext, useContext, useState } from 'react'

// Context 생성
const SsaprintContext = createContext()

// Provider 컴포넌트
export const SsaprintProvider = ({ children }) => {
  const [selectedMain, setSelectedMain] = useState({ id: null, name: '' })
  const [selectedMid, setSelectedMid] = useState({ id: null, name: '' })
  const [selectedSub, setSelectedSub] = useState({ id: null, name: '' })

  // LocalDateTime 변환 함수
  const formatToLocalDateTime = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T00:00:00`
  }

  // 화면 출력용 (YYYY-MM-DD)
  const formatToDisplayDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  // 상태 저장 (raw 값)
  const [rawStartDate, setRawStartDate] = useState('')
  const [rawEndDate, setRawEndDate] = useState('')

  // context에 LocalDateTime 형식으로 저장
  const startDate = rawStartDate ? formatToLocalDateTime(rawStartDate) : ''
  const endDate = rawEndDate ? formatToLocalDateTime(rawEndDate) : ''

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
        formatToDisplayDate,
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
