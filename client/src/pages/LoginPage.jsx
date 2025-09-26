import React from "react";
import { FaCoffee, FaUserShield, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiCoffeeCup } from "react-icons/ci";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoginPage = () => {
  const roles = [
    {
      title: "Employee",
      desc: "Process orders and generate bills",
      icon: <FaCoffee className="text-2xl text-black dark:text-white" />,
      link: "employee",
    },
    {
      title: "Manager",
      desc: "Manage products and inventory",
      icon: <FaUsers className="text-2xl text-black dark:text-white" />,
      link: "manager",
    },
    {
      title: "Admin",
      desc: "Overview and system management",
      icon: <FaUserShield className="text-2xl text-black dark:text-white" />,
      link: "admin",
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center bg-lightprimary dark:bg-darkprimary"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      {/* Title */}
      <div className="flex">
        <CiCoffeeCup className="text-4xl md:text-8xl -me-1 md:-me-2 dark:text-white" />
        <Link
          to={"/loginpage"}
          className="text-4xl md:text-8xl font-bold dark:text-white"
        >
          BrewDesk
        </Link>
      </div>
      <p className="text-lightgrey dark:text-darkgrey mt-2">
        Select your role to access the system
      </p>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className=" shadow-md rounded-xl p-6 flex flex-col items-center text-center w-75
             bg-lightsecondary dark:bg-darksecondary"
          >
            {/* Icon */}
            <div
              className="w-14 h-14 flex items-center justify-center text-2xl rounded-full 
              bg-gradient-to-b from-lightternary to-lightprimary dark:from-darkternary
               dark:to-darkprimary"
            >
              {role.icon}
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold mt-4 text-black dark:text-white">
              {role.title}
            </h2>
            <p className="text-sm text-lightgrey dark:text-darkgrey mt-1">
              {role.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-gray-500">
        Powered by BrewDesk © 2025
      </footer>
    </div>
  );
};

export default LoginPage;
