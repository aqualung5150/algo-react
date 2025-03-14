import { RootState } from "app/store";
import { axiosInstance } from "data/axiosInstance";
import Applicant from "features/recruitpost/components/Applicant";
import useAxios from "hooks/useAxios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ApplicantSliceResponse, RecruitPostResponse } from "types/recruitpost";

//TODO: 작성자 or Not에 대한 지원자 목록
const RecruitPost = () => {
  const navigate = useNavigate();
  const recruitPostId = useParams().id;
  const member = useSelector((state: RootState) => state.member);
  const [error, setError] = useState<string>("");

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

  const applicate = async () => {
    try {
      await axiosInstance.post(`recruit-posts/${recruitPostId}/applicants`);
    } catch (err: any) {
      //TODO: 에러 메세지
      if (err.response.status === 401) {
        navigate("/login");
        return;
      }

      setError(err.response.data.message);
    }
  };

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

          {member.id === post.author.id ? (
            <>
              <h2>지원자</h2>
              <ul className="flex w-full flex-col gap-1">
                {applicants?.applicantList.map((applicant) => (
                  <Applicant applicant={applicant} />
                ))}
              </ul>
            </>
          ) : (
            <div className="flex w-full flex-col items-center gap-2">
              <button
                onClick={() => applicate()}
                className="h-10 w-24 cursor-pointer rounded-xs border border-blue-500 text-blue-500"
              >
                지원하기
              </button>
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RecruitPost;
