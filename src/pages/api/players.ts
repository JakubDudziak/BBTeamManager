import type { APIRoute } from "astro";
import { getAllPlayers } from "../../services/player/playerService.ts";

export const GET: APIRoute = async () => {
    const items = await getAllPlayers()
    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store"},
    })
}