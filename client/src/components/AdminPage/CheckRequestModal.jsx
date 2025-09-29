import { BsCup } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const CheckRequestModal = ({ onClose }) => {
  const [requests, setRequests] = useState([]);
  const { setProducts } = useContext(ProductContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/stock/request`,
          { withCredentials: true }
        );
        setRequests(result.data.rows);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/stock/approve/${id}`,
        {},
        { withCredentials: true }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: result.data.status } : req
        )
      );

      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === result.data.product_id
            ? { ...prod, stock: prod.stock + result.data.quantity }
            : prod
        )
      );
    } catch (err) {
      console.error("Error approving request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/stock/reject/${id}`,
        {},
        { withCredentials: true }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: result.data.status } : req
        )
      );
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  return (
    <>
      <div className="absolute top-10 right-0 w-75 h-75 rounded-lg bg-lightprimary dark:bg-darkprimary z-50 p-3">
        <div className="flex text-lightgrey dark:text-darkgrey text-lg font-semibold mb-3 items-center justify-between">
          <p>Requests</p>
          <p onClick={onClose}>x</p>
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100%-3rem)]">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-gradient-to-b from-lightternary to-lightprimary 
                dark:from-darkternary dark:to-darkprimary text-white px-3 py-3 
                rounded-lg shadow-md flex flex-row items-center justify-between"
            >
              {/* Product icon */}
              <div className="flex items-center justify-center">
                <span className="me-3">
                  <BsCup className="text-2xl text-black dark:text-white" />
                </span>
              </div>

              {/* Request details */}
              <div className="flex-1">
                <p className="font-bold text-sm text-black dark:text-white">
                  {req.product_name} ({req.quantity} quantity)
                </p>
                <p className="text-xs opacity-80 text-lightgrey dark:text-darkgrey -mt-1">
                  Requested by: {req.employee_name}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                {req.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-3 rounded-full bg-red-700 hover:opacity-90"
                    >
                      <ImCross className="text-xs text-black dark:text-white" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(req.id)}
                      className="px-2 py-2 rounded-full bg-green-700 hover:opacity-90"
                    >
                      <TiTick className="text-lg text-black dark:text-white" />
                    </button>
                  </>
                )}

                {req.status === "approved" && (
                  <button
                    type="button"
                    className="px-2 py-2 rounded-full bg-lightsecondary dark:bg-darksecondary cursor-default"
                  >
                    <TiTick className="text-lg text-black dark:text-white" />
                  </button>
                )}

                {req.status === "rejected" && (
                  <button
                    type="button"
                    className="px-3 py-3 rounded-full bg-lightsecondary dark:bg-darksecondary cursor-default"
                  >
                    <ImCross className="text-xs text-black dark:text-white" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CheckRequestModal;
