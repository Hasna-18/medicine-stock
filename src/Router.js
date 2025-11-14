import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Aboutus from "./form/Aboutus";
import Login from "./form/Login";
import Signup from "./form/Signup";
import Mainpage from "./form/Mainpage";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/mainpage"
        element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRouter;