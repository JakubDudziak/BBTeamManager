import type { PlayerFormValues, NewPlayer } from "../types/player.ts";

export function formToNewPlayer(f: PlayerFormValues): NewPlayer {
    return {
        firstName: f.firstName.trim(),
        lastName: f.lastName.trim(),
        number: parseInt(f.number),
        position: f.position,
        heightCm: parseInt(f.heightCm),
        weightKg: parseInt(f.weightKg),
        age: parseInt(f.age),
        photoURL: f.photoURL?.trim() || undefined,
    };
}
