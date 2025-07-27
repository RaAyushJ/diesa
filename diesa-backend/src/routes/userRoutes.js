const express = require("express");
const router = express.Router();
const verifySupabaseToken = require("../middleware/supabaseAuth");

router.get("/me", verifySupabaseToken, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    user: req.user,
  });
});

module.exports = router;
