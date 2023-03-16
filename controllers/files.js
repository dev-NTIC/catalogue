const File = require("../models/files");
let domain = `${process.env.HOST}` + "/data/";

exports.getFiles = async (req, res, next) => {
    const { type } = req.params;

    console.log("type : ", type);
    if (type.length > 0) {
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
