const InfoAPP = require("../models/infoapp");

exports.getVersion = async(req, res, next) => {
    try {
        let version = await InfoAPP.getVersion();
        version = version[0][0];
        console.log(version);
        res.status(200).json(version);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getPopup = async(req, res, next) => {
    try {
        let popup = await InfoAPP.getPopup();
        popup = popup[0][0];
        console.log(popup);
        res.status(200).json(popup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};