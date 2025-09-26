import React, { useState } from "react";

import { CiShoppingCart } from "react-icons/ci";
import { BsCup } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import RequestStockModal from "./RequestStockModal";
import RemoveProductModal from "../RemoveProductModal";
import EditProductModal from "../EditEmployeeModal";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const InventoryManagement = () => {
  const [openRequestStock, setOpenRequestStock] = useState(false);
  const [openRemoveProductModal, setOpenRemoveProductModal] = useState(false);
  const [openEditProductModal, setOpenEditProductModal] = useState(false);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product`,
          {
            withCredentials: true,
          }
        );
        setProduct(result.data.product);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div
        className="bg-lightprimary dark:bg-darkprimary p-5 w-screen"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {/* Products */}
        <div
          className="bg-lightsecondary dark:bg-darksecondary h-full 
          rounded-lg overflow-y-auto p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className="flex items-center gap-2 text-xl md:text-2xl text-black dark:text-white font-semibold 
            btn btn-light"
            >
              <CiShoppingCart className="text-md" />
              Products
            </p>
            <p
              onClick={() => {
                setOpenRequestStock(true);
              }}
              className="flex items-center gap-2 text-xs text-black dark:text-white bg-gradient-to-b from-lightternary to-lightprimary 
                dark:from-darkternary dark:to-darkprimary rounded-md px-4 py-2 hover:opacity-90"
            >
              <FaPlus className="text-sm" />
              Request Stock
            </p>
            {openRequestStock && (
              <RequestStockModal
                products={product.map((p) => p.name)}
                onClose={() => {
                  setOpenRequestStock(false);
                }}
              />
            )}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-lightternary to-lightprimary
                 dark:bg-gradient-to-b dark:from-darkternary dark:to-darkprimary 
                 text-white p-5 rounded-lg shadow-md flex flex-col justify-between
                  min-h-[200px] md:min-h-[300px] "
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <span className="text-4xl">
                    <BsCup className="text-4xl text-black dark:text-white" />
                  </span>
                </div>
                <div className="mt-3 relative">
                  <p className="font-bold text-lg text-black dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm opacity-80 text-lightgrey dark:text-darkgrey">
                    {item.category}
                  </p>
                  <p className="mt-1 font-semibold text-black dark:text-white">
                    ${item.price.toFixed(2)}
                  </p>
                  <span
                    className="absolute bottom-0 right-0 text-xs bg-lightprimary dark:bg-darkprimary 
        text-black dark:text-white rounded-full px-3 py-1"
                  >
                    Stock: {item.stock}
                  </span>
                  <span
                    onClick={() => {
                      setOpenEditProductModal(true);
                    }}
                    className="absolute top-0 right-10 text-xs bg-lightsecondary dark:bg-darksecondary text-black 
    dark:text-white rounded-md px-4 py-2 cursor-pointer hover:opacity-80 transition"
                  >
                    Edit
                  </span>
                  {openEditProductModal && (
                    <EditProductModal
                      onClose={() => {
                        setOpenEditProductModal(false);
                      }}
                    />
                  )}
                  <span
                    onClick={() => {
                      setOpenRemoveProductModal(true);
                    }}
                    className="absolute top-0 right-0 text-xs bg-lightsecondary dark:bg-darksecondary
                    text-black dark:text-white rounded-full px-2 py-2"
                  >
                    <FaMinus />
                  </span>
                  {openRemoveProductModal && (
                    <RemoveProductModal
                      onClose={() => {
                        setOpenRemoveProductModal(false);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryManagement;
