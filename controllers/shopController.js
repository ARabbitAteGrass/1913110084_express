const { shop } = require("../models/shop");
const menu = require("../models/menu");

const index = async (req, res, next) => {
  const shops = await shop.find().sort({_id:-1});

  const shopWithPhotoDamain = shops.map ((shop,index) => {
    return{
      id: shop._id,
      name: shop.name,
      photo: 'http://localhost:3000/images/'+shop.photo,
      location: shop.location
    }
  })

  return res.status(200).json({ data: shopWithPhotoDamain });
};

const getMenu = async (req, res, next) => {
  const menus = await menu.find().sort({_id:-1});
  
  return res.status(200).json({ data: menus });
} 

module.exports = { index: index ,getMenu};