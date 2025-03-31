import { RootState } from "app/store";
import MarkdownViewer from "components/MarkdownViewer";
import useAxios from "hooks/useAxios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

//TODO: 수정하기
const Submission = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const memberId = useSelector((state: RootState) => state.member.id);
  const { data, error, loading } = useAxios<SubmissionResponse>(
    `submissions/${id}`,
  );

  const tagProps = [
    ["DP", 1],
    ["DFS", 2],
    ["BFS", 3],
    ["Implementation", 4],
    ["Data Structures", 5],
  ];

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 bg-white p-5 2xl:w-2/3">
      {data && (
        <>
          <h1>{data.subjectNumber}</h1>
          <div className="flex w-full flex-col gap-2 border-b pb-5">
            <div className="flex w-full justify-between">
              <span className="font-semibold">{data.profile.username}</span>
              {memberId && memberId === data.profile.id && (
                <span
                  onClick={() => navigate("edit")}
                  className="text-gray-500"
                >
                  수정하기
                </span>
              )}
            </div>
            <ul className="flex w-full gap-3">
              알고리즘:
              {tagProps.map(([name, id]) => {
                if (data.tags.includes(id)) {
                  return (
                    <div key={id} className="rounded-xs bg-gray-200 px-1">
                      {name}
                    </div>
                  );
                }
              })}
            </ul>
          </div>
          {/* <p className="h-full w-full break-words">{data.content}</p> */}
          <MarkdownViewer markdown={data.content} />
        </>
      )}
    </div>
  );
};

export default Submission;
