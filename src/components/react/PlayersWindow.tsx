import QueryProvider from "./QueryProvider";
import PlayersManager from "./PlayersManager";
import type { Player } from "../../types/player";

export default function PlayersApp(props: {
    initialParams: { q: string; page: number; limit: number };
    initialItems: { items: Player[]; total: number };
}) {
    return (
        <QueryProvider>
            <PlayersManager {...props} />
        </QueryProvider>
    );
}
