const { shop } = require("../models/shop");
const menu = require("../models/menu");
const config = require('../config/index')
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const index = async (req, res, next) => {
  const shops = await shop.find().sort({_id:-1});

  const shopWithPhotoDamain = shops.map ((shop,index) => {
    return{
      id: shop._id,
      name: shop.name,
      photo: config.DOMAIN + '/images/' + shop.photo,
      location: shop.location
    }
  })

  return res.status(200).json({ data: shopWithPhotoDamain });
};

const getMenu = async (req, res, next) => {
  const menus = await menu.find().populate("shop");
  
  return res.status(200).json({ data: menus });
} 

const getShopMenu = async (req, res, next) => {
  const{ id} = req.params;
  const shops = await shop.findOne({ _id: id }).populate("menus");
  return res.status(200).json({ data: shops });

}

const addShop = async (req, res, next) => {
  const { name, location, photo } = req.body;
  let shopinsert = shop({
    name: name,
    location: location,
    photo: await saveImageToDisk(photo),
  });
  const result = await shopinsert.save();
  return res
    .status(201)
    .json({ message: `Insert Successful: ${(result != null)}` });
};

async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = process.cwd();
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = "";
  if (ext === "svg+xml") {
    filename = `${uuidv4.v4()}.svg`;
  } else {
    filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath + filename, image.data, "base64");
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}

module.exports = {
  index: index,
  menu: getMenu,
  shop: getShopMenu,
  insert: addShop,
};