import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Home from "./Home/Home";
import AuthComponent from "./auth";
import Login from "../components/common/Login/Login";
import Register from "../components/common/Register/Register";
import DefaultLayout from "../components/layouts/DefaultLayout";
// import ProfileComponent from "../components/views/profile";
import FeedForm from "../components/common/Feed/FeedForm";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/feeds" />} />
        <Route element={<DefaultLayout />}>
          <Route path="/feeds" element={<Home />} />
          <Route path="/feed/edit/:id" element={<FeedForm />} /> 
        </Route>
        <Route path="auth" element={<AuthComponent />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Root;