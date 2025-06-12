import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
const router = createBrowserRouter({
  routes: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/user',
      element: <User />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ],
});
