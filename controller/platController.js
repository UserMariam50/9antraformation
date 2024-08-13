const Plat = require("../models/platSchema");

// Fonction pour ajouter un nouveau plat
module.exports.ajouterPlat = async (req, res) => {
   try {
     const plat = new Plat(req.body);
     await plat.save();
     res.status(201).json(plat);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
 };

// Fonction pour afficher tous les plats
module.exports.afficherTousPlats = async (req, res) => {
  try {
    const plats = await Plat.find();
    res.status(200).json(plats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fonction pour afficher les détails d'un plat spécifique
module.exports.afficherDetailPlat = async (req, res) => {
  try {
    const plat = await Plat.findById(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: "Plat non trouvé" });
    }
    res.status(200).json(plat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour un plat
module.exports.mettreAJourPlat = async (req, res) => {
  try {
    const plat = await Plat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plat) {
      return res.status(404).json({ message: "Plat non trouvé" });
    }
    res.status(200).json(plat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fonction pour supprimer un plat
module.exports.supprimerPlat = async (req, res) => {
  try {
    const plat = await Plat.findByIdAndDelete(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: "Plat non trouvé" });
    }
    res.status(200).json({ message: "Plat supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};