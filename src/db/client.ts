import 'dotenv/config'
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import path from "path"

const dbFile = process.env.DATABASE_URL || './data/bbtm.sqlite';
const dbPath = path.resolve(process.cwd(), dbFile);

const sqlite = new Database(dbPath)
export const db = drizzle(sqlite)