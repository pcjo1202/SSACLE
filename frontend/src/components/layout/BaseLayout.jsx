import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default BaseLayout
