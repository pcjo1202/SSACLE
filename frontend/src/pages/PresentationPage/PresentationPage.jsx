import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useState } from 'react'

const PresentationPage = () => {
  const [stream, setStream] = useState([
    {
      stream: null,
      name: '이름',
    },
    {
      stream: null,
      name: '이름',
    },
    {
      stream: null,
      name: '이름',
    },
    {
      stream: null,
      name: '이름',
    },
    {
      stream: null,
      name: '이름',
    },
    {
      stream: null,
      name: '이름',
    },
  ]) // 스트림 상태

  return (
    <div className="flex w-full gap-4">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {stream.map((item, index) => (
          <div key={index} className="flex items-center justify-center w-full">
            <AspectRatio
              ratio={16 / 10}
              className="rounded-md shadow-md border-[1px] border-ssacle-gray-sm"
            >
              <video
                autoPlay
                playsInline
                className="relative w-full h-full"
                ref={item.stream}
              ></video>
              <span className="absolute bottom-2 left-4">{item.name}</span>
            </AspectRatio>
          </div>
        ))}
      </div>
      {/* 채팅 */}
      {/* <div className="w-1/4 border-[1px] rounded-md"></div> */}
    </div>
  )
}
export default PresentationPage
