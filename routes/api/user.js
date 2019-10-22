const router = require("express").Router();

const userController = require("../../controllers/userController");

// routes for userController
router.route("/adduser").post(userController.create);

module.exports = router;
