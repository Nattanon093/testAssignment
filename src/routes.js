import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Place_List';
import BlogByid from './pages/Place_ListByid';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/ics',
      element: <DashboardLayout />,
      children: [
        { path: 'placeList', element: <Blog /> },
        { path: 'placeById/:id', element: <BlogByid /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/ics/placeList" /> },
        // { path: 'placeById/:id', element: <BlogByid /> },
      ],
    },
  ]);
}
