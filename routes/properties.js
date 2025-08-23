import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth, requireRole } from "../requireAuth.js";

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

function coercePayload(body) {
  const {
    title = "Default Title",
    address = "123 Default",
    city = "Default",
    state = "XX",
    yearBuilt = "9999",
    squareFootage = "0",
    lotSize = "0",
    bedrooms = "0",
    bathrooms = "0",
    cost = "0",
    valuedAt = "0",
    bio = "Default bio.",
    images = [],
  } = body;

  return {
    title: String(title).trim(),
    address: String(address).trim(),
    city: String(city).trim(),
    state: String(state).trim(),
    yearBuilt: Number(yearBuilt) || 0,
    squareFootage: Number(squareFootage) || 0,
    lotSize: Number(lotSize) || 0,
    bedrooms: Number(bedrooms) || 0,
    bathrooms: Number(bathrooms) || 0,
    cost: Number(cost) || 0,
    valuedAt: valuedAt === "" ? null : Number(valuedAt),
    bio: String(bio).trim(),
    images: images || [],
  };
}

function validatePayload(data) {
  const errors = [];

  // Required string fields
  ["title", "address", "city", "state"].forEach((k) => {
    if (!data[k]) errors.push(`${k} is required`);
  });

  // Required numeric fields
  if (!Number.isFinite(data.yearBuilt) || data.yearBuilt <= 0)
    errors.push("yearBuilt must be a positive number");
  if (!Number.isFinite(data.squareFootage) || data.squareFootage <= 0)
    errors.push("squareFootage must be a positive number");
  if (!Number.isFinite(data.bedrooms) || data.bedrooms < 0)
    errors.push("bedrooms must be >= 0");
  if (!Number.isFinite(data.bathrooms) || data.bathrooms < 0)
    errors.push("bathrooms must be >= 0");
  if (!Number.isFinite(data.cost) || data.cost <= 0)
    errors.push("cost must be a positive number");

  // Optional numeric fields
  if (data.lotSize < 0) errors.push("lotSize must be >= 0");
  if (
    data.valuedAt !== null &&
    (!Number.isFinite(data.valuedAt) || data.valuedAt <= 0)
  ) {
    errors.push("valuedAt must be a positive number");
  }

  // images type
  if (!Array.isArray(data.images))
    errors.push("images must be an array of strings");

  return errors;
}

router.get("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "Invalid ID" });
  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });
    if (!property) return res.status(404).json({ error: "Not found" });

    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const data = coercePayload(req.body);
  const errors = validatePayload(data);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const created = await prisma.property.create({
      data: {
        title: data.title,
        address: data.address,
        city: data.city,
        state: data.state,
        yearBuilt: data.yearBuilt,
        squareFootage: data.squareFootage,
        lotSize: data.lotSize,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        cost: data.cost,
        valuedAt: data.valuedAt,
        bio: data.bio,
        images: data.images,
        coverIndex: 0,
      },
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error("Create failed:", err.code, err.message, err.meta);
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "Invalid ID" });

  const data = coercePayload(req.body);
  const errors = validatePayload(data);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        title: data.title,
        address: data.address,
        city: data.city,
        state: data.state,
        yearBuilt: data.yearBuilt,
        squareFootage: data.squareFootage,
        lotSize: data.lotSize,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        cost: data.cost,
        valuedAt: data.valuedAt,
        bio: data.bio,
        images: data.images,
      },
    });

    return res.status(200).json(updatedProperty);
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Property not found" });
    console.log("Update failed:", err.code, err.message, err.meta);
    return res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "Invalid ID" });

  try {
    const deletedProperty = await prisma.property.delete({ where: { id } });
    res.json({ message: "Property deleted", property: deletedProperty });
  } catch (err) {
    console.log(err);
    if (err.code === "P2025") {
      res.status(404).json({ error: "Not found" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

export default router;
