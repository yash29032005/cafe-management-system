import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BsCup } from "react-icons/bs";
import AddStockModal from "./AddStockModal";
import axios from "axios";

const StockRequest = () => {
  const [openAddStockModal, setOpenAddStockModal] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/stock`,
          { withCredentials: true }
        );
        setRequests(result.data.requests || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests(); // ✅ actually call the function
  }, []);

  return (
    <div
      className="bg-lightprimary dark:bg-darkprimary p-5 w-screen"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div
        className="bg-lightsecondary dark:bg-darksecondary h-full rounded-lg 
        overflow-y-auto p-5"
      >
        <p className="mb-4 flex items-center gap-2 text-xl md:text-2xl text-black dark:text-white font-semibold">
          <BsCup className="text-md" /> Stock Requests
        </p>

        <div className="flex flex-col gap-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-gradient-to-b from-lightternary to-lightprimary 
                dark:from-darkternary dark:to-darkprimary text-white px-5 py-3 
                rounded-lg shadow-md flex flex-row items-center justify-between"
            >
              {/* Product icon */}
              <div className="flex items-center justify-center">
                <span className="text-2xl me-5">
                  <BsCup className="text-4xl text-black dark:text-white" />
                </span>
              </div>

              {/* Request details */}
              <div className="flex-1">
                <p className="font-bold text-md text-black dark:text-white">
                  {req.product_name}
                </p>
                <p className="text-xs opacity-80 text-lightgrey dark:text-darkgrey -mt-1">
                  Requested by: {req.employee_name}
                </p>
                <p className="mt-1 text-sm font-semibold text-black dark:text-white">
                  Status: {req.status}
                </p>
              </div>

              <div className="flex items-center">
                <span
                  onClick={() => setOpenAddStockModal(req)}
                  className="text-xs bg-lightsecondary dark:bg-darksecondary text-black 
                  dark:text-white rounded-full p-2 cursor-pointer hover:opacity-80 transition flex items-center gap-1"
                >
                  <FaPlus />
                  Action
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openAddStockModal && (
        <AddStockModal
          product={openAddStockModal}
          onClose={() => setOpenAddStockModal(null)}
        />
      )}
    </div>
  );
};

export default StockRequest;
