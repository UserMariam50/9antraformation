const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plat" }],
  totalAmount: { type: Number, required: true },
}, { timestamps: true }); 


orderSchema.post("save", function (doc, next) {
  console.log("New order was created & saved successfully:", doc);
  next();
});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
