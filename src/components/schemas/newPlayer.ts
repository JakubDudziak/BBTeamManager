import {z} from "zod";
import {Position} from "../../types/player.ts";

export const newPlayerSchema = z.object({
    firstName: z
        .string({
            required_error: "First name is required",
        })
        .min(2, "First name must be at least 2 characters long")
        .max(20, "First name must be at most 20 characters long")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/, "First name cannot contain numbers or invalid characters"),

    lastName: z
        .string({
            required_error: "Last name is required",
        })
        .min(2, "Last name must be at least 2 characters long")
        .max(20, "Last name must be at most 20 characters long")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/, "Last name cannot contain numbers or invalid characters"),

    number: z.coerce
        .number({
            invalid_type_error: "Player number must be a number",
        })
        .min(0, "Player number cannot be less than 0")
        .max(99, "Player number cannot be greater than 99"),

    position: z.nativeEnum(Position, {
        required_error: "Position is required",
        invalid_type_error: "Invalid position value",
    }),

    heightCM: z.coerce
        .number({
            invalid_type_error: "Height must be a number in centimeters",
        })
        .min(140, "Height must be at least 140 cm")
        .max(230, "Height cannot exceed 230 cm"),

    weightKG: z.coerce
        .number({
            invalid_type_error: "Weight must be a number in kilograms",
        })
        .min(40, "Weight must be at least 40 kg")
        .max(150, "Weight cannot exceed 150 kg"),

    age: z.coerce
        .number({
            invalid_type_error: "Age must be a number",
        })
        .min(14, "Player must be at least 14 years old")
        .max(99, "Player age cannot exceed 99 years"),

    photoURL: z
        .string({
            invalid_type_error: "Photo URL must be a valid URL",
        })
        .url("Photo URL must be a valid URL")
        .or(z.literal(""))
        .nullable()
})

export type newPlayerFormValues = z.infer<typeof newPlayerSchema>
