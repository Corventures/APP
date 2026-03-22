import { colors } from "@/constants/color";
import {
    LucideIcon,
    Smartphone,
    Network,
    FileCode,
    ShieldCheck,
    Brain,
    TerminalSquare,
    CircuitBoard,
    TestTubes,
    BrainCircuit,
    FlaskConical
} from 'lucide-react-native';

export interface Evaluation {
    type: "CheckPoint 1" | "CheckPoint 2" | "CheckPoint 3" | "Challenge 1" | "Challenge 2" | "Global Solution";
    grade: number;
}

export interface Semester {
    semester: 1 | 2;
    evaluations: Evaluation[];
    absences: number;
}

export interface Subject {
    id: string;
    title: string;
    professor: string;
    icon: LucideIcon;
    semesters: Semester[];
}

export const SUBJECTS: Subject[] = [
    {
        id: "1",
        title: "Mobile Development & IoT",
        professor: "Adeilton da Silva Meneses",
        icon: Smartphone,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 3.5 },
                    { type: "CheckPoint 2", grade: 3.5 },
                    { type: "CheckPoint 3", grade: 8.2 },
                    { type: "Challenge 1", grade: 2.0 },
                    { type: "Challenge 2", grade: 5.5 },
                    { type: "Global Solution", grade: 4.8 },
                ],
                absences: 15,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 4.0 },
                    { type: "CheckPoint 2", grade: 4.5 },
                    { type: "CheckPoint 3", grade: 3.0 },
                    { type: "Challenge 1", grade: 5.0 },
                    { type: "Challenge 2", grade: 6.0 },
                    { type: "Global Solution", grade: 5.5 },
                ],
                absences: 12,
            },
        ],
    },
    {
        id: "2",
        title: "Arquitetura Orientada a Serviços (SOA) e Web Services",
        professor: "Salatiel Luz Marinho",
        icon: Network,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 9.5 },
                    { type: "CheckPoint 2", grade: 10.0 },
                    { type: "CheckPoint 3", grade: 9.8 },
                    { type: "Challenge 1", grade: 10.0 },
                    { type: "Challenge 2", grade: 10.0 },
                    { type: "Global Solution", grade: 9.7 },
                ],
                absences: 0,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 10.0 },
                    { type: "CheckPoint 2", grade: 9.9 },
                    { type: "CheckPoint 3", grade: 10.0 },
                    { type: "Challenge 1", grade: 9.5 },
                    { type: "Challenge 2", grade: 10.0 },
                    { type: "Global Solution", grade: 9.8 },
                ],
                absences: 0,
            },
        ],
    },
    {
        id: "3",
        title: "C# Software Development",
        professor: "Rafael Santos Novo Pereira",
        icon: FileCode,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 6.0 },
                    { type: "CheckPoint 2", grade: 5.5 },
                    { type: "CheckPoint 3", grade: 6.5 },
                    { type: "Challenge 1", grade: 6.0 },
                    { type: "Challenge 2", grade: 6.0 },
                    { type: "Global Solution", grade: 6.2 },
                ],
                absences: 5,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 5.8 },
                    { type: "CheckPoint 2", grade: 6.2 },
                    { type: "CheckPoint 3", grade: 6.0 },
                    { type: "Challenge 1", grade: 6.5 },
                    { type: "Challenge 2", grade: 6.0 },
                    { type: "Global Solution", grade: 5.9 },
                ],
                absences: 8,
            },
        ],
    },
    {
        id: "4",
        title: "Cybersecurity",
        professor: "Vitor Miguel Lasse Silva",
        icon: ShieldCheck,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 2.5 },
                    { type: "CheckPoint 2", grade: 3.0 },
                    { type: "CheckPoint 3", grade: 4.5 },
                    { type: "Challenge 1", grade: 5.0 },
                    { type: "Challenge 2", grade: 4.0 },
                    { type: "Global Solution", grade: 3.5 },
                ],
                absences: 10,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 8.5 },
                    { type: "CheckPoint 2", grade: 9.0 },
                    { type: "CheckPoint 3", grade: 8.8 },
                    { type: "Challenge 1", grade: 9.5 },
                    { type: "Challenge 2", grade: 9.0 },
                    { type: "Global Solution", grade: 9.2 },
                ],
                absences: 2,
            },
        ],
    },
    {
        id: "5",
        title: "Inteligência Artificial & Machine Learning",
        professor: "Danilo Rodrigues de Assis Elias",
        icon: BrainCircuit,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 8.5 },
                    { type: "CheckPoint 2", grade: 8.0 },
                    { type: "CheckPoint 3", grade: 9.0 },
                    { type: "Challenge 1", grade: 8.5 },
                    { type: "Challenge 2", grade: 8.5 },
                    { type: "Global Solution", grade: 8.8 },
                ],
                absences: 22,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 9.0 },
                    { type: "CheckPoint 2", grade: 8.5 },
                    { type: "CheckPoint 3", grade: 8.8 },
                    { type: "Challenge 1", grade: 9.2 },
                    { type: "Challenge 2", grade: 9.0 },
                    { type: "Global Solution", grade: 9.5 },
                ],
                absences: 28,
            },
        ],
    },
    {
        id: "6",
        title: "Operating Systems",
        professor: "Bruno Luiz de Almeida",
        icon: TerminalSquare,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 10.0 },
                    { type: "CheckPoint 2", grade: 2.5 },
                    { type: "CheckPoint 3", grade: 8.0 },
                    { type: "Challenge 1", grade: 4.0 },
                    { type: "Challenge 2", grade: 9.5 },
                    { type: "Global Solution", grade: 3.0 },
                ],
                absences: 4,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 2.0 },
                    { type: "CheckPoint 2", grade: 9.0 },
                    { type: "CheckPoint 3", grade: 4.5 },
                    { type: "Challenge 1", grade: 10.0 },
                    { type: "Challenge 2", grade: 3.5 },
                    { type: "Global Solution", grade: 8.5 },
                ],
                absences: 6,
            },
        ],
    },
    {
        id: "7",
        title: "Physical Computing: IoT & IOB",
        professor: "Yan Gabriel Coelho",
        icon: CircuitBoard,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 0.0 },
                    { type: "CheckPoint 2", grade: 7.5 },
                    { type: "CheckPoint 3", grade: 0.0 },
                    { type: "Challenge 1", grade: 8.0 },
                    { type: "Challenge 2", grade: 8.5 },
                    { type: "Global Solution", grade: 0.0 },
                ],
                absences: 14,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 8.0 },
                    { type: "CheckPoint 2", grade: 0.0 },
                    { type: "CheckPoint 3", grade: 7.0 },
                    { type: "Challenge 1", grade: 0.0 },
                    { type: "Challenge 2", grade: 9.0 },
                    { type: "Global Solution", grade: 0.0 },
                ],
                absences: 10,
            },
        ],
    },
    {
        id: "8",
        title: "Testing, Compliance & Quality Assurance",
        professor: "Prof. Gabriela Costa",
        icon: FlaskConical,
        semesters: [
            {
                semester: 1,
                evaluations: [
                    { type: "CheckPoint 1", grade: 7.0 },
                    { type: "CheckPoint 2", grade: 7.5 },
                    { type: "CheckPoint 3", grade: 6.8 },
                    { type: "Challenge 1", grade: 8.0 },
                    { type: "Challenge 2", grade: 7.2 },
                    { type: "Global Solution", grade: 7.5 },
                ],
                absences: 2,
            },
            {
                semester: 2,
                evaluations: [
                    { type: "CheckPoint 1", grade: 7.2 },
                    { type: "CheckPoint 2", grade: 7.0 },
                    { type: "CheckPoint 3", grade: 7.8 },
                    { type: "Challenge 1", grade: 7.5 },
                    { type: "Challenge 2", grade: 8.0 },
                    { type: "Global Solution", grade: 7.4 },
                ],
                absences: 4,
            },
        ],
    },
];