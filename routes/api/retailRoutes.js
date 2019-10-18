const router = require("express").Router();
const adController = require("../../controllers/adController");
const userController = require("../../controllers/userController");

// routes for adController
router.route("/").get(adController.findAll);

router.route("/:category").get(adController.findByCategory);

router.route("/adpost").post(adController.create);

// routes for userController
router.route("/adduser").post(userController.create);

module.exports = router;
