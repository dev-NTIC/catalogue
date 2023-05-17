const jwt = require("jsonwebtoken");

const savController = require("../controllers/sav");
const { getSAVs } = savController;

const fileController = require("../controllers/files");
const { getFiles } = fileController;

const clientController = require("../controllers/client");
const { addInformation, validInscrit } = clientController;

const userController = require("../controllers/user");
const { updateUser } = userController;

const infoController = require("../controllers/infoapp");
const { getVersion, getPopup } = infoController;

const pubController = require("../controllers/pub");
const { getPub } = pubController;

const {
    readProductApi,
    readCategoriesApi,
} = require("../controllers/product.js");

const {
    checkUser,
    signupPost,
    signInAPI,
    checkMailApi,
    checkCodeApi,
    updatePasswordApi,
} = require("../controllers/auth.js");

const express = require("express");
const router = express.Router();

router.get("/produits", authMiddleware, readProductApi);
router.get("/sav", authMiddleware, getSAVs);
router.get("/files/:type", authMiddleware, getFiles);
router.get("/categories", authMiddleware, readCategoriesApi);
router.get("/check/:username", authMiddleware, checkUser);

router.post("/addinformation", authMiddleware, addInformation);
router.post("/validinscrit", authMiddleware, validInscrit);
router.get("/getpub", authMiddleware, getPub);

router.post("/signin", signInAPI);
router.post("/signup", signupPost);

router.post("/checkmail", checkMailApi);
router.post("/checkcode", checkCodeApi);
router.post("/updatepassword", updatePasswordApi);

router.post("/updateuser", updateUser);

router.get("/getversion", authMiddleware, getVersion);
router.get("/getpopup", authMiddleware, getPopup);

function authMiddleware(req, res, next) {
    // Get the token from the request headers
    const token = req.headers["authorization"];

    if (!token) {
        console.log("token isn't set");
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify the token
    jwt.verify(token, "secret_key", (err, decoded) => {
        if (err) {
            console.log("wrong token");
            return res.status(401).json({ message: "Invalid token" });
        }

        // Add the user information to the request object
        console.log("token is correct");
        console.log({ user: decoded });
        req.user = { user: decoded };
        next();
    });
}

module.exports = router;