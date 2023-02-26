import { RouteObject } from 'react-router';
import Auth from 'src/layouts/Auth';
import MainLayout from 'src/layouts/Main';
import ForgetPassword from 'src/pages/Auth/ForgetPassword';
import Login from 'src/pages/Auth/Login/Login';
import Register from 'src/pages/Auth/Register/Register';
import Create from 'src/pages/Create';
import Home from 'src/pages/Home';
import Messages from 'src/pages/Messages';
import Profile from 'src/pages/Profile';
import Reels from 'src/pages/Reels';

// cách 1
interface IRoute {
  (isLogin: boolean): RouteObject[];
}
const routes: IRoute = (isLogin) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/messages',
        element: <Messages />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/reels',
        element: <Reels />
      },
      {
        path: '/create',
        element: <Create/>
      }
    ]
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        index: true,
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />
      }
    ]
  }
];

// cách 2
// interface IRoute { fc : (isLogin: boolean) => RouteObject[]};
// const routes: IRoute['fc'] = (isLogin) => [
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       }
//     ]
//   }
// ];

/// cách 3
// const routes: (isLogin: boolean) => RouteObject[] = (isLogin: boolean) => [
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       }
//     ]
//   }
// ];
export default routes;
