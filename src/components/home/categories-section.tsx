"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  {
    name: "Clothing",
    items: "2,451",
    image: "fashion clothing",
    icon: "👕",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    description: "Trendy Fashion",
    href: "/products?category=clothing",
  },
  {
    name: "Cosmetics",
    items: "1,245",
    image: "beauty cosmetics",
    icon: "💄",
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
    description: "Beauty & Care",
    href: "/products?category=cosmetics",
  },
  {
    name: "Bags & Purse",
    items: "865",
    image: "luxury handbag",
    icon: "👜",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    description: "Luxury Accessories",
    href: "/products?category=bags",
  },
  {
    name: "Shoes",
    items: "1,764",
    image: "designer shoes",
    icon: "👟",
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    description: "Designer Footwear",
    href: "/products?category=shoes",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              🛍️ Explore Collections
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections designed to match your lifestyle
            and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative p-8 text-center">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 ${category.bgColor} rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    <span className="text-3xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-orange-600 font-medium opacity-80">
                      {category.description}
                    </p>
                    <p className="text-2xl font-bold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {category.items}
                    </p>
                    <p className="text-sm text-gray-500">Products Available</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 group-hover:opacity-100 opacity-0"
                  >
                    <Link href={category.href}>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transform group-hover:scale-105 transition-all duration-200"
                      >
                        Explore Now
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

                <div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ padding: "1px" }}
                >
                  <div className="w-full h-full bg-white rounded-lg" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              View All Categories
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
