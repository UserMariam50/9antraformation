const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["card", "paypal", "cash"], required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
); 


paiementSchema.post("save", function (doc, next) {
  console.log("New Paiement was created & saved successfully:", doc);
  next();
});

const Paiement = mongoose.model("Paiement", paiementSchema);
module.exports = Paiement;

