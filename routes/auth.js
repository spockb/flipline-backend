import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../requireAuth.js";

const prisma = new PrismaClient();
const router = express.Router();

const COOKIE_NAME = process.env.COOKIE_NAME;
const isProd = process.env.NODE_ENV === "production";

function issueSession(res, user) {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie(COOKIE_NAME, token, {
    path: "/",
    sameSite: "none",
    secure: isProd,
    httpOnly: true,
    domain: undefined,
    maxAge: 60 * 60 * 1000,
  });
  return token;
}

router.get("/whoami", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

router.post("/signup", async (req, res) => {
  try {
    let { email, password, name } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });
    email = String(email).toLowerCase().trim();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, name, role: "MEMBER" },
      select: { id: true, email: true, role: true, name: true },
    });

    issueSession(res, user);
    return res.status(201).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    issueSession(res, { id: user.id, role: user.role });
    return res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true },
    });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    path: "/",
    sameSite: "none",
    secure: isProd,
    httpOnly: true,
    domain: undefined,
  });
  return res.json({ ok: true });
});

export default router;
