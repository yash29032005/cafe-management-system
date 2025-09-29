const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT*FROM products");

    if (rows.length === 0) {
      return res.status(400).json({ message: "There are no products" });
    }
    res.status(200).json({ product: rows });
  } catch (error) {
    console.error("Error in product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editProducts = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const { id } = req.params;

    // Check if all fields are missing
    if (!name && !category && !price) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    // Run the update
    const [result] = await pool.query(
      "UPDATE products SET name=?, category=?, price=? WHERE id=?",
      [name, category, price, id]
    );

    // If product doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If values are the same → no changes
    if (result.changedRows === 0) {
      return res
        .status(400)
        .json({ message: "No changes made (values are the same)" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error in product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM products WHERE id=?", [id]);

    if (rows.affectedRows === 0) {
      return res.status(400).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ product: rows, message: "Profuct removed successfully" });
  } catch (error) {
    console.error("Error in product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.insertProducts = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;

    const [result] = await pool.query(
      "INSERT INTO products (name, category,price, stock) VALUES (?, ?, ?, ?)",
      [name, category, price, stock]
    );

    // Get the inserted product using the insertId
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      result.insertId,
    ]);

    res.status(200).json({
      message: "Product inserted successfully",

      product: rows[0],
    });
  } catch (error) {
    console.error("Error in product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
