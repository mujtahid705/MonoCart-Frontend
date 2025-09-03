async function testPagination() {
  const base = "http://localhost:5000/api";

  console.log("Testing different pagination parameters...\n");

  // Test 1: Default API call
  try {
    const res1 = await fetch(`${base}/products/all`);
    const data1 = await res1.json();
    console.log("1. Default call - Product count:", data1?.data?.length || 0);
  } catch (err) {
    console.log("1. Default call failed:", err.message);
  }

  // Test 2: With limit parameter
  try {
    const res2 = await fetch(`${base}/products/all?limit=20`);
    const data2 = await res2.json();
    console.log("2. With limit=20 - Product count:", data2?.data?.length || 0);
  } catch (err) {
    console.log("2. With limit=20 failed:", err.message);
  }

  // Test 3: With page and limit
  try {
    const res3 = await fetch(`${base}/products/all?page=1&limit=20`);
    const data3 = await res3.json();
    console.log(
      "3. With page=1&limit=20 - Product count:",
      data3?.data?.length || 0
    );
  } catch (err) {
    console.log("3. With page=1&limit=20 failed:", err.message);
  }

  // Test 4: With size parameter
  try {
    const res4 = await fetch(`${base}/products/all?size=20`);
    const data4 = await res4.json();
    console.log("4. With size=20 - Product count:", data4?.data?.length || 0);
  } catch (err) {
    console.log("4. With size=20 failed:", err.message);
  }

  // Test 5: With per_page parameter
  try {
    const res5 = await fetch(`${base}/products/all?per_page=20`);
    const data5 = await res5.json();
    console.log(
      "5. With per_page=20 - Product count:",
      data5?.data?.length || 0
    );
  } catch (err) {
    console.log("5. With per_page=20 failed:", err.message);
  }
}

testPagination().catch(console.error);
