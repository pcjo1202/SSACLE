import axios from 'axios'
import { MAIN_END_POINT } from './endPoints'

// 로그인 중인 사용자 기본 정보 조회 (GET 요청, userId 필요)
export const fetchUserInfo = async (userId) => {
  return axios.get(MAIN_END_POINT.USER_INFO(userId))
}

// 참여 중인 싸프린트, 싸드컵 리스트 조회 (GET 요청)
export const fetchNowMySsaprint = async () => {
  return axios.get(MAIN_END_POINT.NOW_MYSSAPRINT)
}

// 관심사 기반 싸프린트 리스트 조회 (POST 요청)
export const fetchSsaprintList = async () => {
  return axios.post(MAIN_END_POINT.SSAPRINT_LIST)
}

// 관심사 기반 싸드컵 리스트 조회 (POST 요청)
export const fetchSsadcupList = async () => {
  return axios.post(MAIN_END_POINT.SSADCUP_LIST)
}

// 싸밥(식단) 정보 조회 (GET 요청)
export const fetchLunchInfo = async () => {
  return axios.get(MAIN_END_POINT.LUNCH_INFO)
}

// 싸밥 투표 (PATCH 요청, 토큰 필요) -> 토큰 제외하고 요청
export const fetchVoteLunch = async (lunchId) => {
  return axios.patch(MAIN_END_POINT.LUNCH_VOTE, { lunch_id: lunchId })
}

// 싸밥 투표 결과 조회 (GET 요청, 토큰 필요) -> 토큰 제외하고 요청
export const fetchLunchVoteResult = async () => {
  return axios.get(MAIN_END_POINT.LUNCH_VOTE_RESULT)
}

// AI 기사 목록 조회 (GET 요청, newId 필요, 토큰 필요) -> 토큰 제외하고 요청
export const fetchAiNews = async (newId) => {
  return axios.get(MAIN_END_POINT.AI_NEWS(newId))
}
