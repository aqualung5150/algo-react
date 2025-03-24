import { useNavigate } from "react-router";

const SubmissionItem = ({
  submission,
}: {
  submission: SubmissionSummaryResponse;
}) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/submissions/${submission.id}`)}
      className={`flex h-16 w-full cursor-pointer flex-col justify-around rounded-xs px-2 py-1 ${submission.state === "PASSED" ? "bg-green-50" : submission.state === "FAILED" ? "bg-red-50" : "bg-blue-50"}`}
    >
      <div className="flex justify-between">
        <h3>{submission.profile.username}</h3>
        <span className="text-sm">{submission.state}</span>
      </div>
      <div className="self-end">
        <span className="text-sm font-semibold">
          Week {submission.weekNumber}
        </span>
      </div>
    </li>
  );
};

export default SubmissionItem;
