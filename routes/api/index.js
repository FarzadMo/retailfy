const router = require("express").Router();
const retailRoutes = require("./retailRoutes.js");
const userRoutes = require("./auth.js");
const userCreateRoutes = require("./user.js");

// routes
router.use("/retailRoutes", retailRoutes);

router.use("/user", userRoutes);

router.use("/user", userCreateRoutes);

module.exports = router;
