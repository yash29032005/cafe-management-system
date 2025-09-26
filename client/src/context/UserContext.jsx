import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
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
        if (result.data.user.name) {
          setUser(result.data.user.name);
          setRole(result.data.user.role);
          setUserId(result.data.user.id);

          if (role === "employee") {
            navigate("/employee");
          } else if (role === "manager") {
            navigate("/manager");
          } else if (role === "admin") {
            navigate("/admin");
          }
        } else {
          setUser(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, role]);

  return (
    <UserContext.Provider
      value={{ user, setUser, role, userId, setUserId, setRole, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
