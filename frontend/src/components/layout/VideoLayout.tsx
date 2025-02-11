import { cn } from '@/lib/utils'
import StreamVideoPageButton from '@/components/PresentationPage/StreamVideoPageButton/StreamVideoPageButton'
import { ReactNode, useMemo, useState, Children } from 'react'
import ScreenShareView from '@/components/PresentationPage/ScreenShareView/ScreenShareView'

const VideoLayout = ({
  children,
  isScreenSharing,
  connectCount,
}: {
  children: ReactNode
  isScreenSharing: boolean
  connectCount: number
}) => {
  const [currentPage, setCurrentPage] = useState(0)

  const itemPerPage = isScreenSharing ? 3 : 6

  // 자식 요소 배열로 변환
  const chilrendArray = Children.toArray(children)
  // 현재 페이지에 해당하는 자식 요소 슬라이싱
  const startIndex = useMemo(() => currentPage * itemPerPage, [currentPage])

  const slicedChildren = chilrendArray.slice(
    startIndex,
    startIndex + itemPerPage
  )

  return (
    <section className="flex w-full h-full gap-4 ">
      {isScreenSharing && <ScreenShareView />}
      <div
        className={cn(
          'flex flex-col justify-center w-full h-full gap-4 ',
          isScreenSharing && 'basis-1/4'
        )}
      >
        <div
          className={cn(
            'grid mx-auto min-h-96 h-full ',
            'grid-cols-1 place-items-center w-full',
            !isScreenSharing &&
              (slicedChildren.length > 4
                ? 'grid-cols-3 w-full' // 4개 이상일 때 반응형 그리드
                : 'grid-cols-2 w-9/12'),
            !isScreenSharing && slicedChildren.length === 1 && 'grid-cols-1'
          )}
        >
          {slicedChildren}
        </div>
        <StreamVideoPageButton
          connectCount={connectCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemPerPage={itemPerPage}
        />
      </div>
    </section>
  )
}
export default VideoLayout
