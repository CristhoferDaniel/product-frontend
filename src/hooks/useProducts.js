import { useState, useEffect } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { validateProduct } from "../utils/validation";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await fetchProducts();
      console.log("se actualizo", data);
      setProducts(data);
      setError("");
    } catch (error) {
      setError("Error fetching products");
    }
  };

  const handleAddProduct = async (product) => {
    const validationError = validateProduct(product);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await addProduct(product);
      await getProducts(); 
    } catch (error) {
      setError("Error adding product");
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const validationError = validateProduct(updatedProduct);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await updateProduct(id, updatedProduct);
      await getProducts(); 
    } catch (error) {
      setError("Error updating product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      await getProducts(); 
    } catch (error) {
      setError("Error deleting product");
    }
  };

  return {
    products,
    error,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};

export default useProducts;
