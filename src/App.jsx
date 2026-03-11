import { useEffect, useState } from "react";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/resetPassword";
import UpdateProfile from "./pages/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";

import PublicRoute from "./components/PublicRoute";
function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
          <Route path="*" element={<div>This route is not valid</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
