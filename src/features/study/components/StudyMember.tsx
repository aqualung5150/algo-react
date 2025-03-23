import { useNavigate } from "react-router";

const StudyMember = ({ member }: { member: StudyMemberResponse }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/members/${member.profile.id}`);
  };

  return (
    <li
      onClick={handleClick}
      className="flex h-16 min-h-20 w-full cursor-pointer items-center gap-2 rounded-xs px-2 py-2 shadow-sm"
    >
      <div className="flex w-full items-center gap-2">
        <img className="h-10 w-10 rounded-full" src={member.profile.imageUrl} />
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full justify-between">
            <span className="font-semibold">{member.profile.username}</span>
            <span>{member.role}</span>
          </div>
          <span>{member.profile.email}</span>
        </div>
      </div>
    </li>
  );
};

export default StudyMember;
