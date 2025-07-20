const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

router.get("/me", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    user: req.user
  });
});

module.exports = router;
