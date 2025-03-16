import { SetURLSearchParams } from "react-router";

// interface URLSearchParams {
//   delete(name: string, value?: any): boolean;
// }

interface SearchParamsProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

interface PaginationProps extends SearchParamsProps {
  totalCount: number;
  interval: number;
}

interface StudyRuleResponse {
  numberOfMembers: number;
  // minLevel: number;
  // maxLevel: number;
  level: number;
  totalWeek: number;
  submitDayOfWeek: string;
  submitPerWeek: number;
  tags: number[];
}

interface RecruitPostResponse {
  id: number;
  author: ProfileResponse;
  title: string;
  content: string;
  state: string;
  studyRule: StudyRuleResponse;
}

interface RecruitPostPageResponse {
  totalCount: number;
  posts: RecruitPostResponse[];
}

interface ApplicantSliceResponse {
  hasNext: boolean;
  applicantList: ProfileResponse[];
}
