import Modal from "components/Modal";
import StudyMemberList from "features/study/components/StudyMemberList";
import StudySubmissionList from "features/study/components/StudySubmissionList";
import useAxios from "hooks/useAxios";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

const Study = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const levelProps = [
    ["Bronze", 1],
    ["Silver", 2],
    ["Gold", 3],
    ["Platinum", 4],
    ["Diamond", 5],
  ];

  const tagProps = [
    ["DP", 1],
    ["DFS", 2],
    ["BFS", 3],
    ["Implementation", 4],
    ["Data Structures", 5],
  ];

  const {
    data: studyData,
    error: studyError,
    loading: studyLoading,
  } = useAxios<StudyResponse>(`study/${id}`);

  const {
    data: submissionListData,
    error: submissionListError,
    loading: submissionListLoading,
  } = useAxios<SubmissionSliceResponse>(`submissions?studyId=${id}`);

  const level = levelProps.find((e) => e[1] === studyData?.studyRule?.level);

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-5 p-5 2xl:w-2/3">
        {studyData && (
          <>
            <div className="flex w-full items-center">
              <h1 className="flex-1 text-center">{studyData.name}</h1>
              <button
                onClick={() => setModalOpen(!modalOpen)}
                className="button-blue h-8 w-14 cursor-pointer text-center"
              >
                규칙
              </button>
            </div>
            <p className="my-2 w-full border-b border-gray-300"></p>
            <h2>스터디 멤버</h2>
            <StudyMemberList members={studyData?.members} />
          </>
        )}
        {submissionListData && (
          <>
            <h2>문제 풀이</h2>
            <StudySubmissionList submissions={submissionListData.submissions} />
            <button
              onClick={() => navigate(`submit`)}
              className="button-blue h-12 w-24 cursor-pointer font-normal"
            >
              제출하기
            </button>
          </>
        )}
      </div>
      {studyData && modalOpen && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <ul className="flex h-full w-full flex-col items-center justify-center gap-4">
            <li>
              스터디 기간{" "}
              <span className="font-semibold">
                {studyData.studyRule.totalWeek}주
              </span>
            </li>
            <li>
              난이도 <span className="font-semibold">{level && level[0]}</span>
            </li>
            <li>
              주{" "}
              <span className="font-semibold">
                {studyData.studyRule.submitPerWeek}회
              </span>{" "}
              제출
            </li>
            <div className="flex flex-col">
              <li className="font-semibold">알고리즘 유형</li>
              <ul className="flex w-2/4 flex-col font-normal">
                {tagProps.map(([name, id]) => {
                  if (studyData.studyRule.tags.includes(id)) {
                    return <li>{`* ${name}`}</li>;
                  } else return null;
                })}
              </ul>
            </div>
          </ul>
        </Modal>
      )}
    </>
  );
};

export default Study;
