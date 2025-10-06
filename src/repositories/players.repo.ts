import { db } from "../db/client.ts"
import { asc } from "drizzle-orm"
import { players } from "../db/schema/playerSchema.ts";

// only pull data from db
export async function listAllPlayers(page = 1, pageSize = 5) {
    return await db.select().from(players).orderBy(asc(players.id)).limit(pageSize).offset((page - 1) * pageSize);
}