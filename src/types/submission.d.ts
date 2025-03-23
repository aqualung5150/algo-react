interface SubmissionSummaryResponse {
  submissionId: number;
  subjectNumber: number;
  profile: ProfileResponse;
  visibility: string;
  weekNumber: number;
}

interface SubmissionSliceResponse {
  hasNext: boolean;
  submissions: SubmissionSummaryResponse[];
}
