const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");

// ----------------------------
// REGISTER
// ----------------------------
async function registerUser(req, res) {
  const { email, password, fullName } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        authProvider: "email",
      },
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName
      },
      token
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// ----------------------------
// LOGIN
// ----------------------------
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      },
      token
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  registerUser,
  login
};
