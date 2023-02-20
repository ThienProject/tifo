import { RouteObject } from 'react-router';
import MainLayout from 'src/layouts/Main';
import Home from 'src/pages/Home';

// cách 1
interface IRoute {(isLogin: boolean): RouteObject[]};
const routes: IRoute = (isLogin) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      }
    ],
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
