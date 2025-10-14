const express = require("express");
const {
  getProducts,
  editProducts,
  deleteProducts,
  insertProducts,
  getProductSummary,
  togicLogic,
} = require("../controller/product.controller");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("employee", "manager", "admin"),
  getProducts
);

router.put("/:id", protect, authorizeRoles("manager", "admin"), editProducts);

router.post("/", protect, authorizeRoles("admin"), insertProducts);

router.get(
  "/summary",
  protect,
  authorizeRoles("manager", "admin"),
  getProductSummary
);
router.put("/:id/toggle", protect, authorizeRoles("admin"), togicLogic);

module.exports = router;
