import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const ProfileModal = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        { withCredentials: true }
      );
      setUser(null);
      toast.success(result.data.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div
        className="absolute right-0 mt-2 w-44 bg-lightprimary dark:bg-darkprimary 
        rounded-lg shadow-lg border border-lightgrey dark:border-darkgrey p-1 z-50"
      >
        <div className="flex flex-col">
          <button
            className="px-4 py-2 text-black dark:text-white hover:bg-lightsecondary
            dark:hover:bg-darksecondary rounded-md transition-colors duration-200 text-left font-medium"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="mt-1 px-4 py-2 text-black dark:text-white hover:bg-red-500
            dark:hover:bg-red-600 rounded-md transition-colors duration-200 text-left font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
