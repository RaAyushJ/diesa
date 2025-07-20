const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user info to request object
    next(); // Proceed to next middleware/route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}

module.exports = authenticateToken;
