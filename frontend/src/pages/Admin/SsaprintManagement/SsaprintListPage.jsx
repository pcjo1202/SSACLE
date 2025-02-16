import CommonTable from '@/components/AdminPage/CommonTable'
import DeleteButton from '@/components/AdminPage/DeleteButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
  const navigate = useNavigate()
  const columns = [
    { key: 'id', label: '싸프린트 ID', sortable: true },
    {
      key: 'status',
      label: '상태',
      align: 'left',
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-white ${statusColor(row.status)}`}
        >
          {row.status}
        </span>
      ),
    },
    { key: 'category', label: '대분류' },
    { key: 'subcategory', label: '중분류' },
    { key: 'title', label: '제목' },
    { key: 'date', label: '기간', sortable: true },
  ]

  const data = [
    {
      id: 'ABC1234',
      status: '예정',
      category: 'FE',
      subcategory: 'REACT',
      title: 'useState 싸프린트',
      date: '2025-01-27 ~ 2025-02-02',
    },
    {
      id: 'ABC1235',
      status: '진행중',
      category: 'FE',
      subcategory: 'VUE',
      title: 'Pinia 싸프린트',
      date: '2025-02-01 ~ 2025-02-07',
    },
    {
      id: 'ABC1236',
      status: '진행 완료',
      category: 'FE',
      subcategory: 'REACT',
      title: 'Redux 싸프린트',
      date: '2025-02-10 ~ 2025-02-15',
    },
    {
      id: 'ABC1237',
      status: '모집 중',
      category: 'FE',
      subcategory: 'VUE',
      title: 'Vuex 싸프린트',
      date: '2025-02-20 ~ 2025-02-25',
    },
  ]

  const statusColor = (status) => {
    return (
      {
        예정: 'bg-orange-400',
        진행중: 'bg-green-500',
        '진행 완료': 'bg-gray-400',
        '모집 중': 'bg-blue-400',
      }[status] || 'bg-gray-200'
    )
  }

  const handleDelete = (row) => {
    console.log('삭제할 데이터:', row)
  }

  const handleCreate = () => {
    navigate('/admin/sprint/create')
  }

  const [selectedRows, setSelectedRows] = useState([])

  const handleDelete2 = (rowsToDelete) => {
    setData((prevData) =>
      prevData.filter((row) => !rowsToDelete.includes(row.id))
    )
    setSelectedRows([]) // 선택된 항목 초기화
  }

  return (
    <div className="flex flex-col justify-center p-6 gap-4">
      <h1 className="text-2xl font-bold mb-4 text-center">싸프린트 관리</h1>
      {/* 삭제 버튼 & 생성하기 버튼 영역 */}
      <div className="flex justify-between items-center mb-2">
        {/* 삭제 버튼 */}
        <DeleteButton selectedRows={selectedRows} onDelete={handleDelete} />

        {/* 생성하기 버튼 */}
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          생성하기
        </button>
      </div>
      <CommonTable
        columns={columns}
        data={data}
        selectable
        perPage={10}
        renderActions={(row) => (
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => handleDelete(row)}
          >
            삭제
          </button>
        )}
        onSelect={setSelectedRows}
      />
    </div>
  )
}

export default AdminPage
