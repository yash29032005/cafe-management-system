import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import ProductManagement from "../components/AdminPage/ProductManagement";
import EmployeeManagement from "../components/AdminPage/EmployeeManagement";
import StockRequest from "../components/AdminPage/StockRequest";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("product");
  return (
    <>
      <>
        <div
          className="w-screen flex flex-col justify-center items-center bg-lightprimary 
      dark:bg-darkprimary "
        >
          {/* Tabs */}
          <div
            className="flex w-9/12 p-1 bg-lightsecondary dark:bg-darksecondary rounded-md"
            style={{ height: "40px" }}
          >
            <button
              onClick={() => setActiveTab("product")}
              className={`flex flex-1 justify-center items-center gap-2 py-1 rounded-md text-xs transition ${
                activeTab === "product"
                  ? "bg-lightprimary dark:bg-darkprimary text-black dark:text-white"
                  : "bg-lightsecondary dark:bg-darksecondary text-black dark:text-white"
              }`}
            >
              <CiShoppingCart className="text-md -me-1" /> Product Management
            </button>
            <button
              onClick={() => setActiveTab("employee")}
              className={`flex flex-1 justify-center items-center gap-2 py-1 rounded-md text-xs transition ${
                activeTab === "employee"
                  ? "bg-lightprimary dark:bg-darkprimary text-black dark:text-white"
                  : "bg-lightsecondary dark:bg-darksecondary text-black dark:text-white"
              }`}
            >
              <IoPersonOutline className="text-md -me-1" /> Employee Management
            </button>
            <button
              onClick={() => setActiveTab("stock")}
              className={`flex flex-1 justify-center items-center gap-2 py-1 rounded-md text-xs transition ${
                activeTab === "stock"
                  ? "bg-lightprimary dark:bg-darkprimary text-black dark:text-white"
                  : "bg-lightsecondary dark:bg-darksecondary text-black dark:text-white"
              }`}
            >
              <IoPersonOutline className="text-md -me-1" /> Stock Request
            </button>
          </div>
          {activeTab === "product" ? (
            <ProductManagement />
          ) : activeTab === "employee" ? (
            <EmployeeManagement />
          ) : activeTab === "stock" ? (
            <StockRequest />
          ) : null}
        </div>
      </>
      );
    </>
  );
};

export default AdminPage;
