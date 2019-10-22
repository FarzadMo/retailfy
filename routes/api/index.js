const router = require("express").Router();
const retailRoutes = require("./retailRoutes.js");
const userRoutes = require("./auth.js");

// routes
router.use("/retailRoutes", retailRoutes);

router.use("/user", userRoutes);

module.exports = router;
