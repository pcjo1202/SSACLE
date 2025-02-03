import { Search, Lock, User } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="min-w-max z-10 fixed top-0 left-0 w-full h-12 px-48 py-4 bg-white shadow-sm flex justify-between items-center">
      {/* 로고 */}
      <Link
        to="/"
        className="text-ssacle-blue text-3xl font-bold font-montserrat"
      >
        SSACLE
      </Link>

      {/* 네비게이션 */}
      <nav className="flex space-x-12 text-ssacle-black text-base font-medium font-noto-sans-kr">
        <Link to="/sprint" className="hover:underline">
          싸프린트
        </Link>
        <Link to="/ssadcup" className="hover:underline">
          싸드컵
        </Link>
        <Link to="/board/edu" className="hover:underline">
          학습게시판
        </Link>
        <Link to="/board/free" className="hover:underline">
          자유게시판
        </Link>
      </nav>

      {/* 아이콘 */}
      <div className="flex space-x-6">
        <button className="w-5 h-5 flex justify-center items-center">
          <Search size={15} className="text-black" />
        </button>
        <button
          className="w-5 h-5 flex justify-center items-center"
          onClick={() => navigate('account/login')}
        >
          <Lock size={15} className="text-black" />
        </button>
        <button
          className="w-5 h-5 flex justify-center items-center"
          onClick={() => navigate('user/profile')}
        >
          <User size={15} className="text-black" />
        </button>
      </div>
    </header>
  )
}
export default Header
