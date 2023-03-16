const SAV = require("../models/sav");

exports.getSAVs = async (req, res, next) => {
    const sav = await SAV.getAll();
    res.status(200).json(sav[0]);
};
