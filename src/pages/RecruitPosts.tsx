import PostPagination from "features/recruitpost/components/PostPagination";
import useAxios from "hooks/useAxios";
import { useSearchParams } from "react-router";
import { RecruitPostPageResponse } from "types/recruitpost";

const RecruitPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const reqParams = new URLSearchParams();
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
      {data && (
        <>
          <div className="h-full w-full">
            {data.posts.map((post) => {
              return (
                <div key={post.id}>
                  <p>{post.id}</p>
                  <p>{post.title}</p>
                </div>
              );
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

export default RecruitPosts;
