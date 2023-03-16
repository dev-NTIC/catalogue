const express = require("express");
const {read} = require("../controllers/client.js");
const router = express.Router();

router.get("/", read);


module.exports = router;