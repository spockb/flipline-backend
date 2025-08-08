import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to load properties" });
  }
});

router.get("/:id", async (req, res) => {
  const propertyId = parseInt(req.params.id);
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) return res.status(404).json({ error: "Not found" });

    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
