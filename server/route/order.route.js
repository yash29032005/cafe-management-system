const express = require("express");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const {
  createOrder,
  getOrder,
  getOrdersSummary,
} = require("../controller/order.controller");
const router = express.Router();

router.post("/create", protect, authorizeRoles("employee"), createOrder);
router.get("/", protect, authorizeRoles("employee", "admin"), getOrder);
router.get(
  "/summary",
  protect,
  authorizeRoles("manager", "admin"),
  getOrdersSummary
);

module.exports = router;
