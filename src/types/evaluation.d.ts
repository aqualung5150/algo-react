interface EvaluationResponse {
  id: number;
  content: string;
  passFail: string;
  evaluator: ProfileResponse;
}

interface EvaluationsResponse {
  evaluations: EvaluationResponse[];
}
