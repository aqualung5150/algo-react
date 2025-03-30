import useAxios from "hooks/useAxios";
import { useNavigate, useParams } from "react-router";
import { StudyPageResponse } from "types/study";

const StudyBoard = () => {
  const navigate = useNavigate();
  const memberId = useParams().id;

  const { data, error, loading } = useAxios<StudyPageResponse>(
    `members/${memberId}/studies`,
  );

  return (
    <ul className="flex w-full flex-col items-center gap-3 p-10">
      {data &&
        data.studyProfiles.map((e) => (
          <li
            onClick={() => navigate(`/study/${e.id}`)}
            className="flex h-20 w-full cursor-pointer justify-between rounded-xs p-2 shadow"
            key={e.id}
          >
            <span>{e.name}</span>
            <span>{e.state}</span>
          </li>
        ))}
    </ul>
  );
};

export default StudyBoard;
