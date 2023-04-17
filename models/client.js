const db = require("../config/db");

module.exports = class ClientModel {
    constructor() {}

    static async read() {
        let sql = `SELECT * FROM client`;
        return await db.execute(sql);
    }

    static async write(nom, prenom, phone, wilaya, adr) {

        return await db.execute("INSERT INTO `information`(`nom`, `prenom`, `phone`, `wilaya`, `adr`) VALUES (?,?,?,?,?)", [nom, prenom, phone, wilaya, adr]);
    }

};