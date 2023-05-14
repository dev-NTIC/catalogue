const db = require("../config/db");

module.exports = class ClientModel {
    constructor() {}

    static async read() {
        let sql = `SELECT * FROM client`;
        return await db.execute(sql);
    }

    static async write(nom, prenom, phone, wilaya, adr, gender, status, age) {
        return await db.execute(
            "INSERT INTO `information`(`nom`, `prenom`, `phone`, `wilaya`, `adr`, gender, status, age) VALUES (?,?,?,?,?,?,?,?)",
            [nom, prenom, phone, wilaya, adr, gender, status, age]
        );
    }
    static async checkClient(phone) {
        const data = await db.execute(
            "SELECT * FROM `information` WHERE `phone`=?",
            [phone]
        );

        if (data[0].length > 0) {
            return true;
        } else {
            return false;
        }
    }
};
