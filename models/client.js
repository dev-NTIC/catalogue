const db = require("../config/db");

module.exports = class ClientModel {
  constructor() {}

  static async read() {
    let sql = `SELECT * FROM client`;
    return await db.execute(sql);
  }
};
