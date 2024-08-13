var express = require("express");
var router = express.Router();
const authController = require("../controller/authController");

const upload = require("../middlewares/uploadFile");


/* GET users listing. */
router.get("/getAllUsers", authController.getAllUsers);
router.get("/triUsers", authController.triUsers);
router.get("/getUserById/:id", authController.getUserById);
router.get("/searchUserByName", authController.searchUserByName);
router.get("/searchUserByNameSort", authController.searchUserByNameSort);
router.post("/addUserClient", authController.addUserClient);
router.post(
  "/addUserClientwithImg",
  upload.single("image_user"),
  authController.addUserClientwithImg
);
router.post("/addUserAdmin", authController.addUserAdmin);
router.put("/updateUser/:id", authController.updateUser);
router.delete("/deleteUser/:id", authController.deleteUser);









module.exports = router;
