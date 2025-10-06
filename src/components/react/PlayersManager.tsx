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

type Props = {initalItems: Player[]}

export default function PlayersManager({initalItems}: Props) {

    // list of all players, if list has not any players it returns empty list
    const [players, setPlayers] = useState<Player[]>(initalItems)
    const [currentPage, setCurrentPage] = useState(1)
    const [playersPerPage, setPlayersPerPage] = useState(5)
    const [playersCount, setPlayersCount] = useState(0)
    const [query, setQuery] = useState("")
    const [playerName, SetPlayerName] = useState("")

    useEffect(() => {
        fetch("/api/players")
            .then(r => r.json())
            .then(setPlayers)
            .catch(console.error)
    }, []);

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
            <PlayersTable players={players}/>
            <Pagination
                playersCount={playersCount}
                playersPerPage={playersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
            <RemovePlayerModal isOpen={false} playerName={playerName} />
            <PlayerFormModal />
            <PlayerDetails />
            <DeleteConfirmationDialog />
        </div>
    )
}