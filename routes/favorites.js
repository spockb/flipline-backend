import { Router } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
const COOKIE_NAME = process.env.COOKIE_NAME;

function getUserFromReq(req) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

router.post("/favorites/:propertyId", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: "Not authenticated" });

  const property = Number(req.params.propertyId);
  if (!Number.isFinite(propertyId)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  try {
    const fav = await prisma.favorite.create({
      data: { userId: user.id, propertyId },
      select: { id: true, propertyId: true, createdAt: true },
    });
    return res.status(201).json({ ok: true, favorite: fav });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(200).json({ ok: true, already: true });
    }
    console.error(err);
    return res.status(500).json({ error: "Failed to favorite" });
  }
});

router.delete("/favorites/:propertyId", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: "Not authenticated" });

  const property = Number(req.params.propertyId);
  if (!Number.isFinite(propertyId)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  try {
    const result = await prisma.favorite.deleteMany({
      where: { userId: user.id, propertyId },
    });
    return res.json({ ok: true, removed: result.count > 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to unfavorite" });
  }
});

router.get("/favorites", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: "Not authenticated" });

  try {
    const favs = await prisma.favorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            images: true,
            city: true,
            state: true,
            cost: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load favorites" });
  }
});

export default router;
