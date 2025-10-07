import React, { useContext } from "react";
import { MdDashboard } from "react-icons/md";
import { ProductContext } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";
import { OrderContext } from "../../context/OrderContext";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  const { products, totalProducts } = useContext(ProductContext);
  const { employees, totalEmployees } = useContext(UserContext);
  const { ordersMap, totalOrder } = useContext(OrderContext);

  return (
    <div className="px-4 py-2 bg-lightprimary dark:bg-darkprimary min-h-screen">
      <div className="bg-lightsecondary dark:bg-darksecondary p-5 rounded-2xl shadow-xl h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-2xl text-black dark:text-white font-bold">
            <MdDashboard className="text-black dark:text-white" />
            Admin's Dashboard
          </div>
          <Link
            to={"/manager"}
            className="text-black dark:text-white px-4 py-2 bg-gradient-to-b from-lightternary to-lightprimary 
                          dark:from-darkternary dark:to-darkprimary rounded-2xl"
          >
            Go Back
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-5 grid-rows-3 gap-4 h-full text-black dark:text-white">
          {/* Orders Card */}
          <div
            className="flex flex-col justify-center items-center text-center font-bold 
                          bg-gradient-to-b from-lightternary to-lightprimary 
                          dark:from-darkternary dark:to-darkprimary 
                          rounded-2xl shadow-lg p-6 "
          >
            <div className="text-4xl font-extrabold">{totalOrder}</div>
            <div className="text-lightgrey dark:text-darkgrey text-sm">
              Orders
            </div>
          </div>

          {/* Employees Card */}
          <div
            className="flex flex-col justify-center items-center text-center font-bold 
                          bg-gradient-to-b from-lightternary to-lightprimary 
                          dark:from-darkternary dark:to-darkprimary 
                          rounded-2xl shadow-lg p-6"
          >
            <div className="text-4xl font-extrabold">{totalEmployees}</div>
            <div className="text-lightgrey dark:text-darkgrey text-sm">
              Employees
            </div>
          </div>

          {/* Another Stat Card */}
          <div
            className="flex flex-col justify-center items-center text-center font-bold 
                          bg-gradient-to-b from-lightternary to-lightprimary 
                          dark:from-darkternary dark:to-darkprimary 
                          rounded-2xl shadow-lg p-6"
          >
            <div className="text-4xl font-extrabold">{totalProducts}</div>
            <div className="text-lightgrey dark:text-darkgrey text-sm">
              Products
            </div>
          </div>

          {/* Products Card */}
          <div
            className="flex flex-col font-bold 
                          bg-gradient-to-b from-lightternary to-lightprimary 
                          dark:from-darkternary dark:to-darkprimary 
                          col-span-2 row-span-3 rounded-2xl p-5 shadow-lg"
          >
            <div className="text-xl font-extrabold mb-4 border-b border-lightgrey dark:border-darkgrey pb-2">
              Products
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
              {products
                .slice()
                .sort((a, b) => a.stock - b.stock)
                .map((pro) => (
                  <div
                    key={pro.id}
                    className="text-black dark:text-white 
                               px-5 py-4 rounded-lg shadow-md flex flex-row items-center justify-between
                               hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-md">{pro.name}</p>
                      <p className="text-xs opacity-70 -mt-1">₹{pro.price}</p>
                    </div>
                    <div className="me-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          pro.stock <= 5
                            ? "bg-red-600 text-white"
                            : "bg-lightsecondary dark:bg-darkprimary text-black dark:text-white"
                        }`}
                      >
                        Stock: {pro.stock}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Employees Orders Card */}
          <div
            className="flex flex-col font-bold 
                          bg-gradient-to-b from-lightternary to-lightprimary 
                          dark:from-darkternary dark:to-darkprimary 
                          col-span-3 row-span-2 rounded-2xl p-5 shadow-lg"
          >
            <div className="text-xl font-extrabold mb-4 border-b border-lightgrey dark:border-darkgrey pb-2">
              Employees
            </div>
            <div className="flex flex-col gap-3 overflow-y-hidden overflow-x-hidden">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="text-black dark:text-white 
                               px-5 py-4 rounded-lg shadow-md flex flex-row items-center justify-between
                               hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-md">{emp.name}</p>
                    <p className="text-xs opacity-70 -mt-1">{emp.role}</p>
                  </div>
                  <div className="me-2">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold
                                     bg-lightsecondary dark:bg-darkprimary text-black dark:text-white"
                    >
                      {ordersMap[emp.id] ?? 0} orders
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
