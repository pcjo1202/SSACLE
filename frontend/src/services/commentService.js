import httpCommon from './http-common'
import { COMMENT_END_POINT } from './endPoints'

// 대댓글 목록 조회 (GET)
export const fetchReplies = async (parentCommentId) => {
  return httpCommon.get(COMMENT_END_POINT.REPLIES.LIST(parentCommentId))
}

// 대댓글 작성 (POST)
export const fetchCreateReply = async (parentCommentId, content) => {
  return httpCommon.post(COMMENT_END_POINT.REPLIES.CREATE(parentCommentId), {
    content,
  })
}

// 특정 게시글의 댓글 목록 조회 (GET)
export const fetchBoardComments = async (boardId) => {
  return httpCommon.get(COMMENT_END_POINT.BOARD_COMMENTS.LIST(boardId))
}

// 게시글에 댓글 작성 (POST)
export const fetchCreateBoardComment = async (boardId, content) => {
  return httpCommon.post(COMMENT_END_POINT.BOARD_COMMENTS.CREATE(boardId), {
    content,
  })
}

// 댓글 수정 (PATCH)
export const fetchUpdateComment = async (commentId, content) => {
  return httpCommon.patch(COMMENT_END_POINT.COMMENT.UPDATE(commentId), {
    content,
  })
}

// 댓글 삭제 (DELETE)
export const fetchDeleteComment = async (commentId) => {
  return httpCommon.delete(COMMENT_END_POINT.COMMENT.DELETE(commentId))
}
