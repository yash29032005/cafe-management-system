import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            withCredentials: true,
          }
        );
        const fetchedUser = result.data.user;
        setUser(fetchedUser);
        if (fetchedUser) {
          if (fetchedUser.role === "employee") {
            navigate("/employee");
          } else if (fetchedUser.role === "manager") {
            navigate("/manager");
          } else if (fetchedUser.role === "admin") {
            navigate("/admin");
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchAllEmployee = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          { withCredentials: true }
        );

        const fetchedUser = result.data.user;

        // ✅ only fetch employees if manager/admin
        if (fetchedUser?.role === "manager" || fetchedUser?.role === "admin") {
          const empResult = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/employee/all`,
            { withCredentials: true }
          );
          setEmployees(empResult.data.employees || []);
        }
      } catch (err) {
        setEmployees(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEmployee();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, employees, setEmployees, loading }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
          <RotatingLines
            strokeColor="rgb(75, 85, 99)"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            visible
          />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
