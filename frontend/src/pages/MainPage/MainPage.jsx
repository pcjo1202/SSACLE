import mockData from '@/mocks/mainPageData.json'
import MySsaprintList from '@/components/MainPage/Profile/MySsaprintList'
import Profile from '@/components/MainPage/Profile/Profile'
import CurruntSsaprint from '@/components/MainPage/Ssaprint/CurrentSsaprint'
import CurruntSsadcup from '@/components/MainPage/Ssadcup/CurrentSsadcup'
import SsabapVote from '@/components/MainPage/SsabapVote/SsabapVote'
import News from '@/components/MainPage/News/News'

const MainPage = () => {
  const { user, currentSprints, recommendedSprints, aiNews } = mockData

  return (
    <main className="my-10">
      {/* 프로필, 나의 싸프린트 + 싸드컵 현황 보드 */}
      <div className="flex flex-row gap-x-5 mb-20">
        <section className="basis-2/5">
          <Profile userData={user} />
        </section>
        <section className="basis-3/5">
          <MySsaprintList currentSprintsData={currentSprints} />
        </section>
      </div>
      {/* 모집중인 싸프린트 */}
      <section className="mb-20">
        <CurruntSsaprint
          userData={user}
          recommendedSprints={recommendedSprints}
        />
      </section>
      {/* 모집중인 싸드컵 */}
      <section className="mb-20">
        <CurruntSsadcup
          userData={user}
          recommendedSprints={recommendedSprints}
        />
      </section>
      {/* 싸밥 투표, AI 기사 */}
      <div className="flex flex-row gap-x-5">
        <section className="basis-1/2">
          <SsabapVote />
        </section>
        <section className="basis-1/2">
          <News news={aiNews} />
        </section>
      </div>
    </main>
  )
}
export default MainPage
