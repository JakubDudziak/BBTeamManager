import React, {useEffect, useState} from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import PlayerFormModal from "./PlayerFormModal";
import PlayerDetails from "./PlayerDetails";
import DeleteConfirmationDialog from "./DeleteConfirmDialog";
import {type Player} from "../../types/player";
import PlayersHeader from "./PlayersHeader.tsx";
import Pagination from "./Pagination.tsx";
import {listPlayers} from "../../services/player";
import {readAll} from "../../services/player/playerService.ts";
import Modal from "./Modal/Modal.tsx";
import RemovePlayerModal from "./Modal/RemovePlayerModal.tsx";


export default function PlayersManager() {

    // list of all players, if list has not any players it returns empty list
    const [players, setPlayers] = useState<Player[]>(() => readAll())
    const [searchedPlayers, setSearchedPlayers] = useState<Player[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [playersPerPage, setPlayersPerPage] = useState(5)
    const [playersCount, setPlayersCount] = useState(0)
    const [query, setQuery] = useState("")
    const [playerName, SetPlayerName] = useState("")

    useEffect(() => {
       setPlayersCount(players.length)
    }, []);

    useEffect(() => {
        (() => {
            const {paginatedPlayers, filteredPlayersLength} = listPlayers({players: players, query: query, currentPage, playersPerPage})
            setSearchedPlayers(paginatedPlayers)
            setPlayersCount(filteredPlayersLength)
        })()
    }, [query, currentPage]);

    function onQueryChange(newQuery: string) {
        setQuery(newQuery)
        setCurrentPage(1)
    }

    return (
        <div className="flex flex-col">
            <PlayersHeader playersCount={playersCount}/>
            <PlayersToolbar
                value={query}
                onQueryChange={onQueryChange}
            />
            <PlayersTable players={searchedPlayers}/>
            <Pagination
                playersCount={playersCount}
                playersPerPage={playersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
            <RemovePlayerModal isOpen={true} playerName={playerName} />
            <PlayerFormModal />
            <PlayerDetails />
            <DeleteConfirmationDialog />
        </div>
    )
}