import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const properties = [
  {
    title: "Modern Townhome",
    address: "1247 Oak Valley Drive",
    city: "West Hollywood",
    state: "CA",
    yearBuilt: 2018,
    cost: 485000,
    valuedAt: 520000,
    squareFootage: 2150,
    bedrooms: 3,
    bathrooms: 2.5,
    lotSize: 0.08,
    bio: "Modern townhome in emerging downtown district with excellent rental potential...",
    images: ["/images/1/exterior.webp"],
  },
  {
    title: "Solid Brick Ranch",
    address: "892 Maple Street",
    city: "Glendale",
    state: "CA",
    yearBuilt: 1995,
    cost: 320000,
    valuedAt: 340000,
    squareFootage: 1800,
    bedrooms: 4,
    bathrooms: 2,
    lotSize: 0.25,
    bio: "Solid brick ranch in established family neighborhood...",
    images: ["/images/2/exterior.webp"],
  },
  {
    title: "Luxury New Construction",
    address: "3456 Willow Creek Lane",
    city: "Beverly Hills",
    state: "CA",
    yearBuilt: 2021,
    cost: 750000,
    valuedAt: 785000,
    squareFootage: 2800,
    bedrooms: 4,
    bathrooms: 3,
    lotSize: 0.33,
    bio: "Luxury new construction in premium subdivision...",
    images: ["/images/3/exterior.webp"],
  },
  {
    title: "Affordable Starter Investment",
    address: "567 Pine Ridge Court",
    city: "Inglewood",
    state: "CA",
    yearBuilt: 1987,
    cost: 195000,
    valuedAt: 210000,
    squareFootage: 1200,
    bedrooms: 2,
    bathrooms: 1,
    lotSize: 0.15,
    bio: "Affordable starter investment in up-and-coming neighborhood...",
    images: ["/images/4/exterior.webp"],
  },
  {
    title: "Two-Story Colonial",
    address: "2134 Sunset Boulevard",
    city: "Echo Park",
    state: "CA",
    yearBuilt: 2005,
    cost: 425000,
    valuedAt: 445000,
    squareFootage: 2400,
    bedrooms: 3,
    bathrooms: 2.5,
    lotSize: 0.28,
    bio: "Two-story colonial with finished basement in desirable school district...",
    images: ["/images/5/exterior.webp"],
  },
  {
    title: "Classic Ranch",
    address: "789 Cedar Park Avenue",
    city: "Van Nuys",
    state: "CA",
    yearBuilt: 1978,
    cost: 280000,
    valuedAt: 295000,
    squareFootage: 1650,
    bedrooms: 3,
    bathrooms: 2,
    lotSize: 0.45,
    bio: "Classic ranch with great bones in mature neighborhood...",
    images: ["/images/6/exterior.webp"],
  },
  {
    title: "Contemporary Suburban Home",
    address: "1523 Birch Hill Drive",
    city: "Burbank",
    state: "CA",
    yearBuilt: 2019,
    cost: 650000,
    valuedAt: 685000,
    squareFootage: 2600,
    bedrooms: 4,
    bathrooms: 3.5,
    lotSize: 0.22,
    bio: "Contemporary design with open floor plan and high ceilings...",
    images: ["/images/7/exterior.webp"],
  },
  {
    title: "Mid-Century Modern",
    address: "4421 Elm Street",
    city: "Silver Lake",
    state: "CA",
    yearBuilt: 1962,
    cost: 375000,
    valuedAt: 390000,
    squareFootage: 1950,
    bedrooms: 3,
    bathrooms: 1.5,
    lotSize: 0.18,
    bio: "Mid-century modern gem with original architectural details...",
    images: ["/images/8/exterior.webp"],
  },
  {
    title: "Energy-Efficient Smart Home",
    address: "986 Magnolia Circle",
    city: "Pasadena",
    state: "CA",
    yearBuilt: 2015,
    cost: 525000,
    valuedAt: 560000,
    squareFootage: 2300,
    bedrooms: 3,
    bathrooms: 2.5,
    lotSize: 0.12,
    bio: "Energy-efficient home with solar panels and smart technology...",
    images: ["/images/9/exterior.webp"],
  },
  {
    title: "Spacious Two-Story",
    address: "1667 Hickory Lane",
    city: "Studio City",
    state: "CA",
    yearBuilt: 1991,
    cost: 310000,
    valuedAt: 325000,
    squareFootage: 2100,
    bedrooms: 4,
    bathrooms: 2.5,
    lotSize: 0.31,
    bio: "Spacious two-story in established subdivision with mature landscaping...",
    images: ["/images/10/exterior.webp"],
  },
  {
    title: "New Construction in Development",
    address: "3301 Dogwood Trail",
    city: "Manhattan Beach",
    state: "CA",
    yearBuilt: 2020,
    cost: 580000,
    valuedAt: 615000,
    squareFootage: 2450,
    bedrooms: 3,
    bathrooms: 2.5,
    lotSize: 0.16,
    bio: "Brand new construction with builder warranty still active...",
    images: ["/images/11/exterior.webp"],
  },
  {
    title: "Updated Investment Property",
    address: "555 Poplar Street",
    city: "North Hollywood",
    state: "CA",
    yearBuilt: 1983,
    cost: 245000,
    valuedAt: 260000,
    squareFootage: 1400,
    bedrooms: 3,
    bathrooms: 2,
    lotSize: 0.2,
    bio: "Solid investment property in working-class neighborhood with steady rental demand...",
    images: ["/images/12/exterior.webp"],
  },
];

async function main() {
  console.log("Seeding database...");
  const adminHash = await bcrypt.hash("admin123", 10);
  const memberHash = await bcrypt.hash("viewer123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "member@example.com" },
    update: {},
    create: {
      email: "member@example.com",
      passwordHash: memberHash,
      role: "MEMBER",
    },
  });
  console.log("Seeded admin and member users");

  if (properties.length) {
    await prisma.property.createMany({
      data: properties, // NO id fields
      skipDuplicates: true, // avoids unique collisions if rerun
    });
    console.log("Seeded properties");
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
