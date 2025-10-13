import { db } from "../db/client.ts"
import { and, or, like, sql } from "drizzle-orm"
import { players } from "../db/schema/playerSchema.ts";

export interface ListPlayersParams {
    q?: string;
    limit: number;
    offset: number;
}

export function getPlayers({ q, limit, offset }: ListPlayersParams) {
    const filters = [];

    if (q && q.trim()) {
        const search = `%${q.trim()}%`;
        filters.push(
            or(like(players.firstName, search),
                like(players.lastName, search),
                like(players.heightCm, search),
                like(players.weightKg, search),
                like(players.position, search))
        );
    }

    const whereExpr = filters.length ? and(...filters) : undefined;

    const items = db
        .select()
        .from(players)
        .where(whereExpr as any)
        .limit(limit)
        .offset(offset)
        .all();

    const totalRow = db
        .select({ count: sql<number>`count(*)` })
        .from(players)
        .where(whereExpr as any)
        .get();

    const total = totalRow?.count ?? 0;

    return { items, total };
}