const db = require("../config/db");

module.exports = class InfoAPP {
    constructor() {}

    static async getVersion() {
        return await db.execute(
            "SELECT `version` FROM `app_info` WHERE `id`=1"
        );
    }

    static async getPopup() {
        return await db.execute("SELECT `popup` FROM `app_info` WHERE `id`=1");
    }
};