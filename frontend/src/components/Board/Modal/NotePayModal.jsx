import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CreditCard } from 'lucide-react'
import httpCommon from '@/services/http-common'

const NotePayModal = ({ isOpen, onClose, post, currentPickle }) => {
  const [notionUrl, setNotionUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const requiredPickles = 5 // 필요한 피클 수

  const hasEnoughPickles = currentPickle >= requiredPickles

  // 결제 요청 핸들러
  const handlePurchase = async () => {
    if (!hasEnoughPickles) {
      alert('피클이 부족합니다!')
      return
    }

    if (!post || !post.id) {
      console.error('유효하지 않은 post 데이터:', post)
      alert('노트 정보가 올바르지 않습니다.')
      return
    }

    setLoading(true)
    try {
      const response = await httpCommon.post(`/teams/${post.id}/purchase`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200 && response.data) {
        setNotionUrl(response.data) // Notion URL 저장
      } else {
        throw new Error('노션 URL이 반환되지 않았습니다.')
      }
    } catch (error) {
      console.error('노트 구매 실패:', error.response?.data || error)
      alert(
        error.response?.data?.message ||
          '노트 구매에 실패했습니다. 다시 시도해주세요.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!post) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[440px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-ssacle-blue" />
            <span>노트 구매</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              <strong>{post.writerInfo}</strong>의 노트를 구매하려면{' '}
              {requiredPickles}피클이 필요합니다.
            </p>

            {/* 현재 보유 피클 표시 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">현재 보유 피클</p>
              <p className="text-lg font-bold text-ssacle-blue flex items-center gap-1">
                {currentPickle} 🥒
              </p>
              {!hasEnoughPickles && (
                <p className="text-sm text-red-500 mt-2">
                  피클이 부족합니다. 더 많은 활동을 통해 피클을 모아보세요!
                </p>
              )}
            </div>

            {/* 주차별 내용 표시 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">노트 학습 내용</p>
              <ul className="text-gray-700 text-sm list-disc list-inside">
                {post.diaries && post.diaries.length > 0 ? (
                  post.diaries.map((diary, index) => (
                    <li key={index}>{diary}</li>
                  ))
                ) : (
                  <li>등록된 학습 내용이 없습니다.</li>
                )}
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-200 hover:bg-gray-100 hover:text-gray-900">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handlePurchase}
            disabled={loading || notionUrl || !hasEnoughPickles}
            className={`${
              loading || notionUrl || !hasEnoughPickles
                ? 'bg-gray-400'
                : 'bg-ssacle-blue hover:bg-blue-600'
            }`}
          >
            {loading ? '구매 중...' : notionUrl ? '구매 완료' : '구매하기'}
          </AlertDialogAction>
        </AlertDialogFooter>

        {/* 구매 완료 후 Notion 링크 표시 */}
        {notionUrl && (
          <div className="mt-4 p-4 border-t text-center">
            <p className="text-sm text-gray-600 mb-2">
              구매 완료! 아래 링크에서 확인하세요.
            </p>
            <a
              href={notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ssacle-blue hover:text-blue-700 underline"
            >
              Notion에서 보기
            </a>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NotePayModal
