import { axiosInstance } from "data/axiosInstance";
import useFormTextArea from "hooks/useFormTextArea";
import { useState } from "react";
import { useParams } from "react-router";
import isEmptyOrSpaces from "utils/isStringEmpty";

const EvaluationForm = () => {
  const submissionId = useParams().id;
  const { inputProps: content } = useFormTextArea();
  const [passFail, setPassFail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmptyOrSpaces(passFail) || isEmptyOrSpaces(content.value)) {
      return;
    }

    try {
      const request = {
        content: content.value,
        passFail: passFail,
      };
      const res = await axiosInstance.post(
        `submissions/${submissionId}/evaluations`,
        request,
      );
      //TODO: 새로고침?
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <form
      className="flex h-48 w-full flex-col items-center gap-2 lg:gap-10 xl:w-2/3"
      onSubmit={handleSubmit}
    >
      <textarea
        className="h-full w-full resize-none rounded-xs border p-3"
        placeholder="코멘트를 남겨주세요."
        {...content}
      />
      <div className="flex h-14 w-full gap-2">
        <select
          onChange={(e) => setPassFail(e.target.value)}
          defaultValue=""
          className="w-full rounded-xs border"
        >
          <option value="">평가</option>
          <option value="PASS">통과</option>
          <option value="FAIL">실패</option>
        </select>
        <button className="button-blue h-full w-full">작성</button>
      </div>
    </form>
  );
};

export default EvaluationForm;
