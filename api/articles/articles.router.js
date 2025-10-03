const express = require("express");
const router = express.Router();
const articlesController = require("./articles.controller");

const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");

// Routes
router.post("/", auth, articlesController.createArticle);
router.put("/:id", auth, admin, articlesController.updateArticle);
router.delete("/:id", auth, admin, articlesController.deleteArticle);

// Route publique pour les articles d'un utilisateur
router.get("/user/:userId/articles", articlesController.getUserArticles);

module.exports = router;
