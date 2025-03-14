import { logout } from "features/member/memberSlice";
import { useDispatch } from "react-redux";

const MyPage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      마이페이지
      <div onClick={() => dispatch(logout(import.meta.env.VITE_BASE_URL))}>
        로그아웃
      </div>
    </div>
  );
};

export default MyPage;
