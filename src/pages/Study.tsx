import StudyMemberList from "features/study/components/StudyMemberList";
import useAxios from "hooks/useAxios";
import { useParams } from "react-router";

//TODO: 제출 리스트
const Study = () => {
  const id = useParams().id;

  const {
    data: studyData,
    error: studyError,
    loading: studyLoading,
  } = useAxios<StudyResponse>(`study/${id}`);
  console.log(studyData);

  const {
    data: submissionListData,
    error: submissionListError,
    loading: submissionListLoading,
  } = useAxios<SubmissionSliceResponse>(`submissions?studyId=${id}`);
  console.log(submissionListData);

  const handleRule = () => {
    //TODO
  };
  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-5 2xl:w-2/3">
      {studyData && (
        <>
          <div className="flex w-full items-center">
            <h1 className="flex-1 text-center">{studyData.name}</h1>
            <button
              onClick={handleRule}
              className="button-blue h-8 w-14 cursor-pointer text-center"
            >
              규칙
            </button>
          </div>
          <p className="my-2 w-full border-b border-gray-300"></p>
          <h2>스터디 멤버</h2>
          <StudyMemberList members={studyData?.members} />
          <p className="my-2 w-full border-b border-gray-300"></p>
        </>
      )}
      {submissionListData && (
        <>
          <div>{submissionListData.hasNext}</div>
          {submissionListData.submissions.map((submission) => (
            <>
              <span>{submission.submissionId}</span>
              <span>{submission.profile.email}</span>
              <span>{submission.subjectNumber}</span>
              <span>{submission.weekNumber}</span>
              <span>{submission.visibility}</span>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default Study;
