import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../requireAuth.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/:propertyId", requireAuth, async (req, res) => {
  const property = Number(req.params.propertyId);
  if (!Number.isFinite(propertyId)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  try {
    const fav = await prisma.favorite.create({
      data: { userId: req.user.id, propertyId },
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

router.delete("/:propertyId", requireAuth, async (req, res) => {
  const property = Number(req.params.propertyId);
  if (!Number.isFinite(propertyId)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  try {
    const result = await prisma.favorite.deleteMany({
      where: { userId: req.user.id, propertyId },
    });
    return res.json({ ok: true, removed: result.count > 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to unfavorite" });
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const favs = await prisma.favorite.findMany({
      where: { userId: req.user.id },
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
