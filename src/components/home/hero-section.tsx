"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import Link from "next/link";
export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,165,0,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,193,7,0.3)_0%,transparent_50%)]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">%</span>
                </div>
                <div className="bg-orange-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-500/30">
                  <span className="text-orange-300 font-medium">
                    🔥 Sale Up To 50% Off
                  </span>
                </div>
              </motion.div>
              <motion.h1
                className="text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Fashion sale
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  for{" "}
                </span>
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Men&apos;s
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Discover the latest trends in men&apos;s fashion with our
                exclusive Monocart collection designed for the modern gentleman.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-10 py-4 rounded-full shadow-xl text-lg font-semibold border-0"
                  >
                    Shop Now →
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 bg-white/10 text-white hover:bg-white/20 hover:border-white/70 px-10 py-4 rounded-full backdrop-blur-sm text-lg font-semibold transition-all duration-300"
                >
                  View Collection
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative max-w-lg mx-auto">
              <div className="relative bg-gradient-to-br from-orange-100 to-yellow-50 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"
                    alt="Fashion Model"
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <div className="text-lg font-bold">50%</div>
                    <div className="text-xs font-semibold">OFF</div>
                  </div>
                </div>
                <div className="absolute top-4 -left-2 w-4 h-4 bg-yellow-400 rounded-full shadow-md"></div>
                <div className="absolute bottom-8 -right-2 w-3 h-3 bg-orange-400 rounded-full shadow-md"></div>
                <div className="absolute bottom-4 -left-3 w-2 h-2 bg-red-400 rounded-full shadow-md"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-3xl transform rotate-3 scale-95 opacity-30 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl transform -rotate-2 scale-90 opacity-20 -z-20"></div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-gray-50"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
