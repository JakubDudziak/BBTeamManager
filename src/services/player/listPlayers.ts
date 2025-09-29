import type {Player} from "../../types/player.ts";
import {readAll, isStringEmpty} from "./playerService.ts";
import {Position} from "../../types/player.ts";

type Props = {
    players: Player[]
    query?: string
    sortBy?: "name" | "position" | "heightCm" | "weightKg",
    sortDir?: "asc" | "desc"
    currentPage: number
    playersPerPage: number
}

function filter (players: Player[], query: string) {
    let searchText = query || ""
    let searchedPlayers: Player[] = players || []

    if (!isStringEmpty(searchText)) {
        searchText = searchText.trim().toLowerCase()

        return players.filter(player =>
            player.firstName.trim().toLowerCase().includes(searchText) ||
            player.lastName.trim().toLowerCase().includes(searchText) ||
            player.position.toLowerCase().includes(searchText) ||
            String(player.heightCm).trim().toLowerCase().includes(searchText) ||
            String(player.weightKg).trim().toLowerCase().includes(searchText)
        )
    }  else {
        return searchedPlayers
    }
}

function sort (sortBy: string, sortDir: string) {
    // TODO: sorting by col and direction of the data (ASC, DESC)
    sortBy = sortBy || "name"
    sortDir = sortDir || "asc"
}

function paginate (players: Player[], currentPage: number, playersPerPage: number) {
    currentPage = currentPage || 1
    playersPerPage = playersPerPage || 6
    const lastPlayerIndex = currentPage * playersPerPage
    const firstPlayerIndex = lastPlayerIndex - playersPerPage

    return players.slice(firstPlayerIndex, lastPlayerIndex)
}

// function that return only these players that should be shown on the current table page
export function listPlayers(props: Props) {

    const filteredPlayers: Player[] = filter(props.players, props.query || "")
    const filteredPlayersLength = filteredPlayers.length
    //TODO add sorting
    const paginatedPlayers = paginate(filteredPlayers, props.currentPage, props.playersPerPage)
    return  {paginatedPlayers, filteredPlayersLength}
}
