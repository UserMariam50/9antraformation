var express = require("express");
var router = express.Router();
const osController =require('../controller/osController');

router.get("/getInformation", osController.getOsInformation);


module.exports = router;

