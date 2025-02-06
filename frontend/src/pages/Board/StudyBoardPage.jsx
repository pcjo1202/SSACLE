import BoardList from '@/components/Board/List/BoardList'
import BoardPagination from '@/components/Board/List/BoardPagination'
import BoardTab from '@/components/Board/List/BoardTab'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { posts as mockPosts } from '@/mocks/boardData'

const studyTabs = [
  { id: 'legend', label: '명예의 전당' },
  { id: 'qna', label: '질의응답' },
]

const StudyBoardPage = () => {
  const navigate = useNavigate()

  // 상태관리
  const [activeTab, setActiveTab] = useState('legend') // 현재 활성화된 탭
  const [posts, setPosts] = useState([]) // 게시글 목록
  const [loading, setLoading] = useState(true) // 로딩 상태

  // 페이지네이션 관련 상태 추가
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // 게시글 목록 불러오기
  // activeTab이 변경될 때마다 해당하는 게시글 목록을 새로 불러옴
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // 실제 API 대신 mockData 사용
        const filteredPosts = mockPosts.filter(
          (post) => post.type === activeTab
        )

        // 페이지네이션을 위한 데이터 처리
        const ITEMS_PER_PAGE = 10
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        const paginatedPosts = filteredPosts.slice(start, end)

        setPosts(paginatedPosts)
        setTotalPages(Math.ceil(filteredPosts.length / ITEMS_PER_PAGE))
        setLoading(false)
      } catch (error) {
        console.error('게시글 목록을 불러오는데 실패했습니다:', error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [activeTab, currentPage]) // activeTab이 변경될 때마다 실행

  // 글 작성 페이지로 이동
  // 현재 탭 정보 유지 및 state로 전달하여 글 유형 지정
  const handleWrite = () => {
    navigate('/board/write', {
      state: {
        boardType: 'study', // 게시판 종류 (학습 or 자유)
        type: activeTab, // 게시글 유형 (명예의 전당 or 질의응답)
      },
    })
  }

  // 탭 변경 시 페이지 초기화
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setCurrentPage(1) // 탭 변경 시 1페이지로 리셋
  }

  return (
    <main className="min-w-max my-20">
      {/* 탭 메뉴 */}
      <section className="my-10">
        <BoardTab
          tabs={studyTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </section>
      <div className="flex flex-row justify-between">
        {/* 글 작성 버튼 */}
        <section>
          <button
            onClick={handleWrite}
            className="px-4 py-1 text-white rounded bg-ssacle-blue text-sm"
          >
            글 작성하기
          </button>
        </section>
        <section>분류 및 검색창</section>
      </div>
      <div className="border-b my-3"></div>
      <section>
        <BoardList posts={posts} type={activeTab} />
      </section>
      <section>
        {/* 페이지네이션 추가 */}
        <BoardPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </section>
    </main>
  )
}

export default StudyBoardPage
