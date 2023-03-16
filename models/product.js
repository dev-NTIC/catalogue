const db = require("../config/db");

module.exports = class ProductModel {
  constructor() {}

  static async save(
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
    ethernet) {
    let sql = `
    INSERT INTO product(
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
    )
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    await db.execute(sql, [
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
    ]);
  }

  static async read() {
    let sql = `
    SELECT P.id, model, category, size, os, price, points, is_new, is_available, is_bestselling, ram, rom, weight, hdmi, usb, vga, dimensions, wifi, bluetooth, earphone, ethernet, description, oldprice, rating, techsheet, productimg, banner, category_id
    FROM product P
    JOIN productcategory PC ON P.category_id = PC.id
    `;
    return await db.execute(sql);
  }
  
  static async update(
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
  ) {
    let sql = `
    UPDATE product SET 
    model = ?, 
    category_id = ?, 
    size = ?, 
    os = ?, 
    price = ?, 
    points = ?, 
    is_new = ?, 
    is_available = ?, 
    is_bestselling = ?, 
    ram = ?, 
    rom = ?, 
    weight = ?, 
    hdmi = ?, 
    usb = ?, 
    vga = ?, 
    dimensions = ?, 

    oldprice = ?,
    rating = ?,
    description = ?,
    productimg = ?, 
    banner = ?, 
    techsheet = ?,
    
    wifi = ?, 
    bluetooth = ?, 
    earphone = ?, 
    ethernet = ? 
    WHERE id = ?`;
    await db.execute(sql, [
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
    ]);
  }

  static async delete(id) {
    let sql = "DELETE FROM product WHERE id = ?";
    await db.execute(sql, [id]);
  }

  static async category() {
    let sql = 'SELECT * FROM productcategory';
    return await db.execute(sql);
  }
};
