import ConferenceContainer from '@/components/ConferenceContainer/ConferenceContainer'
import {
  fetchServerToken,
  fetchSessionId,
  fetchToken,
} from '@/services/openviduService'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const SessionInitializer = () => {
  const { roomId } = useParams()
  // 세션 ID 요청
  const { data: token, isSuccess } = useQuery({
    queryKey: ['sessionId'],
    queryFn: async () => {
      const sessionId = await fetchSessionId(roomId ?? 'test-session-id')
      const token = await fetchToken(sessionId)
      return token
      // const serverToken = (await fetchServerToken(15)) + ''
      // console.log('serverToken', serverToken)
      // return serverToken // 실제 데이터만 반환
    },
    staleTime: Infinity, // 토큰은 한번 받으면 변경되지 않으므로
  })

  return (
    <div className="flex items-center justify-center w-full h-full">
      {isSuccess && token ? (
        <ConferenceContainer token={token} />
      ) : (
        <div>
          <span>세션 ID 또는 토큰이 없습니다.</span>
        </div>
      )}
    </div>
  )
}
export default SessionInitializer
