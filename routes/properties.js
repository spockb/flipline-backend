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

/**
 * Convert raw form strings to correct JS types.
 * Do this ONCE at the API boundary so your DB layer is clean.
 */
function coercePayload(body) {
  // Destructure with defaults to avoid undefined crashes
  const {
    title = "",
    address = "",
    city = "",
    state = "",
    yearBuilt = "",
    squareFootage = "",
    lotSize = "",
    bedrooms = "",
    bathrooms = "",
    cost = "",
    valuedAt = "",
    bio = "",
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

/**
 * Minimal validation. Don’t get clever; just ensure core fields are present.
 * Return a list of human-readable errors.
 */
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

router.post("/", async (req, res) => {
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
      },
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error("Create failed:", err.code, err.message, err.meta);
    // TEMP: return the message so you can see it from curl
    return res.status(500).json({ error: err.message });
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
