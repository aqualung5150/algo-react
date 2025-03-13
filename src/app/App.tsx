import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import axios from "axios";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import RecruitPostBoard from "pages/RecruitPostBoard";
import RecruitPost from "pages/RecruitPost";

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
          <Route path="recruit-posts">
            <Route path="" element={<RecruitPostBoard />} />
            <Route path=":id" element={<RecruitPost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
