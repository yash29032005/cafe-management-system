const express = require("express");
const authRoutes = require("./auth.route");
const productRoutes = require("./product.route");
const orderRoutes = require("./order.route");
const employeeRoutes = require("./employee.route");
const stockRoutes = require("./stock.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/employee", employeeRoutes);
router.use("/stock", stockRoutes);

module.exports = router;
