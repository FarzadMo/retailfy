const router = require("express").Router();
const retailRoutes = require("./retailRoutes.js");
const userRoutes = require("./auth.js");
const userCreateRoutes = require("./user.js");
const uploadImage = require("./image.js");

// routes
router.use("/retailRoutes", retailRoutes);

router.use("/user", userRoutes);

router.use("/user", userCreateRoutes);

// route for uploading an image
router.use("/upload", uploadImage);

module.exports = router;
