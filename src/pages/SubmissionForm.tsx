import PassSVG from "assets/pass-signup.svg?react";
import useFormInput from "hooks/useFormInput";
import useFormTextArea from "hooks/useFormTextArea";
import { useState } from "react";

const SubmissionForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const { inputProps: subjectNumber, setValue: setSubjectNumber } =
    useFormInput();
  const { inputProps: content, setValue: setContent } = useFormTextArea();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subjectNumber.value.length <= 0 || content.value.length <= 0) return;

    try {
      console.log("과제 제출 성공");
    } catch (err: any) {
      console.log("과제 제출 실패!");
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col items-center gap-5 p-5 lg:gap-10 xl:w-2/3"
      onSubmit={handleSubmit}
    >
      <div>TAG 선택</div>
      <div
        className={`flex w-full flex-row-reverse gap-1 select-none ${isPrivate ? "stroke-green-500" : "stroke-gray-400"}`}
      >
        <p>팀원에게만 공개</p>
        <PassSVG
          onClick={() => setIsPrivate(!isPrivate)}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
      <div className="w-full rounded-xs border bg-white p-3 shadow">
        <input
          className="w-full p-2"
          placeholder="모집글의 제목을 입력하세요."
          {...subjectNumber}
        />
      </div>
      <div className="w-full rounded-xs border bg-white p-3 shadow">
        <textarea
          className="h-32 w-full p-2"
          placeholder="모집글의 내용을 입력하세요."
          {...content}
        ></textarea>
      </div>
      <button
        className={`flex h-14 w-[120px] items-center justify-center gap-1 ${disabled ? "button-white" : "button-blue"}`}
        type="submit"
        disabled={disabled && true}
      >
        {disabled && (
          <p className="h-4 w-4 animate-spin rounded-full border-2 border-black border-b-transparent" />
        )}
        <span>완료</span>
      </button>
    </form>
  );
};
