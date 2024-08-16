const Commentaire = require("../models/commentaireSchema");

// Create a new commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const newCommentaire = new Commentaire(req.body);
    await newCommentaire.save();
    res.status(201).json(newCommentaire);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all commentaires
exports.getCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.find().populate("user plat");
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single commentaire by ID
exports.getCommentaireById = async (req, res) => {
  try {
    const commentaire = await Commentaire.findById(req.params.id).populate(
      "user plat"
    );
    if (!commentaire) {
      return res.status(404).json({ message: "Commentaire not found" });
    }
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a commentaire
exports.updateCommentaire = async (req, res) => {
  try {
    const updatedCommentaire = await Commentaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCommentaire);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a commentaire
exports.deleteCommentaire = async (req, res) => {
  try {
    await Commentaire.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Commentaire deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get commentaire par userid 
//get commentaire   username
//get all comment of a menu
//get all comment of a plat