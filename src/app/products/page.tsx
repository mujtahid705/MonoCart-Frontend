"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";

const allProducts = [
  {
    id: "1",
    name: "Premium Cotton T-shirt",
    price: 15.0,
    originalPrice: 25.0,
    rating: 4.5,
    reviews: 127,
    image: "white cotton tshirt",
    category: "clothing",
  },
  {
    id: "2",
    name: "Athletic Sport Shoes",
    price: 89.0,
    originalPrice: 120.0,
    rating: 4.8,
    reviews: 89,
    image: "black sport shoes",
    category: "shoes",
  },
  {
    id: "3",
    name: "Designer Denim Jacket",
    price: 32.0,
    originalPrice: 45.0,
    rating: 4.3,
    reviews: 156,
    image: "denim jacket women",
    category: "clothing",
  },
  {
    id: "4",
    name: "Luxury Handbag",
    price: 45.0,
    originalPrice: 65.0,
    rating: 4.6,
    reviews: 98,
    image: "leather handbag",
    category: "bags",
  },
  {
    id: "5",
    name: "Classic Casual Shirt",
    price: 28.0,
    originalPrice: 40.0,
    rating: 4.4,
    reviews: 73,
    image: "mens casual shirt",
    category: "clothing",
  },
  {
    id: "6",
    name: "Smart Casual T-shirt",
    price: 22.0,
    originalPrice: 35.0,
    rating: 4.7,
    reviews: 92,
    image: "womens smart tshirt",
    category: "clothing",
  },
  {
    id: "7",
    name: "Organic Cotton Tee",
    price: 18.0,
    originalPrice: 28.0,
    rating: 4.5,
    reviews: 134,
    image: "cotton womens tshirt",
    category: "clothing",
  },
  {
    id: "8",
    name: "Performance Sneakers",
    price: 75.0,
    originalPrice: 95.0,
    rating: 4.6,
    reviews: 67,
    image: "womens running shoes",
    category: "shoes",
  },
  {
    id: "9",
    name: "Essential T-shirt",
    price: 20.0,
    originalPrice: 30.0,
    rating: 4.3,
    reviews: 88,
    image: "mens casual tshirt",
    category: "clothing",
  },
  {
    id: "10",
    name: "Designer Tote Bag",
    price: 55.0,
    originalPrice: 75.0,
    rating: 4.8,
    reviews: 156,
    image: "smart womens bag",
    category: "bags",
  },
  {
    id: "11",
    name: "Premium Cotton T-shirt",
    price: 32.99,
    originalPrice: 40.99,
    rating: 4.2,
    reviews: 45,
    image: "white cotton tshirt",
    category: "clothing",
  },
  {
    id: "12",
    name: "Athletic Sport Shoes",
    price: 85.0,
    originalPrice: 120.0,
    rating: 4.9,
    reviews: 234,
    image: "black sport shoes",
    category: "shoes",
  },
];

const categories = [
  { id: "all", name: "All Products", count: allProducts.length },
  {
    id: "clothing",
    name: "Clothing",
    count: allProducts.filter((p) => p.category === "clothing").length,
  },
  {
    id: "shoes",
    name: "Shoes",
    count: allProducts.filter((p) => p.category === "shoes").length,
  },
  {
    id: "bags",
    name: "Bags",
    count: allProducts.filter((p) => p.category === "bags").length,
  },
  {
    id: "cosmetics",
    name: "Cosmetics",
    count: allProducts.filter((p) => p.category === "cosmetics").length,
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products designed for the
            modern lifestyle
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {allProducts.length} products
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
