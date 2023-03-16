const UserModel = require("../models/user.js");


exports.create = async (req, res) => {
  const { nom, prenom, phone, email, password, usertype_id } = req.body;
  await UserModel.save(nom, prenom, phone, email, password, usertype_id);
  res.redirect("/utilisateurs");
};

exports.read = async (req, res) => {
  const data = await UserModel.read();
  const userType = await UserModel.type();
  res.render("user", { data: data[0], userType: userType[0] });
};

exports.remove = async (req, res) => {
  const { id } = req.body;
  await UserModel.delete(id);
  res.send();
};

exports.update = async (req, res) => {
  const { nom, prenom, phone, email, password, usertype_id, id } = req.body;
  await UserModel.update(nom, prenom, phone, email, password, usertype_id, id);
  res.send();
};
