export type FacilityItem = {
    id: string;
    name: string;
    capacity: number;
    area: string;
    remarks: string;
    status: "Operational" | "Closed" | "Maintenance";
    available: boolean;
};

export type FacilityGroup = {
    icon: React.ReactNode;
    title: string;
    items: FacilityItem[];
};


export const FACILITY_GROUPS: FacilityGroup[] = [
    {
        icon: "🌳",
        title: "Playground",
        items: [
            {
                id: "pg1",
                name: "Main Sports Ground",
                capacity: 500,
                area: "15000 sq ft",
                remarks: "Multi-purpose ground for outdoor activities",
                status: "Operational",
                available: true,
            },
            {
                id: "pg2",
                name: "Secondary Practice Ground",
                capacity: 200,
                area: "8000 sq ft",
                remarks: "Used for practice sessions and training",
                status: "Operational",
                available: true,
            },
        ],
    },
    {
        icon: "🏏",
        title: "Cricket Ground",
        items: [
            {
                id: "cg1",
                name: "Cricket Ground with Turf Pitch",
                capacity: 300,
                area: "20000 sq ft",
                remarks: "Full-size cricket ground with nets",
                status: "Operational",
                available: true,
            },
        ],
    },
    {
        icon: "⚽",
        title: "Football Ground",
        items: [
            {
                id: "fb1",
                name: "Football Field",
                capacity: 400,
                area: "25000 sq ft",
                remarks: "Standard football field with goal posts",
                status: "Operational",
                available: true,
            },
        ],
    },
    {
        icon: "🏀",
        title: "Basketball Court",
        items: [
            {
                id: "bb1",
                name: "Outdoor Basketball Court 1",
                capacity: 50,
                area: "4700 sq ft",
                remarks: "Concrete court with floodlights",
                status: "Operational",
                available: true,
            },
            {
                id: "bb2",
                name: "Indoor Basketball Court",
                capacity: 100,
                area: "5000 sq ft",
                remarks: "Under renovation — completion next month",
                status: "Closed",
                available: false,
            },
        ],
    },
    {
        icon: "🏸",
        title: "Badminton Court",
        items: [
            {
                id: "bd1",
                name: "Indoor Badminton Court 1",
                capacity: 30,
                area: "1400 sq ft",
                remarks: "Wooden flooring with proper lighting",
                status: "Operational",
                available: true,
            },
            {
                id: "bd2",
                name: "Indoor Badminton Court 2",
                capacity: 30,
                area: "1400 sq ft",
                remarks: "Wooden flooring with proper lighting",
                status: "Operational",
                available: true,
            },
            {
                id: "bd3",
                name: "Indoor Badminton Court 3",
                capacity: 30,
                area: "1400 sq ft",
                remarks: "Wooden flooring with proper lighting",
                status: "Operational",
                available: true,
            },
        ],
    },
    {
        icon: "🏋️",
        title: "Gymnasium",
        items: [
            {
                id: "gm1",
                name: "Main Gymnasium",
                capacity: 80,
                area: "3000 sq ft",
                remarks: "Fully equipped with modern fitness equipment",
                status: "Operational",
                available: true,
            },
            {
                id: "gm2",
                name: "Yoga and Aerobics Hall",
                capacity: 50,
                area: "2000 sq ft",
                remarks: "Dedicated space for yoga and aerobics",
                status: "Operational",
                available: true,
            },
        ],
    },
    {
        icon: "🤽",
        title: "Swimming Pool",
        items: [
            {
                id: "sw1",
                name: "Olympic Size Swimming Pool",
                capacity: 100,
                area: "50m x 25m",
                remarks: "Olympic standard pool with changing rooms",
                status: "Operational",
                available: true,
            },
        ],
    },
    {
        icon: "🏟",
        title: "Indoor Stadium",
        items: [
            {
                id: "st1",
                name: "Multi-Purpose Indoor Stadium",
                capacity: 1000,
                area: "30000 sq ft",
                remarks: "Indoor stadium for events and sports",
                status: "Operational",
                available: true,
            },
        ],
    },
    {
        icon: "🏃",
        title: "Athletics Track",
        items: [
            {
                id: "at1",
                name: "400m Athletics Track",
                capacity: 200,
                area: "8 lanes, 400m",
                remarks: "Synthetic track with athletic facilities",
                status: "Operational",
                available: true,
            },
        ],
    },
];
