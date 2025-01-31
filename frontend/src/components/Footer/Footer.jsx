import { Coffee } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full h-[50px] px-6 py-10 bg-ssacle-gray-sm flex flex-col justify-center items-center">
      <div className="flex items-center space-x-1">
        <span className="text-black text-base font-medium font-montserrat">
          SSACLE
        </span>
        <span className="text-black text-base font-light font-noto-sans-kr">
          개발자에게 커피 사주기
        </span>
        <Coffee size={20} strokeWidth={1} className="text-black" />
      </div>
      <div className="flex items-center space-x-1">
        <span className='text-black text-xs font-light font-montserrat'>Copyright © SSACLE</span>
      </div>
    </footer>
  )
}
export default Footer
