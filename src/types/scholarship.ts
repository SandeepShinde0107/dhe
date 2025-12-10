export type ScholarshipRow = {
    name: string;
    type: "Government" | "Institutional" | "Private" | "International";
    agency: string;
    year: string;
    beneficiaries: number;
    gender: { male: number; female: number };
    category: "General" | "OBC" | "SC" | "ST" | "EBC" | "VJNT";
    totalAmount: number;
    perStudent: number;
};
