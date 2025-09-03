"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchAllProducts } from "@/redux/slices/productsSlice";
import React from "react";

export default function SimpleProductsTest() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  React.useEffect(() => {
    console.log("🧪 Test: Fetching products...");
    dispatch(fetchAllProducts()).then((result) => {
      console.log("🧪 Test: Fetch result:", result);
      console.log("🧪 Test: Payload:", result.payload);
      console.log(
        "🧪 Test: Payload length:",
        Array.isArray(result.payload) ? result.payload.length : "Not an array"
      );
    });
  }, [dispatch]);

  console.log("🧪 Test: Current products array:", products);
  console.log("🧪 Test: Products count:", products.length);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Products Test</h1>
      <div className="space-y-2">
        <p>
          <strong>Loading:</strong> {loading.toString()}
        </p>
        <p>
          <strong>Error:</strong> {error || "None"}
        </p>
        <p>
          <strong>Products Count:</strong> {products.length}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Products List:</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products loaded</p>
        ) : (
          <ul className="space-y-1">
            {products.map((product, index) => (
              <li key={product.id} className="text-sm">
                {index + 1}. {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
