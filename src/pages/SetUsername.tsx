import { axiosInstance } from "data/axiosInstance";
import { updateUser } from "features/member/memberSlice";
import useFormInput from "hooks/useFormInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const SetUsername = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputProps: username } = useFormInput("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.value.length <= 0) return;

    try {
      const res = await axiosInstance.patch("auth/set-username", {
        username: username.value,
      });

      dispatch(updateUser({ username: username.value }));
      setError("");
      navigate(`/${res.data.redirectUrl}`);
    } catch (err: any) {
      setError("사용할 수 없는 username입니다.");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 lg:gap-10">
      <form
        onSubmit={handleSubmit}
        className="flex h-[400px] w-[500px] flex-col items-center justify-center gap-5"
      >
        <div className="text-2xl">Username 등록</div>
        <div className="flex justify-center gap-2">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className={`h-12 w-56 rounded-xs border p-2 outline-none ${error && "border-red-500"}`}
              {...username}
              placeholder="Email"
            />
          </div>
          <button
            type="submit"
            className="h-full w-20 cursor-pointer rounded-xs border border-blue-500 text-blue-500"
          >
            등록
          </button>
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </form>
    </div>
  );
};

export default SetUsername;
