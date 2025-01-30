import StreamVideoCard from '@/components/PresentationPage/StreamVideoCard/StreamVideoCard'
import { cn } from '@/lib/utils'
import { usePresentation } from '@/store/usePresentation'

const BeforePresentationPage = () => {
  const { stream } = usePresentation()
  return (
    <section
      className={cn(
        'grid h-full gap-4 px-10',
        'grid-cols-1 place-items-center', // 기본적으로 1열
        stream.length > 4
          ? 'sm:grid-cols-2 lg:grid-cols-3' // 4개 이상일 때 반응형 그리드
          : 'grid-cols-2'
      )}
    >
      {stream.map((item, index) => (
        <StreamVideoCard key={index} data={item} />
      ))}
    </section>
  )
}
export default BeforePresentationPage
