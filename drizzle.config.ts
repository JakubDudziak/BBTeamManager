import 'dotenv/config';
import type { Config } from "drizzle-kit";
import path from "path"

const dbFile = process.env.DATABASE_URL || 'src/data/bbtm.sqlite';
const dbPath = path.resolve(process.cwd(), dbFile);

export default {
    schema: "./src/db/schema/*",
    out: "./src/db/migrations",
    dialect: "sqlite",
    dbCredentials: {
        url: dbPath
    },
} satisfies Config;
