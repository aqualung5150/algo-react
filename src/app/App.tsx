import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import axios from "axios";
import Home from "../pages/Home";
import Layout from "../layout/Layout";

function App() {
  // return (
  //   <>
  //     <div>
  //       <a href="http://localhost:8080/oauth2/authorization/google?mycookie=yourcookie" target="_blank">
  //         Google로그인
  //       </a>
  //     </div>
  //   </>
  // )

  //TEST - cors 허용
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
