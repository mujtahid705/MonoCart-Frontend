"use client";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
export function Footer() {
  const [, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <motion.footer
      className="bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/">
                <Image
                  src="/monocart-logo2.png"
                  alt="Monocart"
                  width={150}
                  height={0}
                  style={{ height: "auto" }}
                />
              </Link>
            </motion.div>
            <p className="text-gray-300 mb-4">
              Discover the latest trends in fashion with our exclusive Monocart
              collection designed for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Shop", href: "/products" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                "Women's Fashion",
                "Men's Fashion",
                "Accessories",
                "Footwear",
                "Jewelry",
                "Bags",
              ].map((category) => (
                <li key={category}>
                  <Link
                    href={`/products?category=${category
                      .toLowerCase()
                      .replace("'s", "")
                      .replace(" ", "-")}`}
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {[
                { Icon: Mail, text: "info@monocart.com" },
                { Icon: Phone, text: "+1 (555) 123-4567" },
                { Icon: MapPin, text: "123 Fashion St, Style City, SC 12345" },
              ].map(({ Icon, text }, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 Monocart. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
