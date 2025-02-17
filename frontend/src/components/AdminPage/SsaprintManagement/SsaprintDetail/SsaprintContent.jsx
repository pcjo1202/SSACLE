const SsaprintContent = ({ learningSchedule, goal }) => {
    return (
      <div className="bg-white p-6 flex flex-col items-center w-full border-2 border-ssacle-gray-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">학습 과정</h3>
          <p className="text-sm">{learningSchedule}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">수료 후 혜택</h3>
          <p className="text-sm">{goal}</p>
        </div>
      </div>
    );
  };
  
  export default SsaprintContent;
  