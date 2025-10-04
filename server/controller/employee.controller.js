// controllers/userController.js
const pool = require("../config/db");

// GET /employee/all
exports.getAllEmployees = async (req, res) => {
  try {
    if (req.user.role === "manager") {
      const [employees] = await pool.query(
        "SELECT id, name, email, role,salary FROM employees WHERE role=?",
        ["employee"]
      );

      res.status(200).json({ employees });
    }
    if (req.user.role === "admin") {
      const [employees] = await pool.query(
        "SELECT id, name, email, role,salary FROM employees WHERE role!=?",
        ["admin"]
      );

      res.status(200).json({ employees });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /employee/:id
exports.editEmployee = async (req, res) => {
  try {
    const { name, salary, role } = req.body;
    const { id } = req.params;

    // Check if all fields are missing
    if (!name && !salary && !role) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    // Run the update
    const [result] = await pool.query(
      "UPDATE employees SET name=?, salary=?, role=? WHERE id=?",
      [name, salary, role, id]
    );

    // If product doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If values are the same → no changes
    if (result.changedRows === 0) {
      return res
        .status(400)
        .json({ message: "No changes made (values are the same)" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error in employee controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee removed successfully" });
  } catch (error) {
    console.error("Error in employee controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
