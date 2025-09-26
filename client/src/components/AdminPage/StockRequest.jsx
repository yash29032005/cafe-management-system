import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BsCup } from "react-icons/bs";
import AddStockModal from "./AddStockModal";

const products = [
  { id: 1, name: "Espresso", category: "Coffee", price: 3.5, stock: 25 },
  { id: 2, name: "Cappuccino", category: "Coffee", price: 4.25, stock: 30 },
  { id: 3, name: "Latte", category: "Coffee", price: 4.0, stock: 18 },
  { id: 4, name: "Mocha", category: "Coffee", price: 4.75, stock: 12 },
];

const StockRequest = () => {
  const [openAddStockModal, setOpenAddStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <>
      <div
        className="bg-lightprimary dark:bg-darkprimary p-5 w-screen"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {/* Employees Section */}
        <div
          className="bg-lightsecondary dark:bg-darksecondary h-full rounded-lg 
          overflow-y-auto p-5"
        >
          <p className="mb-4 flex items-center gap-2 text-xl md:text-2xl text-black dark:text-white font-semibold">
            <BsCup className="text-md" /> Stock
          </p>
          <div className="flex flex-col gap-3">
            {products.map((pro) => (
              <div
                key={pro.id}
                className="bg-gradient-to-b from-lightternary to-lightprimary 
                  dark:from-darkternary dark:to-darkprimary text-white px-5 py-3 
                  rounded-lg shadow-md flex flex-row items-center justify-between"
              >
                <div className="flex items-center justify-center">
                  <span className="text-2xl me-5">
                    <BsCup className="text-4xl text-black dark:text-white" />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-md text-black dark:text-white">
                    {pro.name}
                  </p>
                  <p className="text-xs opacity-80 text-lightgrey dark:text-darkgrey -mt-1">
                    {pro.category}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black dark:text-white">
                    ₹{pro.price}
                  </p>
                </div>
                <div className="me-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-lightsecondary dark:bg-darkprimary text-black dark:text-white">
                    {pro.stock} left
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    onClick={() => {
                      setOpenAddStockModal(true);
                      setSelectedProduct(pro.name);
                    }}
                    className="text-xs bg-lightsecondary dark:bg-darksecondary text-black 
      dark:text-white rounded-full p-2 cursor-pointer hover:opacity-80 transition flex items-center gap-1"
                  >
                    <FaPlus />
                    Add
                  </span>
                  {openAddStockModal && (
                    <AddStockModal
                      product={selectedProduct}
                      onClose={() => {
                        setOpenAddStockModal(false);
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

export default StockRequest;
