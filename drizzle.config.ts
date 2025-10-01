import type { Config } from "drizzle-kit";
import 'dotenv/config';
import path from "path"

const dbFile = process.env.DATABASE_PATH || './data/bbtm.sqlite';
const dbPath = path.resolve(process.cwd(), dbFile);
console.log(process.env.DATABASE_PATH)

console.log(dbPath)

export default {
    schema: "./src/db/schema/*",
    out: "./src/db/migrations",
    dialect: "sqlite",
    dbCredentials: {
        url: dbPath,
    },
} satisfies Config;
