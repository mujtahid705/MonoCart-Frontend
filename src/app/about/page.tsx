"use client";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Users,
  Award,
  Truck,
  Shield,
  Heart,
  Star,
  Globe,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Products Sold", value: "100,000+", icon: ShoppingBag },
    { label: "Years in Business", value: "5+", icon: Award },
    { label: "Countries Served", value: "10+", icon: Globe },
  ];
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "Every product goes through rigorous quality checks to ensure you receive only the best.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery service to get your orders to you as soon as possible.",
    },
    {
      icon: Star,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our business, from products to customer service.",
    },
  ];
  const team = [
    {
      name: "Muhammad Mujtahid",
      role: "Founder & CEO",
      description:
        "Passionate about bringing quality products to customers worldwide.",
      image: "/team/ceo.jpg",
    },
    {
      name: "Sumaita Shanin",
      role: "Head of Operations",
      description:
        "Ensures smooth operations and exceptional customer experience.",
      image: "/team/operations.jpg",
    },
    {
      name: "Abtahi Tajwar",
      role: "Technology Lead",
      description:
        "Drives innovation and technological advancement in our platform.",
      image: "/team/tech.jpg",
    },
  ];
  const milestones = [
    {
      year: "2020",
      title: "MonoCart Founded",
      description:
        "Started with a vision to revolutionize online shopping in Bangladesh.",
    },
    {
      year: "2021",
      title: "10,000 Customers",
      description:
        "Reached our first major milestone of serving 10,000 happy customers.",
    },
    {
      year: "2022",
      title: "Regional Expansion",
      description:
        "Expanded our delivery network to cover all major cities in Bangladesh.",
    },
    {
      year: "2023",
      title: "Mobile App Launch",
      description:
        "Launched our mobile application for better customer experience.",
    },
    {
      year: "2024",
      title: "International Shipping",
      description:
        "Started international shipping to serve customers globally.",
    },
    {
      year: "2025",
      title: "50,000+ Customers",
      description: "Celebrating over 50,000 satisfied customers and growing.",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-orange-500">MonoCart</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for quality products and exceptional shopping
              experience. We&apos;re committed to bringing you the best products
              at the best prices, delivered right to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                MonoCart was born from a simple idea: to make quality products
                accessible to everyone. Founded in 2020, we started as a small
                team with a big dream of revolutionizing the online shopping
                experience in Bangladesh.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Today, we&apos;re proud to serve over 50,000 customers across
                the country and beyond, offering a curated selection of products
                ranging from electronics and fashion to home essentials and
                more. Our commitment to quality, affordability, and customer
                satisfaction remains unwavering.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that shopping should be convenient, enjoyable, and
                trustworthy. That&apos;s why we work tirelessly to ensure every
                interaction with MonoCart exceeds your expectations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-orange-100 rounded-lg p-8 text-center">
                <ShoppingBag className="w-24 h-24 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quality First
                </h3>
                <p className="text-gray-600">
                  Every product is carefully selected and quality-tested before
                  reaching our customers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment
              to our customers.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                    <value.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to serving thousands of customers,
              here&apos;s our story.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-orange-200"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                } mb-8`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <Card className="p-6">
                    <Badge className="bg-orange-100 text-orange-800 mb-3">
                      {milestone.year}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind MonoCart who work tirelessly to serve
              you better.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To provide an exceptional online shopping experience that connects
              people with quality products they love, while building lasting
              relationships based on trust, reliability, and outstanding
              customer service.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
