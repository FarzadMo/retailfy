const router = require("express").Router();
const adController = require("../../controllers/adController");
const userController = require("../../controllers/userController");

// routes for adController
router.route("/api/ad").get(adController.findAll);

router.route("/api/ad/:category").get(adController.findByCategory);

router.route("/api/adpost").post(adController.create);

// routes for userController
router.route("/api/adduser").post(userController.create);

module.exports = router;
