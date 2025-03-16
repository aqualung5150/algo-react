import RecruitPostFilterDesktop from "features/recruitpost/components/filter/RecruitPostFilterDesktop";
import RecruitPostFilterMobile from "features/recruitpost/components/filter/RecruitPostFilterMobile";
import PostPagination from "features/recruitpost/components/PostPagination";
import RecruitPostItem from "features/recruitpost/components/RecruitPostItem";
import useAxios from "hooks/useAxios";
import { useParams, useSearchParams } from "react-router";
import { RecruitPostPageResponse } from "types/recruitpost";

const RecruitPostBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const reqParams = new URLSearchParams();
  // searching keyword
  const keyword = useParams().keyword;
  if (keyword) reqParams.append("keyword", keyword);
  searchParams.forEach((value, key) => {
    if (key === "page") {
      value = (parseInt(value) - 1).toString();
    }
    reqParams.append(key, value);
  });
  const url = "recruit-posts?" + reqParams.toString();
  const { data, error, loading } = useAxios<RecruitPostPageResponse>(url);

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-5 2xl:w-2/3">
      <RecruitPostFilterDesktop {...{ searchParams, setSearchParams }} />
      <RecruitPostFilterMobile {...{ searchParams, setSearchParams }} />
      {data && (
        <>
          <div className="flex h-full w-full flex-col items-center gap-2">
            {data.posts.map((post) => {
              return <RecruitPostItem key={post.id} post={post} />;
            })}
          </div>
          <div className="w-full lg:hidden">
            <PostPagination
              totalCount={data?.totalCount}
              interval={5}
              {...{ searchParams, setSearchParams }}
            />
          </div>
          <div className="hidden w-full lg:block">
            <PostPagination
              totalCount={data?.totalCount}
              interval={10}
              {...{ searchParams, setSearchParams }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RecruitPostBoard;
