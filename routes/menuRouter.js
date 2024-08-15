const express = require("express");
const router = express.Router();
const menuController = require("../controller/menuController");

router.post("/createNewMenuQR", menuController.createNewMenuQR);
router.put("/updateMenuQR/:id", menuController.updateMenuQR);




// Route pour créer un nouveau menu
router.post("/createNewMenu", menuController.createNewMenu);

// Route pour mettre à jour un menu existant
router.put("/updateMenu/:id", menuController.updateMenu);

// Route pour supprimer un menu
router.delete("/deleteMenu/:id", menuController.deleteMenu);

// Route pour afficher les plats d'un menu par ID de menu
router.get("/afficherLesPlatsDeMenuId/:id", menuController.afficherLesPlatsDeMenuId);

// Route pour rechercher un plat dans un menu par ID de menu et ID de plat
router.get(
  "/recherchePlatParId/:menuId/:platId",
  menuController.recherchePlatParId
);

// Route pour afficher les plats végétariens dans un menu par ID de menu
router.get(
  "/afficherPlatsVegetariens/:menuId",
  menuController.afficherPlatsVegetariens
);

// Route pour afficher les plats par catégorie dans un menu
router.get(
  "/afficherPlatsParCategorie/:menuId/:categorie",
  menuController.afficherPlatsParCategorie
);
// Fichier : routes/menuRouter.js
router.get("/test/:param1/:param2", (req, res) => {
  const { param1, param2 } = req.params;
  console.log("Param1:", param1);
  console.log("Param2:", param2);
  res.status(200).json({ param1, param2 });
});

module.exports = router;
