import { useState } from "react";
import EvaluationEdit from "./EvaluationEdit";

const Evaluation = ({
  id,
  content,
  passFail,
  evaluator,
}: EvaluationResponse) => {
  const [updateForm, setUpdateForm] = useState(false);

  return (
    <li className="flex h-36 w-full flex-col border-b">
      {!updateForm ? (
        <>
          <div className="flex w-full justify-between">
            <span>{evaluator.username}</span>
            <span>{passFail}</span>
          </div>
          <p className="flex-1 p-3">{content}</p>
          <button
            onClick={() => setUpdateForm(true)}
            className="button-blue h-6 w-12 self-end"
          >
            수정
          </button>
        </>
      ) : (
        <>
          <EvaluationEdit {...{ id, content, passFail, evaluator }} />
        </>
      )}
    </li>
  );
};

export default Evaluation;
