import { useEffect, useState, useMemo } from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import { type Player } from "../../types/player";
import PlayersHeader from "./PlayersHeader.tsx";
import Pagination from "./Pagination.tsx";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import RemovePlayerModal from "./Modal/RemovePlayerModal.tsx";

type Props = {
    initialParams: {
        q: string;
        page: number;
        limit: number;
    };
    initialItems: {
        items: Player[];
        total: number;
    };
}
type InitialData = Props["initialItems"];

export default function PlayersManager({ initialParams, initialItems }: Props) {
    const [q, setQ] = useState(initialParams.q)
    const [page, setPage] = useState(initialParams.page)
    const [limit, setLimit] = useState(initialParams.limit)
    const [qDebounced, setQDebounced] = useState(q);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [playerToRemoveId, setPlayerToRemoveId] = useState(null)

    useEffect(() => {
        const t = setTimeout(() => {
            setQDebounced(q)
            setPage(1)
        }
            , 200);
        return () => clearTimeout(t);
    }, [q]);

    const offset = (page - 1) * limit;

    return (
        <div className="flex flex-col">
            <PlayersHeader playersCount={playersCount} />
            <PlayersToolbar
                value={q}
                onQueryChange={setQ}
            />
            <PlayersTable players={players} />
            <Pagination
                currentPage={page}
                playersCount={playersCount}
                playersPerPage={limit}
                onPageChange={setPage} />
            <RemovePlayerModal isOpen={isModalOpen} playerName="" />
        </div>
    )
}