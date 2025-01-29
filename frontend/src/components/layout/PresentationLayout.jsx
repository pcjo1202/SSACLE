import PresentationControlBar from '@/components/PresentationControlBar/PresentationControlBar'
import PresentationHeader from '@/components/PresentationHeader/PresentationHeader'
import { Outlet } from 'react-router-dom'

const PresentationLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen text-white bg-ssacle-black min-w-[1280px]">
      <PresentationHeader />
      <main className="flex-1 px-24 bg-ssacle-black h-[calc(100vh-h-20-h-16)]">
        <Outlet />
      </main>
      <PresentationControlBar />
    </div>
  )
}
export default PresentationLayout
