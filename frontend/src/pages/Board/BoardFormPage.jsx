import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { posts as mockPosts } from '@/mocks/boardData'

const BoardFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useLocation()
  const [loading, setLoading] = useState(!!id)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: state?.type || 'legend',
    tags: [],
    tagInput: '', // 사용자 태그 입력 값 저장
  })

  // 기존 게시글 데이터 불러오기
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const post = mockPosts.find((p) => p.id === Number(id))
          if (post) {
            setFormData({
              title: post.title,
              content: post.content || '',
              type: post.type,
              tags: post.tags || [],
              tagInput: '',
            })
          }
          setLoading(false)
        } catch (error) {
          console.error('게시글을 불러오는데 실패했습니다:', error)
          navigate(-1)
        }
      }
      fetchPost()
    }
  }, [id, navigate])

  const isValid = formData.title.trim() && formData.content?.trim()

  // 게시글 작성 및 수정
  // API 연결 시 console 삭제
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return

    try {
      const currentDate = new Date().toISOString().split('T')[0]
      const newPost = {
        ...formData,
        date: currentDate,
        views: 0,
        author: '작성자',
        comments: [],
      }

      if (id) {
        console.log('수정:', { id, ...newPost })
      } else {
        console.log('작성:', newPost)
      }
      navigate(-1)
    } catch (error) {
      console.error('저장 중 오류가 발생했습니다:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 사용자가 태그 입력 후 Enter 또는 쉼표(,) 입력 시 추가
  const handleTagInputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && formData.tagInput.trim()) {
      e.preventDefault() // 기본 입력 이벤트 방지
      const newTag = formData.tagInput.trim()
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
          tagInput: '', // 입력 후 초기화
        }))
      }
    }
  }

  // 태그 입력값 업데이트
  const handleTagInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tagInput: e.target.value,
    }))
  }

  // 태그 삭제
  const handleTagRemove = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate(-1)
    }
  }

  if (loading) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="min-w-max my-20 container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        {id ? '게시글 수정' : '새 게시글 작성'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <label className="block mb-2">제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>

        {/* 태그 입력 (사용자 직접 입력 가능) */}
        <div>
          <label className="block mb-2">태그 입력</label>
          <div className="flex flex-wrap gap-2 border p-2 rounded">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="text-white flex items-center bg-ssacle-blue px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 text-white hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={formData.tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="태그를 입력 후 Enter 또는 , 입력"
              className="outline-none flex-1"
            />
          </div>
        </div>

        {/* 내용 입력 */}
        <div>
          <label className="block mb-2">내용</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-6 py-2 rounded transition-colors ${
              isValid
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {id ? '수정하기' : '작성하기'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  )
}

export default BoardFormPage
