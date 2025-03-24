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
