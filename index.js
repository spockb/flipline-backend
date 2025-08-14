import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";

dotenv.config();
const app = express();
const ORIGIN = "http://127.0.0.1:5173";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

app.listen(5000, "127.0.0.1", () =>
  console.log(`API running on: 127.0.0.1:5000`)
);
