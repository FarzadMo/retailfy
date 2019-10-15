const router = require("express").Router();
const retailRoutes = require("./retailRoutes.js");

// routes
router.use("/retailRoutes", retailRoutes);

module.exports = router;
