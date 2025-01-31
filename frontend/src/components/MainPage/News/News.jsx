const News = ({ news }) => {
  return (
    <div>
      <div>
        <p className="text-xl font-bold text-ssacle-black mb-6">AI 기사 💻</p>
      </div>
      <div>
        {news.map((item) => (
          <a
            href={item.url}
            key={item.newsId}
            target="_blank"
            rel="noopener noreferrer" // 보안을 위한 속성
            className="block"
          >
            <div className="flex felx-row justify-between border-b border-gray-100">
              <p className="tracking-tight text-sm font-semibold text-ssacle-black my-4">
                {item.summary}
              </p>
              <p className="text-l font-medium text-ssacle-gray my-4">
                {item.publishedAt}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default News
