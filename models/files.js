const db = require("../config/db");

module.exports = class File {
    constructor() {}

    static async getData(type) {
        return await db.execute(
            "SELECT * FROM file JOIN typefile ON file.type = typefile.id WHERE typefile.nom = ?",
            [type]
        );
    }
};
