const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, Please log in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM employees WHERE id=?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
