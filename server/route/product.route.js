const express = require("express");
const { getProducts } = require("../controller/product.controller");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("employee", "manager", "admin"),
  getProducts
);

module.exports = router;
