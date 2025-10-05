import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [ordersMap, setOrdersMap] = useState({});
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    if (!user || user.role === "manager") {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/order`,
          {
            withCredentials: true,
          }
        );
        setOrders(result.data.orders || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/order/count`,
          { withCredentials: true }
        );
        const map = {};
        result.data.orders.forEach((o) => {
          map[o.user_id] = o.total;
        });
        setOrdersMap(map);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, [setOrdersMap]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/order/total`,
          { withCredentials: true }
        );
        setTotalOrder(result.data.total);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        ordersMap,
        setOrdersMap,
        totalOrder,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
