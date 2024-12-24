const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const tokenMiddleware = require("../middlewares/tokenMiddleware");

const router = express.Router();

router.post("/", authMiddleware, registerUser); // POST /usuarios
router.post("/login", authMiddleware, loginUser); // POST /login
router.get("/", tokenMiddleware, getUser); // GET /usuarios

module.exports = router;
