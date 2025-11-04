import {defineAction} from "astro:actions";
import {newPlayerSchema} from "../../components/schemas/newPlayer.ts";
import type {ListPlayersParams} from "../../repositories/players.repo.ts";


export const create = defineAction({
    accept: "form",
    input: newPlayerSchema,
    handler: (input) => {
    //     TODO if data is valid pass it to repository and save in DB, if data is incorrect return error to front
    
    }


})