import PresentationControlItem from '@/components/PresentationControlItem/PresentationControlItem'
import {
  SparklesIcon,
  MicIcon,
  CameraIcon,
  ScreenShareIcon,
  UsersIcon,
  MessageSquareIcon,
  LogOutIcon,
} from 'lucide-react'

const PRESENTATION_CONTROLS = {
  effects: {
    id: 1,
    icon: <SparklesIcon />,
    title: '효과',
    style: 'text-yellow-500',
    activeFunction: () => {
      console.log('효과')
    },
  },
  controls: [
    {
      id: 2,
      icon: <MicIcon />,
      title: '마이크',
      activeFunction: () => {
        // 마이크 기능 활성화
        console.log('마이크')
      },
    },
    {
      id: 3,
      icon: <CameraIcon />,
      title: '카메라',
      activeFunction: () => {
        console.log('카메라')
      },
    },
    {
      id: 4,
      icon: <ScreenShareIcon />,
      title: '화면공유',
      style: 'text-green-500',
      activeFunction: () => {
        console.log('화면공유')
      },
    },
    {
      id: 5,
      icon: <UsersIcon />,
      title: '참여자',
      activeFunction: () => {
        console.log('참여자')
      },
    },
    {
      id: 6,
      icon: <MessageSquareIcon />,
      title: '채팅',
      activeFunction: () => {
        console.log('채팅')
      },
    },
  ],
  exit: {
    id: 7,
    icon: <LogOutIcon />,
    title: '나가기',
    style: 'text-red-500',
    activeFunction: () => {
      console.log('나가기')
    },
  },
}

const PresentationControlBar = () => {
  const { effects, controls, exit } = PRESENTATION_CONTROLS

  return (
    <nav className="flex items-center justify-between px-24 py-4 bg-ssacle-black">
      <PresentationControlItem item={effects} />
      <ul className="flex justify-between gap-10 px-6">
        {controls.map((item) => (
          <PresentationControlItem key={item.id} item={item} />
        ))}
      </ul>
      <PresentationControlItem item={exit} />
    </nav>
  )
}

export default PresentationControlBar
