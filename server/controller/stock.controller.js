const pool = require("../config/db");

// POST /api/stock/request
exports.createRequest = async (req, res) => {
  try {
    const { productId, employeeId, quantity } = req.body;
    await pool.query(
      "INSERT INTO stock_requests (product_id, employee_id, quantity) VALUES (?, ?, ?)",
      [productId, employeeId, quantity]
    );
    res.json({ message: "Request sent successfully!" });
  } catch (err) {
    console.error("Error in stock controller:", err);
    res
      .status(500)
      .json({ message: "Internal server error while creating request" });
  }
};

// GET /api/stock/request
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT sr.id, sr.quantity, sr.status, 
              p.name AS product_name, 
              e.name AS employee_name
       FROM stock_requests sr
       LEFT JOIN products p ON sr.product_id = p.id
       LEFT JOIN employees e ON sr.employee_id = e.id
       ORDER BY sr.created_at DESC`
    );
    res.json({ rows });
  } catch (err) {
    console.error("Error in stock controller:", err);
    res.status(500);
  }
};

// PUT /api/stock/approve/:id
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the request details
    const [[request]] = await pool.query(
      `SELECT sr.id, sr.product_id, sr.quantity, sr.status 
       FROM stock_requests sr WHERE sr.id = ?`,
      [id]
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // Update request status
    await pool.query(
      "UPDATE stock_requests SET status = 'approved' WHERE id = ?",
      [id]
    );

    // Update product stock
    await pool.query("UPDATE products SET stock = stock + ? WHERE id = ?", [
      request.quantity,
      request.product_id,
    ]);

    res.json({
      product_id: request.product_id,
      quantity: request.quantity,
      status: "approved",
      message: "Request approved and stock updated",
    });
  } catch (err) {
    console.error("Error in stock controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/stock/reject/:id
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE stock_requests SET status = 'rejected' WHERE id = ?",
      [id]
    );

    res.json({ status: "rejected", message: "Request rejected" });
  } catch (err) {
    console.error("Error in stock controller:", err);
    res
      .status(500)
      .json({ message: "Internal server error while rejecting request" });
  }
};

// PUT /api/stock/add/:id
exports.addStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    await pool.query("UPDATE products SET stock = stock + ? WHERE id = ?", [
      quantity,
      id,
    ]);
    res.json({ message: "Stock added successfully" });
  } catch (err) {
    console.error("Error in stock controller:", err);
    res
      .status(500)
      .json({ message: "Internal server error while adding stock" });
  }
};
