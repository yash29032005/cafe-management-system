import React, { useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { MdPointOfSale } from "react-icons/md";
import PointOfSale from "../components/EmployeePage/PointOfSale";
import OrderHistoryPage from "../components/EmployeePage/OrderHistoryPage";

const EmployeePage = () => {
  const [activeTab, setActiveTab] = useState("pos");
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
            onClick={() => setActiveTab("pos")}
            className={`flex flex-1 justify-center items-center gap-2 py-1 rounded-md text-xs transition ${
              activeTab === "pos"
                ? "bg-lightprimary dark:bg-darkprimary text-black dark:text-white"
                : "bg-lightsecondary dark:bg-darksecondary text-black dark:text-white"
            }`}
          >
            <MdPointOfSale className="text-md -me-1" /> Point of Sale
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex flex-1 justify-center items-center gap-2 py-1 rounded-md text-xs transition ${
              activeTab === "history"
                ? "bg-lightprimary dark:bg-darkprimary text-black dark:text-white"
                : "bg-lightsecondary dark:bg-darksecondary text-black dark:text-white"
            }`}
          >
            <CiClock2 className="text-md -me-1" /> Order History
          </button>
        </div>
        {activeTab === "pos" ? <PointOfSale /> : <OrderHistoryPage />}
      </div>
    </>
  );
};

export default EmployeePage;
