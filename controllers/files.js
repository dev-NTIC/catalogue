const File = require("../models/files");
let domain = `${process.env.HOST}$s{process.env.PORT}` + "/data/";

exports.getFiles = async (req, res, next) => {
    const { type } = req.body;

    if (type.length > 0) {
        console.log("type : ", type);
        const files = await File.getData(type);
        const data = files[0];
        console.log(data);
        if (type != "video" && data.length > 0) {
            data.map((item) => {
                item.link = domain + item.link;
            });
        }
        console.log(data);

        res.status(201).json(data);
    } else {
        res.status(404).json("Error : params");
    }
};
