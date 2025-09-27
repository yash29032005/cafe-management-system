import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const PaymentModal = ({ onClose, cart, setCart }) => {
  const [customerName, setCustomerName] = useState("");
  const { user } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState("");

  const placeOrder = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/create`,
        {
          user: user.id,
          customerName,
          cart,
          paymentMethod,
        },
        { withCredentials: true }
      );
      toast.success(result.data.message);
      setCart([]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-opacity-70 backdrop-blur-xs flex items-center justify-center 
      z-50 transition-opacity duration-300"
        onClick={onClose}
      >
        <div
          className="bg-lightprimary dark:bg-darkprimary rounded-2xl p-4 w-11/12 md:w-5/12 shadow-2xl transform transition-all 
        duration-300 scale-100 hover:scale-[1.01]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-black dark:text-white">
                Request Stock
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition duration-200 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="mt-5 text-lightgrey dark:text-darkgrey flex flex-col">
            <label htmlFor="customerName" className="text-sm ms-1 font-bold">
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
              }}
              placeholder="Enter file name"
              required
              className="w-full p-2 rounded-lg bg-lightsecondary dark:bg-darksecondary text-black dark:text-white text-sm"
            />
          </div>
          <div className="mt-5 text-lightgrey dark:text-darkgrey flex flex-col">
            <label htmlFor="product" className="text-sm ms-1 font-bold">
              Product Name
            </label>
            <select
              id="product"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="w-full p-2 rounded-lg bg-lightsecondary dark:bg-darksecondary 
   text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">-- Select a Payment Method --</option>
              <option value="Cash">Cash</option>
              <option value="Online">Card/UPI</option>
            </select>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-lightsecondary dark:bg-darksecondary rounded-lg transition duration-200 text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={placeOrder}
              className="px-5 py-2 bg-gradient-to-b from-lightternary to-lightprimary 
                dark:from-darkternary dark:to-darkprimary rounded-lg text-black dark:text-white"
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
