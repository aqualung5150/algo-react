import { RootState } from "app/store";
import { axiosInstance } from "data/axiosInstance";
import useFormInput from "hooks/useFormInput";
import useSelectImage from "hooks/useSelectImage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CameraSVG from "assets/camera.svg?react";
import { updateUser } from "features/member/memberSlice";

const EditProfile = () => {
  const member = useSelector((state: RootState) => state.member);
  const dispatch = useDispatch();
  const { inputProps: username } = useFormInput(member.username);
  const [disabled, setDisabled] = useState(false);
  const profileImage = useRef<HTMLInputElement>(null);

  const file = useSelectImage(member.imageUrl);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const res = await axiosInstance.put(`members/me`, {
        username: username.value,
        imageUrl: file.imageUrl,
      });
      dispatch(updateUser(res.data));
      alert("프로필 저장 완료");
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-1 flex-col items-center gap-10 p-10"
    >
      <div
        className="group relative flex w-full max-w-96 cursor-pointer items-center justify-center rounded-full"
        onClick={() => profileImage.current?.click()}
      >
        <img
          loading="lazy"
          className="aspect-square h-full w-full rounded-full object-cover shadow group-hover:brightness-75"
          src={file.imageUrl}
        />
        <CameraSVG className="invisible absolute h-24 w-24 stroke-gray-300 group-hover:visible" />
        <input
          type="file"
          onChange={file.handleFileChange}
          accept={"image/png, image/gif, image/jpeg"}
          className="hidden"
          ref={profileImage}
        />
      </div>
      <div className="w-full space-y-2 rounded-lg border bg-white p-3">
        <label htmlFor="username">닉네임</label>
        <input
          className="w-full rounded border p-2"
          id="username"
          type="text"
          {...username}
        />
      </div>
      <div className="w-full space-y-2 rounded-lg border bg-white p-3">
        <label htmlFor="email">이메일</label>
        <input
          className="w-full rounded border p-2"
          id="email"
          type="text"
          value={member.email}
          disabled={true}
        />
      </div>

      <button
        className="button-green h-[50px] w-[100px]"
        type="submit"
        disabled={disabled}
      >
        저장
      </button>
    </form>
  );
};

export default EditProfile;
