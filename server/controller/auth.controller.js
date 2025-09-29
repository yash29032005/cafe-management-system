const pool = require("../config/db");
const bcrypt = require("bcrypt");
const {
  validateRegister,
  validateLogin,
} = require("../validation/auth.validation");
const { generateCookie } = require("../middleware/generateCookie");

exports.login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM employees WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const existingUser = rows[0];

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateCookie(res, existingUser);

    return res.status(200).json({
      user: existingUser,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({ user: null });
    }

    res.json({
      user: req.user,
      message: "User authenticated successfully",
    });
  } catch (error) {
    console.error("Error in me controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    const [existingUser] = await pool.query(
      "SELECT * FROM employees WHERE email=?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO employees(name,email,password) VALUES (?,?,?)",
      [name, email, hashedPassword]
    );

    const [rows] = await pool.query("SELECT * FROM employees WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const newuser = rows[0];

    generateCookie(res, newuser);

    return res.status(201).json({
      user: newuser,
      message: "User registered and logged-in successfully",
    });
  } catch (error) {
    console.log("Error in register controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
