import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 text-center p-6">
      <h1 className="text-6xl font-bold bg-secondary">404</h1>
      <p className="text-gray-600 mt-4 text-lg">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white rounded-md hover:opacity-90 transition bg-secondary"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
