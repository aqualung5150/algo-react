import useAxios from "hooks/useAxios";
import { useParams } from "react-router";
import { StudyPageResponse } from "types/study";

const StudyBoard = () => {
  const memberId = useParams().id;

  const { data, error, loading } = useAxios<StudyPageResponse>(
    `members/${memberId}/studies`,
  );

  return (
    <div className="flex w-full flex-col items-center gap-10 p-10">
      {data && data.studyProfiles.map((e) => <div key={e.id}>{e.name}</div>)}
    </div>
  );
};

export default StudyBoard;
