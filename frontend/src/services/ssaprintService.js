import httpCommon from './http-common';
import { SSAPRINT_END_POINT } from './endPoints';

// ✅ 조건별 싸프린트 조회 (필터 적용)
export const fetchSsaprintListWithFilter = (major, sub) => 
  httpCommon.get(SSAPRINT_END_POINT.LIST_WITH_FILTER(major, sub));

// ✅ 전체 싸프린트 목록 조회
export const fetchSsaprintList = () => 
  httpCommon.get(SSAPRINT_END_POINT.LIST);

// ✅ 싸프린트 상세 조회
export const fetchSsaprintDetail = (id) => 
  httpCommon.get(SSAPRINT_END_POINT.DETAIL(id));

// ✅ 싸프린트 참가
export const joinSsaprint = (id) => 
  httpCommon.post(SSAPRINT_END_POINT.JOIN(id));

// ✅ 싸프린트 참가 취소
export const cancelSsaprint = (id) => 
  httpCommon.patch(SSAPRINT_END_POINT.CANCEL(id));

// ✅ 싸프린트 생성
export const createSsaprint = (data) => 
  httpCommon.post(SSAPRINT_END_POINT.CREATE, data);

// ✅ 싸프린트 수정
export const updateSsaprint = (id, data) => 
  httpCommon.patch(SSAPRINT_END_POINT.UPDATE(id), data);

// ✅ 싸프린트 삭제
export const deleteSsaprint = (id) => 
  httpCommon.delete(SSAPRINT_END_POINT.DELETE(id));

// ✅ 발표 참가자 목록 조회
export const fetchSsaprintParticipants = (id) => 
  httpCommon.get(SSAPRINT_END_POINT.PRESENTATION_PARTICIPANTS(id));

// ✅ 발표 질문 카드 목록 조회
export const fetchSsaprintCards = (id) => 
  httpCommon.get(SSAPRINT_END_POINT.PRESENTATION_CARDS(id));

// ✅ 특정 질문 카드 상세 조회
export const fetchSsaprintCardDetail = (id, cardId) => 
  httpCommon.get(SSAPRINT_END_POINT.PRESENTATION_CARD_DETAIL(id, cardId));

// ✅ 발표 종료
export const exitSsaprintPresentation = (id) => 
  httpCommon.patch(SSAPRINT_END_POINT.PRESENTATION_EXIT(id));

// ✅ TODO 상태 수정
export const updateSsaprintTodo = (ssaprintId, todoId) => 
  httpCommon.patch(SSAPRINT_END_POINT.TODO_STATUS(ssaprintId, todoId));
