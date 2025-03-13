import { SetURLSearchParams } from "react-router";

// interface URLSearchParams {
//   delete(name: string, value?: any): boolean;
// }

interface PaginationProps {
  totalCount: number;
  interval: number;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

interface StudyRuleResponse {
  numberOfMembers: number;
  minLevel: number;
  maxLevel: number;
  totalWeek: number;
  submitDayOfWeek: string;
  submitPerWeek: number;
  tags: string[];
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
