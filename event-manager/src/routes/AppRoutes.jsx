import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login/LoginPage";
import Register from "../pages/Register/RegisterPage";
import EventPage from "../pages/Event/EventPage";
import Header from "../components/Header/Header";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/events" && <Header />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/events" element={<EventPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
