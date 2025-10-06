import React, { useEffect, useState } from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import PlayerFormModal from "./PlayerFormModal";
import PlayerDetails from "./PlayerDetails";
import DeleteConfirmationDialog from "./DeleteConfirmDialog";
import { type Player } from "../../types/player";
import PlayersHeader from "./PlayersHeader.tsx";
import Pagination from "./Pagination.tsx";
import RemovePlayerModal from "./Modal/RemovePlayerModal.tsx";

type Props = {
    initialItems: {
        items: Player[];
        total: number;
    }
}

export default function PlayersManager({ initialItems }: Props) {
    const { items, total } = initialItems;
    const [players, setPlayers] = useState<Player[]>(items)
    const [currentPage, setCurrentPage] = useState(1)
    const [playersPerPage, setPlayersPerPage] = useState(5)
    const [playersCount, setPlayersCount] = useState(total)
    const [query, setQuery] = useState("")
    const [playerName, SetPlayerName] = useState("")

    // useEffect(() => {
    //     setPlayersCount()
    // }, [])
    //wrtie useEffect hook that serve pagination and filtering
    useEffect(() => {
        const params = new URLSearchParams()

        fetch(`/api/players?${params}`)
    }, [currentPage, query])

    function onQueryChange(newQuery: string) {
        setQuery(newQuery)
        setCurrentPage(1)
    }

    return (
        <div className="flex flex-col">
            <PlayersHeader playersCount={playersCount} />
            <PlayersToolbar
                value={query}
                onQueryChange={onQueryChange}
            />
            <PlayersTable players={players} />
            <Pagination
                playersCount={playersCount}
                playersPerPage={playersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
            <RemovePlayerModal isOpen={false} playerName={playerName} />
            <PlayerFormModal />
            <PlayerDetails />
            <DeleteConfirmationDialog />
        </div>
    )
}