import seedPlayers from "../../data/players.json";
import { type Player, type NewPlayer, Position } from "../../types/player.ts";

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


// export async function getPlayer(id: number) {
//     const players = readAll()
//
//     const player = await players.find(player => player.id === id)
//     if (!player) {
//         const error = new Error("Player not found")
//         error.name = "NotFound"
//         throw error
//     }
//
//     return player
// }

export async function updatePlayer() {

}

// export async function deletePlayer(id: number) {
//     const players = readAll()
//     const player = players.find(player => player.id === id)
//     if (!player) {
//         const error = new Error("Player not found")
//         error.name = "NotFound"
//         throw error
//     }
//
//     const filteredPlayers = players.filter(player => player.id !== id)
//
//     writeAll(filteredPlayers)
// }
