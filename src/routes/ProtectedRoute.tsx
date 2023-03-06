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
  }
  return <>{children}</>;
};

export const ProtectedRouteAdmin = ({ login, children }: IParams) => {
  if (!login || login.roleName === 'user') {
    return <Navigate to='/auth/login' replace />;
  }

  return <>{children}</>;
};
