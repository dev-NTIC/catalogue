const db = require("../config/db");

module.exports = class UserModel {
    constructor() {}

    static async save(nom, prenom, phone, email, password, usertype_id) {
        let sql = `
    INSERT INTO user(nom, prenom, phone, email, password, usertype_id)
    VALUES(?,?,?,?,?,1)`;
        await db.execute(sql, [nom, prenom, phone, email, password]);
    }

    static async read() {
        let sql = `
    SELECT u.id, nom, prenom, phone, email, password, usertype_id, type 
    FROM user u
    JOIN usertype t ON u.usertype_id = t.id`;
        return await db.execute(sql);
    }

    static async update(nom, prenom, phone, email, password, usertype_id, id) {
        let sql =
            "UPDATE user SET nom = ?, prenom = ?, phone = ?, email = ?, password = ?, usertype_id = ? WHERE id = ?";
        await db.execute(sql, [
            nom,
            prenom,
            phone,
            email,
            password,
            usertype_id,
            id,
        ]);
    }

    static async delete(id) {
        let sql = "DELETE FROM user WHERE id = ?";
        await db.execute(sql, [id]);
    }

    static async type() {
        let sql = "SELECT * FROM usertype";
        return await db.execute(sql);
    }

    static async login(user, password) {
        return await db.execute(
            "SELECT * FROM `user` WHERE (`phone` = ?  OR `email` = ?) AND `password` = ?", [user, user, password]
        );
    }

    static async checkUser(phone, email) {
        const data = await db.execute(
            "SELECT * FROM `user` WHERE `phone` = ? OR `email` = ?", [phone, email]
        );

        if (data[0].length > 0) {
            return true;
        } else {
            return false;
        }
    }

    static async checkMail(email) {
        return await db.execute(
            "SELECT * FROM `user` WHERE `email` = ?", [email]
        );
    }

    static async insertUserCode(id, mail, code) {
        const data = await db.execute('SELECT * FROM checkuser WHERE id_client = ?', [id]);

        if (data[0].length > 0) {

            await db.execute(
                "UPDATE `checkuser` SET `code`=? WHERE `id_client` = ?", [code, id]
            );
        } else {
            await db.execute(
                "INSERT INTO `checkuser`(`id_client`, `mail`, `code`) VALUES (?, ?, ?)", [id, mail, code]
            );
        }
        return "done";

    }

    static async getUserCode(mail, code) {
        return await db.execute(
            "SELECT `id_client`, `mail`, `code` FROM `checkuser` WHERE `mail`= ? AND `code`=?", [mail, code]
        );
    }

    static async updatePassword(id, password) {
        await db.execute(
            "UPDATE `user` SET `password`=? WHERE `id`=?", [password, id]
        );
    }
};