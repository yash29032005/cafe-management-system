import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import axios from "axios";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/order`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div
      className="bg-lightprimary dark:bg-darkprimary p-5 w-full"
      style={{ height: "calc(100vh - 100px)" }}
    >
      {/* Header */}
      <div className="bg-lightsecondary dark:bg-darksecondary rounded-lg p-5 shadow-md h-full overflow-y-auto">
        <p className="flex items-center gap-2 text-2xl font-semibold text-black dark:text-white mb-6">
          <CiClock2 className="text-xl" />
          Order History
        </p>

        {/* Orders List */}
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => {
              return (
                <div
                  key={order.orderId}
                  className="rounded-lg p-4 bg-gradient-to-b from-lightternary to-lightprimary
                   dark:bg-gradient-to-b dark:from-darkternary dark:to-darkprimary shadow-md"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm text-lightgrey dark:text-darkgrey">
                        <span className="font-bold">#{order.orderId}</span> |{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-black dark:text-white mt-1">
                        Customer Name:{" "}
                        <span className="font-bold">{order.customerName}</span>
                      </p>
                    </div>

                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>
                  </div>

                  {/* Table */}
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-black dark:text-white text-sm">
                        <th className="pb-2">Item</th>
                        <th className="pb-2">Qty</th>
                        <th className="pb-2">Price</th>
                        <th className="pb-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr
                          key={i}
                          className="text-lightgrey dark:text-darkgrey text-sm border-t 
                          border-darkgrey dark:border-lightgrey"
                        >
                          <td className="py-2">{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price.toFixed(2)}</td>
                          <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Order Total */}
                  <div className="flex justify-end mt-1 pt-3 border-t border-darkgrey dark:border-lightgrey font-semibold text-gray-900 dark:text-white">
                    Order Total: ₹{order.total.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
