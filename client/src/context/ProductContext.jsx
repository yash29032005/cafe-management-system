import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product`,
          { withCredentials: true }
        );
        setProducts(result.data.product || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductSummary = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product/summary`,
          { withCredentials: true }
        );
        setTotalProducts(result.data.total);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductSummary();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, totalProducts, loading }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        children
      )}
    </ProductContext.Provider>
  );
};
