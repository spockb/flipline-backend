const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("FlipLine API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
