async function testSubcategoriesAPI() {
  const base = "http://localhost:5000/api";

  console.log("Testing subcategories API...\n");

  try {
    const res = await fetch(`${base}/subcategories/all`);
    const data = await res.json();
    console.log("✅ API Response Status:", res.status);
    console.log("📊 Subcategories count:", data?.length || 0);
    console.log("🔍 First few subcategories:", data?.slice(0, 3) || []);
  } catch (err) {
    console.log("❌ API call failed:", err.message);
  }
}

testSubcategoriesAPI().catch(console.error);
