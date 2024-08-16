const mongoose = require("mongoose");

const commentaireSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plat: { type: mongoose.Schema.Types.ObjectId, ref: "Plat" },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" }, // Pour commenter un menu

    content: { type: String, required: true },
  },
  { timestamps: true }
); 


commentaireSchema.post("save", function (doc, next) {
  console.log("New commentaire was created & saved successfully:", doc);
  next();
});

const Commentaire = mongoose.model("Commentaire", commentaireSchema);
module.exports = Commentaire;
