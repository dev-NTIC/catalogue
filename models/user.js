const db = require("../config/db");

module.exports = class UserModel {
  constructor() {}

  static async save(nom, prenom, phone, email, password, usertype_id) {
    let sql = `
    INSERT INTO user(nom, prenom, phone, email, password, usertype_id)
    VALUES(?,?,?,?,?,?)`;
    await db.execute(sql, [nom, prenom, phone, email, password, usertype_id]);
  }

  static async read() {
    let sql = `
    SELECT u.id, nom, prenom, phone, email, password, usertype_id, type 
    FROM user u
    JOIN usertype t ON u.usertype_id = t.id`;
    return await db.execute(sql);
  }

  static async update(nom, prenom, phone, email, password, usertype_id, id) {
    let sql = 'UPDATE user SET nom = ?, prenom = ?, phone = ?, email = ?, password = ?, usertype_id = ? WHERE id = ?';
    await db.execute(sql, [nom, prenom, phone, email, password, usertype_id, id]);
  }

  static async delete(id) {
    let sql = "DELETE FROM user WHERE id = ?";
    await db.execute(sql, [id]);
  }

  static async type() {
    let sql = 'SELECT * FROM usertype';
    return await db.execute(sql);
  }
};
