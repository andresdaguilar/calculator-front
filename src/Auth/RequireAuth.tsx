import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AppContext);
  let location = useLocation();

  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
