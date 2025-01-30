import { Search, Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="w-full h-[91px] px-[200px] py-4 bg-white shadow-md flex justify-between items-center">
      {/* 로고 */}
      <a href="/" className="text-[#5194f6] text-5xl font-bold font-montserrat">
        SSACLE
      </a>

      {/* 네비게이션 */}
      <nav className="flex space-x-12 text-[#242424] text-xl font-medium font-noto-sans-kr">
        <a href="/sprint" className="hover:underline">싸프린트</a>
        <a href="/ssadcup" className="hover:underline">싸드컵</a>
        <a href="/board/edu" className="hover:underline">학습게시판</a>
        <a href="/board/free" className="hover:underline">자유게시판</a>
      </nav>

      {/* 아이콘 */}
      <div className="flex space-x-6">
        <button className="w-[30px] h-[30px] flex justify-center items-center">
          <Search size={20} className="text-black" />
        </button>
        <button
          className="w-[30px] h-[30px] flex justify-center items-center"
          onClick={() => navigate('account/login')}
        >
          <Lock size={20} className="text-black" />
        </button>
        <button className="w-[30px] h-[30px] flex justify-center items-center">
          <User size={20} className="text-black" />
        </button>
      </div>
    </header>
  )
}
export default Header
