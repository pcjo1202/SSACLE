const BoardList = ({ posts, boardType, type, onPostClick }) => {
  // 게시글 없을 경우 글 작성 유도 문구 뜨도록
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-lg">아직 작성된 글이 없습니다.</p>
        <p className="text-gray-400 mt-2">첫 번째 글의 작성자가 되어보세요!</p>
      </div>
    )
  }

  const renderTitle = (post) => {
    if (type === 'note') {
      return (
        <div>
          <h3 className="text-ssacle-black text-lg font-medium group-hover:text-blue-500 transition-colors">
            📖 {post.title}
          </h3>
          <p className="text-sm text-ssacle-gray mt-1">
            {post.teamName ? `${post.teamName} 팀의 학습 노트` : '팀 학습 노트'}
          </p>
        </div>
      )
    }

    return (
      <h3 className="text-ssacle-black text-lg font-medium group-hover:text-blue-500 transition-colors">
        {post.title}
      </h3>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => onPostClick(post.id)}
          className="flex items-center justify-between p-4 border border-ssacle-gray rounded-lg hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center space-x-4">
            {post.subCategory === 'legend' && (
              <span className="text-yellow-500" title="명예의 전당">
                🏆
              </span>
            )}
            {post.subCategory === 'qna' && (
              <span className="text-blue-500 font-bold" title="질문">
                Q
              </span>
            )}

            <div>
              {renderTitle(post)}

              <div className="flex space-x-4 text-sm text-gray-500">
                <span>{post.writerInfo}</span>
                {type !== 'note' && <span>{post.time.split('T')[0]}</span>}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {post.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BoardList
