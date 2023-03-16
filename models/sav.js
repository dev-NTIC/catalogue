const db = require("../config/db");

module.exports = class SAV {
    constructor() {}

    static async getAll() {
        return await db.execute(
            "SELECT * FROM sav JOIN typesav ON sav.type = typesav.id_type"
        );
    }
};
