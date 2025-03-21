import { RootState } from "app/store";
import { axiosInstance } from "data/axiosInstance";
import Applicant from "features/recruitpost/components/Applicant";
import useAxios from "hooks/useAxios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { ApplicantSliceResponse, RecruitPostResponse } from "types/recruitpost";

//TODO: 지원자 선택 후 스터디 생성
const RecruitPost = () => {
  const navigate = useNavigate();
  const recruitPostId = useParams().id;
  const member = useSelector((state: RootState) => state.member);
  const [applicated, setApplicated] = useState("");
  const [error, setError] = useState<string>("");
  const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);

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
      setApplicated("스터디에 지원했습니다.");
    } catch (err: any) {
      if (err.response.status === 401) {
        navigate("/login");
        return;
      }

      setError(err.response.data.message);
    }
  };

  const handleClick = (selectedId: number) => {
    let updated: number[];
    if (selectedApplicants.includes(selectedId)) {
      updated = selectedApplicants.filter((id) => id !== selectedId);
    } else {
      updated = [...selectedApplicants, selectedId];
    }

    setSelectedApplicants(updated);
  };

  //TODO
  const createStudy = async () => {
    try {
      const res = await axiosInstance.get("members/1");
      console.log(res.data);
    } catch (err: any) {
      //
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
              <div className="flex h-full w-full flex-1 flex-col items-center">
                <h2>지원자</h2>
                <ul className="h-full w-full">
                  {applicants?.applicantList.map((applicant) => (
                    <Applicant
                      key={applicant.id}
                      isSelected={(id: number) =>
                        selectedApplicants.includes(id)
                      }
                      handleClick={handleClick}
                      applicant={applicant}
                    />
                  ))}
                </ul>
              </div>
              <div className="flex w-full justify-between px-3">
                <Link to="edit">
                  <button className="h-10 w-24 cursor-pointer rounded-xs border border-blue-500 text-blue-500">
                    수정하기
                  </button>
                </Link>
                <button
                  onClick={async () => await createStudy()}
                  className="h-10 w-24 cursor-pointer rounded-xs bg-blue-500 text-white"
                >
                  스터디생성
                </button>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center gap-2">
              <button
                onClick={async () => await applicate()}
                className="h-10 w-24 cursor-pointer rounded-xs border border-blue-500 text-blue-500"
              >
                지원하기
              </button>
              {applicated && (
                <span className="text-sm text-green-500">{applicated}</span>
              )}
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RecruitPost;
