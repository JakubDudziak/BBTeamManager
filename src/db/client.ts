import 'dotenv/config'
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import path from "path"

const dbFile = process.env.DATABASE_PATH || './data/bbtm.sqlite';
const dbPath = path.resolve(process.cwd(), dbFile);
export const db = drizzle(dbPath)