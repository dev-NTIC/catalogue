const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

//start application
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Access-Control-Allow
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// setup templates folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//setup static folder
app.use(express.static(path.join(__dirname, "public")));

//setup routes
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const clientRoutes = require("./routes/client.js");
const apiRoutes = require("./routes/api.js");

const authRoutes = require("./routes/auth.js");

app.use("/utilisateurs", userRoutes);
app.use("/produits", productRoutes);
app.use("/clients", clientRoutes);
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

//start the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Server Running on: ${process.env.HOST}${PORT}`)
);
