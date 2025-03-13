import Applicant from "features/recruitpost/components/Applicant";
import useAxios from "hooks/useAxios";
import { useParams } from "react-router";
import { ApplicantSliceResponse, RecruitPostResponse } from "types/recruitpost";

//TODO: 작성자 or Not에 대한 지원자 목록
const RecruitPost = () => {
  const recruitPostId = useParams().id;
  const {
    data: post,
    error: postError,
    loading: postLoading,
  } = useAxios<RecruitPostResponse>(`/recruit-posts/${recruitPostId}`);

  const {
    data: applicants,
    error: applicantsError,
    loading: applicantsLoading,
  } = useAxios<ApplicantSliceResponse>(
    `/recruit-posts/${recruitPostId}/applicants`,
  );

  return (
    <>
      {post && (
        <div className="flex h-full w-full flex-col items-center gap-10 bg-white p-5 2xl:w-2/3">
          <h1>{post.title}</h1>
          <div className="w-full border-b"></div>
          <div className="w-full">주 {post.studyRule.submitPerWeek}회</div>
          <div className="w-full border-b"></div>
          <p className="w-full break-words">{post.content}</p>
          <div className="w-full border-b"></div>
          <h2>지원자</h2>
          <ul className="flex w-full flex-col gap-1">
            {applicants?.applicantList.map((applicant) => (
              <Applicant applicant={applicant} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RecruitPost;
