import moment from "moment";
import seedPlayers from "../data/players.json";
import { type Player, type NewPlayer, Position } from "../types/player";

const STORAGE_KEY = "bbtm.players.v1";

type ListPlayersOptions = {
    searchText?: string, //
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

function isPosition(position: string): position is Position {
    return ["PG", "SG", "SF", "PF", "C"].includes(position as Position)
}

export async function listPlayers(options?: ListPlayersOptions) {

    const searchText = options?.searchText || "" // optional
    const sortBy = options?.sortBy || "name"
    const sortDir = options?.sortDir || "asc"

    const players = readAll()

    let wantedPlayers: Player[] = []

    if (!isStringEmpty(searchText)) {
        const searchText = searchText.trim().toLowerCase()

        players.forEach(player => {
            if (player.firstName.includes(searchText) ||
                player.lastName.includes(searchText) ||
                String(player.heightCm).includes(searchText) ||
                String(player.weightKg).includes(searchText)
            ) {
                wantedPlayers.push(player)
            }

        });

        return wantedPlayers
    }

    // TODO: sorting by col and direction of the data (ASC, DESC)

}

export async function getPlayer(id: number) {
    const players = readAll()

    const player = players.find(player => player.id === id)
    if (!player) {
        const error = new Error("Player not found")
        error.name = "NotFound"
        throw error
    }

    return player
}

export async function createPlayer(newPlayer: NewPlayer) {
    const players = readAll()

    if (isStringEmpty(newPlayer.firstName) || newPlayer.firstName.trim().length < 2) {
        const error = new Error("Incorrect first name, try once again")
        error.name = "IncorrectFirstName"
    }
    if (isStringEmpty(newPlayer.lastName) || newPlayer.lastName.trim().length < 2) {
        const error = new Error("Incorrect last name, try once again")
        error.name = "IncorrectLastName"
    }
    if (!isPosition(newPlayer.position.toUpperCase())) {
        const error = new Error("Provided position doesn't exist")
        error.name = "IncorrectPosition"
    }
    if (newPlayer.number < 0 || newPlayer.number > 99 || players.find(player => player.number === newPlayer.number)) {
        const error = new Error("Incorrect player number, it could be taken")
        error.name = "IncorrectPlayerNumber"
    }
    if (newPlayer.heightCm < 150 || newPlayer.heightCm > 240) {
        const error = new Error("Incorrect height")
        error.name = "IncorrectPlayerHeight"
    }
    if (newPlayer.weightKg < 50 || newPlayer.weightKg > 180) {
        const error = new Error("Incorrect weight")
        error.name = "IncorrectPlayerWeight"
    }
    if (newPlayer.age < 14 || newPlayer.age > 67) {
        const error = new Error("Incorrect age")
        error.name = "IncorrectPlayerAge"
    }

    const newId = (players.at(-1)?.id ?? 0) + 1
    const createdAt = moment().format('MMMM DD YYYY, h:mm:ss a')
    const player: Player = {
        id: newId,
        firstName: newPlayer.firstName,
        lastName: newPlayer.lastName,
        number: newPlayer.number,
        position: newPlayer.position,
        heightCm: newPlayer.heightCm,
        weightKg: newPlayer.weightKg,
        age: newPlayer.age,
        createdAt: createdAt,
        updatedAt: createdAt,
        photoURL: newPlayer.photoURL
    }

    players.push(player)
    writeAll(players)
}

export async function updatePlayer() {

}

export async function deletePlayer(id: number) {
    const players = readAll()
    const player = players.find(player => player.id === id)
    if (!player) {
        const error = new Error("Player not found")
        error.name = "NotFound"
        throw error
    }

    const filteredPlayers = players.filter(player => player.id !== id)

    writeAll(filteredPlayers)
}
