import { RouteObject } from 'react-router';
import MainLayout from 'src/layouts/Main';
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
        path: '/',
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
