
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // logged in token
  const token = localStorage.getItem('token');
  
  // no token
  return token ? children : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;