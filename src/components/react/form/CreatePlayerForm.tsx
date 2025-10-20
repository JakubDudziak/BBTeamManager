import {z} from "zod";
import {Position} from "../../../types/player.ts";

const newPlayerSchema = z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    number: z.coerce.number().min(0).max(99),
    position: z.nativeEnum(Position),
    heightCM: z.coerce.number().min(140).max(230),
    weightKG: z.coerce.number().min(40).max(150),
    age: z.coerce.number().min(0).max(150),
    photoURL: z.string().url().nullable()
})

export default function CreatePlayerForm() {

}