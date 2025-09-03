"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeFromFavorites,
  setFavoritesOpen,
  type FavoriteItem,
} from "@/redux/slices/favoritesSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export function FavoritesDrawer({ isOpen, onClose }: FavoritesDrawerProps) {
  const dispatch = useDispatch();
  const { items: favoriteItems, totalItems } = useSelector(
    (state: RootState) => state.favorites
  );
  const handleRemoveFromFavorites = (id: string) => {
    dispatch(removeFromFavorites(id));
  };
  const handleAddToCart = (item: FavoriteItem) => {
    dispatch(
      addToCart({
        productData: item.productData,
        quantity: 1,
      })
    );
  };
  const handleAddAllToCart = () => {
    favoriteItems.forEach((item) => {
      if (item.stock > 0) {
        dispatch(
          addToCart({
            productData: item.productData,
            quantity: 1,
          })
        );
      }
    });
  };
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating})</span>
      </div>
    );
  };
  return (
    <>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Favorites ({totalItems})
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {favoriteItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Save products you love to see them here
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="p-4">
                  <div className="mb-4">
                    <Button
                      onClick={handleAddAllToCart}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={favoriteItems.every((item) => item.stock === 0)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add All to Cart
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {favoriteItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors block"
                              onClick={onClose}
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-gray-500 mb-2">
                              {item.brand}
                            </p>
                            {renderStars(item.rating)}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-orange-600">
                                  ৳{item.price.toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ৳{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                  item.stock > 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                <span>
                                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(item)}
                                disabled={item.stock === 0}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs py-2 px-3 rounded-md transition-colors"
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Add to Cart
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  handleRemoveFromFavorites(item.id)
                                }
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
