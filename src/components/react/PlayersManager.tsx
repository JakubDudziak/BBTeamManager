import React, { useState, useEffect } from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import PlayerFormModal from "./PlayerFormModal";
import PlayerDetails from "./PlayerDetails";
import DeleteConfirmationDialog from "./DeleteConfirmDialog";
import { listPlayers } from "../../services/players"
import { type Player } from "../../types/player";


export default function PlayersManager() {
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        (async () => {
            setPlayers(await listPlayers())
        })()
    }, []) // In square bracket place variables which state we would like to observe

    return (
        <div className="flex">
            <PlayersToolbar />
            <PlayersTable players={players} />
            <PlayerFormModal />
            <PlayerDetails />
            <DeleteConfirmationDialog />
        </div>
    )
}