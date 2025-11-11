"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart, MapPin, Filter } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

export default function TrendsPage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedCity, setSelectedCity] = useState("All");

  // Mock data for charts
  const stackTrendsData = [
    { year: "2023", web: 45, ai: 25, cloud: 30, mobile: 20, data: 35 },
    { year: "2024", web: 48, ai: 32, cloud: 38, mobile: 18, data: 42 },
    { year: "2025", web: 50, ai: 40, cloud: 45, mobile: 15, data: 48 },
  ];

  const salaryData = [
    {
      role: "Frontend Dev",
      bangalore: 8.5,
      mumbai: 7.8,
      delhi: 7.2,
      hyderabad: 6.8,
    },
    {
      role: "Backend Dev",
      bangalore: 9.2,
      mumbai: 8.5,
      delhi: 8.0,
      hyderabad: 7.5,
    },
    {
      role: "Data Scientist",
      bangalore: 12.5,
      mumbai: 11.8,
      delhi: 11.0,
      hyderabad: 10.5,
    },
    {
      role: "DevOps Engineer",
      bangalore: 11.0,
      mumbai: 10.2,
      delhi: 9.8,
      hyderabad: 9.5,
    },
    {
      role: "ML Engineer",
      bangalore: 13.5,
      mumbai: 12.8,
      delhi: 12.0,
      hyderabad: 11.5,
    },
  ];

  const demandData = [
    { name: "JavaScript", worked: 65, want: 45, delta: 20 },
    { name: "Python", worked: 48, want: 52, delta: -4 },
    { name: "React", worked: 42, want: 38, delta: 4 },
    { name: "AWS", worked: 35, want: 48, delta: -13 },
    { name: "Docker", worked: 28, want: 42, delta: -14 },
    { name: "Kubernetes", worked: 18, want: 35, delta: -17 },
  ];

  const pieData = [
    { name: "Web Development", value: 35, color: "#3b82f6" },
    { name: "AI/ML", value: 25, color: "#10b981" },
    { name: "Cloud Computing", value: 20, color: "#f59e0b" },
    { name: "Data Science", value: 15, color: "#8b5cf6" },
    { name: "Mobile Dev", value: 5, color: "#ef4444" },
  ];

  const cities = [
    "All",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Pune",
    "Chennai",
  ];
  const years = ["2023", "2024", "2025"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Market Trends & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the latest trends in tech stack adoption, salary insights,
            and demand patterns across Indian cities. Data-driven insights for
            better career decisions.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">City:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tech Stack Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Tech Stack Adoption Trends
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stackTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="web"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Web Dev"
                />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  name="AI/ML"
                />
                <Area
                  type="monotone"
                  dataKey="cloud"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  name="Cloud"
                />
                <Area
                  type="monotone"
                  dataKey="data"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  name="Data Science"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Salary Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Salary Comparison by City
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}L`} />
                <Legend />
                <Bar dataKey="bangalore" fill="#3b82f6" name="Bangalore" />
                <Bar dataKey="mumbai" fill="#10b981" name="Mumbai" />
                <Bar dataKey="delhi" fill="#f59e0b" name="Delhi" />
                <Bar dataKey="hyderabad" fill="#8b5cf6" name="Hyderabad" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Demand vs Want */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Demand vs Desire Gap
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demandData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="worked" fill="#3b82f6" name="Currently Used" />
                <Bar dataKey="want" fill="#10b981" name="Want to Learn" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Market Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="h-6 w-6 text-orange-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Market Distribution
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) =>
                    `${entry.name} ${((entry.percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">+25%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                AI/ML Growth
              </div>
              <div className="text-gray-600">
                Highest growth in demand for AI/ML skills across all cities
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ₹13.5L
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Top Salary
              </div>
              <div className="text-gray-600">
                ML Engineers in Bangalore command the highest salaries
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">42%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Cloud Adoption
              </div>
              <div className="text-gray-600">
                Cloud skills are in high demand with growing adoption
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
