import StudyMember from "./StudyMember";

const StudyMemberList = ({ members }: { members: StudyMemberResponse[] }) => {
  return (
    <ul className="grid w-full auto-rows-min grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <StudyMember key={member.profile.id} member={member} />
      ))}
    </ul>
  );
};

export default StudyMemberList;
