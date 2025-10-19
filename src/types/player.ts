export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    number: number;
    position: Position;
    heightCm: number;
    weightKg: number;
    age: number;
    createdAt: string;
    updatedAt: string;
    photoURL?: string | null;
}

export interface NewPlayer {
    firstName: string;
    lastName: string;
    number: number;
    position: Position;
    heightCm: number;
    weightKg: number;
    age: number;
    createdAt: string;
    photoURL?: string;
}

export interface PlayerFromValues {
    id: number;
    firstName: string;
    lastName: string;
    number: string;
    position: Position;
    heightCm: string;
    weightKg: string;
    age: string;
    createdAt: string;
    updatedAt: string;
    photoURL?: string;
}

export enum Position {
    PG = "PG", SG = "SG", SF = "SF", PF = "PF", C = "C"
}