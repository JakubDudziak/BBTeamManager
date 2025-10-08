import type { APIRoute } from "astro";
import { listPlayersService } from "../../services/player/playerService";

export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const params = {
            q: url.searchParams.get("q") ?? undefined,
            limit: url.searchParams.get("limit") ?? undefined,
            offset: url.searchParams.get("offset") ?? undefined,
        };

        const { items, total } = listPlayersService(params);
        const payload = { items, total };

        return new Response(JSON.stringify(payload), {
            headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err?.message ?? "Server error" }), { status: 400 });
    }
};
