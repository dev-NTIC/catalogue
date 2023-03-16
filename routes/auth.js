const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const router = express.Router();
const { signinGet, signinPost } = require("../controllers/auth.js");
const jwt = require("jsonwebtoken");

router.post("/signin", signinPost);

router.get("/signin", signinGet);

module.exports = router;

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (token == null) return res.status(401).send("Token is null");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Token is invalid");
    });

    res.redirect("/pdv");
    next();
}
