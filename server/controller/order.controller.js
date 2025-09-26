const db = require("../config/db");

exports.createOrder = async (req, res) => {
  try {
    const { userId, customerName, cart, paymentMethod } = req.body;

    // calculate total
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // insert into orders
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, customer_name, total, payment_method) VALUES (?, ?, ?, ?)",
      [userId, customerName, total, paymentMethod]
    );
    const orderId = orderResult.insertId;

    // insert items + reduce stock
    for (const item of cart) {
      const [[product]] = await db.query(
        "SELECT stock FROM products WHERE id = ?",
        [item.id]
      );
      if (!product || product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${item.name}`,
        });
      }

      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id, item.qty, item.price]
      );

      await db.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.qty,
        item.id,
      ]);
    }

    res.status(201).json({
      success: true,
      orderId,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT (protect middleware)

    const [rows] = await db.query(
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
       ORDER BY o.created_at DESC`,
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

    const orders = Object.values(ordersMap);

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
