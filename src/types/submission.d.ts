interface SubmissionSummaryResponse {
  id: number;
  subjectNumber: number;
  profile: ProfileResponse;
  visibility: string;
  weekNumber: number;
  state: string;
}

interface SubmissionSliceResponse {
  hasNext: boolean;
  submissions: SubmissionSummaryResponse[];
}

interface CreateSubmissionRequest {
  studyId: number;
  subjectNumber: number;
  content: string;
  visibility: string;
  tags: number[];
}

interface SubmissionResponse {
  subjectNumber: nubmer;
  profile: ProfileResponse;
  content: string;
  visibility: string;
  weekNumber: number;
  state: string;
  tags: number[];
}
