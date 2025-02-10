import httpCommon from './http-common'
import { COMMENT_END_POINT } from './endPoints'

// 게시글의 댓글 목록 조회 (GET)
export const fetchBoardComments = async (boardId) => {
  return httpCommon.get(COMMENT_END_POINT.LIST(boardId))
}

// 게시글에 댓글 작성 (POST)
export const fetchCreateComment = async (boardId, content) => {
  return httpCommon.post(COMMENT_END_POINT.CREATE(boardId), {
    content,
  })
}

// 댓글 수정 (PATCH)
export const fetchUpdateComment = async (boardId, commentId, content) => {
  return httpCommon.patch(COMMENT_END_POINT.UPDATE(boardId, commentId), {
    content,
  })
}

// 댓글 삭제 (DELETE)
export const fetchDeleteComment = async (boardId, commentId) => {
  return httpCommon.delete(COMMENT_END_POINT.DELETE(boardId, commentId))
}

// 대댓글 수 조회 (GET)
export const fetchSubCommentCount = async (boardId, commentId) => {
  return httpCommon.get(
    COMMENT_END_POINT.SUB_COMMENTS.COUNT(boardId, commentId)
  )
}

// 대댓글 목록 조회 (GET)
export const fetchSubComments = async (boardId, commentId) => {
  return httpCommon.get(COMMENT_END_POINT.SUB_COMMENTS.LIST(boardId, commentId))
}

// 대댓글 생성 (POST)
export const fetchCreateSubComment = async (boardId, commentId, content) => {
  return httpCommon.post(
    COMMENT_END_POINT.SUB_COMMENTS.CREATE(boardId, commentId),
    {
      content,
    }
  )
}
