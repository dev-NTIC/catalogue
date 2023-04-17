const ClientModel = require("../models/client.js");


exports.read = async(req, res) => {
    const data = await ClientModel.read();
    res.render("client", { data: data[0] });
};

exports.addInformation = async(req, res) => {

    const { nom, prenom, phone, wilaya, adr } = req.body;

    if (!nom || !prenom || !phone || !wilaya || !adr) {
        res.status(400).json({ message: "missing parameters" });
        return;
    }

    try {
        const data = await ClientModel.write(nom, prenom, phone, wilaya, adr);
        res.status(201).json({ message: 'Information added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}