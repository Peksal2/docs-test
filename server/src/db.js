import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

const DB_PATH = "./db.json";

async function initDB() {
  if (!existsSync(DB_PATH)) {
    await writeFile(DB_PATH, JSON.stringify({ users: [] }, null, 2), "utf8");
  }
}

export async function readDB() {
  await initDB();
  const raw = await readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

export async function writeDB(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}
