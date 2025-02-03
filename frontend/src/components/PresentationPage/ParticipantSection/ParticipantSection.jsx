import StreamVideoCard from '@/components/PresentationPage/StreamVideoCard/StreamVideoCard'
import { usePresentation } from '@/store/usePresentation'
import { useMemo, useState } from 'react'

const PAGE_SIZE = 4

const ParticipantSection = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const { stream } = usePresentation()

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0))
  }
  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev < stream.length / PAGE_SIZE ? prev + 1 : prev
    )
  }

  // 4개씩 보여주기
  const visitableStream = useMemo(() => {
    return stream.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
  }, [currentPage, stream])

  return (
    <div className="w-full h-full basis-1/5 border-[1px] border-gray-500 rounded-md overflow-y-auto flex flex-col">
      <div className="flex flex-col justify-between h-full">
        <section className="flex flex-col items-center justify-start flex-1 gap-2 p-2 overflow-hidden">
          {visitableStream.map((item, index) => (
            <StreamVideoCard key={index} data={item} />
          ))}
        </section>
        {stream.length > PAGE_SIZE && (
          <div className="flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 0}
              onClick={handlePrevPage}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <button
              disabled={currentPage === Math.floor(stream.length / PAGE_SIZE)}
              onClick={handleNextPage}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default ParticipantSection
