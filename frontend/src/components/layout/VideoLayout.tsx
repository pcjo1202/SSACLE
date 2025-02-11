import { cn } from '@/lib/utils'
import StreamVideoPageButton from '@/components/PresentationPage/StreamVideoPageButton/StreamVideoPageButton'
import { ReactNode, useMemo, useState, Children } from 'react'

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

  const itemPerPage = 6

  // 자식 요소 배열로 변환
  const chilrendArray = Children.toArray(children)
  // 현재 페이지에 해당하는 자식 요소 슬라이싱
  const startIndex = useMemo(() => currentPage * itemPerPage, [currentPage])

  const slicedChildren = chilrendArray.slice(
    startIndex,
    startIndex + itemPerPage
  )

  return (
    <section
      className={cn(
        'flex w-full h-full ',
        isScreenSharing ? 'flex-col-reverse' : 'flex-col'
      )}
    >
      {/*{isScreenSharing && <ScreenShareView />}*/}
      <div className="flex flex-col justify-center w-full h-full gap-4 overflow-auto">
        <div
          className={cn(
            'grid mx-auto min-h-96 h-full ',

            'grid-cols-2 place-items-center', // 기본적으로 1열
            slicedChildren.length > 4
              ? 'grid-cols-3 w-full' // 4개 이상일 때 반응형 그리드
              : 'grid-cols-2 w-9/12'
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
