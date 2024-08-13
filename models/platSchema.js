const mongoose = require("mongoose");

const platSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    categorie: { type: String, required: true },
    ingredients: {type: String , required: true }, // Liste de chaînes de caractères
    vegetarian: { type: Boolean, default: false },
    image_plat: { type: String, default: "Plat.png" }

  },
  { timestamps: true }
);
platSchema.post("save", function (doc, next) {
  console.log("New plat was created & saved successfully:", doc);
  next();
});

const Plat = mongoose.model("Plat", platSchema);
module.exports = Plat;
