const express = require("express");
const {
  create,
  read,
  update,
  remove,
} = require("../controllers/user.js");

const router = express.Router();

router.get("/", read);

router.post("/", create);

router.patch("/", update);

router.delete("/", remove);


module.exports = router;