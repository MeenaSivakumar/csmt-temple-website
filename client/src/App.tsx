import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from './templates/PublicLayout'
import AdminLayout from './templates/AdminLayout'
import AuthLayout from './templates/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import HallBooking from './pages/HallBooking'
import MyBookings from './pages/MyBookings'
import AdminDashboard from './pages/admin/Dashboard'
import ContentManagement from './pages/admin/ContentManagement'
import HallBookings from './pages/admin/HallBookings'
import { ROUTES } from './constants/routes'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.HALL_BOOKING, element: <HallBooking /> },
      { path: ROUTES.MY_BOOKINGS, element: <MyBookings /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.ADMIN_LOGIN, element: <Login /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: ROUTES.ADMIN_DASHBOARD, element: <AdminDashboard /> },
      { path: ROUTES.ADMIN_CONTENT, element: <ContentManagement /> },
      { path: ROUTES.ADMIN_HALLS, element: <HallBookings /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
