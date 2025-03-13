import { Link } from "react-router";
import { RecruitPostResponse } from "types/recruitpost";

/*
TODO: tag id 또는 name을 스태틱리소스에서 파싱
minLevel 대신 브실골플다
recruitpost summary
*/
const RecruitPostItem = ({ post }: { post: RecruitPostResponse }) => {
  return (
    <Link
      to={`${post.id}`}
      className="flex h-40 w-full flex-col gap-2 p-2 shadow-sm"
    >
      {/* <h1 className="font-semibold">{post.title}</h1>
      <p className="">{post.content}</p> */}
      <div className="flex w-full flex-1 flex-col p-2">
        <div className="flex-1 space-y-1">
          <div className="text-base font-semibold lg:text-lg">{post.title}</div>
          <div className="text-sm lg:text-base">
            Level: {post.studyRule.minLevel} ~ {post.studyRule.maxLevel}
          </div>
          <div className="text-sm lg:text-base">
            {post.studyRule.numberOfMembers}명
          </div>
          <div className="text-sm lg:text-base">
            주 {post.studyRule.submitPerWeek}회
          </div>
          <div className="text-sm lg:text-base">
            총 {post.studyRule.totalWeek}주
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 text-sm">
            {post.studyRule.tags.map((tag) => (
              <p className="rounded-xs bg-blue-100 px-1">{tag}</p>
            ))}
          </div>
          <div className="self-end text-xs text-gray-500 lg:text-sm">
            작성자
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecruitPostItem;
