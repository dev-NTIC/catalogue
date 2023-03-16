const express = require("express");
const upload = require("../config/upload");
const checkAuth = require("../config/auth");


const {
  create,
  read,
  update,
  remove,
} = require("../controllers/product.js");
const router = express.Router();

let files = [
  {name: 'productimg', maxCount: 1}, 
  {name: 'banner', maxCount: 1},
  {name: 'techsheet', maxCount: 1}
];

router.get("/", read);
router.post("/", upload.fields(files), create);
router.post("/update/", upload.fields(files), update);
router.delete("/", remove);


module.exports = router;
