const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { loginUser } = require("./controllers/userController"); // Importar el controlador de login
const loggerMiddleware = require("./middlewares/loggerMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Registrar la ruta /login directamente
app.post("/login", loginUser);

// Registrar las rutas con el prefijo /usuarios
app.use("/usuarios", userRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
