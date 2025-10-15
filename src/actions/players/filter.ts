import {defineAction} from "astro:actions"
import {z} from "astro:schema"
import {getPlayers} from "../../repositories/players.repo.ts";

export const filter = defineAction({
    accept: "json",
    input: z.object({
        qDebounced: z.string().trim().default(''),
        page: z.number().int().min(1).default(1),
        limit: z.number().int().min(1).max(100).default(5),
    }),
    handler: (input) => {
        const data = getPlayers(input)
        console.log(input)
        return data
    }
})