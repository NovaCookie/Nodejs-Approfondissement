const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const NotFoundError = require("./errors/not-found");
const userRouter = require("./api/users/users.router");
const usersController = require("./api/users/users.controller");
require("./api/articles/articles.schema");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

// Socket.IO - Temps réel
io.on("connection", (socket) => {
  console.log("Utilisateur connecté via Socket.io");

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté de Socket.io");
  });
});

// Middlewares
app.use((req, res, next) => {
  req.io = io; // Socket.IO disponible dans les contrôleurs
  next();
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.post("/login", usersController.login);
app.use("/api/articles", require("./api/articles/articles.router"));
app.use("/", express.static("public"));

// Gestion des erreurs
app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({ status, message });
});

module.exports = {
  app,
  server,
};