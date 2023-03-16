const PdvModel = require("../models/pdv.js");
const UserModel = require("../models/user.js");
const VentModel = require("../models/vent.js");
const GainModel = require("../models/gain.js");
const algeria = require("../algeria.json");
const bcrypt = require('bcrypt')
const db = require("../config/db")


exports.read = async (req, res) => {
  const data = await PdvModel.read();
  const pdvStatus = await PdvModel.status();
  const users = await UserModel.read();
  res.render("pdv", { data: data[0], pdvStatus: pdvStatus[0], users: users[0], algeria });
};

exports.create = async (req, res) => {
  const {
    pdvname,
    address,
    commune,
    daira,
    wilaya,
    contactname,
    phone,
    location,
    pdvstatus_id,
    username,
    password,
    user_id
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10)

  await PdvModel.save(
    pdvname,
    address,
    commune,
    daira,
    wilaya,
    contactname,
    phone,
    location,
    username,
    hashedPassword,
    pdvstatus_id,
    user_id
  );
  
  res.redirect('/pdv');
};

exports.remove = async (req, res) => {
  const { id } = req.body;
  await PdvModel.delete(id); 
  res.send();
};

exports.update = async (req, res) => {
  const {
    pdvname,
    address,
    commune,
    daira,
    wilaya,
    contactname,
    phone,
    location,
    pdvstatus_id,
    user_id,
    id
  } = req.body;
  await PdvModel.update(
    pdvname,
    address,
    commune,
    daira,
    wilaya,
    contactname,
    phone,
    location,
    pdvstatus_id,
    user_id,
    id
  );
  res.send();
};

exports.readPdvApi = async (req, res) => {
  var { id } = req.params;
  var reply = await PdvModel.readById(id);
  var pdv = reply[0][0]
  const ventes = await VentModel.readById(id);
  const gains = await GainModel.readById(id);

  pdv.ventes = ventes[0].length
  pdv.gains = gains[0]

  res.send(pdv)
}

exports.updatePdvApi = async (req, res) => {
  const {pdvname,address,contactname,phone,location,id} = req.body;

  var sql = `SELECT * FROM pdv WHERE id = ?;`;
  var pdv = await db.execute(sql, [id]);

  if (pdv[0][0].pdvname != pdvname){
    var sql = `SELECT * FROM pdv WHERE pdvname = ?;`;
    var pdv = await db.execute(sql, [pdvname]);

    if (pdv[0].length != 0) {
      res.status(400).send('username already exist !');
      return
    }
  }

  await PdvModel.updatePdvApi(pdvname,address,contactname,phone,location, id);
  res.status(200).send('OK');
};
