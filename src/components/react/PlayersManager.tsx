import React, {useEffect, useState} from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import PlayerFormModal from "./PlayerFormModal";
import PlayerDetails from "./PlayerDetails";
import DeleteConfirmationDialog from "./DeleteConfirmDialog";
import {type Player, Position} from "../../types/player";
import PlayersHeader from "./PlayersHeader.tsx";
import Pagination from "./Pagination.tsx";
import {listPlayers} from "../../services/player";


export default function PlayersManager() {
    const [players, setPlayers] = useState<Player[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const playersPerPage: number = 6
    const [playersCount, setPlayersCount] = useState(players.length)

    useEffect(() => {
        (async () => {
            const {playersList, playersCount} = (await listPlayers({currentPage, playersPerPage})) ?? {playersList: [], playersCount: 0}
            setPlayers(playersList) // get as much as needed
            setPlayersCount(playersCount)
        })() // function initialization
    }, [currentPage, playersCount]) // In square bracket place variables which state we would like to observe

    return (
        <div className="flex flex-col">
            <PlayersHeader playersCount={playersCount}/>
            <PlayersToolbar />
            <PlayersTable players={players} />
            <Pagination
                playersCount={playersCount}
                playersPerPage={playersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
            <PlayerFormModal />
            <PlayerDetails />
            <DeleteConfirmationDialog />
        </div>
    )
}