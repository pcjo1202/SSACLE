import { Coffee } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-12 px-6 py-10 mt-10 bg-ssacle-gray-sm">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center space-x-1">
          <span className="text-base font-medium text-black font-montserrat">
            SSACLE
          </span>
          <span className="text-base font-light text-black font-noto-sans-kr">
            개발자에게 커피 사주기
          </span>
          <Coffee size={15} strokeWidth={1} className="text-black" />
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs font-light text-black font-montserrat">
            Copyright © SSACLE
          </span>
        </div>
      </div>
    </footer>
  )
}
export default Footer
