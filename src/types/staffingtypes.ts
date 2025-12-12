export type ApprovedSeatRow = {
  id: string | number;
  subject?: string;
  designation?: string;
  category?: string;   
  gender?: string; 
  approved: number;
  filled: number;
  vacant: number;
  fillRate?: number;   
};
