const Pub = require('../models/pub');

exports.getPub = async(req, res, next) => {

    try {
        const activePub = await Pub.getActive();
        console.log(activePub[0]);
        res.status(200).json(activePub[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}