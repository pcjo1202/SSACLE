import StreamVideoCard from '@/components/StreamVideoCard/StreamVideoCard'
import { cn } from '@/lib/utils'

const BeforePresentationPage = ({ stream = [] }) => {
  return (
    <div
      className={cn(
        'grid w-full gap-4 auto-rows-fr',
        stream.length > 4 && 'grid-cols-1  sm:grid-cols-3 lg:grid-cols-3 ',
        stream.length < 4 && 'grid-cols-1  sm:grid-cols-2 ',
        stream.length > 1 && 'grid-cols-1  sm:grid-cols-2 '
      )}
    >
      {stream.map((item, index) => (
        <StreamVideoCard data={item} key={index} />
      ))}
    </div>
  )
}
export default BeforePresentationPage
