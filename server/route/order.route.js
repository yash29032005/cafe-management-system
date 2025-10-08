const express = require("express");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const {
  createOrder,
  getOrder,
  getOrdersSummary,
  getAllOrders,
  makePayment,
} = require("../controller/order.controller");
const router = express.Router();

router.post("/create", protect, authorizeRoles("employee"), createOrder);
router.get("/", protect, authorizeRoles("employee", "admin"), getOrder);
router.get("/all", protect, authorizeRoles("admin"), getAllOrders);
router.get(
  "/summary",
  protect,
  authorizeRoles("manager", "admin"),
  getOrdersSummary
);
router.post("/payment", protect, authorizeRoles("employee"), makePayment);

module.exports = router;
