import { RootState } from "app/store";
import ProfileMenu from "features/member/components/ProfileMenu";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";

const Members = () => {
  const member = useSelector((state: RootState) => state.member);
  const id = useParams().id;

  return (
    <div className="flex h-full w-full">
      {member.id && id && member.id === parseInt(id) && <ProfileMenu />}
      <div className="flex w-3/4 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Members;
