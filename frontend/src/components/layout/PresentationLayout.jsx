import PresentationControlBar from '@/components/PresentationControlBar/PresentationControlBar'
import PresentationHeader from '@/components/PresentationHeader/PresentationHeader'
import { Outlet } from 'react-router-dom'

const PresentationLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen text-white bg-ssacle-black">
      <PresentationHeader />
      <main className="flex-1 px-24">
        <Outlet />
      </main>
      <PresentationControlBar />
    </div>
  )
}
export default PresentationLayout
