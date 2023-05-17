const ClientModel = require("../models/client.js");

exports.read = async(req, res) => {
    const data = await ClientModel.read();
    res.render("client", { data: data[0] });
};

exports.addInformation = async(req, res) => {
    const { id_user, nom, prenom, phone, wilaya, adr, gender, status, age } =
    req.body;

    if (!id_user ||
        !nom ||
        !prenom ||
        !phone ||
        !wilaya ||
        !adr ||
        !gender ||
        !status ||
        !age
    ) {
        res.status(400).json({ message: "missing parameters" });
        return;
    }

    try {
        const checkClient = await ClientModel.checkClient(phone);

        console.log(checkClient);

        if (checkClient) {
            res.status(400).json({ message: "user exists" });
            return;
        }

        const data = await ClientModel.write(
            id_user,
            nom,
            prenom,
            phone,
            wilaya,
            adr,
            gender,
            status,
            age
        );
        res.status(201).json({ message: "Information added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};