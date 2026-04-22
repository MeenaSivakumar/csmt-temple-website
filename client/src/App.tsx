import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from './templates/PublicLayout'
import AdminLayout from './templates/AdminLayout'
import AuthLayout from './templates/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/Dashboard'
import ContentManagement from './pages/admin/ContentManagement'
import { ROUTES } from './constants/routes'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
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
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
