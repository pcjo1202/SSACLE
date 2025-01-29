const StreamVideoCard = ({ data }) => {
  const { stream, name } = data

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative aspect-[3/2] w-full rounded-md shadow-md border-[1px] border-gray-500">
        {/* 참여자 영상 */}
        <video
          autoPlay
          playsInline
          className="relative object-cover w-full h-full "
          ref={stream}
        ></video>
        {/* 참여자 이름 */}
        <div className="absolute bottom-0 flex items-center justify-center w-1/4 bg-white rounded-sm opacity-30">
          <span className="text-sm text-ssacle-black">{name}</span>
        </div>
      </div>
    </div>
  )
}
export default StreamVideoCard
