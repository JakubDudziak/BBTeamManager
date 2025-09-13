export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    number: number;
    position: Position;
    heightCm: number;
    weight: number;
    age: number;
    createdAt: string;
    updatedAt: string;
    photoURL: string;
}

export interface NewPlayer {
    firstName: string;
    lastName: string;
    number: number;
    position: Position;
    heightCm: number;
    weight: number;
    age: number;
    createdAt: string;
    photoURL: string;
}

export interface PlayerFromValues {
    id: number;
    firstName: string;
    lastName: string;
    number: string;
    position: Position;
    heightCm: string;
    weight: string;
    age: string;
    createdAt: string;
    updatedAt: string;
    photoURL: string;
}

export enum Position {
    PG, SG, SF, PF, C
}