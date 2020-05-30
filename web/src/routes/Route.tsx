import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { RouteProps, useNavigate } from 'react-router';

interface AppRouteProps extends Omit<RouteProps, 'element'> {
  element: React.ComponentType;
  redirect?: boolean;
  redirectTo?: string;
}

const AppRoute: React.FC<AppRouteProps> = ({
  element: Element,
  redirect,
  redirectTo,
  ...rest
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirectTo || '/');
    }
  }, [redirectTo, redirect, navigate]);

  return <Route element={<Element />} {...rest} />;
};

export default AppRoute;
