const express = require("express");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const {
  getAllEmployees,
  editEmployee,
} = require("../controller/employee.controller");
const router = express.Router();

router.get(
  "/all",
  protect,
  authorizeRoles("manager", "admin"),
  getAllEmployees
);
router.put("/:id", protect, authorizeRoles("admin"), editEmployee);

module.exports = router;
