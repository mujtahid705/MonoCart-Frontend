"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import Image from "next/image";
import Link from "next/link";

const newArrivals = [
  {
    id: "1",
    name: "Premium Cotton T-shirt",
    price: 15.0,
    originalPrice: 25.0,
    rating: 4.5,
    reviews: 127,
    image: "white cotton tshirt",
  },
  {
    id: "2",
    name: "Athletic Sport Shoes",
    price: 89.0,
    originalPrice: 120.0,
    rating: 4.8,
    reviews: 89,
    image: "black sport shoes",
  },
  {
    id: "3",
    name: "Designer Denim Jacket",
    price: 32.0,
    originalPrice: 45.0,
    rating: 4.3,
    reviews: 156,
    image: "denim jacket women",
  },
  {
    id: "4",
    name: "Luxury Handbag",
    price: 45.0,
    originalPrice: 65.0,
    rating: 4.6,
    reviews: 98,
    image: "leather handbag",
  },
  {
    id: "5",
    name: "Classic Casual Shirt",
    price: 28.0,
    originalPrice: 40.0,
    rating: 4.4,
    reviews: 73,
    image: "mens casual shirt",
  },
];

const womensCollection = [
  {
    id: "6",
    name: "Smart Casual T-shirt",
    price: 22.0,
    originalPrice: 35.0,
    rating: 4.7,
    reviews: 92,
    image: "womens smart tshirt",
  },
  {
    id: "7",
    name: "Organic Cotton Tee",
    price: 18.0,
    originalPrice: 28.0,
    rating: 4.5,
    reviews: 134,
    image: "cotton womens tshirt",
  },
  {
    id: "8",
    name: "Performance Sneakers",
    price: 75.0,
    originalPrice: 95.0,
    rating: 4.6,
    reviews: 67,
    image: "womens running shoes",
  },
  {
    id: "9",
    name: "Essential T-shirt",
    price: 20.0,
    originalPrice: 30.0,
    rating: 4.3,
    reviews: 88,
    image: "mens casual tshirt",
  },
  {
    id: "10",
    name: "Designer Tote Bag",
    price: 55.0,
    originalPrice: 75.0,
    rating: 4.8,
    reviews: 156,
    image: "smart womens bag",
  },
];

export function ProductsSection() {
  return (
    <>
      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
              <p className="text-gray-600 mt-2">
                Check out our latest products
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Collection Banner */}
      <section className="py-16 bg-gradient-to-r from-orange-400 to-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative w-80 h-80 mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616c96671b7?w=320&h=320&fit=crop&crop=face"
                  alt="Women's Fashion"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <span className="text-2xl">👗</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 text-white space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  WOMEN&apos;S
                  <br />
                  <span className="text-slate-900">FASHION</span>
                  <br />
                  COLLECTION
                </h2>
                <p className="text-lg opacity-90">
                  Discover your style with our exclusive women&apos;s collection
                </p>
              </div>
              <Link href="/products?category=womens">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  Shop Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Women's Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {womensCollection.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
