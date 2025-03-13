import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import axios from "axios";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import RecruitPosts from "pages/RecruitPosts";

function App() {
  //TEST - cors 허용
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recruit-posts" element={<RecruitPosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
