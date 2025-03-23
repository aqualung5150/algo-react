import { RootState } from "app/store";
import RecruitPostFilterDesktop from "features/recruitpost/components/filter/RecruitPostFilterDesktop";
import RecruitPostFilterMobile from "features/recruitpost/components/filter/RecruitPostFilterMobile";
import PostPagination from "features/recruitpost/components/PostPagination";
import RecruitPostItem from "features/recruitpost/components/RecruitPostItem";
import useAxios from "hooks/useAxios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { RecruitPostPageResponse } from "types/recruitpost";

const RecruitPostBoard = () => {
  const member = useSelector((state: RootState) => state.member);
  const navigate = useNavigate();
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

  const handlePost = () => {
    if (!member.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    navigate("new");
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-5 2xl:w-2/3">
      <RecruitPostFilterDesktop {...{ searchParams, setSearchParams }} />
      <RecruitPostFilterMobile {...{ searchParams, setSearchParams }} />
      <div className="flex w-full flex-row-reverse">
        <button
          onClick={handlePost}
          className="button-blue h-10 w-28 cursor-pointer"
        >
          글쓰기
        </button>
      </div>
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
