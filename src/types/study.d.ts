import { StudyRuleResponse } from "./recruitpost";

interface CreateStudyRequest {
  recruitPostId: number;
  name: string;
  memberIds: number[];
}

interface StudyMemberResponse {
  profile: ProfileResponse;
  role: string;
  state: string;
  notSubmitted: number;
}

interface StudyResponse {
  members: StudyMemberResponse[];
  name: string;
  id: number;
  studyRule: StudyRuleResponse;
}
