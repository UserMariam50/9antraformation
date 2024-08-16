const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/createOrder", orderController.createOrder);
router.get("/getOrders", orderController.getOrders);
router.get("/getOrderById/:id", orderController.getOrderById);
router.put("/updateOrder/:id", orderController.updateOrder);
router.delete("/deleteOrder/:id", orderController.deleteOrder);


router.get("/getOrdersByUserId/:userId", orderController.getOrdersByUserId);
//router.get("/getOrdersByUsername/:username",orderController.getOrdersByUsername);
router.get("/getOrdersByPlatId/:platId", orderController.getOrdersByPlatId);


module.exports = router;
