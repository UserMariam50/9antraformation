const Menu = require("../models/menuSchema");

// Créer un nouveau menu
exports.createNewMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    await newMenu.save();
    res.status(201).json({ message: "Menu créé avec succès", newMenu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un menu existant
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }
    res.status(200).json({ message: "Menu mis à jour avec succès", menu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }
    res.status(200).json({ message: "Menu supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Afficher les plats d'un menu par ID de menu
exports.afficherLesPlatsDeMenuId = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate("plats");
    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }
    res.status(200).json({ plats: menu.plats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Rechercher un plat dans un menu par ID de menu et ID de plat
exports.recherchePlatParId = async (req, res) => {
  try {
    const { menuId, platId } = req.params;

    // Trouver le menu par son ID
    const menu = await Menu.findById(menuId).populate('plats');

    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    // Trouver le plat dans la liste des plats du menu
    const plat = menu.plats.find(plat => plat._id.toString() === platId);

    if (!plat) {
      return res.status(404).json({ message: "Plat non trouvé dans ce menu" });
    }

    res.status(200).json({ plat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Afficher les plats végétariens dans un menu par ID de menu
exports.afficherPlatsVegetariens = async (req, res) => {
  try {
    const { menuId } = req.params;

    // Trouver le menu par son ID et peupler la liste des plats
    const menu = await Menu.findById(menuId).populate('plats');

    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    // Filtrer les plats végétariens
    const platsVegetariens = menu.plats.filter(plat => plat.vegetarian);

    if (platsVegetariens.length === 0) {
      return res.status(404).json({ message: "Aucun plat végétarien trouvé dans ce menu" });
    }

    res.status(200).json({ platsVegetariens });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.afficherPlatsParCategorie = async (req, res) => {
  try {
    const { menuId, categorie } = req.params;

    // Ajouter des logs pour vérifier les valeurs
    console.log("Menu ID:", menuId);
    console.log("Categorie:", categorie);

    // Trouver le menu par son ID et peupler la liste des plats
    const menu = await Menu.findById(menuId).populate("plats");

    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    // Ajouter un log pour vérifier les plats trouvés
    console.log("Plats trouvés:", menu.plats);

    // Filtrer les plats par catégorie
    const platsParCategorie = menu.plats.filter(
      (plat) => plat.categorie === categorie
    );

    if (platsParCategorie.length === 0) {
      return res
        .status(404)
        .json({ message: `Aucun plat trouvé dans la catégorie ${categorie}` });
    }

    res.status(200).json({ plats: platsParCategorie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
