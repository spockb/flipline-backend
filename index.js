import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import propertyRouter from "./routes/properties.js";
import uploadsRouter from "./routes/uploads.js";
import favoritesRouter from "./routes/favorites.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/favorites", favoritesRouter);

app.listen(5000, "127.0.0.1", () =>
  console.log(`API running on: 127.0.0.1:5000`)
);
