import StreamVideoCard from '@/components/PresentationPage/StreamVideoCard/StreamVideoCard'
import { usePresentation } from '@/store/usePresentation'

const ParticipantSection = () => {
  const { stream } = usePresentation()
  return (
    <div className="w-full h-full basis-1/5 border-[1px] border-gray-500 rounded-md">
      <section className="flex flex-col items-center justify-around h-full gap-2 p-2">
        {stream.map((item, index) => (
          <StreamVideoCard key={index} data={item} />
        ))}
      </section>
    </div>
  )
}
export default ParticipantSection
