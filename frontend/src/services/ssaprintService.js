import httpCommon from './http-commons'
import { SSAPRINT_END_POINT } from './endPoints'

// ✅ 조건별 싸프린트 조회 (필터 적용)
export const fetchSsaprintListWithFilter = async (major, sub) => {
  try {
    const response = await httpCommon.get(
      SSAPRINT_END_POINT.LIST_WITH_FILTER(major, sub)
    )
    return response.data
  } catch (error) {
    console.error('싸프린트 필터링 조회 실패:', error)
    throw error
  }
}

// ✅ 전체 싸프린트 목록 조회
export const fetchSsaprintList = async () => {
  try {
    const response = await httpCommon.get(SSAPRINT_END_POINT.LIST)
    return response.data
  } catch (error) {
    console.error('싸프린트 목록 조회 실패:', error)
    throw error
  }
}

// ✅ 싸프린트 상세 조회
export const fetchSsaprintDetail = async (id) => {
  try {
    const response = await httpCommon.get(SSAPRINT_END_POINT.DETAIL(id))
    return response.data
  } catch (error) {
    console.error(`싸프린트 상세 조회 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ 싸프린트 참가
export const joinSsaprint = async (id) => {
  try {
    const response = await httpCommon.post(SSAPRINT_END_POINT.JOIN(id))
    return response.data
  } catch (error) {
    console.error(`싸프린트 참가 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ 싸프린트 참가 취소
export const cancelSsaprint = async (id) => {
  try {
    const response = await httpCommon.patch(SSAPRINT_END_POINT.CANCEL(id))
    return response.data
  } catch (error) {
    console.error(`싸프린트 참가 취소 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ 싸프린트 생성
export const createSsaprint = async (data) => {
  try {
    const response = await httpCommon.post(SSAPRINT_END_POINT.CREATE, data)
    return response.data
  } catch (error) {
    console.error('싸프린트 생성 실패:', error)
    throw error
  }
}

// ✅ 싸프린트 수정
export const updateSsaprint = async (id, data) => {
  try {
    const response = await httpCommon.patch(SSAPRINT_END_POINT.UPDATE(id), data)
    return response.data
  } catch (error) {
    console.error(`싸프린트 수정 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ 싸프린트 삭제
export const deleteSsaprint = async (id) => {
  try {
    const response = await httpCommon.delete(SSAPRINT_END_POINT.DELETE(id))
    return response.data
  } catch (error) {
    console.error(`싸프린트 삭제 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ 발표 참가자 목록 조회
export const fetchSsaprintParticipants = async (id) => {
  try {
    const response = await httpCommon.get(
      SSAPRINT_END_POINT.PRESENTATION_PARTICIPANTS(id)
    )
    return response.data
  } catch (error) {
    console.error(`발표 참가자 목록 조회 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ 발표 질문 카드 목록 조회
export const fetchSsaprintCards = async (id) => {
  try {
    const response = await httpCommon.get(
      SSAPRINT_END_POINT.PRESENTATION_CARDS(id)
    )
    return response.data
  } catch (error) {
    console.error(`질문 카드 목록 조회 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ 특정 질문 카드 상세 조회
export const fetchSsaprintCardDetail = async (id, cardId) => {
  try {
    const response = await httpCommon.get(
      SSAPRINT_END_POINT.PRESENTATION_CARD_DETAIL(id, cardId)
    )
    return response.data
  } catch (error) {
    console.error(
      `질문 카드 상세 조회 실패 (ID: ${id}, CardID: ${cardId}):`,
      error
    )
    throw error
  }
}

// ✅ 발표 종료
export const exitSsaprintPresentation = async (id) => {
  try {
    const response = await httpCommon.patch(
      SSAPRINT_END_POINT.PRESENTATION_EXIT(id)
    )
    return response.data
  } catch (error) {
    console.error(`발표 종료 실패 (ID: ${id}):`, error)
    throw error
  }
}

// ✅ TODO 상태 수정
export const updateSsaprintTodo = async (ssaprintId, todoId) => {
  try {
    const response = await httpCommon.patch(
      SSAPRINT_END_POINT.TODO_STATUS(ssaprintId, todoId)
    )
    return response.data
  } catch (error) {
    console.error(
      `TODO 상태 수정 실패 (Ssaprint ID: ${ssaprintId}, Todo ID: ${todoId}):`,
      error
    )
    throw error
  }
}
