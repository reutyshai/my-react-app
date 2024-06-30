import {createBrowserRouter} from 'react-router-dom'
import User from './components/user/User.jsx'
import Admin from './components/admin/AdminPage.jsx'
import Meetings from './components/meetings/Meetings.jsx'
import AdminServices from './components/services/AdminServices.jsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <User/>,
      errorElement: <div>error 404</div>
  
    },
    {
      path: '/admin',
      element: <Admin/>,
      errorElement: <div>error Admin</div>,
      children: [
        {
          path: '',
          element: <div></div>,
        },
        {
          path: 'services',
          element:<AdminServices />,
          errorElement: <div>error contant not found</div>
        },
        {
          path: 'meetings',
          element: <Meetings/>,
          errorElement: <div>error contant not found</div>
        }
      ]
    }
  ])

  export default router;