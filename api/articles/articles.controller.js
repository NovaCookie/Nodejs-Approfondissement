const Article = require("./articles.schema");
const User = require("../users/users.model");

// Créer un article (utilisateur connecté)
exports.createArticle = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status || "draft",
      user: req.user._id,
    });

    await article.save();

    // Socket.io create article
    if (req.io) {
      req.io.emit("article:created", {
        action: "created",
        article: await article.populate("user", "name email"),
        user: { id: req.user._id, name: req.user.name },
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
    }).populate("user", "name email");

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    // Socket.io update article
    if (req.io) {
      req.io.emit("article:updated", {
        action: "updated",
        article: article,
      });
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

    // Socket.io delete article
    if (req.io) {
      req.io.emit("article:deleted", {
        action: "deleted",
        articleId: req.params.id,
      });
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

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const articles = await Article.find({ user: req.params.userId })
      .populate("user", "name email role")
      .select("-__v");

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
      },
      articles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
