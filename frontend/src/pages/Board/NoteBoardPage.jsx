import BoardList from '@/components/Board/List/BoardList'
import BoardPagination from '@/components/Board/List/BoardPagination'
import NotePayModal from '@/components/Board/Modal/NotePayModal'
import httpCommon from '@/services/http-common'
import { fetchUserInfo } from '@/services/mainService'
import { useQuery } from '@tanstack/react-query'

import { useEffect, useState } from 'react'

const NoteBoardPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 1,
    pageSize: 10,
  })

  // 유저 정보 조회 추가
  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    retry: false,
  })

  // 서버에서 받은 데이터를 BoardList 형식에 맞게 변환
  const formatPosts = (posts) => {
    return posts.map((post) => ({
      id: post.teamId,
      title: post.sprintName, // 스프린트 이름을 제목으로
      writerInfo: post.teamName, // 팀 이름을 작성자 정보로
      tags: post.categoryNames, // 카테고리 이름들을 태그로
      diaries: post.diaries, // 모달용 일기 데이터
      time: new Date().toISOString(), // 시간 정보가 없다면 현재 시간으로 대체
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await httpCommon.get('/teams/diaries', {
          params: {
            page: pagination.currentPage,
            size: pagination.pageSize,
            sort: 'startAt,desc',
          },
        })

        if (response.data) {
          setPosts(formatPosts(response.data.content))
          setPagination((prev) => ({
            ...prev,
            totalPages: response.data.totalPages,
            currentPage: response.data.pageable.pageNumber,
          }))
        }
      } catch (err) {
        console.error('Error details:', err.response || err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pagination.currentPage, pagination.pageSize])

  // 게시글 클릭 핸들러 수정
  const handlePostClick = (postId) => {
    const clickedPost = posts.find((post) => post.id === postId)
    if (!clickedPost) return

    // 모달에 전달할 데이터 설정
    setSelectedPost({
      ...clickedPost,
      diaries: clickedPost.diaries || [], // 일기 데이터 추가
    })
    setShowPurchaseModal(true)
  }

  return (
    <main className="min-w-max my-20">
      {/* 배너 */}
      <section>
        <div className="bg-ssacle-sky w-full h-32 rounded-lg mb-4 flex justify-center items-center">
          <div className="flex flex-col items-center gap-1">
            <p className="text-ssacle-black font-semibold mb-2">
              📖 노트 사기란?
            </p>
            <p className="text-ssacle-black font-normal text-sm">
              싸피 교육생들이 직접 작성한 학습 노트를 사고 팔 수 있는
              공간입니다.
            </p>
          </div>
        </div>
      </section>

      <div className="border-b my-3"></div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-4">데이터를 불러오는 중...</div>
      )}

      {/* 에러 상태 */}
      {error && (
        <div className="text-red-500 text-center py-4">에러 발생: {error}</div>
      )}

      {/* 데이터 없음 상태 */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-4">작성된 노트가 없습니다.</div>
      )}

      {/* 게시글 목록 */}
      {!loading && !error && posts.length > 0 && (
        <section>
          <BoardList
            posts={posts}
            type="note"
            boardType="note"
            onPostClick={handlePostClick}
          />
        </section>
      )}

      {/* 페이지네이션 */}
      <section>
        <BoardPagination
          currentPage={pagination.currentPage}
          setCurrentPage={(newPage) =>
            setPagination((prev) => ({ ...prev, currentPage: newPage }))
          }
          totalPages={pagination.totalPages}
        />
      </section>

      {/* 피클 결제 모달 */}
      {selectedPost && (
        <NotePayModal
          isOpen={showPurchaseModal}
          onClose={() => {
            setShowPurchaseModal(false)
            setSelectedPost(null)
          }}
          post={selectedPost}
          currentPickle={userData?.pickles || 0}
        />
      )}
    </main>
  )
}

export default NoteBoardPage
