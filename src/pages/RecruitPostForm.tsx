import { axiosInstance } from "data/axiosInstance";
import TagSelector from "features/recruitpost/components/TagSelector";
import useFormInput from "hooks/useFormInput";
import useFormTextArea from "hooks/useFormTextArea";
import { useState } from "react";
import { useNavigate } from "react-router";
import isEmptyOrSpaces from "utils/isStringEmpty";

const RecruitPostForm = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [submitDayOfWeek, setSubmitDayOfWeek] = useState<string>("MONDAY");
  const [numberOfMembers, setNumberOfMembers] = useState<string>("2");
  const [level, setLevel] = useState<string>("1");
  const [tags, setTags] = useState<string[]>([]);
  const { inputProps: totalWeek, setValue: setTotalWeek } = useFormInput("4");
  const { inputProps: submitPerWeek, setValue: SetsubmitPerWeek } =
    useFormInput("1");
  const { inputProps: title, setValue: setTitle } = useFormInput();
  const { inputProps: content, setValue: setContent } = useFormTextArea();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isEmptyOrSpaces(title.value) ||
      isEmptyOrSpaces(content.value) ||
      isEmptyOrSpaces(level) ||
      isEmptyOrSpaces(submitDayOfWeek) ||
      isEmptyOrSpaces(numberOfMembers) ||
      isEmptyOrSpaces(totalWeek.value) ||
      isEmptyOrSpaces(submitPerWeek.value)
    ) {
      alert("작성하지 않은 필드가 있습니다.");
    }

    try {
      const res = await axiosInstance.post("recruit-posts", {
        level: parseInt(level),
        submitDayOfWeek: submitDayOfWeek,
        numberOfMembers: parseInt(numberOfMembers),
        tags: tags.map((e) => parseInt(e)),
        totalWeek: parseInt(totalWeek.value),
        submitPerWeek: parseInt(submitPerWeek.value),
        title: title.value,
        content: content.value,
      });

      navigate(`/recruit-posts/${res.data.id}`);
    } catch (err: any) {
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col items-center gap-5 p-5 lg:gap-10 xl:w-2/3"
      onSubmit={handleSubmit}
    >
      <div>TAG 선택</div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="submitDayOfWeek">
            과제 제출 마감 요일을 선택해주세요.
          </label>
          <select
            id="submitDayOfWeek"
            className="rounded-xs border px-2 py-1"
            name="submitDayOfWeek"
            onChange={(e) => setSubmitDayOfWeek(e.target.value)}
            value={submitDayOfWeek}
          >
            <option value="MONDAY">월요일</option>
            <option value="TUESDAY">화요일</option>
            <option value="WEDNESDAY">수요일</option>
            <option value="THURSDAY">목요일</option>
            <option value="FRIDAY">금요일</option>
            <option value="SATURDAY">토요일</option>
            <option value="SUNDAY">일요일</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="submitDayOfWeek">스터디 인원을 선택해주세요.</label>
          <select
            name="numberOfMembers"
            className="rounded-xs border px-2 py-1"
            onChange={(e) => setNumberOfMembers(e.target.value)}
            value={numberOfMembers}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="totalWeek">
            몇 주 동안 스터디를 진행할 계획이신가요.
          </label>
          <input
            className="rounded-xs border px-2 py-1"
            type="number"
            id="totalWeek"
            {...totalWeek}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="submitPerWeek">
            한 주 동안 제출할 문제의 수를 입력하세요.
          </label>
          <input
            className="rounded-xs border px-2 py-1"
            type="number"
            id="submitPerWeek"
            {...submitPerWeek}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="level">문제의 난이도를 선택해주세요.</label>
          <select
            name="level"
            className="rounded-xs border px-2 py-1"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          >
            <option value="1">브론즈</option>
            <option value="2">실버</option>
            <option value="3">골드</option>
            <option value="4">플래티넘</option>
            <option value="5">다이아몬드</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags">공부할 문제 유형을 선택해주세요.</label>
          <TagSelector id="tags" tags={tags} setTags={setTags} />
        </div>
      </div>

      <div className="w-full rounded-xs border bg-white p-3 shadow">
        <input
          className="w-full p-1"
          placeholder="모집글의 제목을 입력하세요."
          {...title}
        />
      </div>
      <div className="w-full flex-1 rounded-xs border bg-white p-3 shadow">
        <textarea
          className="h-full w-full resize-none p-1"
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
