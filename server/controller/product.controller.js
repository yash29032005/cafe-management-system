const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT*FROM products");

    if (rows.length === 0) {
      return res.status(400).json({ message: "There are no products" });
    }
    res.status(200).json({ success: true, product: rows });
  } catch (error) {
    console.error("Error in product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
