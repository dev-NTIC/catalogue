const UserModel = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../config/db");
const { resetEmailCode } = require("../config/mail");

exports.signinPost = async(req, res) => {
    const { username, password } = req.body;

    let sql = `
  SELECT p.id, p.pdvname, p.password, status FROM pdv p 
  JOIN pdvstatus ps ON p.pdvstatus_id = ps.id 
  WHERE pdvname = ?
  `;
    var reply = await db.execute(sql, [username]);
    var pdv = reply[0][0];

    if (reply[0].length == 0) {
        res.status(400).send("username or password is incorrect !");
        return;
    }

    if (await bcrypt.compare(password, pdv.password)) {
        const token = jwt.sign(pdv.pdvname, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).send({
            id: pdv.id,
            status: pdv.status,
            token: token,
        });
    } else {
        res.status(400).send("username or password is incorrect !");
    }
};

exports.checkUser = async(req, res) => {
    const { username } = req.params;

    var sql = `SELECT * FROM pdv WHERE pdvname = ?;`;
    var pdv = await db.execute(sql, [username]);

    if (pdv[0].length != 0) {
        res.status(400).send("username already exist");
        return;
    }

    res.status(200).send("available");
};

exports.signinGet = async(req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("toufik123", salt);
    console.log(hashedPassword);

    res.render("signin");
};

// ? ILYES section :

exports.signInAPI = async(req, res) => {
    const { user, password } = req.body;
    console.log(`user ${user}, password ${password}`);

    const getUser = await UserModel.login(user, password);
    console.log("getUser : ", getUser[0]);

    if (getUser[0].length != 0) {
        console.log("loged in");

        // Generate a token
        const token = jwt.sign({...getUser[0] }, "secret_key");

        // Return the token to the client
        res.status(201).json({ token, user: getUser[0] });
    } else {
        console.log("Invalid credentials");

        res.status(401).json({ message: "Invalid credentials" });
    }
};

exports.signupPost = async(req, res) => {
    const { nom, prenom, phone, email, password } = req.body;
    console.log(nom, prenom, phone, email, password, (usertype_id = 1));

    if (!nom || !prenom || !phone || !email || !password) {
        res.status(400).json({ message: "missing parameters" });
        return;
    }
    const check = await UserModel.checkUser(phone, email);
    console.log("check", check);

    if (check) {
        res.status(400).json({ message: "user already exists !" });
        return;
    }

    UserModel.save(nom, prenom, phone, email, password, usertype_id);
    res.status(201).json({ message: "user created !" });
};

exports.checkMailApi = async(req, res) => {
    const { mail } = req.body;

    if (!mail) {
        res.status(400).json({ message: "missing parameters" });
        return;
    }

    try {
        console.log("mail => ", mail);
        const user = await UserModel.checkMail(mail);
        const userInfo = user[0];

        if (userInfo.length == 0) {

            res.status(400).json({ message: "user doesn't exists !" });
            return;
        }
        const code = Math.floor(Math.random() * 100000)
            .toString()
            .padStart(5, "0");

        await UserModel.insertUserCode(userInfo[0]["id"], userInfo[0]["email"], code);

        const sendEmail = await resetEmailCode(code);

        if (sendEmail) {
            // mail sent
            res.status(201).json({ message: "mail sent.", mail });
        } else {
            // error sending Mails
            res.status(500).json({ message: "Email send failed !" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.checkCodeApi = async(req, res) => {

    const { code, mail } = req.body;
    console.log("code => ", code, "mail => ", mail);

    if (!mail || !code) {
        res.status(400).json({ message: "missing parameters" });
        return;
    }

    try {
        const user = await UserModel.getUserCode(mail, code);
        const userInfo = user[0];
        console.log(userInfo)

        if (userInfo.length == 0) {
            res.status(400).json({ message: "wrong code" });
            return;
        } else {
            res.status(201).json({ message: "correct code", id: userInfo[0]["id_client"] });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.updatePasswordApi = async(req, res) => {

    const { id, password } = req.body;
    console.log("id => ", id, "password => ", password);

    if (!id || !password) {
        res.status(400).json({ message: "missing parameters" });
        return;
    }
    try {
        await UserModel.updatePassword(id, password);
        res.status(201).json({ message: "password updated" });


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

}