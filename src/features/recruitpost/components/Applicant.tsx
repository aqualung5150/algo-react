import { ApplicantProps } from "types/recruitpost";
import PassSVG from "assets/pass-signup.svg?react";

const Applicant = ({ isSelected, handleClick, applicant }: ApplicantProps) => {
  return (
    <li
      className={`flex w-full items-center gap-2 border-b border-gray-300 px-3 py-2`}
      onClick={() => handleClick(applicant.id)}
    >
      <PassSVG
        className={`h-5 w-5 ${isSelected(applicant.id) ? "stroke-green-500" : "stroke-gray-300"}`}
      />
      {applicant.email}
    </li>
  );
};

export default Applicant;
