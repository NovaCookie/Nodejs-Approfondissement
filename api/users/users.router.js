const express = require("express");
const usersController = require("./users.controller");
const articleController = require("../articles/articles.controller");
const authMiddleware = require("../../middlewares/auth");
const router = express.Router();

//Routes publiques
router.post("/", usersController.create);
router.post("/login", usersController.login);

// Routes protégées
router.get("/", authMiddleware, usersController.getAll);
router.get("/:id", authMiddleware, usersController.getById);
router.put("/:id", authMiddleware, usersController.update);
router.delete("/:id", authMiddleware, usersController.delete);

router.get("/:userId/articles", articleController.getUserArticles);

module.exports = router;
