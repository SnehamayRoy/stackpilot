"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Briefcase,
  TrendingUp,
  Compass,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-center mb-6">
                <motion.div
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Compass className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    StackPilot
                  </span>
                </motion.div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Let data guide your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  dream stack
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                Get personalized tech stack recommendations based on real
                developer data, salary insights, and market trends. Perfect for
                students and professionals in India.
              </p>
            </motion.div>

            {/* Main CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/student"
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 min-w-[280px] justify-center"
                >
                  <Users className="h-6 w-6" />
                  <span>I&apos;m a Student</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/professional"
                  className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 min-w-[280px] justify-center"
                >
                  <Briefcase className="h-6 w-6" />
                  <span>I&apos;m a Professional</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
                whileHover={{ y: -5 }}
              >
                <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  For Students
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose the right tech stack based on market demand, salary
                  expectations, and learning paths tailored for Indian cities.
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600"
                whileHover={{ y: -5 }}
              >
                <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  For Professionals
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get career transition recommendations, salary benchmarks, and
                  upskilling paths based on your current skills and experience.
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-200 dark:hover:border-yellow-600"
                whileHover={{ y: -5 }}
              >
                <div className="bg-yellow-100 dark:bg-yellow-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Market Trends
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore interactive charts showing tech stack popularity,
                  salary trends, and demand forecasts across Indian cities.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by Real Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our recommendations are based on comprehensive analysis of
              developer surveys and salary data
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Developer Responses
              </div>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Indian Cities
              </div>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                100+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Tech Stacks
              </div>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="text-3xl font-bold text-cyan-600 mb-2">
                3 Years
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Trend Analysis
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose StackPilot?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine data science with career guidance to give you the most
              accurate recommendations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div className="text-center p-6" whileHover={{ y: -5 }}>
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced algorithms analyze market trends to provide
                personalized recommendations
              </p>
            </motion.div>

            <motion.div className="text-center p-6" whileHover={{ y: -5 }}>
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Targeted for India
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Recommendations tailored specifically for the Indian job market
                and salary expectations
              </p>
            </motion.div>

            <motion.div className="text-center p-6" whileHover={{ y: -5 }}>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real-Time Updates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay ahead with constantly updated data and emerging technology
                trends
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
