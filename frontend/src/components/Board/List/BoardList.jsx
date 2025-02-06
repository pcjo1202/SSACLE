import { Link } from 'react-router-dom'

const BoardList = ({ posts, type }) => {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between p-4 border border-ssacle-gray rounded-lg hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center space-x-4">
            {type === 'legend' && (
              <span className="text-yellow-500" title="명예의 전당">
                🏆
              </span>
            )}
            {type === 'qna' && (
              <span className="text-blue-500 font-bold" title="질문">
                Q
              </span>
            )}

            <div>
              <Link to={`/board/${post.id}`} className="group">
                <h3 className="text-ssacle-black text-lg font-medium group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h3>
              </Link>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.date}</span>
                <span>조회수 {post.views}</span>
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
