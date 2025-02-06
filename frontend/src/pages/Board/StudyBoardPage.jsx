import BoardTab from '@/components/Board/List/BoardTab'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  // 게시글 목록 불러오기
  // activeTab이 변경될 때마다 해당하는 게시글 목록을 새로 불러옴
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setLoading(false)
      } catch (error) {
        console.error('게시글 목록을 불러오는데 실패했습니다:', error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [activeTab]) // activeTab이 변경될 때마다 실행

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

  return (
    <main className="min-w-max my-20">
      <section>
        <BoardTab
          tabs={studyTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </section>
      <div>
        <section>글 작성하기 버튼</section>
        <section>분류 및 검색창</section>
      </div>
      <section>게시글 리스트</section>
    </main>
  )
}

export default StudyBoardPage
