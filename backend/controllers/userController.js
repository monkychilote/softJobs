const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

// Registrar un usuario
const registerUser = async (req, res, next) => {
  try {
    const { email, password, role, language } = req.body;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const user = await createUser(email, hashedPassword, role, language);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Login de un usuario
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generar un token JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h", // El token expira en 1 hora
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Obtener datos del usuario autenticado
const getUser = async (req, res, next) => {
  try {
    const { email } = req.user; // Extraído del payload del token
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getUser };
