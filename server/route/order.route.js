const express = require("express");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const {
  createOrder,
  getOrder,
  getOrdersCount,
  getTotalOrders,
} = require("../controller/order.controller");
const router = express.Router();

router.post("/create", protect, authorizeRoles("employee"), createOrder);
router.get("/", protect, authorizeRoles("employee", "admin"), getOrder);
router.get(
  "/count",
  protect,
  authorizeRoles("manager", "admin"),
  getOrdersCount
);
router.get(
  "/total",
  protect,
  authorizeRoles("manager", "admin"),
  getTotalOrders
);

module.exports = router;
