var express = require("express");
var router = express.Router();
const osController = require("../controller/osController");
router.get("/getInformation", osController.getOsInformation);

router.get("/cpus", osController.osCpus);
router.get("/osCpuslength", osController.osCpuslength);
router.get("/cpus/:id", osController.osCpusById);

module.exports = router;
