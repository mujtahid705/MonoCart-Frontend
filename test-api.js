// Test script to check products API
async function testProductsAPI() {
  try {
    const response = await fetch("http://localhost:5000/api/products/all");
    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      console.error("API failed:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    console.log("Raw API response:", data);
    console.log("Data structure:", typeof data);

    if (data && data.data) {
      console.log("Products array length:", data.data.length);
      console.log("First few products:", data.data.slice(0, 3));
    } else if (Array.isArray(data)) {
      console.log("Direct array length:", data.length);
      console.log("First few products:", data.slice(0, 3));
    } else {
      console.log("Unexpected data structure:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

testProductsAPI();
