import {useEffect, useMemo, useState} from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import {type Player} from "../../types/player";
import PlayersHeader from "./PlayersHeader.tsx";
import Pagination from "./Pagination.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import PlayerModalManager, {Modals} from "./Modal/PlayerModalManager.tsx";

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
type InitialData = Props["initialItems"]

export default function PlayersManager({ initialParams, initialItems }: Props) {
    const [q, setQ] = useState(initialParams.q)
    const [page, setPage] = useState(initialParams.page)
    const [limit, setLimit] = useState(initialParams.limit)
    const [qDebounced, setQDebounced] = useState(q);
    const [chosenPlayer, setChosenPlayer] = useState<number | null>(null)
    const [currentModal, setCurrentModal] = useState<Modals>()


    useEffect(() => {
        const t = setTimeout(() => {
            setQDebounced(q)
            setPage(1)
        }
            , 200);
        return () => clearTimeout(t)
    }, [q]);

    const offset = (page - 1) * limit;
    const queryKey = useMemo(() => ["players", { q: qDebounced, limit, offset }], [qDebounced, limit, offset]);

    const { data } = useQuery({
        queryKey,
        queryFn: async () => {
            const params = new URLSearchParams()
            if (qDebounced) params.set("q", qDebounced)
            params.set("limit", String(limit))
            params.set("offset", String(offset))
            const res = await fetch(`/api/players?${params.toString()}`, { cache: "no-store" })
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
            return (await res.json()) as InitialData
        },
        initialData:
            initialParams.q === qDebounced && initialParams.page === page && initialParams.limit === limit
                ? initialItems
                : undefined,
        placeholderData: keepPreviousData,
        staleTime: 12000,
    });

    const players = data?.items ?? []
    const playersCount = data?.total ?? 0

    function handleActionsClick(modalType: Modals, playerId: number) {
        setCurrentModal(modalType)
        setChosenPlayer(playerId)
    }

    function handleAddPlayerClick() {
        setCurrentModal(Modals.CreatePlayer)
        setChosenPlayer(null)
    }

    return (
        <div className="flex flex-col">
            <PlayersHeader playersCount={playersCount} />
            <PlayersToolbar
                value={q}
                onQueryChange={setQ}
                buttonFn={handleAddPlayerClick}
            />
            <PlayersTable players={players} buttonFn={handleActionsClick}/>
            <Pagination
                currentPage={page}
                playersCount={playersCount}
                playersPerPage={limit}
                onPageChange={setPage} />
            {currentModal && <PlayerModalManager modalType={currentModal} playerId={chosenPlayer}/>}
        </div>
    )
}