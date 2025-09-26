import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import InventoryManagement from "../components/ManagerPage/InventoryManagement";
import EmployeeManagement from "../components/ManagerPage/EmployeeManagement";

const EmployeePage = () => {
  const [activeTab, setActiveTab] = useState("Inventory");
  return (
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
            onClick={() => setActiveTab("Inventory")}
            className={`flex flex-1 justify-center items-center gap-2 py-1 rounded-md text-xs transition ${
              activeTab === "Inventory"
                ? "bg-lightprimary dark:bg-darkprimary text-black dark:text-white"
                : "bg-lightsecondary dark:bg-darksecondary text-black dark:text-white"
            }`}
          >
            <CiShoppingCart className="text-md -me-1" /> Inventory Management
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
        </div>
        {activeTab === "Inventory" ? (
          <InventoryManagement />
        ) : (
          <EmployeeManagement />
        )}
      </div>
    </>
  );
};

export default EmployeePage;
