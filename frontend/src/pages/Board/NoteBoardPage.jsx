import BoardList from '@/components/Board/List/BoardList'
import BoardPagination from '@/components/Board/List/BoardPagination'
import NotePayModal from '@/components/Board/Modal/NotePayModal'
import httpCommon from '@/services/http-common'

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

        console.log('API Response:', response.data) // 응답 데이터 확인

        if (response.data) {
          setPosts(response.data.content)
          setPagination((prev) => ({
            ...prev,
            totalPages: Math.max(response.data.totalPages, 1),
            currentPage: response.data.pageable.pageNumber,
          }))
        }
      } catch (err) {
        console.error('Error details:', err.response || err) // 더 자세한 에러 정보
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pagination.currentPage])

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
          onClose={() => setShowPurchaseModal(false)}
          post={selectedPost}
        />
      )}
    </main>
  )
}

export default NoteBoardPage
