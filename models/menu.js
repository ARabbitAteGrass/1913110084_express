const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    name:   { type: String, requied: true, trim: true },
    price:  { type: Number},
    shop:   { type: Schema.Types.ObjectId,ref: 'Shop' } 
  },
  { timestamps: true,
    collection:"menu"
});

const menu = mongoose.model("menu", menuSchema);

module.exports = menu