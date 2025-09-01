"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  brand: string;
  originalPrice?: number;
  inStock: boolean;
}

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dummy favorites data - replace with actual favorites state later
const dummyFavoriteItems: FavoriteItem[] = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    price: 159.99,
    originalPrice: 199.99,
    image: "/vercel.svg",
    rating: 4.8,
    brand: "TechAudio",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    price: 89.99,
    image: "/vercel.svg",
    rating: 4.5,
    brand: "FitTech",
    inStock: true,
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 129.99,
    originalPrice: 149.99,
    image: "/vercel.svg",
    rating: 4.7,
    brand: "SoundWave",
    inStock: false,
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 39.99,
    image: "/vercel.svg",
    rating: 4.3,
    brand: "PowerTech",
    inStock: true,
  },
];

export function FavoritesDrawer({ isOpen, onClose }: FavoritesDrawerProps) {
  const [favoriteItems, setFavoriteItems] =
    useState<FavoriteItem[]>(dummyFavoriteItems);

  const removeFromFavorites = (id: number) => {
    setFavoriteItems((items) => items.filter((item) => item.id !== id));
  };

  const addToCart = (item: FavoriteItem) => {
    // Handle add to cart functionality
    console.log("Adding to cart:", item.name);
    // You can integrate with your cart state here
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Favorites ({favoriteItems.length})
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Favorite Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {favoriteItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add products to your favorites to see them here
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex space-x-3">
                        <div className="relative w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate pr-2">
                              {item.name}
                            </h4>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromFavorites(item.id)}
                              className="p-1 hover:bg-red-100 rounded flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </motion.button>
                          </div>

                          <p className="text-xs text-gray-500 mb-2">
                            {item.brand}
                          </p>

                          {renderStars(item.rating)}

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-orange-600">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addToCart(item)}
                              disabled={!item.inStock}
                              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                item.inStock
                                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>
                                {item.inStock ? "Add to Cart" : "Out of Stock"}
                              </span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {favoriteItems.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="space-y-2">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => {
                      // Handle move all to cart
                      const inStockItems = favoriteItems.filter(
                        (item) => item.inStock
                      );
                      console.log("Moving to cart:", inStockItems);
                      // You can integrate with your cart state here
                    }}
                  >
                    Add All to Cart (
                    {favoriteItems.filter((item) => item.inStock).length} items)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
