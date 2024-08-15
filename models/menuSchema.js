const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    plats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plat" }],
  },
  { timestamps: true }
); // Ajout de 'timestamps: true' pour la cohérence

menuSchema.post("save", function (doc, next) {
  console.log("New menu was created & saved successfully:", doc);
  next();
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
