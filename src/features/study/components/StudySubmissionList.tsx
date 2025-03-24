import SubmissionItem from "features/submission/components/SubmissionItem";

const StudySubmissionList = ({
  submissions,
}: {
  submissions: SubmissionSummaryResponse[];
}) => {
  return (
    <ul className="flex w-full flex-col gap-1">
      {submissions.map((submission) => (
        <SubmissionItem key={submission.id} submission={submission} />
      ))}
    </ul>
  );
};

export default StudySubmissionList;
