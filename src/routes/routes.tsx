import { Navigate, RouteObject } from 'react-router';
import Status404 from 'src/content/pages/Status/Status404';
import SidebarLayout from 'src/layouts/admin/SidebarLayout';
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
import { Suspense, lazy } from 'react';
import UpdatePost from 'src/pages/UpdatePost';
import { ILogin } from 'src/types/auth';
import { ProtectedRoute } from './ProtectedRoute';

// Dashboards
import SuspenseLoader from 'src/components/admin/SuspenseLoader';
import ChatBox from 'src/pages/Messages/component/ChatBox';
import ChatGPT from 'src/pages/Messages/component/ChatGPT';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

// const Transactions = Loader(lazy(() => import('src/content/applications/Transactions')));
// const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
// const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));

interface IRoute {
  (login: ILogin): RouteObject[];
}
const routes: IRoute = (login) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'message',
        element: <ProtectedRoute login={login} children={<Messages />} />,
        children: [
          {
            path: ':id_room',
            element: <ChatBox />
          },
          {
            path: 'new/:id_user',
            element: <ChatBox />
          }
        ]
      },
      {
        path: '/profile',
        element: <ProtectedRoute login={login} children={<Profile />} />
      },
      {
        path: '/:id_user',
        element: <Profile />
      },
      {
        path: '/reels',
        element: <Reels />
      },
      {
        path: '/create',
        children: [
          {
            index: true,
            path: 'post',
            element: <ProtectedRoute login={login} children={<Create type={'post'} />} />
          },
          {
            path: 'reels',
            element: <ProtectedRoute login={login} children={<Create type={'reels'} />} />
          }
        ]
      },
      {
        path: '/update/:id_post',
        element: <UpdatePost />
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
  },
  {
    path: '/admin',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='dashboards' replace />
      },
      {
        path: 'dashboards',
        children: [
          {
            path: '',
            element: <Navigate to='crypto' replace />
          },
          {
            path: 'crypto',
            element: <Crypto />
          }
        ]
      }

      // {
      // path: 'management',
      // element: <SidebarLayout />,
      // children: [
      //   {
      //     path: '',
      //     element: <Navigate to='transactions' replace />
      //   },
      //   {
      //     path: 'transactions',
      //     element: <Transactions />
      //   }
      // {
      //   path: 'profile',
      //   children: [
      //     {
      //       path: '',
      //       element: <Navigate to='details' replace />
      //     },
      //     {
      //       path: 'details',
      //       element: <UserProfile />
      //     },
      //     {
      //       path: 'settings',
      //       element: <UserSettings />
      //     }
      //   ]
      // }
      // ]
      // }
    ]
  },
  {
    path: 'notfound',
    element: <Status404 />
  },
  {
    path: '*',
    element: <Status404 />
  }
];

export default routes;
