const express = require("express");
const { protect } = require("../middleware/getAuth");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  addStock,
} = require("../controller/stock.controller");

const router = express.Router();

router.post(
  "/request",
  protect,
  authorizeRoles("manager", "admin"),
  createRequest
);

router.get("/request", protect, authorizeRoles("admin"), getAllRequests);

router.put("/approve/:id", protect, authorizeRoles("admin"), approveRequest);

router.put("/reject/:id", protect, authorizeRoles("admin"), rejectRequest);

router.put("/add/:id", protect, authorizeRoles("admin"), addStock);

module.exports = router;
