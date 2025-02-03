import SprintFilter from '@/components/Ssaprint/SprintFilter/SprintFilter';
import SprintList from '@/components/Ssaprint/SprintList/SprintList';
import mockData from '@/mocks/ssaprintMockData.json';

const SsaprintPage = () => {
  return (
    <div className="mt-16">
      {/* 싸프린트 소개 배너 */}
      <section className="bg-[#F0F7F3] text-gray-700 text-center py-3 rounded-lg mb-3">
        <h1 className="text-sm font-semibold">싸프린트</h1>
        <p className="text-xs">
          함께 배우고 성장하는, 짧고 집중적인 스프린트 학습 공간입니다.
        </p>
      </section>

      {/* 필터 UI */}
      <SprintFilter />

      {/* 스프린트 목록 */}
      <section className="mt-1">
        <SprintList sprints={mockData.sprints} />
      </section>
    </div>
  );
};

export default SsaprintPage;
