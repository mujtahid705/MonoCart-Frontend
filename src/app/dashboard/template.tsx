"use client";
import { motion } from "framer-motion";
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
