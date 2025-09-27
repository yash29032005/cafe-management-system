import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const EditEmployeeModal = ({ onClose, emp }) => {
  const { setEmployees } = useContext(UserContext);
  const id = emp.id;
  const [name, setName] = useState(emp.name);
  const [salary, setSalary] = useState(emp.salary);
  const [role, setRole] = useState(emp.role);

  const handleEdit = async () => {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employee/${id}`,
        {
          name,
          salary,
          role,
        },
        {
          withCredentials: true,
        }
      );
      setName("");
      setSalary("");
      setRole("");
      toast.success(result.data.message);

      setEmployees((prevEmployees) =>
        prevEmployees.map((e) =>
          e.id === id ? { ...e, name, salary, role } : e
        )
      );
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
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
                Edit Employee Details
              </h2>
            </div>
            <button className="text-gray-400 hover:text-white transition duration-200 text-lg">
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="mt-5 text-lightgrey dark:text-darkgrey flex flex-col">
            <label htmlFor="name" className="text-sm ms-1 font-bold">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter file name"
              required
              className="w-full p-2 rounded-lg bg-lightsecondary dark:bg-darksecondary text-black dark:text-white text-sm"
            />
          </div>
          <div className="mt-5 text-lightgrey dark:text-darkgrey flex flex-col">
            <label htmlFor="role" className="text-sm ms-1 font-bold">
              Role
            </label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter file name"
              required
              className="w-full p-2 rounded-lg bg-lightsecondary dark:bg-darksecondary text-black dark:text-white text-sm"
            />
          </div>
          <div className="mt-5 text-lightgrey dark:text-darkgrey flex flex-col">
            <label htmlFor="salary" className="text-sm ms-1 font-bold">
              Salary
            </label>
            <input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter file name"
              required
              className="w-full p-2 rounded-lg bg-lightsecondary dark:bg-darksecondary text-black dark:text-white text-sm"
            />
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
              onClick={handleEdit}
              className="px-5 py-2 bg-gradient-to-b from-lightternary to-lightprimary 
                dark:from-darkternary dark:to-darkprimary rounded-lg text-black dark:text-white"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployeeModal;
