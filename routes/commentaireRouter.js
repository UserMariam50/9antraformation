const express = require("express");
const router = express.Router();
const commentaireController = require("../controller/commentaireController");

router.post("/createCommentaire", commentaireController.createCommentaire);
router.get("/getCommentaires", commentaireController.getCommentaires);
router.get("/getCommentaireById/:id", commentaireController.getCommentaireById);
router.put("/updateCommentaire/:id", commentaireController.updateCommentaire);
router.delete("/deleteCommentaire/:id", commentaireController.deleteCommentaire);

module.exports = router;
