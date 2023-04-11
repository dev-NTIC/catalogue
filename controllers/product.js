const ProductModel = require("../models/product.js");
const domain = `${process.env.HOST}${process.env.PORT}`;

// ------------------ API ------------------
exports.readProductApi = async (req, res) => {
    const products = await ProductModel.read();

    products[0].forEach(function (obj) {
        obj.productimg = domain + obj.productimg;
        obj.banner = domain + obj.banner;
        obj.techsheet = domain + obj.techsheet;
        obj.options = {
            ram: obj.ram,
            rom: obj.rom,
            weight: obj.weight,
            hdmi: obj.hdmi,
            usb: obj.usb,
            vga: obj.vga,
            dimensions: obj.dimensions,
            wifi: obj.wifi,
            bluetooth: obj.bluetooth,
            earphone: obj.earphone,
            "ethernet:": obj.ethernet,
        };
    });

    res.send(products[0]);
};
exports.readCategoriesApi = async (req, res) => {
    const categories = await ProductModel.category();

    categories[0].forEach(function (obj) {
        obj.categoryimg = domain + obj.categoryimg;
    });

    res.send(categories[0]);
};
// -----------------------------------------
exports.read = async (req, res) => {
    const data = await ProductModel.read();
    const categories = await ProductModel.category();
    res.render("product", { data: data[0], categories: categories[0] });
};

exports.create = async (req, res) => {
    var {
        model,
        category_id,
        size,
        os,
        price,
        points,
        is_new,
        is_available,
        is_bestselling,
        ram,
        rom,
        weight,
        hdmi,
        usb,
        vga,
        dimensions,

        oldprice,
        rating,
        description,

        wifi,
        bluetooth,
        earphone,
        ethernet,
    } = req.body;

    // ------------------------------ FILES -----------------------------------
    var { productimg, banner, techsheet } = req.files;
    productimg
        ? (productimg = "/uploads/" + productimg[0].filename)
        : (productimg = "");
    banner ? (banner = "/uploads/" + banner[0].filename) : (banner = "");
    techsheet
        ? (techsheet = "/uploads/" + techsheet[0].filename)
        : (techsheet = "");
    // ---------------------------- CHECKBOXES --------------------------------
    is_new ? (is_new = "true") : (is_new = "false");
    is_available ? (is_available = "true") : (is_available = "false");
    is_bestselling ? (is_bestselling = "true") : (is_bestselling = "false");
    wifi ? (wifi = "true") : (wifi = "false");
    bluetooth ? (bluetooth = "true") : (bluetooth = "false");
    earphone ? (earphone = "true") : (earphone = "false");
    ethernet ? (ethernet = "true") : (ethernet = "false");
    // ------------------------------------------------------------------------

    await ProductModel.save(
        model,
        category_id,
        size,
        os,
        price,
        points,
        is_new,
        is_available,
        is_bestselling,
        ram,
        rom,
        weight,
        hdmi,
        usb,
        vga,
        dimensions,

        oldprice,
        rating,
        description,
        productimg,
        banner,
        techsheet,

        wifi,
        bluetooth,
        earphone,
        ethernet
    );
    res.redirect("/produits");
};

exports.update = async (req, res) => {
    var {
        model,
        category_id,
        size,
        os,
        price,
        points,
        is_new,
        is_available,
        is_bestselling,
        ram,
        rom,
        weight,
        hdmi,
        usb,
        vga,
        dimensions,

        oldprice,
        rating,
        description,
        pre_productimg,
        pre_banner,
        pre_techsheet,

        wifi,
        bluetooth,
        earphone,
        ethernet,
        id,
    } = req.body;

    // ------------------------------ FILES -----------------------------------
    var { productimg, banner, techsheet } = req.files;
    productimg
        ? (productimg = "/uploads/" + productimg[0].filename)
        : (productimg = pre_productimg);
    banner
        ? (banner = "/uploads/" + banner[0].filename)
        : (banner = pre_banner);
    techsheet
        ? (techsheet = "/uploads/" + techsheet[0].filename)
        : (techsheet = pre_techsheet);
    // ---------------------------- CHECKBOXES --------------------------------
    is_new ? (is_new = "true") : (is_new = "false");
    is_available ? (is_available = "true") : (is_available = "false");
    is_bestselling ? (is_bestselling = "true") : (is_bestselling = "false");
    wifi ? (wifi = "true") : (wifi = "false");
    bluetooth ? (bluetooth = "true") : (bluetooth = "false");
    earphone ? (earphone = "true") : (earphone = "false");
    ethernet ? (ethernet = "true") : (ethernet = "false");
    // ------------------------------------------------------------------------

    await ProductModel.update(
        model,
        category_id,
        size,
        os,
        price,
        points,
        is_new,
        is_available,
        is_bestselling,
        ram,
        rom,
        weight,
        hdmi,
        usb,
        vga,
        dimensions,

        oldprice,
        rating,
        description,
        productimg,
        banner,
        techsheet,

        wifi,
        bluetooth,
        earphone,
        ethernet,
        id
    );
    res.redirect("/produits");
};

exports.remove = async (req, res) => {
    const { id } = req.body;
    await ProductModel.delete(id);
    res.send();
};
