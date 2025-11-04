import {defineAction} from "astro:actions"
import {z} from "astro:schema"
import { checkIfNumberIsTakenInDB } from "../../repositories/players.repo"

export const checkIfNumberIsTakenAction = defineAction({
    accept: "json",
    input: z.coerce.number().int().min(0).max(99),
    handler: (number) => {
        const existsInDB = checkIfNumberIsTakenInDB(number)
        
    }
})