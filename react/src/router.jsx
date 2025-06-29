import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/login.jsx';
import User from './views/user.jsx';
import UserForm from './views/userForm.jsx';
import Signup from './views/signup.jsx';
import NotFound from './views/notFound.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import DashBoard from './views/dashBoard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"  />,
      },

            {
        path: '/dashboard',
        element: <DashBoard />,
      },
            {
        path: '/users',
        element: <User />,
      },
            {
        path: '/users/new',
        element: <UserForm  key="userCreate"/>,
      },
            {
        path: '/users/:id',
        element: <UserForm key="userUpdate"/>,
      },

    ],
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login />,
      },

      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },

  {
    path: '/*',
    element: <NotFound />,
  },
]);

export default router;
