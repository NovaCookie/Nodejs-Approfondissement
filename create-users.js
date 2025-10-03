const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("./config");

async function createUsers() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connecté à MongoDB");

    const User = require("./api/users/users.model");

    // Supprimer les anciens utilisateurs de test
    await User.deleteMany({
      email: { $in: ["user@test.com", "admin@test.com"] },
    });

    // Créer l'utilisateur lambda
    const userPassword = await bcrypt.hash("password123", 10);
    const user = new User({
      name: "Test User",
      email: "user@test.com",
      password: userPassword,
      role: "member",
    });
    await user.save();
    console.log("Utilisateur créé: user@test.com / " + userPassword);

    // Créer l'admin
    const adminPassword = await bcrypt.hash("password123", 10);
    const admin = new User({
      name: "Admin User",
      email: "admin@test.com",
      password: adminPassword,
      role: "admin",
    });
    await admin.save();
    console.log("Admin créé: admin@test.com / " + adminPassword);

    console.log("Utilisateurs créés avec succès!");
  } catch (error) {
    console.error(" Erreur:", error);
  } finally {
    mongoose.connection.close();
  }
}

createUsers();
