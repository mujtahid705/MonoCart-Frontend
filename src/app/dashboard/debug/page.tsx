"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function ReduxDebugPage() {
  const products = useSelector((state: RootState) => state.products);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Redux State Debug</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Products State:</h2>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Items count:</strong> {products.items.length}
          </div>
          <div>
            <strong>Loading:</strong> {products.loading.toString()}
          </div>
          <div>
            <strong>Error:</strong> {products.error || "null"}
          </div>
          <div>
            <strong>Last Fetched:</strong>{" "}
            {products.lastFetched.products || "null"}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Products Data:</h2>
        <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-96">
          {JSON.stringify(products.items, null, 2)}
        </pre>
      </div>
    </div>
  );
}
