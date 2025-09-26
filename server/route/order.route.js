const express = require("express");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const { createOrder, getOrder } = require("../controller/order.controller");
const router = express.Router();

router.post("/create", protect, authorizeRoles("employee"), createOrder);
router.get("/", protect, authorizeRoles("employee"), getOrder);

module.exports = router;
