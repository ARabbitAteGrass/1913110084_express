const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    name: { type: String, requied: true, trim: true },
    photo: { type: String, default: "nopic.png" },
    location: { lat: { type: Number }, lgn: { type: Number } },
    //   createdAt: { type: Date, default: Date.now() },
    //   updatedAt: { type: Date },
  },
  { timestamps: true,toJSON:{virtuals:true} }
);

shopSchema.virtual("menus", {
  ref: "menu",
  localField: "_id",
  foreignField: "shop",
});

const shop = mongoose.model("Shop", shopSchema, "shops");

module.exports = { shop: shop };