import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <Link to={"/admin"}>Admin Dashboard</Link>
    </div>
  );
};

export default AdminDashboard;
