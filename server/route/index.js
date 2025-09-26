const express = require("express");
const authRoutes = require("./auth.route");
const productRoutes = require("./product.route");
const orderRoutes = require("./order.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);

module.exports = router;
