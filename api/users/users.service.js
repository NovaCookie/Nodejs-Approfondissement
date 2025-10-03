const User = require("./users.model");
const bcrypt = require("bcrypt");

class UserService {
  getAll() {
    return User.find({}, "-password");
  }
  get(id) {
    return User.findById(id, "-password");
  }
  create(data) {
    const user = new User(data);
    return user.save();
  }
  update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return User.deleteOne({ _id: id });
  }
  async checkPasswordUser(email, password) {
    console.log("Tentative de login:", email);
    const user = await User.findOne({ email });
    console.log("Utilisateur trouvé:", user ? "OUI" : "NON");

    if (!user) {
      return false;
    }

    console.log("Password fourni:", password);
    console.log("Password hashé en base:", user.password);

    const bool = await bcrypt.compare(password, user.password);

    console.log("bcrypt.compare résultat:", bool);

    if (!bool) {
      return false;
    }
    return user._id;
  }
}

module.exports = new UserService();
