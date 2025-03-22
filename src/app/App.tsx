import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import axios from "axios";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import RecruitPostBoard from "pages/RecruitPostBoard";
import RecruitPost from "pages/RecruitPost";
import SetUsername from "pages/SetUsername";
import { useEffect } from "react";
import { axiosInstance } from "data/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, setUser } from "features/member/memberSlice";
import useAxiosInterceptor from "features/auth/hooks/useAxiosInterceptor";
import Members from "pages/Members";
import Profile from "features/member/components/Profile";
import EditProfile from "features/member/components/EditProfile";
import RecruitPostForm from "pages/RecruitPostForm";
import RecruitPostEdit from "pages/RecruitPostEdit";
import useReconnect from "hooks/useReconnect";
import Study from "pages/Study";

function App() {
  //TEST - cors 허용
  axios.defaults.withCredentials = true;

  useAxiosInterceptor(axiosInstance);
  useReconnect();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="members/:id" element={<Members />}>
            <Route path="" element={<Profile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="set-username" element={<SetUsername />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recruit-posts">
            <Route path="" element={<RecruitPostBoard />} />
            <Route path=":id" element={<RecruitPost />} />
            <Route path="new" element={<RecruitPostForm />} />
            <Route path=":id/edit" element={<RecruitPostEdit />} />
          </Route>
          <Route path="study/:id" element={<Study />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
