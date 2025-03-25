import { useNavigate } from "react-router";

const SubmissionItem = ({
  submission,
}: {
  submission: SubmissionSummaryResponse;
}) => {
  const navigate = useNavigate();

  return (
    <li className={`flex h-16 w-full items-center gap-3`}>
      <div
        onClick={() => navigate(`/submissions/${submission.id}`)}
        className={`flex-1 cursor-pointer rounded-xs px-2 py-1 ${submission.state === "PASSED" ? "bg-green-50" : submission.state === "FAILED" ? "bg-red-50" : "bg-blue-50"}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            Week {submission.weekNumber}
          </span>
          <span>{submission.profile.username}</span>
        </div>
        <span className="text-sm">{submission.state}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/submissions/${submission.id}/evaluations`);
        }}
        className="h-14 w-24 cursor-pointer rounded-xs border font-normal"
      >
        평가
      </button>
    </li>
  );
};

export default SubmissionItem;
