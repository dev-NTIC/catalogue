const db = require("../config/db");

module.exports = class Pub {
    constructor() {}

    static async getActive() {
        return await db.execute(
            "SELECT * FROM `pub` WHERE `isactive`= 'oui'"
        );
    }
};