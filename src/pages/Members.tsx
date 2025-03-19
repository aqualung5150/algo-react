import { RootState } from "app/store";
import ProfileMenu from "features/member/components/ProfileMenu";
import { logout } from "features/member/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";

const Members = () => {
  const dispatch = useDispatch();
  const member = useSelector((state: RootState) => state.member);
  const id = useParams().id;

  return (
    <div className="flex h-full w-full">
      {member.id && id && member.id === parseInt(id) && <ProfileMenu />}
      마이페이지
      <div className="flex w-3/4 flex-1">
        <Outlet />
      </div>
      <div onClick={() => dispatch(logout(import.meta.env.VITE_BASE_URL))}>
        로그아웃
      </div>
    </div>
  );
};

export default Members;
