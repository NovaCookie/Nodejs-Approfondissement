const express = require("express");
const router = express.Router();
const articlesController = require("./articles.controller");

const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");

// Routes
router.post("/", auth, articlesController.createArticle); //Tous les utilisateurs
router.put("/:id", auth, admin, articlesController.updateArticle); //admin uniquement
router.delete("/:id", auth, admin, articlesController.deleteArticle); //admin uniquement

// Route publique pour les articles d'un utilisateur (déplacer dans users.router.js)
// router.get("/user/:userId/articles", articlesController.getUserArticles);

module.exports = router;
