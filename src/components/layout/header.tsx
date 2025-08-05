"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      className="bg-white shadow-sm sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Monocart
                </span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {[
              { name: "Home", href: "/" },
              { name: "Shop", href: "/products" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <motion.div key={item.name}>
                <Link
                  href={item.href}
                  className={`text-gray-700 hover:text-orange-500 transition-colors ${
                    mounted && pathname === item.href ? "text-orange-500" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 max-w-md">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="border-0 bg-transparent focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              {[
                { Icon: Heart, count: "2", href: "/wishlist" },
                { Icon: ShoppingCart, count: "3", href: "/cart" },
              ].map(({ Icon, count, href }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href={href}>
                    <Button variant="ghost" size="sm" className="relative">
                      <Icon className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {count}
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              ))}

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
