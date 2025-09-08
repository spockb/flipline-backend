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

const allowedOrigins = [process.env.FRONTEND_ORIGIN, "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/favorites", favoritesRouter);

app.listen(5000, "127.0.0.1", () =>
  console.log(`API running on: 127.0.0.1:5000`)
);
