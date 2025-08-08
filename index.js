import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import propertyRoutes from "./routes/properties.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
  res.send("FlipLine API is running");
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
