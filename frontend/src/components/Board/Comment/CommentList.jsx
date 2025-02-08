import { useState } from 'react'
import CommentForm from './CommentForm'

//댓글 목록을 표시하고 관리하는 컴포넌트
const CommentList = ({ comments = [], currentUserId, onDelete, onEdit }) => {
  // 현재 수정 중인 댓글의 ID를 관리
  const [editingId, setEditingId] = useState(null)

  // 액션 메뉴(수정/삭제)가 열린 댓글의 ID를 관리
  const [activeMenuId, setActiveMenuId] = useState(null)

  // 댓글 수정 핸들러
  const handleEditClick = (commentId) => {
    setEditingId(commentId)
    setActiveMenuId(null) // 메뉴 닫기
  }

  // 댓글 수정 취소 핸들러
  const handleEditCancel = () => {
    setEditingId(null)
  }

  // 댓글 수정 제출 핸들러
  const handleEditSubmit = async (commentId, newContent) => {
    try {
      await onEdit(commentId, newContent)
      setEditingId(null)
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error)
      alert('댓글 수정에 실패했습니다. 다시 시도해주세요.')
    }
  }

  // 댓글 삭제 버튼 핸들러
  const handleDeleteClick = async (commentId) => {
    if (!window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) return

    try {
      await onDelete(commentId)
      setActiveMenuId(null) // 메뉴 닫기
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error)
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.')
    }
  }

  // 날짜 포맷팅 함수
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

  return (
    <div className="space-y-6">
      {/* 댓글 개수 표시 */}
      <h3 className="text-lg font-semibold">댓글 {comments.length}개</h3>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4 last:border-b-0">
            {editingId === comment.id ? (
              // 수정 모드
              <CommentForm
                isEditing
                initialValue={comment.content}
                onSubmit={(content) => handleEditSubmit(comment.id, content)}
                onCancel={handleEditCancel}
              />
            ) : (
              // 조회 모드
              <div>
                {/* 댓글 헤더 영역 */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {/* 작성자 */}
                    <span className="font-medium">{comment.author}</span>
                    {/* 작성 시간 */}
                    <span className="text-gray-500 text-sm">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>

                  {/* 수정/삭제 메뉴 (작성자만 표시) */}
                  {currentUserId === comment.userId && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === comment.id ? null : comment.id
                          )
                        }
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

                      {/* 드롭다운 메뉴 */}
                      {activeMenuId === comment.id && (
                        <div className="absolute right-0 mt-1 w-24 bg-white border rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleEditClick(comment.id)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeleteClick(comment.id)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 댓글 내용 */}
                <p className="text-gray-800 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentList
