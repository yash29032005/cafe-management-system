const express = require("express");
const { authorizeRoles } = require("../middleware/authorizedRoles");
const { protect } = require("../middleware/getAuth");
const {
  getAllEmployees,
  editEmployee,
  deleteEmployee,
  getEmployeeSummary,
} = require("../controller/employee.controller");
const router = express.Router();

router.get(
  "/all",
  protect,
  authorizeRoles("manager", "admin"),
  getAllEmployees
);
router.put("/:id", protect, authorizeRoles("admin"), editEmployee);
router.delete("/:id", protect, authorizeRoles("admin"), deleteEmployee);
router.get(
  "/summary",
  protect,
  authorizeRoles("admin", "manager"),
  getEmployeeSummary
);

module.exports = router;
