import type {APIRoute} from "astro";
import {z} from "zod"
import {Position} from "../../types/player.ts";
import {createPlayer} from "../../repositories/players.repo.ts";

const newPlayerSchema = z.object({
    firstName: z.string().trim().min(2, "First name must contain at least 2 letters").max(20, "First name must contain at most 20 letters"),
    lastName: z.string().trim().min(2, "Last name must contain at least 2 letters").max(20, "Last name must contain at most 20 letters"),
    number: z.number().min(0, "The minimum possible number is 0").max(99, "The maximum possible nu"),
    position: z.nativeEnum(Position),
    heightCm: z.number().min(140, "The minimum possible height is 140cm").max(230, "the maximum possible height is 230cm"),
    weightKg: z.number().min(30, "The minimum possible weight is 30kg").max(170, "The maximum possible weight is 170kg"),
    age: z.number().min(12, "The minimum possible age is 12").max(99, "The maximum possible age is 99"),
    photoURL: z.string().url("Incorrect photo URL")
})

export const POST: APIRoute = async ({request}) => {
    try {
        const contentType = request.headers.get("content-type") || ""
        if (!contentType.includes("application/json")) {
            return new Response(
                JSON.stringify({code: "UNSUPPORTED_MEDIA_TYPE", message: "Use application/json"}),
                {status: 415, headers: {"Content-type": "application/json"}}
            )
        }

        let json: unknown
        try {
            json = await request.json()
        } catch {
            return new Response(
                JSON.stringify({ code: "BAD_JSON", message: "Malformed JSON body" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            )
        }

        const data = newPlayerSchema.parse(json)

        const player = await createPlayer(data)

        return new Response(JSON.stringify(player), {
            status: 201,
            headers: {"Content-type": "application/json"}
        })
    } catch (err: any) {
        if (err?.issues && Array.isArray(err.issues)) {
            return new Response(
                JSON.stringify({
                    code: "VALIDATION_ERROR",
                    message: "Invalid Input",
                    issues: err.issues.map((i: any) => ({
                        path: i.path?.join('.'),
                        message: i.message,
                    })),
                }),
                {status: 400, headers: { "Content-type": "application/json"}}
            )
        }

        return new Response(
            JSON.stringify({
                code: "INTERNAL_ERROR",
                message: "Unexpected server error"
            }),
            {status: 500, headers: {"Content-type": "application/json"}}
        )
    }
}