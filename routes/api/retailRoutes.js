const router = require("express").Router();
const adController = require("../../controllers/adController");

// routes for adController
router.route("/").get(adController.findAll);

router.route("/:category").get(adController.findByCategory);

router.route("/:id").get(adController.findAdById);

router.route("/adpost").post(adController.create);

module.exports = router;
