import { Navigate, Navigation } from 'react-router';
import { ILogin } from 'src/types/auth';
import { role } from 'src/utils/common';
import React from 'react';
interface IParams {
  login: ILogin;
  children: React.ReactNode;
}
export const ProtectedRoute = ({ login, children }: IParams) => {
  if (!login) {
    return <Navigate to='/' replace />;
  } else {
    if (login?.id_role !== 2) {
      if (login?.id_role === 1) return <Navigate to='/admin' replace />;
    }
  }
  return <>{children}</>;
};
export const ProtectedRouteAuth = ({ login, children }: IParams) => {
  if (login) {
    return <Navigate to='/' replace />;
  }
  return <>{children}</>;
};
export const ProtectedRouteAdmin = ({ login, children }: IParams) => {
  if (!login || login?.id_role !== 1) {
    return <Navigate to='/auth/login' replace />;
  }

  return <>{children}</>;
};

export const ProtectedRouteUser = ({ login, children }: IParams) => {
  if (login) {
    if (login?.id_role === 1) return <Navigate to='/admin' replace />;
  }
  return <>{children}</>;
};
