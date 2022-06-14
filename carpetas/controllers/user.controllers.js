const mongoose = require("mongoose");
const UserModel = require("../models/userModels");
const user = {
  registerUser: (req, res) => {
    const { firstName, lastName, linkedin } = req.body;

    let davinia = {
      _id: new mongoose.Types.ObjectId(),
      name: {
        firstName,
        lastName,
      },
      created: Date.now(),
      linkedin,
    };

    let userDavinia = new UserModel(davinia);

    userDavinia.save(function (err) {
      if (err) throw err;
      console.log("Inserción correcta");
      mongoose.disconnect();
    });

    res.render("index");
  },
  updateUser: (req, res) => {
    console.log("updateUser");

    res.render("index");
  },
 
};

module.exports = user;