import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { posts as mockPosts } from '@/mocks/boardData' // TODO: 백엔드 API 연동 시 변경

// 게시판 유형별 제목 설정
const BOARD_TITLES = {
  edu: '학습 게시판',
  free: '자유 게시판',
  legend: '🏆 명예의 전당',
  qna: 'Q 질의응답',
  ssaguman: '싸구만',
}

const BoardDetailPage = () => {
  const { boardId } = useParams() // URL에서 게시글 ID 가져오기
  const navigate = useNavigate()
  const location = useLocation()
  const boardType = location.pathname.includes('/board/edu') ? 'edu' : 'free'
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 목업 데이터에서 해당 게시글 찾기
        const foundPost = mockPosts.find((p) => p.id === Number(boardId))
        setPost(foundPost)
        setLoading(false)
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error)
        navigate(`/board/${boardType}`) // 실패 시 해당 게시판으로 이동
      }
    }
    fetchPost()
  }, [boardId, boardType, navigate])

  if (loading) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="min-w-max my-20 container mx-auto px-4 py-8 max-w-4xl">
      {/* 게시판 이름을 동적으로 표시 */}
      <h2 className="text-xl font-semibold text-ssacle-blue flex justify-center mb-6">
        {BOARD_TITLES[post.type] || BOARD_TITLES[boardType] || '게시판'}
      </h2>

      {/* 게시글 정보 */}
      <div className="border-b pb-4 mb-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="text-gray-500 text-sm">
          {post.author} | {post.date} | 조회수 {post.views}
        </div>

        {/* 태그 표시 */}
        <div className="mt-2 flex gap-2">
          {post.tags?.map((tag, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="p-4">{post.content}</div>

      {/* 이전글 / 다음글 네비게이션 */}
      <div className="mt-6 border-t pt-4">
        <p>📌 BoardNav (이전글 / 다음글 자리)</p>
      </div>

      {/* 목록으로 돌아가기 버튼 */}
      <div className="mt-6 text-right">
        <button
          onClick={() => navigate(`/board/${boardType}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          목록
        </button>
      </div>

      {/* 댓글 섹션 */}
      <div className="mt-6">
        <p>💬 CommentList (댓글 목록 및 입력 자리)</p>
      </div>
    </div>
  )
}

export default BoardDetailPage
