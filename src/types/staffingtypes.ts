// types/staffingtypes.ts

export type ApprovedSeatRow = {
  id: string | number;
  subject?: string;
  designation?: string;
  category?: string;   // GENERAL, OBC, SC, ST, ...
  gender?: string;     // Male, Female, Other
  approved: number;
  filled: number;
  vacant: number;
  fillRate?: number;   // optional, useful for summary views
};
