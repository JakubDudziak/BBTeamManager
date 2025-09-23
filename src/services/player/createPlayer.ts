import {type NewPlayer, type Player, Position} from "../../types/player.ts";
import moment from "moment/moment";
import {readAll, isStringEmpty, writeAll} from "./playerService.ts";

function isPosition(position: string): position is Position {
    return ["PG", "SG", "SF", "PF", "C"].includes(position as Position)
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