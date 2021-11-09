import React from 'react';
import { Route, Navigate } from "react-router-dom"

const PrivateElement = ({ element }) => {
  return localStorage.getItem("Token") ? (
    element
  ) : (
    <Navigate to="/" />
  )
}

const PrivateRoute = ({ element, ...rest })=> {
  return <Route {...rest} element={<PrivateElement element={element} />} />
}

export default PrivateRoute