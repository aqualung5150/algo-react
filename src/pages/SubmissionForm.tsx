import PassSVG from "assets/pass-signup.svg?react";
import { axiosInstance } from "data/axiosInstance";
import TagSelector from "features/recruitpost/components/TagSelector";
import useFormInput from "hooks/useFormInput";
import useFormTextArea from "hooks/useFormTextArea";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

const SubmissionForm = () => {
  const studyId = useParams().id;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { inputProps: subjectNumber, setValue: setSubjectNumber } =
    useFormInput();
  const { inputProps: content, setValue: setContent } = useFormTextArea();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      subjectNumber.value.length <= 0 ||
      content.value.length <= 0 ||
      tags.length < 1
    )
      return;

    try {
      const requestBody: CreateSubmissionRequest = {
        studyId: studyId ? parseInt(studyId) : 0,
        visibility: isPrivate ? "PRIVATE" : "PUBLIC",
        content: content.value,
        subjectNumber: parseInt(subjectNumber.value),
        tags: tags.map((tag) => parseInt(tag)),
      };

      const res = await axiosInstance.post("submissions", requestBody);

      navigate(`/submissions/${res.data.id}`);

      // console.log("과제 제출 성공");
    } catch (err: any) {
      alert(err.response.data.message);
      // console.log("과제 제출 실패!");
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col items-center gap-5 p-5 lg:gap-10 xl:w-2/3"
      onSubmit={handleSubmit}
    >
      <h1>문제 풀이 제출</h1>
      <div className="w-full rounded-xs border bg-white p-3 shadow">
        <input
          className="w-full p-1"
          placeholder="문제 번호"
          {...subjectNumber}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="tags">풀이 유형을 선택해주세요.</label>
        <TagSelector id="tags" tags={tags} setTags={setTags} />
      </div>
      <div
        onClick={() => setIsPrivate(!isPrivate)}
        className="flex items-center gap-1 self-end"
      >
        <PassSVG
          className={`h-4 w-4 ${isPrivate ? "stroke-green-500" : "stroke-gray-300"}`}
        />
        <span className="text-sm">팀원에게만 공개</span>
      </div>
      <div className="min-h-72 w-full flex-1 rounded-xs border bg-white p-3 shadow">
        <textarea
          className="h-full w-full resize-none p-1"
          placeholder="문제 풀이"
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

export default SubmissionForm;
