const express = require("express");
const {
  getProducts,
  editProducts,
  deleteProducts,
  insertProducts,
  getProductSummary,
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

router.delete(
  "/:id",
  protect,
  authorizeRoles("manager", "admin"),
  deleteProducts
);

router.post("/", protect, authorizeRoles("admin"), insertProducts);
router.get(
  "/summary",
  protect,
  authorizeRoles("admin", "manager"),
  getProductSummary
);

module.exports = router;
