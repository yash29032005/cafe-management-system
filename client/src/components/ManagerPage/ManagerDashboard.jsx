import React from "react";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <div>
      <Link to={"/manager"}>Manager Dashboard</Link>
    </div>
  );
};

export default ManagerDashboard;
