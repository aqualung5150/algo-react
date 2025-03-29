import { RootState } from "app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const loading = useSelector((state: RootState) => state.auth.connecting);
  const memberId = useSelector((state: RootState) => state.member.id);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === true) return;
    if (memberId) return;

    Cookies.set("redirectUrl", location.pathname, {
      expires: 1,
      path: "/",
    });

    navigate("/login");
  }, [memberId, location, loading]);

  return memberId && <Outlet />;
};

export default PrivateRoute;
