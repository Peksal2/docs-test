import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { readDB, writeDB } from "./db.js";
import {
  hashPassword,
  verifyPassword,
  signToken,
  requireAuth,
} from "./auth.js";
import { requireAccess } from "./access.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// базовые мидлвары
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// при старте — убедимся, что есть админ
async function ensureAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  const db = await readDB();
  const exists = db.users.find(
    (u) => u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );
  if (exists) return;

  const passwordHash = await hashPassword(ADMIN_PASSWORD);
  const user = {
    id: uuid(),
    name: ADMIN_NAME || "Admin",
    email: ADMIN_EMAIL,
    passwordHash,
    access: ["admin"],
    comment: "Seeded admin user",
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  await writeDB(db);
  console.log("Seed admin created:", ADMIN_EMAIL);
}

ensureAdmin().catch(console.error);

// ===== Auth =====

// Логин
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const db = await readDB();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({
    id: user.id,
    email: user.email,
    name: user.name,
    access: user.access,
  });
  res.json({ token });
});

// Текущий пользователь
app.get("/api/me", requireAuth, async (req, res) => {
  const db = await readDB();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { passwordHash, ...safe } = user;
  res.json(safe);
});

// ===== Users (admin only) =====

// список пользователей
app.get(
  "/api/users",
  requireAuth,
  requireAccess("admin"),
  async (_req, res) => {
    const db = await readDB();
    const safe = db.users.map(({ passwordHash, ...u }) => u);
    res.json(safe);
  }
);

// получить одного
app.get(
  "/api/users/:id",
  requireAuth,
  requireAccess("admin"),
  async (req, res) => {
    const db = await readDB();
    const user = db.users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    const { passwordHash, ...safe } = user;
    res.json(safe);
  }
);

// создать пользователя
app.post(
  "/api/users",
  requireAuth,
  requireAccess("admin"),
  async (req, res) => {
    const { name, email, password, access = [], comment = "" } = req.body || {};
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ error: "name, email, password are required" });

    const db = await readDB();
    if (
      db.users.some(
        (u) => u.email.toLowerCase() === String(email).toLowerCase()
      )
    ) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const passwordHash = await hashPassword(password);
    const user = {
      id: uuid(),
      name,
      email,
      passwordHash,
      access: Array.isArray(access) ? access : [],
      comment,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    await writeDB(db);

    const { passwordHash: _, ...safe } = user;
    res.status(201).json(safe);
  }
);

// обновить пользователя
app.put(
  "/api/users/:id",
  requireAuth,
  requireAccess("admin"),
  async (req, res) => {
    const { name, email, password, access, comment } = req.body || {};
    const db = await readDB();
    const idx = db.users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    if (
      email &&
      db.users.some(
        (u) =>
          u.email.toLowerCase() === String(email).toLowerCase() &&
          u.id !== req.params.id
      )
    ) {
      return res.status(409).json({ error: "Email already in use" });
    }

    if (name !== undefined) db.users[idx].name = name;
    if (email !== undefined) db.users[idx].email = email;
    if (Array.isArray(access)) db.users[idx].access = access;
    if (comment !== undefined) db.users[idx].comment = comment;
    if (password) db.users[idx].passwordHash = await hashPassword(password);

    await writeDB(db);
    const { passwordHash, ...safe } = db.users[idx];
    res.json(safe);
  }
);

app.delete(
  "/api/users/:id",
  requireAuth,
  requireAccess("admin"),
  async (req, res) => {
    const db = await readDB();
    const idx = db.users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    const [removed] = db.users.splice(idx, 1);
    await writeDB(db);
    const { passwordHash, ...safe } = removed;
    res.json(safe);
  }
);

// healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
