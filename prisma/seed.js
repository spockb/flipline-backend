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
    bio: "This stunning modern townhome represents the perfect blend of contemporary design and investment opportunity in West Hollywood's rapidly developing downtown corridor. Built in 2018, this 2,150 sq ft property features an open-concept living space with high ceilings, premium finishes, and energy-efficient appliances throughout. The main level boasts a gourmet kitchen with quartz countertops, stainless steel appliances, and a large center island perfect for entertaining. Upstairs, you'll find three generously sized bedrooms including a master suite with walk-in closet and en-suite bathroom featuring dual vanities and a walk-in shower. The property's prime location offers easy access to the Sunset Strip, world-class dining, shopping, and entertainment venues. With a current valuation of $520,000 and strong rental demand in the area, this property offers excellent cash flow potential for investors or serves as an ideal primary residence for young professionals. The HOA maintains the exterior and common areas, making this a low-maintenance investment. Recent comparable sales in the neighborhood support the current valuation, and the property is well-positioned for continued appreciation as the downtown district continues to develop.",
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
    bio: "This charming solid brick ranch home offers exceptional value in Glendale's highly sought-after family neighborhood. Built in 1995 with quality construction and attention to detail, this 1,800 sq ft home features four spacious bedrooms and two full bathrooms, making it perfect for growing families. The property sits on a generous 0.25-acre lot with mature landscaping, providing privacy and space for outdoor activities. The home's classic brick exterior ensures durability and low maintenance, while the interior has been well-maintained with recent updates including fresh paint, updated fixtures, and modern flooring throughout. The kitchen features solid wood cabinets, granite countertops, and stainless steel appliances, while the living areas offer plenty of natural light and comfortable spaces for family gatherings. The large backyard includes a covered patio area and plenty of space for a pool or garden. Located in an established neighborhood with excellent schools, this property offers both immediate livability and long-term appreciation potential. The area has seen consistent property value growth, and this home represents an excellent entry point into one of Glendale's most desirable communities. Recent comparable sales support the current valuation, and the property's solid construction and prime location make it an ideal choice for first-time homebuyers or families looking for a stable, well-established neighborhood.",
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
    bio: "Experience the pinnacle of luxury living in this stunning new construction home located in Beverly Hills' most prestigious subdivision. Built in 2021 with the finest materials and cutting-edge design, this 2,800 sq ft masterpiece features four bedrooms and three bathrooms, each meticulously designed for comfort and elegance. The home's contemporary architecture seamlessly blends indoor and outdoor living with floor-to-ceiling windows, high-end finishes, and premium fixtures throughout. The gourmet kitchen is a chef's dream, featuring custom cabinetry, imported marble countertops, professional-grade appliances, and a large center island with seating for six. The master suite is a private retreat with a spa-like bathroom featuring a freestanding soaking tub, dual vanities, and a walk-in closet with custom built-ins. The open-concept living areas flow effortlessly to the outdoor entertaining space, complete with a covered patio, built-in barbecue, and professionally landscaped yard. Smart home technology is integrated throughout, including automated lighting, security systems, and climate control. Located in a gated community with 24/7 security, this property offers the ultimate in privacy and exclusivity. The subdivision features amenities including a community pool, fitness center, and walking trails. With its prime Beverly Hills location, this home represents not just a residence but a lifestyle investment in one of the world's most prestigious addresses. Recent comparable sales in the area support the current valuation, and the property's new construction status ensures minimal maintenance for years to come.",
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
    bio: "This well-maintained starter home in Inglewood's rapidly gentrifying neighborhood represents an exceptional investment opportunity for first-time buyers or savvy investors. Built in 1987, this 1,200 sq ft property features two bedrooms and one bathroom, making it perfect for young professionals, couples, or as a rental investment. The home has been recently updated with modern fixtures, fresh paint, and new flooring throughout, providing immediate move-in readiness. The kitchen features updated appliances and cabinetry, while the living areas offer comfortable spaces for daily living. The property sits on a 0.15-acre lot with a private backyard, perfect for outdoor entertaining or future expansion. Located in an up-and-coming area with significant development potential, this property offers excellent appreciation opportunities as the neighborhood continues to improve. The area has seen substantial investment in recent years, with new restaurants, shops, and entertainment venues opening nearby. Public transportation access is excellent, with multiple bus lines and easy access to major freeways. The property's affordable price point makes it accessible to first-time homebuyers while offering strong rental potential for investors. Recent comparable sales in the area show consistent appreciation, and the property's solid construction and prime location make it an ideal entry point into the Los Angeles real estate market. With its low maintenance requirements and strong neighborhood fundamentals, this property offers both immediate cash flow potential and long-term appreciation.",
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
    bio: "This elegant two-story colonial home in Echo Park offers the perfect combination of classic charm and modern convenience in one of Los Angeles' most desirable neighborhoods. Built in 2005, this 2,400 sq ft property features three bedrooms and 2.5 bathrooms, with a finished basement that adds significant living space and storage. The home's traditional colonial architecture is complemented by modern updates throughout, including updated kitchens and bathrooms, hardwood flooring, and energy-efficient windows. The main level features a formal living room with a fireplace, a separate dining room perfect for entertaining, and a modern kitchen with granite countertops and stainless steel appliances. Upstairs, the master suite includes a walk-in closet and en-suite bathroom, while two additional bedrooms share a full bathroom. The finished basement provides additional living space that can be used as a family room, home office, or guest quarters. The property sits on a 0.28-acre lot with a private backyard, perfect for outdoor entertaining or future expansion. Located in a highly-rated school district, this home is perfect for families seeking quality education for their children. The neighborhood offers excellent walkability with nearby parks, restaurants, and shopping, while maintaining easy access to downtown Los Angeles and other major employment centers. Recent comparable sales in the area support the current valuation, and the property's prime location and quality construction make it an excellent long-term investment. The finished basement adds significant value and flexibility to the property, making it attractive to a wide range of buyers.",
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
    bio: "This timeless classic ranch home in Van Nuys offers exceptional value and character in a mature, well-established neighborhood. Built in 1978, this 1,650 sq ft property features three bedrooms and two bathrooms, with a single-story layout that's perfect for aging in place or families with young children. The home's classic ranch architecture features a low-pitched roof, wide eaves, and an open floor plan that maximizes natural light and indoor-outdoor living. The interior has been well-maintained with recent updates including fresh paint, updated fixtures, and modern flooring throughout. The kitchen features solid wood cabinets, granite countertops, and stainless steel appliances, while the living areas offer comfortable spaces for daily living and entertaining. The property's most impressive feature is its generous 0.45-acre lot, providing ample space for outdoor activities, gardening, or future expansion. The backyard includes mature trees, a covered patio area, and plenty of space for a pool or additional structures. Located in a mature neighborhood with established trees and quiet streets, this property offers a peaceful retreat from city life while maintaining convenient access to major employment centers. The area has seen consistent property value growth, and this home represents an excellent entry point into the San Fernando Valley real estate market. Recent comparable sales in the area support the current valuation, and the property's solid construction and prime location make it an ideal choice for buyers seeking value and character. The large lot size adds significant value and provides endless possibilities for customization and expansion.",
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
    bio: "This stunning contemporary suburban home in Burbank represents the perfect blend of modern design and family-friendly living. Built in 2019, this 2,600 sq ft property features four bedrooms and 3.5 bathrooms, with an open floor plan and high ceilings that create a sense of spaciousness and light throughout. The home's contemporary architecture features clean lines, large windows, and premium finishes that appeal to modern buyers. The main level features a gourmet kitchen with quartz countertops, custom cabinetry, and high-end appliances, flowing seamlessly into the great room with its vaulted ceilings and fireplace. The master suite is a private retreat with a spa-like bathroom featuring dual vanities, a soaking tub, and a walk-in closet with custom built-ins. Three additional bedrooms provide ample space for family members or guests, while the 3.5 bathrooms ensure convenience for busy households. The property sits on a 0.22-acre lot with a private backyard, perfect for outdoor entertaining or children's play. The outdoor space includes a covered patio, built-in barbecue area, and professionally landscaped gardens. Located in Burbank's highly desirable residential area, this home offers excellent access to top-rated schools, parks, and recreational facilities. The neighborhood is known for its family-friendly atmosphere and strong community spirit. Recent comparable sales in the area support the current valuation, and the property's new construction status ensures minimal maintenance for years to come. The home's contemporary design and prime location make it an excellent choice for families seeking modern living in a established community.",
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
    bio: "This exceptional mid-century modern home in Silver Lake is a true architectural gem that captures the essence of 1960s design while offering modern comfort and convenience. Built in 1962, this 1,950 sq ft property features three bedrooms and 1.5 bathrooms, with original architectural details that have been carefully preserved and enhanced. The home's distinctive mid-century modern features include floor-to-ceiling windows, open beam ceilings, and a seamless indoor-outdoor flow that was revolutionary for its time. The living areas feature original hardwood flooring, a stone fireplace, and large windows that flood the space with natural light. The kitchen has been updated with modern appliances while maintaining the home's original character, featuring custom cabinetry and quartz countertops. The master bedroom includes a walk-in closet and en-suite bathroom, while two additional bedrooms share a full bathroom. The property sits on a 0.18-acre lot with a private backyard that includes a covered patio, mature landscaping, and plenty of space for outdoor entertaining. Located in Silver Lake's highly desirable residential area, this home offers excellent access to trendy restaurants, shops, and entertainment venues. The neighborhood is known for its artistic community and vibrant cultural scene. Recent comparable sales in the area support the current valuation, and the property's unique architectural character makes it highly sought after by buyers who appreciate mid-century modern design. The home's original features and prime location make it an excellent investment opportunity for buyers seeking both character and appreciation potential.",
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
    bio: "This cutting-edge energy-efficient smart home in Pasadena represents the future of sustainable living, combining advanced technology with environmental responsibility. Built in 2015, this 2,300 sq ft property features three bedrooms and 2.5 bathrooms, with a comprehensive smart home system that controls lighting, climate, security, and entertainment throughout the home. The property's energy-efficient features include solar panels that provide 100% of the home's electricity needs, high-efficiency HVAC systems, and smart thermostats that learn your preferences and optimize energy usage. The home's construction includes superior insulation, energy-efficient windows, and LED lighting throughout, resulting in significantly reduced utility costs. The kitchen features energy-efficient appliances, smart faucets, and a built-in recycling center, while the living areas are equipped with smart lighting and automated window treatments. The master suite includes a smart bathroom with programmable shower controls and energy-efficient fixtures. The property sits on a 0.12-acre lot with a smart irrigation system and drought-resistant landscaping that requires minimal water usage. Located in Pasadena's environmentally conscious community, this home offers excellent access to parks, hiking trails, and recreational facilities. The neighborhood is known for its commitment to sustainability and green living. Recent comparable sales in the area support the current valuation, and the property's energy-efficient features provide significant long-term savings. The home's smart technology and sustainable design make it an excellent choice for environmentally conscious buyers seeking both comfort and responsibility. The property's low operating costs and high-tech features make it an attractive investment opportunity for buyers seeking modern, efficient living.",
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
    bio: "This impressive spacious two-story home in Studio City offers exceptional value and comfort in one of Los Angeles' most desirable residential areas. Built in 1991, this 2,100 sq ft property features four bedrooms and 2.5 bathrooms, with a traditional two-story layout that provides excellent separation between living and sleeping areas. The home's classic architecture features a welcoming front porch, traditional brick and siding exterior, and mature landscaping that creates a sense of established elegance. The main level features a formal living room with a fireplace, a separate dining room perfect for entertaining, and a modern kitchen with granite countertops and stainless steel appliances. Upstairs, the master suite includes a walk-in closet and en-suite bathroom, while three additional bedrooms share a full bathroom. The property sits on a generous 0.31-acre lot with mature landscaping, providing privacy and a sense of tranquility. The backyard includes a covered patio area, mature trees, and plenty of space for outdoor activities or future expansion. Located in Studio City's highly desirable residential area, this home offers excellent access to top-rated schools, parks, and recreational facilities. The neighborhood is known for its family-friendly atmosphere and strong community spirit. Recent comparable sales in the area support the current valuation, and the property's spacious layout and prime location make it an excellent choice for growing families. The home's established character and mature landscaping provide immediate appeal, while its prime location ensures long-term appreciation potential. The property's generous lot size and traditional layout make it attractive to a wide range of buyers seeking both comfort and value.",
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
    bio: "This exceptional new construction home in Manhattan Beach represents the pinnacle of modern coastal living, offering brand new construction with a full builder warranty that provides peace of mind for years to come. Built in 2020, this 2,450 sq ft property features three bedrooms and 2.5 bathrooms, with contemporary design elements that maximize natural light and indoor-outdoor living. The home's modern architecture features clean lines, large windows, and premium finishes that create a sense of luxury and sophistication. The main level features an open-concept living area with a gourmet kitchen featuring quartz countertops, custom cabinetry, and high-end appliances, flowing seamlessly into the great room with its vaulted ceilings and fireplace. The master suite is a private retreat with a spa-like bathroom featuring dual vanities, a soaking tub, and a walk-in closet with custom built-ins. Two additional bedrooms provide ample space for family members or guests, while the 2.5 bathrooms ensure convenience for busy households. The property sits on a 0.16-acre lot with a private backyard, perfect for outdoor entertaining or children's play. The outdoor space includes a covered patio, built-in barbecue area, and professionally landscaped gardens. Located in Manhattan Beach's highly desirable coastal community, this home offers excellent access to beaches, parks, and recreational facilities. The neighborhood is known for its excellent schools, vibrant community, and strong property values. Recent comparable sales in the area support the current valuation, and the property's new construction status ensures minimal maintenance for years to come. The home's modern design and prime location make it an excellent choice for buyers seeking contemporary living in a established community.",
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
    bio: "This well-maintained investment property in North Hollywood offers exceptional value and strong rental potential in a working-class neighborhood with steady demand for quality housing. Built in 1983, this 1,400 sq ft property features three bedrooms and two bathrooms, with a layout that's perfect for rental income or first-time homebuyers. The home has been recently updated with modern fixtures, fresh paint, and new flooring throughout, providing immediate appeal to potential tenants or buyers. The kitchen features updated appliances and cabinetry, while the living areas offer comfortable spaces for daily living. The property sits on a 0.2-acre lot with a private backyard, perfect for outdoor entertaining or future expansion. Located in North Hollywood's established residential area, this home offers excellent access to public transportation, major freeways, and employment centers. The neighborhood is known for its diverse community and strong rental demand, making it an ideal location for investment properties. Recent comparable sales in the area support the current valuation, and the property's solid construction and prime location make it an excellent choice for investors seeking steady rental income. The home's affordable price point and strong neighborhood fundamentals make it an ideal entry point into the Los Angeles real estate market. The property's low maintenance requirements and established rental market provide excellent cash flow potential for investors. The home's recent updates and prime location make it attractive to both tenants and buyers seeking value and convenience.",
    images: ["/images/12/exterior.webp"],
  },
];

async function main() {
  console.log("Seeding database...");
  const adminHash = await bcrypt.hash("admin123", 10);
  const memberHash = await bcrypt.hash("member123", 10);

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
