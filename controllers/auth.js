const UserModel = require("../models/user.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require("../config/db")


exports.signinPost = async (req, res) => {
  const {username, password} = req.body;

  let sql = `
  SELECT p.id, p.pdvname, p.password, status FROM pdv p 
  JOIN pdvstatus ps ON p.pdvstatus_id = ps.id 
  WHERE pdvname = ?
  `;
  var reply = await db.execute(sql, [username]);
  var pdv = reply[0][0]

  if (reply[0].length == 0) {
    res.status(400).send('username or password is incorrect !');
    return
  }

  if (await bcrypt.compare(password, pdv.password)) {
    const token = jwt.sign(pdv.pdvname, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).send({
      "id": pdv.id, 
      "status": pdv.status, 
      "token": token
    })
  } else {
    res.status(400).send('username or password is incorrect !');
  }
};


exports.signupPost = async (req, res) => {
  const {username, password, nom, prenom, phone, address, location, rc} = req.body

  var sql = `SELECT * FROM pdv WHERE pdvname = ?;`;
  var pdv = await db.execute(sql, [username]);

  if (pdv[0].length != 0) {
    res.status(400).send('username already exist !');
    return
  }

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  var sql = `
  INSERT INTO pdv(
    pdvname,
    password,
    contactname,
    phone,
    address,
    location, 
    rc,

    pdvstatus_id,
    pdvgrade_id,
    user_id
  )
  VALUES(?,?,?,?,?,?,?,?,?,?)`;
  await db.execute(sql, [
    username,
    hashedPassword,
    `${nom} ${prenom}`,
    phone,
    address,
    location, 
    rc,
    1,
    1,
    1
  ]);

  res.status(201).send('signup successfull')

};


exports.checkUser = async (req, res) => {
  const { username } = req.params

  var sql = `SELECT * FROM pdv WHERE pdvname = ?;`;
  var pdv = await db.execute(sql, [username]);

  if (pdv[0].length != 0) {
    res.status(400).send('username already exist');
    return
  }

  res.status(200).send('available');
};


exports.signinGet = async (req, res) => {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash("toufik123", salt)
  console.log(hashedPassword);

  res.render('signin')
};


// exports.signout = async (req, res) => {
//   res.send('signout');
// };
