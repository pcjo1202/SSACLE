import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const role = localStorage.getItem('role')
  return role === 'ADMIN' ? <Outlet /> : <Navigate to="/main" replace />
}

export default AdminRoute
