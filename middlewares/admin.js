const User = require("../api/users/users.model");
const UnauthorizedError = require("../errors/unauthorized");
const ForbiddenError = require("../errors/forbidden"); // ← AJOUTEZ CET IMPORT

module.exports = async (req, res, next) => {
  try {
    // Récupérer l'utilisateur complet depuis la base de données
    const user = await User.findById(req.user.userId);

    if (!user) {
      throw new UnauthorizedError("Utilisateur non trouvé");
    }

    if (user.role !== "admin") {
      throw new ForbiddenError("Accès refusé. Droits administrateur requis.");
    }

    next();
  } catch (error) {
    next(error);
  }
};
