import useAxios from "hooks/useAxios";
import { useParams } from "react-router";

//TODO
const Submission = () => {
  const id = useParams().id;
  const { data, error, loading } = useAxios<SubmissionResponse>(
    `submissions/${id}`,
  );

  return (
    <div className="flex h-full w-full flex-col items-center gap-10 bg-white p-5 2xl:w-2/3">
      {data && (
        <>
          <h3>문제번호: {data.subjectNumber}</h3>
          <p className="w-full break-words">{data.content}</p>
        </>
      )}
    </div>
  );
};

export default Submission;
