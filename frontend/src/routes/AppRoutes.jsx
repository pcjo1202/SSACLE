import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from '@/pages/MainPage/MainPage'
import NotFound from '@/pages/NotFound/NotFound'
import BaseLayout from '@/components/layout/BaseLayout'
import PresentationPage from '@/pages/PresentationPage/PresentationPage'
import PresentationLayout from '@/components/layout/PresentationLayout'
import LoginPage from '@/pages/Account/LoginPage/LoginPage'
import SignupStep1 from '@/pages/Account/SignupPage/SignupStep1'
import SignupStep2 from '@/pages/Account/SignupPage/SignupStep2'
import InterestPage from '@/pages/Account/SignupPage/InterestPage'
import SuccessPage from '@/pages/Account/SignupPage/SuccessPage'
import FindAccount from '@/pages/Account/LoginPage/FindAccount'
import SsaprintPage from '@/pages/Ssaprint/SsaprintPage'
import StudyBoardPage from '@/pages/Board/StudyBoardPage'

const router = createBrowserRouter([
  {
    element: <BaseLayout />, // 기본 header, footer가 있는 Page
    children: [
      // 메인 page
      { path: '/', index: true, element: <MainPage /> },

      // 계정 인증 관련 (로그인, 회원가입, 관심사 등록 등)
      {
        path: '/account',
        children: [
          // 로그인 page
          { path: 'login', element: <LoginPage /> },
          // 회원가입 page
          {
            path: 'signup',
            children: [
              { index: true, element: <SignupStep1 /> },
              { path: 'step2', element: <SignupStep2 /> },
              { path: 'interest', element: <InterestPage /> },
              { path: 'success', element: <SuccessPage /> },
              { path: 'error', element: <h1>SignUpSuccess</h1> },
            ],
          },
          // 이메일 찾기, 비밀번호 찾기
          { path: 'help', element: <FindAccount /> },
        ],
      },

      // user 관련 page (마이페이지, 아이디/비밀번호 찾기 등)
      {
        path: '/user',
        children: [
          { path: 'profile', element: <h1>Profile</h1> },
          { path: 'help/inquiry', element: <h1>inquiry</h1> },
        ],
      },

      // 싸프린트 Page
      {
        path: '/sprint',
        children: [
          { index: true, element: <SsaprintPage /> },
          { path: ':sprintId', element: <h1>sprintId</h1> },
        ],
      },

      // 싸드컵 page
      {
        path: '/ssadcup',
        children: [
          { index: true, element: <h1>ssadcup</h1> },
          { path: ':ssadcupId', element: <h1>ssadcupId</h1> },
        ],
      },

      // 게시판 페이지 (학습 게시판, 자유 게시판)
      {
        path: '/board',
        children: [
          {
            // 학습 게시판 -> 탭으로 명예의 전당, 질의응답 구분 예정. 아래 코드 주석 처리
            // path: 'edu',
            // children: [
            //   { index: true, path: 'qna', element: <h1>질의 응답</h1> },
            //   { path: 'legend', element: <StudyBoardPage /> },
            // ],
            path: 'edu',
            children: [{ index: true, element: <StudyBoardPage /> }],
          },
          {
            path: 'free',
            children: [
              { index: true, element: <h1>자유게시판</h1> },
              { path: 'ssaguman', element: <h1>싸구만</h1> },
            ],
          },
        ],
      },
    ],
  },
  // 발표 화면 page
  {
    path: '/presentation',
    element: <PresentationLayout />,
    children: [{ index: true, element: <PresentationPage /> }],
  },
  // 관리자 관련 page
  {
    path: '/admin',
    children: [
      { index: true, element: <h1>관리자 페이지</h1> },
      { path: 'user', element: <h1>admin user</h1> },
      { path: 'sprint', element: <h1>admin sprint</h1> },
      { path: 'ssadcup', element: <h1>admin ssadcup</h1> },
      { path: 'board', element: <h1>admin board</h1> },
    ],
  },
  // 404 Not Found
  { path: '*', element: <NotFound /> },
])

const AppRoutes = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes
