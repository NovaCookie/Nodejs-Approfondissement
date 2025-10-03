const Article = require("./articles.schema");
const User = require("../users/users.model");

// Créer un article (utilisateur connecté)
exports.createArticle = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status || "draft", // Utilise l'énumération
      user: req.user.userId, // L'ID de l'utilisateur connecté
    });

    await article.save();

    // Socket.io
    /* if (req.io) {
    *   req.io.emit("newArticle", article);
    }*/

    if (req.io) {
      req.io.emit("article:created", {
        action: "created",
        article: article,
        user: req.user.userId,
      });
    }

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un article (admin seulement)
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un article (admin seulement)
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.json({ message: "Article supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les articles d'un utilisateur (public)
exports.getUserArticles = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    const articles = await Article.find({ user: req.params.userId });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ user, articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
