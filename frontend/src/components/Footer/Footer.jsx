import { Coffee } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full h-[104px] px-6 py-10 bg-[#f4f4f4] flex flex-col justify-center items-center">
      <div className="flex items-center space-x-4">
        <Coffee size={24} className="text-black" />
        <span className="text-black text-base font-medium font-montserrat">
          SSACLE
        </span>
        <span className="text-black text-base font-medium font-noto-sans-kr">
          개발자에게 커피사주기
        </span>
      </div>
    </footer>
  )
}
export default Footer
