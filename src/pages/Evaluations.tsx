import useAxios from "hooks/useAxios";
import { useParams } from "react-router";
import Evaluation from "./Evaluation";
import EvaluationForm from "./EvaluationForm";

const Evaluations = () => {
  const submissionId = useParams().id;
  const { data, error, loading } = useAxios<EvaluationsResponse>(
    `submissions/${submissionId}/evaluations`,
  );

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-5 2xl:w-2/3">
      <ul className="h-full w-full">
        {data?.evaluations.map((e) => <Evaluation key={e.id} {...e} />)}
      </ul>
      <EvaluationForm />
    </div>
  );
};

export default Evaluations;
