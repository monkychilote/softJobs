const authMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }
  next();
};
module.exports = authMiddleware;
