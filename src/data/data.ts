export type ResearchGuide = {
    name: string;
    department: string;
    subject: string;
    program: "PHD" | "MPHIL";
    registered: number;
    completed: number;
    gender: {
      male: number;
      female: number;
      completedMale: number;
      completedFemale: number;
   }
    ph: { total: number; completed: number };
    foreign: { total: number; completed: number };
    status: "Active" | "Inactive";
};
export const RESEARCH_GUIDES: ResearchGuide[] = [
    {
        name: "Dr. Rajesh Kumar",
        department: "Physics",
        subject: "Quantum Mechanics",
        program: "PHD",
        registered: 9,
        completed: 5,
        gender: { male: 5, female: 4 ,completedFemale:2,completedMale:2},
        ph: { total: 1, completed: 0 },
        foreign: { total: 2, completed: 1 },
        status: "Active",
    },
    {
        name: "Dr. Priya Sharma",
        department: "Chemistry",
        subject: "Organic Chemistry",
        program: "PHD",
        registered: 10,
        completed: 6,
        gender: { male: 4, female: 6 ,completedFemale:3,completedMale:4},
        ph: { total: 0, completed: 0 },
        foreign: { total: 1, completed: 0 },
        status: "Active",
    },
    {
        name: "Dr. Amit Patel",
        department: "Mathematics",
        subject: "Applied Mathematics",
        program: "PHD",
        registered: 9,
        completed: 6,
        gender: { male: 6, female: 3 ,completedFemale:1,completedMale:4},
        ph: { total: 1, completed: 0 },
        foreign: { total: 0, completed: 0 },
        status: "Active",
    },
    {
        name: "Dr. Sunita Deshmukh",
        department: "English",
        subject: "Modern Literature",
        program: "PHD",
        registered: 7,
        completed: 4,
        gender: { male: 2, female: 5 ,completedFemale:4,completedMale:1},
        ph: { total: 0, completed: 0 ,},
        foreign: { total: 1, completed: 0 },
        status: "Active",
    },
    {
        name: "Dr. Vikram Singh",
        department: "History",
        subject: "Medieval Indian History",
        program: "PHD",
        registered: 7,
        completed: 5,
        gender: { male: 3, female: 4 ,completedFemale:4,completedMale:1},
        ph: { total: 0, completed: 0 },
        foreign: { total: 0, completed: 0 },
        status: "Active",
    },
    {
        name: "Dr. Meera Joshi",
        department: "Economics",
        subject: "Development Economics",
        program: "PHD",
        registered: 10,
        completed: 6,
        gender: { male: 5, female: 5 ,completedFemale:4,completedMale:1},
        ph: { total: 1, completed: 0 },
        foreign: { total: 2, completed: 1 },
        status: "Active",
    },
    {
        name: "Dr. Anil Kulkarni",
        department: "Computer Science",
        subject: "Artificial Intelligence",
        program: "PHD",
        registered: 11,
        completed: 6,
        gender: { male: 7, female: 4 ,completedFemale:4,completedMale:1},
        ph: { total: 0, completed: 0 },
        foreign: { total: 3, completed: 2 },
        status: "Active",
    },
    {
        name: "Dr. Kavita Reddy",
        department: "Botany",
        subject: "Plant Physiology",
        program: "PHD",
        registered: 9,
        completed: 6,
        gender: { male: 3, female: 6 ,completedFemale:4,completedMale:1},
        ph: { total: 0, completed: 0 },
        foreign: { total: 1, completed: 0 },
        status: "Active",
    },
    {
        name: "Dr. Suresh Naik",
        department: "Sociology",
        subject: "Rural Sociology",
        program: "MPHIL",
        registered: 9,
        completed: 7,
        gender: { male: 4, female: 5 ,completedFemale:4,completedMale:1},
        ph: { total: 0, completed: 0 },
        foreign: { total: 0, completed: 0 },
        status: "Active",
    },
    {
        name: "Dr. Anjali Mehta",
        department: "Psychology",
        subject: "Clinical Psychology",
        program: "MPHIL",
        registered: 8,
        completed: 7,
        gender: { male: 2, female: 6 ,completedFemale:4,completedMale:1},
        ph: { total: 1, completed: 0 },
        foreign: { total: 0, completed: 0 },
        status: "Active",
    },
];
