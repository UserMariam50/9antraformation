const express = require("express");
const router = express.Router();
const platController = require("../controller/platController");

// Route pour ajouter un plat
router.post("/ajouterPlat", platController.ajouterPlat);

// Route pour afficher tous les plats
router.get("/afficherTousPlats", platController.afficherTousPlats);

// Route pour afficher les détails d'un plat spécifique
router.get("/afficherDetailPlat/:id", platController.afficherDetailPlat);

// Route pour mettre à jour un plat
router.put("/mettreAJourPlat/:id", platController.mettreAJourPlat);

// Route pour supprimer un plat
router.delete("/supprimerPlat/:id", platController.supprimerPlat);

module.exports = router;
