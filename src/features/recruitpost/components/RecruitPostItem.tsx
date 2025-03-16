import { useEffect, useState } from "react";
import { Link } from "react-router";
import { RecruitPostResponse } from "types/recruitpost";

/*
TODO: tag id 또는 name을 스태틱리소스에서 파싱
minLevel 대신 브실골플다
recruitpost summary
*/
const RecruitPostItem = ({ post }: { post: RecruitPostResponse }) => {
  const levelProps: Record<number, string> = {
    1: "Bronze",
    2: "Silver",
    3: "Gold",
    4: "Platinum",
    5: "Diamond",
  };

  const tagProps: Record<number, string> = {
    1: "DP",
    2: "DFS",
    3: "BFS",
    4: "Implementation",
    5: "Data Structures",
  };

  const isCompleted = post.state === "COMPLETED" ? true : false;

  return (
    <Link
      to={`${post.id}`}
      className={`flex h-40 w-full flex-col gap-2 p-2 shadow-sm ${isCompleted && "pointer-events-none bg-gray-100"}`}
    >
      <div className="flex h-full w-full flex-1 flex-col p-2">
        <div className="flex-1 space-y-1">
          <div className="flex gap-2 text-base font-semibold lg:text-lg">
            <span>{`${post.state === "COMPLETED" ? "[모집완료]" : ""} ${post.title}`}</span>
          </div>
          <div className="text-sm lg:text-base">
            Level: {levelProps[post.studyRule.level]}
          </div>
          <div className="text-sm lg:text-base">
            {post.studyRule.numberOfMembers}명, 총 {post.studyRule.totalWeek}주,
            주 {post.studyRule.submitPerWeek}회
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 text-sm">
            {post.studyRule.tags.map((tag) => (
              <p
                key={tag}
                className={`rounded-xs px-1 ${isCompleted ? "bg-gray-200" : "bg-blue-100"}`}
              >
                {tagProps[tag]}
              </p>
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
