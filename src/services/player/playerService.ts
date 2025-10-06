import seedPlayers from "../../data/players.json";
import { type Player, type NewPlayer, Position } from "../../types/player.ts";
import { listAllPlayers } from "../../repositories/players.repo.ts";

const STORAGE_KEY = "bbtm.players.v1"



export function writeAll(players: Player[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
}

export function readAll(): Player[] {
    if (typeof window === "undefined") return [];
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPlayers))
    }

    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
}

export function isStringEmpty(value: string | null): boolean {
    return !value || value.trim() === "";
}

export async function getAllPlayers() {
    return listAllPlayers()
}
