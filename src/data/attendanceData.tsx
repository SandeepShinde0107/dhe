export type SubjectKey = "CS301" | "CS302" | "CS303" | "CS304" | "CS305";
export type AttendanceRecord = {
  date: string;
  subjectKey: SubjectKey;
  subjectName: string;
  type: "Lecture" | "Practical";
  faculty: string;
  status: "Present" | "Absent" ;
};

export const subjectSummary: Record<
  SubjectKey,
  { name: string; attended: number; total: number }
> = {
  CS301: { name: "Data Structures", attended: 40, total: 44 },
  CS302: { name: "Database Management", attended: 42, total: 45 },
  CS303: { name: "Operating Systems", attended: 40, total: 42 },
  CS304: { name: "Computer Networks", attended: 40, total: 46 },
  CS305: { name: "Software Engineering", attended: 44, total: 46 },
};

export const attendanceHistory: Record<string, AttendanceRecord[]> = {
  All: [
    { date: "2025-12-11", subjectKey: "CS305", subjectName: "Software Engineering", type: "Practical", faculty: "Dr. Mehta", status: "Present" },
    { date: "2025-12-11", subjectKey: "CS305", subjectName: "Software Engineering", type: "Practical", faculty: "Dr. Mehta", status: "Present" },
    { date: "2025-12-11", subjectKey: "CS305", subjectName: "Software Engineering", type: "Lecture", faculty: "Dr. Mehta", status: "Present" },
    { date: "2025-12-10", subjectKey: "CS305", subjectName: "Software Engineering", type: "Lecture", faculty: "Dr. Mehta", status: "Present" },
    { date: "2025-12-08", subjectKey: "CS305", subjectName: "Software Engineering", type: "Lecture", faculty: "Dr. Mehta", status: "Present" },
    { date: "2025-12-06", subjectKey: "CS305", subjectName: "Software Engineering", type: "Lecture", faculty: "Dr. Mehta", status: "Absent" },

    { date: "2025-12-11", subjectKey: "CS301", subjectName: "Data Structures", type: "Lecture", faculty: "Dr. Sharma", status: "Present" },
    { date: "2025-12-10", subjectKey: "CS302", subjectName: "Database Management", type: "Lecture", faculty: "Prof. Patel", status: "Present" },
  ],
  CS301: [
    { date: "2025-12-11", subjectKey: "CS301", subjectName: "Data Structures", type: "Lecture", faculty: "Dr. Sharma", status: "Present" },
  ],
  CS302: [
    { date: "2025-12-10", subjectKey: "CS302", subjectName: "Database Management", type: "Lecture", faculty: "Prof. Patel", status: "Present" },
  ],
  CS303: [],
  CS304: [],
  CS305: [
    { date: "2025-12-11", subjectKey: "CS305", subjectName: "Software Engineering", type: "Practical", faculty: "Dr. Mehta", status: "Present" },
    { date: "2025-12-10", subjectKey: "CS305", subjectName: "Software Engineering", type: "Lecture", faculty: "Dr. Mehta", status: "Present" },
    { date: "2025-12-06", subjectKey: "CS305", subjectName: "Software Engineering", type: "Lecture", faculty: "Dr. Mehta", status: "Absent" },
  ],
};
