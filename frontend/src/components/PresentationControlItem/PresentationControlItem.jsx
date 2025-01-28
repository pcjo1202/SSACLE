const PresentationControlItem = ({ item }) => {
  return (
    <li key={item.id} className="list-none">
      <button
        className={`flex flex-col items-center gap-2 px-4 py-2 rounded-md ${item.style}`}
        onClick={item.activeFunction}
      >
        <span>{item.icon}</span>
        <span className="text-sm text-ssacle-gray-sm">{item.title}</span>
      </button>
    </li>
  )
}
export default PresentationControlItem
