import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import type { Position } from "../../types/player";

export const players = sqliteTable("players", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    number: integer("number").notNull().unique(),
    position: text("position").notNull().$type<Position>(),
    heightCm: integer("height_cm").notNull(),
    weightKg: integer("weight_kg").notNull(),
    age: integer("age").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    photoURL: text("photo_URL")
});
