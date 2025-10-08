const pool = require("../config/db");
const Razorpay = require("razorpay");

exports.createOrder = async (req, res) => {
  try {
    const { userId, customerName, cart, paymentMethod } = req.body;

    // calculate total
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // insert into orders
    const [orderResult] = await pool.query(
      "INSERT INTO orders (user_id, customer_name, total, payment_method) VALUES (?, ?, ?, ?)",
      [userId, customerName, total, paymentMethod]
    );
    const orderId = orderResult.insertId;

    // insert items + reduce stock
    for (const item of cart) {
      const [[product]] = await pool.query(
        "SELECT stock FROM products WHERE id = ?",
        [item.id]
      );
      if (!product || product.stock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${item.name}`,
        });
      }

      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id, item.qty, item.price]
      );

      await pool.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.qty,
        item.id,
      ]);
    }

    res.status(201).json({
      orderId,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error in orders controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error while creating order" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `SELECT 
          o.id AS orderId,
          o.user_id,
          o.customer_name,
          o.total,
          o.created_at,
          oi.product_id,
          p.name AS productName,
          oi.quantity,
          oi.price
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC, oi.id ASC`,
      [userId]
    );

    // group orders with items
    const ordersMap = {};
    rows.forEach((row) => {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          orderId: row.orderId,
          userId: row.user_id,
          customerName: row.customer_name,
          total: row.total,
          createdAt: row.created_at,
          items: [],
        };
      }
      ordersMap[row.orderId].items.push({
        productId: row.product_id,
        name: row.productName,
        quantity: row.quantity,
        price: row.price,
      });
    });

    // sort orders by createdAt (most recent first)
    const orders = Object.values(ordersMap).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in orders controller:", error);
    res.status(500);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
          o.id AS orderId,
          o.user_id,
          u.name AS userName,
          o.customer_name,
          o.total,
          o.created_at,
          oi.product_id,
          p.name AS productName,
          oi.quantity,
          oi.price
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       LEFT JOIN employees u ON o.user_id = u.id
       ORDER BY o.created_at DESC, oi.id ASC`
    );

    // group orders with their items
    const ordersMap = {};
    rows.forEach((row) => {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          orderId: row.orderId,
          userId: row.user_id,
          userName: row.userName,
          customerName: row.customer_name,
          total: row.total,
          createdAt: row.created_at,
          items: [],
        };
      }
      ordersMap[row.orderId].items.push({
        productId: row.product_id,
        name: row.productName,
        quantity: row.quantity,
        price: row.price,
      });
    });

    // sort by most recent first
    const orders = Object.values(ordersMap).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500);
  }
};

exports.getOrdersSummary = async (req, res) => {
  try {
    // Query 1: total orders grouped by user
    const [ordersByUser] = await pool.query(`
      SELECT user_id, COUNT(id) AS total 
      FROM orders 
      GROUP BY user_id
    `);

    // Query 2: total orders overall
    const [totalOrders] = await pool.query(`
      SELECT COUNT(id) AS total 
      FROM orders
    `);

    const [totalRevenue] = await pool.query(`
      SELECT SUM(total) AS total 
      FROM orders
    `);

    res.status(200).json({
      orders: ordersByUser,
      total: totalOrders[0].total,
      totalRevenue: totalRevenue[0].total,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.makePayment = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};
