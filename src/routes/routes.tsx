import { Navigate, RouteObject } from 'react-router';
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
import { ProtectedRoute, ProtectedRouteAdmin } from './ProtectedRoute';

// Dashboards
import SuspenseLoader from 'src/components/admin/SuspenseLoader';
import ChatBox from 'src/pages/Messages/component/ChatBox';
import Setting from 'src/pages/Setting/Setting';
import Status404 from 'src/pages/Status/Status404';
const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Crypto = Loader(lazy(() => import('src/pages/Admin/dashboards/Crypto')));

// Applications

const Users = Loader(lazy(() => import('src/pages/Admin/applications/Users')));
const Posts = Loader(lazy(() => import('src/pages/Admin/applications/Posts')));

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
        path: '/setting',
        element: <ProtectedRoute login={login} children={<Setting />} />
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
    element: (
      <ProtectedRouteAdmin login={login}>
        <SidebarLayout />
      </ProtectedRouteAdmin>
    ),
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
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            element: <Users />
          }
        ]
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            element: <Posts />
          },
          {
            path: ':id_user',
            element: <Posts />
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
      //     element: <Users />
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
