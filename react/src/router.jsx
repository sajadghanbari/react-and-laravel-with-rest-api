import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import User from './views/User.jsx';
import Signup from './views/Signup.jsx';
import NotFound from './views/NotFound.jsx';

const router = createBrowserRouter([
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
  {
    path: '/*',
    element: <NotFound />,
  },
]);

export default router;
