import useFormInput from "hooks/useFormInput";
import useFormTextArea from "hooks/useFormTextArea";
import { useState } from "react";

const RecruitPostForm = () => {
  const [disabled, setDisabled] = useState(false);
  const { inputProps: title, setValue: setTitle } = useFormInput();
  const { inputProps: content, setValue: setContent } = useFormTextArea();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.value.length <= 0 || content.value.length <= 0) return;

    try {
      console.log("작성완료");
    } catch (err: any) {
      console.log("작성실패");
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col items-center gap-5 p-5 lg:gap-10 xl:w-2/3"
      onSubmit={handleSubmit}
    >
      <div>TAG 선택</div>

      <div className="w-full rounded border bg-white p-3 shadow">
        <input
          className="w-full p-2"
          placeholder="모집글의 제목을 입력하세요."
          {...title}
        />
      </div>
      <div className="w-full rounded border bg-white p-3 shadow">
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

export default RecruitPostForm;
