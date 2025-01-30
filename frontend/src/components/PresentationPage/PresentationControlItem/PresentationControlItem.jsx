const PresentationControlItem = ({ item }) => {
  const { id, icon, title, style, activeFunction } = item
  return (
    <li key={id} className="list-none">
      <button
        className={`flex flex-col justify-center items-center gap-2 px-4 rounded-md ${style} hover:bg-gray-800 py-1`}
        onClick={activeFunction}
      >
        <span className="size-5">{icon}</span>
        <span className="text-xs text-ssacle-gray-sm">{title}</span>
      </button>
    </li>
  )
}
export default PresentationControlItem
