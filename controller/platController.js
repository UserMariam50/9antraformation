const QRCode = require("qrcode");
const Plat = require("../models/platSchema");
const Menu = require("../models/menuSchema");


// Fonction auxiliaire pour générer un QR code
const generateQRCode = async (content) => {
  try {
    return await QRCode.toDataURL(content);
  } catch (err) {
    throw new Error('Erreur lors de la génération du QR code: ' + err.message);
  }
};

// Créer un nouveau plat avec QR code



// Créer un nouveau plat avec QR code
exports.createNewPlat = async (req, res) => {
  try {
    const newPlat = new Plat(req.body);
    const qrCodeContent = `http://localhost:5000/plats/afficherDetailPlat/${newPlat._id}`;

    // Générer le QR code
    const qrCodeData = await generateQRCode(qrCodeContent);
    newPlat.qrCode = qrCodeData; // Stocker le QR code dans la base de données

    await newPlat.save();
    res.status(201).json({ message: "Plat créé avec succès", newPlat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Mettre à jour un plat avec QR code
exports.updatePlat = async (req, res) => {
  try {
    const plat = await Plat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plat) {
      return res.status(404).json({ message: "Plat non trouvé" });
    }

    // Mettre à jour le QR code
    const qrCodeContent = `http://localhost:5000/plats/afficherDetailPlat/${plat._id}`;

    const qrCodeData = await generateQRCode(qrCodeContent);
    plat.qrCode = qrCodeData;

    await plat.save();
    res.status(200).json({ message: "Plat mis à jour avec succès", plat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


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
