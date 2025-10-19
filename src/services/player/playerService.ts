import { z } from "zod";
import { getPlayers } from "../../repositories/players.repo";

const querySchema = z.object({
    q: z.string().trim().max(30).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(5),
    offset: z.coerce.number().int().min(0).default(0),
});

export function listPlayersService(input: unknown) {
    const parsed = querySchema.safeParse(input);
    if (!parsed.success) {
        const msg = parsed.error.errors.map(e => e.message).join("; ");
        throw new Error(`Niepoprawne parametry: ${msg}`);
    }

    const { q, limit, offset } = parsed.data;
    return getPlayers({ q, limit, offset });
}
