const {
    readProductApi,
    readCategoriesApi,
} = require("../controllers/product.js");

const { checkUser, signupPost, signinPost } = require("../controllers/auth.js");

const express = require("express");
const router = express.Router();

router.get("/produits", readProductApi);
router.get("/categories", readCategoriesApi);
router.get("/check/:username", checkUser);

router.post("/signin", signinPost);
router.post("/signup", signupPost);

module.exports = router;
