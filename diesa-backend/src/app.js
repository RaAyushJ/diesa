const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes with individual rate limiting in authRoutes
app.use("/api/auth", authRoutes);

// Add this after:
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



