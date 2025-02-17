import { useState } from 'react'
import CommentForm from './CommentForm'

const CommentList = ({
  comments = [],
  currentUserId,
  onDelete,
  onEdit,
  onReply,
}) => {
  const [editingId, setEditingId] = useState(null)
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)

  // 댓글 데이터에 고유 ID 추가
  const processComments = (commentsData, parentIndex = '') => {
    return commentsData.map((comment, index) => {
      const uniqueId = parentIndex ? `${parentIndex}-${index}` : String(index)
      return {
        ...comment,
        id: uniqueId,
        child: comment.child ? processComments(comment.child, uniqueId) : [],
      }
    })
  }

  // 처리된 댓글 데이터
  const processedComments = processComments(comments)

  const handleReplyClick = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId)
    setActiveMenuId(null)
    setEditingId(null)
  }

  const handleEditClick = (commentId) => {
    setEditingId(commentId)
    setActiveMenuId(null)
    setReplyingTo(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
  }

  const handleReplyCancel = () => {
    setReplyingTo(null)
  }

  const handleEditSubmit = async (commentId, newContent) => {
    try {
      await onEdit(commentId, newContent)
      setEditingId(null)
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error)
      alert('댓글 수정에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleReplySubmit = async (parentId, content) => {
    try {
      await onReply(parentId, content)
      setReplyingTo(null)
    } catch (error) {
      console.error('답글 작성 중 오류 발생:', error)
      alert('답글 작성에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleDeleteClick = async (commentId) => {
    try {
      await onDelete(commentId) // 부모 컴포넌트의 확인 로직에 위임
      setActiveMenuId(null)
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error)
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderComment = (comment, depth = 0) => {
    return (
      <div
        key={comment.id}
        className={`border-b pb-4 last:border-b-0 ${
          depth > 0 ? 'ml-8 mt-4 pl-4 border-l-2 border-gray-100' : ''
        }`}
      >
        {editingId === comment.id ? (
          <CommentForm
            isEditing
            initialValue={comment.content}
            onSubmit={(content) => handleEditSubmit(comment.commentid, content)}
            onCancel={handleEditCancel}
          />
        ) : (
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.writerInfo}</span>
                <span className="text-gray-500 text-sm">
                  {formatDate(comment.time)}
                </span>
              </div>

              {depth === 0 && currentUserId === comment.writerInfo && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveMenuId(
                        activeMenuId === comment.id ? null : comment.id
                      )
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="댓글 메뉴"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>

                  {activeMenuId === comment.id && (
                    <div
                      className="absolute right-0 mt-1 w-24 bg-white border rounded-lg shadow-lg z-10"
                      style={{
                        // 절대 위치 지정을 위해 relative 부모 컨테이너 필요
                        position: 'absolute',
                        top: '100%', // 부모 요소의 하단에 위치
                        right: 0,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          handleEditClick(comment.id)
                          setActiveMenuId(null)
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteClick(comment.commentid)
                          setActiveMenuId(null)
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-gray-800 whitespace-pre-wrap mb-2">
              {comment.content}
            </p>

            {depth === 0 && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleReplyClick(comment.id)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  답글달기
                </button>
              </div>
            )}

            {replyingTo === comment.id && (
              <div className="mt-4">
                <CommentForm
                  onSubmit={(content) =>
                    handleReplySubmit(comment.commentid, content)
                  }
                  onCancel={handleReplyCancel}
                  placeholder="답글을 입력하세요..."
                />
              </div>
            )}

            {depth === 0 && comment.child?.length > 0 && (
              <div className="mt-4 space-y-4">
                {comment.child.map((reply) => renderComment(reply, 1))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">
        댓글{' '}
        {processedComments.reduce(
          (acc, comment) => acc + 1 + (comment.child?.length || 0),
          0
        )}
        개
      </h3>

      <div className="space-y-6">
        {processedComments.map((comment) => renderComment(comment))}
      </div>
    </div>
  )
}

export default CommentList
