import { useEffect, useState } from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import { type Player } from "../../types/player";
import PlayersHeader from "./PlayersHeader.tsx";
import Pagination from "./Pagination.tsx";
import RemovePlayerModal from "./Modal/RemovePlayerModal.tsx";
import { actions } from "astro:actions"

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

export default function PlayersManager({ initialParams, initialItems }: Props) {
    const [q, setQ] = useState(initialParams.q)
    const [page, setPage] = useState(initialParams.page)
    const [limit, setLimit] = useState(initialParams.limit)
    const [qDebounced, setQDebounced] = useState(q);
    const [players, setPlayers] = useState(initialItems.items)
    const [total, setTotal] = useState(initialItems.total)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [playerToRemoveId, setPlayerToRemoveId] = useState(null)

    useEffect(() => {
        const t = setTimeout(() => {
            setQDebounced(q)
            setPage(1)
        }, 200)
        return () => clearTimeout(t)
    }, [q]);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            try {
                const response = await actions.players.filter({
                    qDebounced,
                    page,
                    limit,
                });

                if (response?.error) {
                    console.error(response.error);
                    return;
                }

                const items = response?.data?.items ?? []
                const total = response?.data?.total ?? 0

                if (!cancelled) {
                    console.log(items)
                    setPlayers(items)
                    setTotal(total)
                }
            } catch (e) {
                if (!cancelled) console.error(e)
            }
        };

        fetchData();
        return () => { cancelled = true; }
    }, [qDebounced, page, limit])

    return (
        <div className="flex flex-col">
            <PlayersHeader playersCount={total} />
            <PlayersToolbar
                value={q}
                onQueryChange={setQ}
            />
            <PlayersTable players={players} />
            <Pagination
                currentPage={page}
                playersCount={total}
                playersPerPage={limit}
                onPageChange={setPage} />
            <RemovePlayerModal isOpen={isModalOpen} playerName="" />
        </div>
    )
}