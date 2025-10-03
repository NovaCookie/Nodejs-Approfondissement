const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("./config");

async function createUser() {
  await mongoose.connect(config.mongoUri);
  console.log('Connecté à MongoDB');
  const User = mongoose.model("User", {
    name: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now },
  });

  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name: "TestUser",
    email: "test@test.com",
    password: hashedPassword,
  });

  await user.save();
  console.log("Utilisateur créé :");
  console.log("Email: test@test.com");
  console.log("Password: password123");

  mongoose.connection.close();
}

createUser();
