const mongoose = require("mongoose");
const Plat = require("./platSchema");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plat" }],
  totalAmount: { type: Number, required: true  ,default: 0 },
}, { timestamps: true }); 



// Méthode pour calculer le prix total
orderSchema.methods.calculateTotalAmount = async function() {
  const plats = await Plat.find({ '_id': { $in: this.plats } });
  this.totalAmount = plats.reduce((total, plat) => total + plat.prix, 0);
};

// Hook "pre-save" pour calculer le prix avant de sauvegarder
orderSchema.pre("save", async function(next) {
  await this.calculateTotalAmount();
  next();
});

orderSchema.post("save", function (doc, next) {
  console.log("New order was created & saved successfully:", doc);
  next();
});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
