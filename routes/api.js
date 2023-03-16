const savController = require("../controllers/sav");
const { getSAVs } = savController;

const fileController = require("../controllers/files");
const { getFiles } = fileController;

const {
    readProductApi,
    readCategoriesApi,
} = require("../controllers/product.js");

const { checkUser, signupPost, signinPost } = require("../controllers/auth.js");

const express = require("express");
const router = express.Router();

router.get("/produits", readProductApi);
router.get("/sav", getSAVs);
router.get("/files/:type", getFiles);
router.get("/categories", readCategoriesApi);
router.get("/check/:username", checkUser);

router.post("/signin", signinPost);
router.post("/signup", signupPost);

module.exports = router;
