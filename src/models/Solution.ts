export type Solution = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  solutionStatus: string;
};

enum SolutionStatus {
  NotSubmitted = "Nie przesłano",
  SubmittedLate = "Przesłano po terminie",
  Submitted = "Przesłano",
}

interface SolutionStatusType {
  [key: string]: SolutionStatus;
}

export const SolutionStatuses: SolutionStatusType = {
  NotSubmitted: SolutionStatus.NotSubmitted,
  SubmittedLate: SolutionStatus.SubmittedLate,
  Submitted: SolutionStatus.Submitted,
};
