const rateLimit = require("express-rate-limit");
const isDev = process.env.NODE_ENV !== "production";

const baseConfig = {
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = {
  // 🔐 AUTH (only if your backend still exposes these)
  loginLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 5,
    message: { status: 429, error: "Too many login attempts. Try again in a minute." },
  }),

  registerLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { status: 429, error: "Too many registrations. Try later." },
  }),

  forgotPasswordLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 60 * 1000,
    max: isDev ? 1000 : 10,
    message: { status: 429, error: "Too many reset attempts. Please wait." },
  }),

  // 🧾 PAYMENT
  paymentInitLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 2,
    message: { status: 429, error: "Too many payment attempts. Slow down." },
  }),

  paymentVerifyLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many verifications. Please wait." },
  }),

  // 📩 CONTACT / FEEDBACK
  contactLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 2,
    message: { status: 429, error: "Too many messages sent. Try later." },
  }),

  // 🌍 PUBLIC ROUTES
  publicApiLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 20,
    message: { status: 429, error: "Too many public requests. Wait a moment." },
  }),

  // ⚙️ ADMIN ROUTES
  adminLoginLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many admin login attempts." },
  }),

  adminDeleteLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 1,
    message: { status: 429, error: "Too many delete actions. Wait!" },
  }),

  // 🔄 HEAVY OPERATIONS
  reportGenLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 1,
    message: { status: 429, error: "Too many reports requested. Please wait." },
  }),

  progressAnalyzeLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 3,
    message: { status: 429, error: "Too many analysis requests." },
  }),

  exportLimiter: rateLimit({
    ...baseConfig,
    windowMs: 60 * 1000,
    max: 1,
    message: { status: 429, error: "Too many exports." },
  }),
};
