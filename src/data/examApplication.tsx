export type ExamStatus = "Approved" | "Payment Completed" | "Payment Pending";

export interface ExamApplication {
  id: string;
  type: string;
  semester: number;
  subjects: number;
  fee: number;
  status: ExamStatus;
}

export const examApplications: ExamApplication[] = [
  {
    id: "EXAM2024001",
    type: "Semester",
    semester: 4,
    subjects: 5,
    fee: 1500,
    status: "Approved",
  },
  {
    id: "EXAM2024002",
    type: "Semester",
    semester: 4,
    subjects: 4,
    fee: 1200,
    status: "Payment Completed",
  },
  {
    id: "EXAM2024003",
    type: "Semester",
    semester: 4,
    subjects: 5,
    fee: 1700,
    status: "Payment Pending",
  },
];
