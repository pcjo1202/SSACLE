import profileImage from '@/mocks/pImg.png'

const Profile = ({ userData }) => {
  const { name, experience, level } = userData

  // experience를 퍼센트로 변환 (최대값 10,000 기준)
  const progressPercent = (experience / 10000) * 100

  return (
    <div className="min-w-max bg-ssacle-sky rounded-xl p-10 w-full h-60 content-center">
      <div className="flex items-center gap-6">
        {/* 프로필 이미지 */}
        <div className="w-28 h-28 bg-white rounded-full">
          <img
            src={profileImage}
            alt="프로필 캐릭터"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* 정보 */}
        <div className="flex-1">
          {/* 이름, 레벨 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-lg text-ssacle-black">
              {name}
            </span>
            <span className="text-green-500 font-semibold ">256 피클 🥒</span>
          </div>
          <div className="font-bold text-base text-ssacle-blue">
            Lv. {level}
          </div>

          {/* 레벨 바 */}
          <div className="mt-2">
            <div className="w-full bg-white h-4 rounded-full">
              <div
                className="bg-ssacle-blue h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {/* 경험치 텍스트 */}
            <div className="flex justify-between mt-1">
              <span className="text-sm text-white font-semibold">
                {experience.toLocaleString()} XP
              </span>
              <span className="text-sm text-white font-semibold">
                10,000 XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
