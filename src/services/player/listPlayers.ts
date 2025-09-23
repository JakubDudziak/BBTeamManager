import type {Player} from "../../types/player.ts";
import {readAll, isStringEmpty} from "./playerService.ts";

type ListPlayersOptions = {
    searchText?: string, //
    sortBy?: "name" | "position" | "heightCm" | "weightKg",
    sortDir?: "asc" | "desc"
    currentPage: number
    playersPerPage: number
}

export async function listPlayers(options?: ListPlayersOptions) {

    let searchText = options?.searchText || "" // optional
    const sortBy = options?.sortBy || "name"
    const sortDir = options?.sortDir || "asc"
    const currentPage = options?.currentPage || 1
    const playersPerPage = options?.playersPerPage || 6
    const lastPlayerIndex = currentPage * playersPerPage
    const firstPlayerIndex = lastPlayerIndex - playersPerPage
    const players = readAll()
    const currentPlayers = players.slice(firstPlayerIndex, lastPlayerIndex)
    const playersCount = players.length

    let wantedPlayers: Player[] = []

    if (!isStringEmpty(searchText)) {
        searchText.trim().toLowerCase()

        currentPlayers.forEach(player => {
            if (player.firstName.trim().toLowerCase().includes(searchText) ||
                player.lastName.trim().toLowerCase().includes(searchText) ||
                String(player.heightCm).trim().toLowerCase().includes(searchText) ||
                String(player.weightKg).trim().toLowerCase().includes(searchText)
            ) {
                wantedPlayers.push(player)
            }

        });

        return {playersList: wantedPlayers, playersCount}
    }  else {
        return {playersList: currentPlayers, playersCount}
    }

    // TODO: sorting by col and direction of the data (ASC, DESC)
}
