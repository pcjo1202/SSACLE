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
import { useState } from 'react'
import httpCommon from '@/services/http-common'

const NotePayModal = ({ isOpen, onClose, post }) => {
  const [notionUrl, setNotionUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  // 결제 요청 핸들러
  const handlePurchase = async () => {
    setLoading(true)
    try {
      const response = await httpCommon.post(`/teams/${post.teamId}/purchase`)
      setNotionUrl(response.data) // Notion URL 반환
    } catch (error) {
      console.error('노트 구매 실패:', error)
      alert('노트 구매에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

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
              <strong>{post.teamName}</strong>의 노트를 구매하려면 5피클이
              필요합니다.
            </p>

            {/* 주차별 내용 표시 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">노트 학습 내용</p>
              <ul className="text-gray-700 text-sm list-disc list-inside">
                {post.diaries.length > 0 ? (
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
            disabled={loading || notionUrl}
            className="bg-ssacle-blue hover:bg-blue-600"
          >
            {loading ? '구매 중...' : notionUrl ? '구매 완료' : '구매하기'}
          </AlertDialogAction>
        </AlertDialogFooter>

        {/* 구매 완료 후 Notion 링크 표시 */}
        {notionUrl && (
          <div className="mt-4 p-4 border-t text-center">
            <p className="text-sm text-gray-600">
              구매 완료! 아래 링크에서 확인하세요.
            </p>
            <a
              href={notionUrl}
              target="_blank"
              className="text-ssacle-blue underline"
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
