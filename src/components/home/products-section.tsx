"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { fetchAllProducts } from "@/redux/slices/productsSlice";
type CardProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
};
export function ProductsSection() {
  const dispatch = useDispatch<AppDispatch>();
  const [gadgets, setGadgets] = React.useState<CardProduct[]>([]);
  const [womenProducts, setWomenProducts] = React.useState<CardProduct[]>([]);
  const [loading, setLoading] = React.useState({ g: true, w: true });
  const [error, setError] = React.useState<{
    g: string | null;
    w: string | null;
  }>({ g: null, w: null });
  React.useEffect(() => {
    let active = true;
    const mapToCard = (items: Array<{
      id: string;
      title?: string;
      price?: number;
      images?: Array<{ url?: string }>;
    }>): CardProduct[] =>
      items.map((p) => ({
        id: String(p.id),
        name: p.title ?? "Untitled",
        price: Number(p.price) || 0,
        originalPrice: Number(p.price) || 0,
        rating: 0,
        reviews: 0,
        image: p.images?.[0]?.url || "/vercel.svg",
      }));
    (async () => {
      try {
        const g = await dispatch(fetchAllProducts({ category: 2 })).unwrap();
        if (active) setGadgets(mapToCard(g));
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        if (active) setError((s) => ({ ...s, g: errorMessage || "Failed" }));
      } finally {
        if (active) setLoading((s) => ({ ...s, g: false }));
      }
      try {
        const w = await dispatch(fetchAllProducts({ category: 1 })).unwrap();
        if (active) setWomenProducts(mapToCard(w));
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        if (active) setError((s) => ({ ...s, w: errorMessage || "Failed" }));
      } finally {
        if (active) setLoading((s) => ({ ...s, w: false }));
      }
    })();
    return () => {
      active = false;
    };
  }, [dispatch]);
  return (
    <>
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
              <h2 className="text-3xl font-bold text-gray-900">Gadgets</h2>
              <p className="text-gray-600 mt-2">
                Check out our latest gadgets!
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {loading.g && (
              <div className="col-span-full text-sm text-gray-500">
                Loading gadgets...
              </div>
            )}
            {error.g && !loading.g && (
              <div className="col-span-full text-sm text-red-600">
                {error.g}
              </div>
            )}
            {!loading.g &&
              !error.g &&
              gadgets
                .slice(0, 5)
                .map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
          </div>
        </div>
      </section>
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
                  src="https://images.pexels.com/photos/2085118/pexels-photo-2085118.jpeg"
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Fashion</h2>
            <p className="text-gray-600 mt-2 mb-4">
              Check out our latest fashion trends!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {loading.w && (
              <div className="col-span-full text-sm text-gray-500">
                Loading clothing products...
              </div>
            )}
            {error.w && !loading.w && (
              <div className="col-span-full text-sm text-red-600">
                {error.w}
              </div>
            )}
            {!loading.w &&
              !error.w &&
              womenProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
