const ClientModel = require("../models/client.js");


exports.read = async (req, res) => {
  const data = await ClientModel.read();
  res.render("client", { data: data[0] });
};
