const mongoose = require("mongoose");
const { schema } = require("./staff");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    name:   { type: String, requied: true, trim: true },
    price:  { type: Number},
    shop:   { type: Schema.Types.ObjectId,ref: 'Shop' } 
  },
  { 
    toJSON:{virtuals:true},
    timestamps: true,
    collection:"menu"
});

menuSchema.virtual('price_vat').get(function(){
    return this.price * 1.07;
})

const menu = mongoose.model("menu", menuSchema);

module.exports = menu