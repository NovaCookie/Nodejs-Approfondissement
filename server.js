const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const NotFoundError = require("./errors/not-found");
const userRouter = require("./api/users/users.router");
const usersController = require("./api/users/users.controller");
const authMiddleware = require("./middlewares/auth");
require("./api/articles/articles.schema"); // temporaire
const app = express();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  /*socket.on("my_event", (data) => {
    console.log(data);
  });
  io.emit("event_from_server", { test: "foo" });*/

  //Evenement pour la création d'article
  console.log("L'utilisateur est connecté via Socket.io");

  socket.on("article:create", (data) => {
    console.log("Nouvel article créé : ", data);

    io.emit("article:created", data);
  });

  socket.on("disconect", () => {
    console.log(" Utilisateur déconnecté de Socket.io");
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/users", authMiddleware, userRouter);
app.post("/login", usersController.login);

app.use("/api/articles", require("./api/articles/articles.router"));

app.use("/", express.static("public"));

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status);
  res.json({
    status,
    message,
  });
});

module.exports = {
  app,
  server,
};
