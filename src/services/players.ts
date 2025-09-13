import seedPlayers from "../data/players.json";
import { type Player } from "../types/player";

const STORAGE_KEY = "bbtm.players.v1";

type ListPlayersOptions = {
    q?: string,
    sortBy?: "name" | "position" | "height" | "weight",
    sortDir?: "asc" | "desc"
}

function readAll() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPlayers))
    }

    const players: Player[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    return players
}

function writeAll(players: Player[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
}

function isStringEmpty(value: string) {
    return value === undefined || value === null || value === "" || value.trim() === ""
}

// function sortPlayers(players: Player[], sortBy: string, sortDir: string): Player[] {
//     //sort by chosen col

// }


export async function listPlayers(options?: ListPlayersOptions) {

    const q = options?.q || ""
    const sortBy = options?.sortBy || "name"
    const sortDir = options?.sortDir || "asc"

    const players = readAll()

    let wantedPlayers: Player[] = []

    if (!isStringEmpty(q)) {
        const searchText = q.trim().toLowerCase()

        players.forEach(player => {
            if (player.firstName.includes(searchText) ||
                player.lastName.includes(searchText) ||
                String(player.heightCm).includes(searchText) ||
                String(player.weight).includes(searchText)
            ) {
                wantedPlayers.push(player)
            }

        });

    }
    // const sortedPlayers = sortPlayers(wantedPlayers, sortBy, sortDir)

    return wantedPlayers
}

export async function getPlayer(id: number) {
    const players = readAll()

    players.forEach(player => {
        if (player.id == id) {
            return player
        }
    });

}

export async function createPlayer() {

}

export async function updatePlayer() {

}

export async function deletePlayer() {

}
