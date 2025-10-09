import "dotenv/config"
import { players } from "./schema/playerSchema";
import { Position } from "../types/player";
import path from "path"
import fs from "fs"
import { db } from "./client"
import { eq } from "drizzle-orm"

type SeedData = {
    players: Array<{
        id: number
        firstName: string
        lastName: string
        number: number
        position: Position
        heightCm: number
        weightKg: number
        age: number
        createdAt: string
        updatedAt: string
        photoURL?: string
    }>
}

const seedPath = path.resolve(process.cwd(), "src", "data", "players.json")
console.log(seedPath)
const raw = fs.readFileSync(seedPath, "utf-8")
const data: SeedData = JSON.parse(raw)

db.transaction(tx => {
    for (const p of data.players) {
        const existing = tx
            .select()
            .from(players)
            .where(
                eq(players.id, p.id)
            )
            .get?.();

        if (!existing) {
            tx.insert(players).values({
                id: p.id,
                firstName: p.firstName,
                lastName: p.lastName,
                number: p.number,
                position: p.position,
                heightCm: p.heightCm,
                weightKg: p.weightKg,
                age: p.age,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
                photoURL: p.photoURL
                ,
            }).run();
        }
    }
})

