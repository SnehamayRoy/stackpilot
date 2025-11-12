"use client";

import { useEffect, useRef, useMemo } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartType,
  ChartData,
  ChartOptions,
  DoughnutController,
  BarController,
} from "chart.js";

Chart.register(
  LineController,
  DoughnutController,
  BarController,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Type Definitions
interface CustomDataset {
  name?: string;
  label?: string;
  data: number[];
  color: string;
}

interface TrendsData {
  languageTrends: {
    labels: string[];
    datasets: CustomDataset[];
  };
  stackDistribution: {
    labels: string[];
    data: number[];
    colors: string[];
  };
  remoteWork: {
    labels: string[];
    datasets: CustomDataset[];
  };
  databases: {
    labels: string[];
    datasets: CustomDataset[];
  };
  frameworks: {
    labels: string[];
    datasets: CustomDataset[];
  };
}

// Data
const trendsData: TrendsData = {
  languageTrends: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        name: "JavaScript",
        data: [64.2, 65.1, 63.6, 62.3, 61.0],
        color: "#f59e0b",
      },
      {
        name: "Python",
        data: [48.1, 49.9, 51.7, 54.2, 56.8],
        color: "#3b82f6",
      },
      {
        name: "TypeScript",
        data: [30.2, 34.5, 38.9, 42.1, 45.3],
        color: "#8b5cf6",
      },
      { name: "Java", data: [35.3, 33.6, 32.2, 30.8, 29.5], color: "#ef4444" },
      { name: "C#", data: [27.9, 27.2, 26.8, 26.1, 25.5], color: "#ec4899" },
      { name: "PHP", data: [26.3, 24.5, 22.8, 21.2, 19.6], color: "#9333ea" },
    ],
  },
  stackDistribution: {
    labels: [
      "Web",
      "Database",
      "Other",
      "Cloud",
      "Systems",
      "Scripting",
      "Mobile",
      "AI/ML",
    ],
    data: [28.9, 18.5, 16.2, 11.5, 11.5, 5.4, 2.3, 2.3],
    colors: [
      "#8b5cf6",
      "#10b981",
      "#f59e0b",
      "#3b82f6",
      "#14b8a6",
      "#f97316",
      "#ec4899",
      "#6366f1",
    ],
  },
  remoteWork: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      { label: "Fully Remote", data: [27, 32, 38, 42, 45], color: "#10b981" },
      { label: "Hybrid", data: [18, 24, 27, 29, 28], color: "#8b5cf6" },
      { label: "On-site", data: [55, 44, 35, 29, 27], color: "#ef4444" },
    ],
  },
  databases: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "PostgreSQL",
        data: [40.4, 43.6, 45.2, 48.7, 51.3],
        color: "#8b5cf6",
      },
      {
        label: "MySQL",
        data: [46.8, 45.2, 44.1, 42.3, 40.8],
        color: "#3b82f6",
      },
      {
        label: "MongoDB",
        data: [26.5, 28.3, 31.2, 33.8, 35.6],
        color: "#10b981",
      },
      {
        label: "Redis",
        data: [20.3, 22.1, 24.6, 27.2, 29.1],
        color: "#ef4444",
      },
      {
        label: "SQLite",
        data: [19.6, 21.2, 22.8, 24.1, 25.3],
        color: "#14b8a6",
      },
    ],
  },
  frameworks: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      { name: "React", data: [40.1, 42.6, 42.1, 41.2, 39.5], color: "#3b82f6" },
      {
        name: "Vue.js",
        data: [18.8, 18.1, 17.3, 16.4, 15.2],
        color: "#10b981",
      },
      {
        name: "Angular",
        data: [22.9, 20.4, 18.7, 17.1, 15.8],
        color: "#ef4444",
      },
      {
        name: "Next.js",
        data: [8.2, 13.5, 16.7, 21.2, 24.8],
        color: "#8b5cf6",
      },
      { name: "Svelte", data: [2.6, 4.1, 6.6, 9.8, 12.4], color: "#f97316" },
    ],
  },
};

// Chart Renderer Component
interface ChartRendererProps {
  type: ChartType;
  title: string;
  subtitle?: string;
  data: ChartData;
  options?: ChartOptions;
  full?: boolean;
}

function ChartRenderer({
  type,
  title,
  subtitle,
  data,
  options,
  full,
}: ChartRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const destroyChart = () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };

    chartInstance.current = new Chart(canvas, {
      type: type,
      data: data,
      options: options,
    });

    return destroyChart;
  }, [data, options, type]);

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col border border-gray-100 ${
        full ? "lg:col-span-2" : ""
      }`}
    >
      <div className="mb-4">
        <h3 className="font-bold text-xl text-gray-800 mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}

// Chart Configuration
const baseAnimation = {
  duration: 1200,
  easing: "easeInOutCubic" as const,
};

const buildCommonOptions = <T extends ChartType>(): ChartOptions<T> =>
  ({
    responsive: true,
    maintainAspectRatio: false,
    animation: baseAnimation as any,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 11, weight: 500 },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
      },
    },
  } as ChartOptions<T>);


const createLineData = (data: {
  labels: string[];
  datasets: CustomDataset[];
}): ChartData<"line"> => ({
  labels: data.labels,
  datasets: data.datasets.map((d) => ({
    label: d.name || d.label || "",
    data: d.data,
    borderColor: d.color,
    backgroundColor: d.color + "20",
    borderWidth: 3,
    tension: 0.4,
    fill: true,
    pointRadius: 4,
    pointHoverRadius: 6,
    pointBackgroundColor: d.color,
    pointBorderColor: "#fff",
    pointBorderWidth: 2,
  })),
});

const createBarData = (data: {
  labels: string[];
  datasets: CustomDataset[];
}): ChartData<"bar"> => ({
  labels: data.labels,
  datasets: data.datasets.map((d) => ({
    label: d.name || d.label || "",
    data: d.data,
    backgroundColor: d.color + "CC",
    borderColor: d.color,
    borderWidth: 2,
    borderRadius: 6,
  })),
});

const createDoughnutData = (data: {
  labels: string[];
  data: number[];
  colors: string[];
}): ChartData<"doughnut"> => ({
  labels: data.labels,
  datasets: [
    {
      data: data.data,
      backgroundColor: data.colors,
      borderColor: "#fff",
      borderWidth: 3,
      hoverOffset: 8,
    },
  ],
});

export default function TrendsPage() {
  const languageData = useMemo(
    () => createLineData(trendsData.languageTrends),
    []
  );
  const stackData = useMemo(
    () => createDoughnutData(trendsData.stackDistribution),
    []
  );
  const remoteData = useMemo(() => createLineData(trendsData.remoteWork), []);
  const dbData = useMemo(() => createBarData(trendsData.databases), []);
  const frameworkData = useMemo(
    () => createLineData(trendsData.frameworks),
    []
  );

  const lineOptions: ChartOptions<"line"> = {
    ...buildCommonOptions<"line">(),
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          callback: (value: number | string) => `${value}%`,
          font: { size: 11 },
        },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  };

  const barOptions: ChartOptions<"bar"> = {
    ...buildCommonOptions<"bar">(),
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          callback: (value: number | string) => `${value}%`,
          font: { size: 11 },
        },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    ...buildCommonOptions<"doughnut">(),
    cutout: "65%",
    plugins: {
      ...buildCommonOptions<"doughnut">().plugins,
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 12,
          font: { size: 11, weight: 500 },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Stack Overflow Survey Data
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Developer Technology Trends
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of programming languages, frameworks, and
            work patterns from 2021–2025
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-[420px] mb-12">
          <ChartRenderer
            type="line"
            title="Programming Language Adoption"
            subtitle="Percentage of developers using each language"
            data={languageData}
            options={lineOptions}
          />

          <ChartRenderer
            type="doughnut"
            title="Technology Stack Distribution"
            subtitle="Primary development categories"
            data={stackData}
            options={doughnutOptions}
          />

          <ChartRenderer
            type="line"
            title="Remote Work Evolution"
            subtitle="Work arrangement preferences over time"
            data={remoteData}
            options={lineOptions}
          />

          <ChartRenderer
            type="bar"
            title="Database Technology Landscape"
            subtitle="Most popular database systems"
            data={dbData}
          />

          <ChartRenderer
            type="line"
            title="Web Framework Popularity"
            subtitle="Market share of major frontend frameworks"
            data={frameworkData}
            options={lineOptions}
            full
          />
        </div>

        {/* Insights Section */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="text-4xl">💡</span>
            Key Insights & Trends
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InsightCard
              icon="📈"
              title="TypeScript Surge"
              stat="+50%"
              description="TypeScript adoption jumped from 30.2% to 45.3%, establishing itself as the modern JavaScript standard"
              color="from-purple-500 to-indigo-600"
            />
            <InsightCard
              icon="🐍"
              title="Python Dominance"
              stat="56.8%"
              description="Python leads with the highest growth, driven by AI/ML and data science applications"
              color="from-blue-500 to-cyan-600"
            />
            <InsightCard
              icon="🏠"
              title="Remote Work"
              stat="45%"
              description="Fully remote positions have increased by 67% since 2021, reshaping the industry"
              color="from-green-500 to-emerald-600"
            />
            <InsightCard
              icon="⚡"
              title="Next.js Growth"
              stat="+203%"
              description="Next.js tripled its market share, becoming the fastest-growing React framework"
              color="from-orange-500 to-red-600"
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Data sourced from Stack Overflow Developer Survey | Updated for 2025
          </p>
        </div>
      </div>
    </div>
  );
}

// Insight Card Component
function InsightCard({
  icon,
  title,
  stat,
  description,
  color,
}: {
  icon: string;
  title: string;
  stat: string;
  description: string;
  color: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="text-4xl font-extrabold mb-3">{stat}</div>
      <p className="text-sm opacity-95 leading-relaxed">{description}</p>
    </div>
  );
}
