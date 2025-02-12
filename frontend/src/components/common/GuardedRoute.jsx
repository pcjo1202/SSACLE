import { Navigate, Outlet } from 'react-router-dom'

const GuardedRoute = () => {
  const accessToken = localStorage.getItem('accessToken')
  return accessToken ? <Outlet /> : <Navigate to="/account/login" replace />
}

export default GuardedRoute
