import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

const PrivateRoute = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute; 
