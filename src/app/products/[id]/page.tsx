"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import Link from "next/link";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // TODO: Use the id parameter to fetch actual product data
  // const { id } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop",
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Black", "White", "Gray", "Navy"];

  const relatedProducts = [
    {
      id: "11",
      name: "Premium Cotton T-shirt",
      price: 32.99,
      originalPrice: 40.99,
      image: "white cotton tshirt",
    },
    {
      id: "12",
      name: "Athletic Sport Shoes",
      price: 85.0,
      originalPrice: 120.0,
      image: "black sport shoes",
    },
    {
      id: "13",
      name: "Designer Cotton Top",
      price: 28.0,
      originalPrice: 35.0,
      image: "cotton womens top",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={productImages[selectedImage]}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Monocart Women&apos;s Solid Slim Fit Classic Round Neck Cotton
                Fabric T-Shirt
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(127 reviews)</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">$15.00</span>
                <span className="text-xl text-gray-500 line-through">
                  $25.00
                </span>
                <Badge className="bg-red-500">40% OFF</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      className={`w-12 h-12 border-2 rounded-lg transition-all ${
                        selectedSize === size
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <motion.button
                      key={color}
                      className={`px-4 py-2 border-2 rounded-lg transition-all ${
                        selectedColor === color
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <motion.button
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="w-16 text-center font-medium">
                    {quantity}
                  </span>
                  <motion.button
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400"
                    onClick={() => setQuantity(quantity + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                  Add to Cart
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="icon" className="w-12 h-12">
                  <Heart className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: Shield, text: "Secure Payment" },
                { icon: RotateCcw, text: "Easy Return" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <span className="text-sm text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Brand</span>
                  <span>Monocart</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Material</span>
                  <span>100% Cotton</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Care</span>
                  <span>Machine Wash</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Origin</span>
                  <span>Made in India</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="group cursor-pointer overflow-hidden bg-white">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
