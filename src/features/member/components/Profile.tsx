import { RootState } from "app/store";
import useAxios from "hooks/useAxios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "components/NotFound";

//TODO: img src={S3에서가져오기}
const Profile = () => {
  const id = useParams().id;
  const memberId = useSelector((state: RootState) => state.member.id);
  const { data, error, loading } = useAxios<ProfileResponse>(`members/${id}`);

  if (error) return <NotFound title="존재하지 않는 회원입니다." />;
  if (data)
    return (
      <div className="flex w-full flex-col items-center gap-10 p-10">
        <div className="w-full max-w-96">
          <img
            className="aspect-square h-full w-full rounded-full object-cover"
            src={data.imageUrl}
          />
        </div>
        <div className="flex w-full items-center justify-center gap-10 rounded-2xl bg-white md:w-2/3">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{data.username}</span>
            <span className="text-xl text-gray-500">#{data.id}</span>
          </div>
        </div>
      </div>
    );
  return null;
};

export default Profile;
