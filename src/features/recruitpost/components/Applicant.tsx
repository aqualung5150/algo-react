const Applicant = ({ applicant }: { applicant: ProfileResponse }) => {
  return <div>{applicant.email}</div>;
};

export default Applicant;
