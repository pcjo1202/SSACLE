const StreamVideoPageButton = ({
  connectCount,
  currentPage,
  itemPerPage,
  setCurrentPage,
}) => {
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev < connectCount / itemPerPage ? prev + 1 : prev
    )
  }

  console.log('connectCount', connectCount)
  console.log('currentPage', currentPage)
  console.log('itemPerPage', itemPerPage)
  return (
    connectCount > itemPerPage && (
      <div className="flex items-center justify-center gap-2 ">
        <button
          disabled={currentPage === 0}
          onClick={handlePrevPage}
          className="disabled:opacity-0 disabled:cursor-not-allowed"
          aria-label="이전 페이지"
        >
          이전
        </button>
        <button
          disabled={currentPage === Math.floor(connectCount / itemPerPage)}
          onClick={handleNextPage}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="다음 페이지"
        >
          다음
        </button>
      </div>
    )
  )
}
export default StreamVideoPageButton
