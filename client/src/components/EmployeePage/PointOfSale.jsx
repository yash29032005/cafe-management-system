import React, { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BsCup } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import PaymentModal from "./PaymentModal";

const PointOfSale = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product`,
          { withCredentials: true }
        );
        setProducts(result.data.product || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.qty < product.stock) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          toast.warn("No more stock available for this item");
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  // Increase quantity (respect stock)
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.qty < item.stock
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  // Calculate total
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div
      className="bg-lightprimary dark:bg-darkprimary flex flex-col md:flex-row p-5 gap-5 w-screen"
      style={{ height: "calc(100vh - 100px)" }}
    >
      {/* Left Side - Products */}
      <div className="bg-lightsecondary dark:bg-darksecondary h-6/12 md:h-full w-full md:w-8/12 rounded-lg overflow-y-auto p-5">
        <p className="flex items-center gap-2 text-2xl text-black dark:text-white font-semibold mb-4">
          <CiShoppingCart className="text-xl" />
          Products
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <p className="text-black dark:text-white">No products available</p>
          ) : (
            products.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-b from-lightternary to-lightprimary dark:from-darkternary
                dark:to-darkprimary text-white p-5 rounded-lg shadow-md flex flex-col justify-between
                min-h-[200px] md:min-h-[300px] transition cursor-pointer"
                onClick={() => addToCart(item)}
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <BsCup className="text-4xl text-black dark:text-white" />
                </div>
                <div className="mt-3 relative">
                  <p className="font-bold text-lg text-black dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm opacity-80 text-lightgrey dark:text-darkgrey">
                    {item.category}
                  </p>
                  <p className="mt-1 font-semibold text-black dark:text-white">
                    ₹{Number(item.price).toFixed(2)}
                  </p>
                  <span
                    className="absolute bottom-0 right-0 text-xs bg-lightprimary dark:bg-darkprimary 
                      text-black dark:text-white rounded-full px-3 py-1"
                  >
                    Stock: {item.stock}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Current Order */}
      <div
        className="bg-lightsecondary dark:bg-darksecondary w-full md:w-4/12 rounded-lg p-5 h-6/12 
      md:h-full flex flex-col"
      >
        <p className="text-xl font-semibold text-black dark:text-white">
          Current Order
        </p>

        {cart.length === 0 ? (
          <p className="mt-3 text-sm opacity-70 text-lightgrey dark:text-darkgrey">
            No items in cart
          </p>
        ) : (
          <div className="flex-1 flex flex-col justify-between mt-3">
            {/* Cart Items Scrollable */}
            <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-lightprimary dark:bg-darkprimary 
                   rounded-lg p-3 shadow-sm"
                >
                  {/* Product Info */}
                  <div>
                    <p className="font-medium text-black dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-lightgrey dark:text-darkgrey">
                      ₹{Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 
                       text-white rounded-md transition"
                    >
                      -
                    </button>
                    <span className="text-black dark:text-white min-w-[20px] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className={`px-2 py-1 rounded-md transition ${
                        item.qty < item.stock
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                      disabled={item.qty >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="mt-3 border-t border-lightgrey dark:border-darkgrey pt-3">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-black dark:text-white">
                  Total:
                </p>
                <p className="font-bold text-black dark:text-white">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setOpenPaymentModal(true)}
                className="w-full text-black dark:text-white 
                 bg-gradient-to-b from-lightternary to-lightprimary 
                 dark:from-darkternary dark:to-darkprimary 
                 py-2 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Proceed to Payment
              </button>
              {openPaymentModal && (
                <PaymentModal
                  cart={cart}
                  setCart={setCart}
                  onClose={() => {
                    setOpenPaymentModal(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointOfSale;
