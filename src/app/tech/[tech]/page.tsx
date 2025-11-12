"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Star, Briefcase } from "lucide-react";

// Chart.js
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// === Types ===
type CompanyReco = {
  Company: string;
  "Common Job Roles": string;
  "P25 Salary (USD)": number;
  "P50 Salary (USD)": number;
  "P75 Salary (USD)": number;
  Similarity?: number;
};

type CompanyDetails = {
  company: string;
  overall_rating: number;
  summary: string;
  aspects: {
    career_growth: number;
    compensation_benefits: number;
    culture_values: number;
    management: number;
    work_life_balance: number;
  };
};

// === Component ===
export default function TechCompanyPage() {
  const { tech } = useParams(); // e.g., "c++"
  const decodedTech = decodeURIComponent(tech as string).toLowerCase();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyRecs, setCompanyRecs] = useState<CompanyReco[]>([]);
  const [companyDetails, setCompanyDetails] = useState<
    Record<string, CompanyDetails | null>
  >({});

  // === Fetch Data ===
  useEffect(() => {
    if (!decodedTech) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setCompanyRecs([]);
      setCompanyDetails({});

      try {
        // 1. Get recommendations
        const recoResp = await fetch(
          "https://company-recommender.onrender.com/recommend",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ skills: [decodedTech] }),
          }
        );

        if (!recoResp.ok) {
          const txt = await recoResp.text();
          throw new Error(
            `Recommender failed: ${recoResp.status} ${txt.slice(0, 100)}`
          );
        }

        const recoJson = await recoResp.json();
        const recs: CompanyReco[] =
          recoJson.recommendations ?? recoJson.results ?? [];
        setCompanyRecs(recs);

        if (recs.length === 0) {
          setIsLoading(false);
          return;
        }

        // 2. Fetch details for each company
        const detailsPromises = recs.map(async (c) => {
          const encoded = encodeURIComponent(c.Company);
          const url = `https://companyreviewer.onrender.com/company/${encoded}`;

          try {
            const resp = await fetch(url, {
              signal: AbortSignal.timeout(8000),
            });
            if (!resp.ok) {
              console.warn(`Details failed for ${c.Company}: ${resp.status}`);
              return { name: c.Company, data: null };
            }
            const json = await resp.json();
            return { name: c.Company, data: json as CompanyDetails };
          } catch (err) {
            console.warn(`Fetch error for ${c.Company}:`, err);
            return { name: c.Company, data: null };
          }
        });

        const details = await Promise.all(detailsPromises);
        const map: Record<string, CompanyDetails | null> = {};
        details.forEach((it) => (map[it.name] = it.data));
        setCompanyDetails(map);
      } catch (err: unknown) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [decodedTech]);

  // === Helpers ===
  const fmtMoney = (n?: number): string => {
    if (n == null || isNaN(n)) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  };

  const getRadarOptions = (): ChartOptions<"radar"> => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1, font: { size: 10 } },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        pointLabels: { font: { size: 11 } },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || "";
            const value = ctx.raw as number;
            return `${label}: ${value.toFixed(1)} / 5.0`;
          },
        },
      },
    },
    animation: { duration: 800, easing: "easeOutQuart" },
  });

  // === Early Returns ===
  if (!decodedTech) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-500">No tech skill specified.</p>
      </div>
    );
  }

  // === Render ===
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <h1 className="text-2xl font-bold capitalize">
            Companies hiring for{" "}
            <span className="text-purple-700">“{decodedTech}”</span>
          </h1>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-5 border animate-pulse"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                    <div className="flex gap-6 mt-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j}>
                          <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
                          <div className="h-5 bg-gray-200 rounded w-20"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="mt-6 h-52 bg-gray-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && companyRecs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>
              No companies found hiring for <strong>{decodedTech}</strong>.
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && companyRecs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyRecs.map((c) => {
              const details = companyDetails[c.Company];
              const aspects = details?.aspects;
              const labels = aspects ? Object.keys(aspects) : [];
              const values = aspects ? Object.values(aspects) : [];

              const radarData = {
                labels,
                datasets: [
                  {
                    label: `${c.Company} Ratings`,
                    data: values,
                    fill: true,
                    backgroundColor: "rgba(139, 92, 246, 0.15)",
                    borderColor: "rgba(139, 92, 246, 0.8)",
                    pointBackgroundColor: "rgba(139, 92, 246, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(139, 92, 246, 1)",
                  },
                ],
              };

              return (
                <div
                  key={c.Company}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {c.Company}
                        {details?.overall_rating && (
                          <span className="flex items-center gap-1 text-sm text-amber-600">
                            <Star className="h-4 w-4 fill-current" />
                            {details.overall_rating.toFixed(1)}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {c["Common Job Roles"] || "Various roles"}
                      </p>

                      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">
                            P25
                          </div>
                          <div className="font-semibold text-gray-800">
                            {fmtMoney(c["P25 Salary (USD)"])}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">
                            P50
                          </div>
                          <div className="font-semibold text-purple-700">
                            {fmtMoney(c["P50 Salary (USD)"])}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">
                            P75
                          </div>
                          <div className="font-semibold text-gray-800">
                            {fmtMoney(c["P75 Salary (USD)"])}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="text-right">
                      <button
                        onClick={() => openCompany(c.Company)}
                        onMouseEnter={() =>
                          router.prefetch(
                            `/company/${encodeURIComponent(c.Company)}`
                          )
                        }
                        className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                      {c.Similarity != null && (
                        <div className="text-xs text-gray-500 mt-2">
                          Match: {(c.Similarity * 100).toFixed(1)}%
                        </div>
                      )}
                    </div> */}
                  </div>

                  {/* Radar Chart */}
                  <div className="mt-8 h-80 -mx-4 flex items-center justify-center">
                    {aspects ? (
                      <Radar data={radarData} options={getRadarOptions()} />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400 text-sm bg-gray-50 rounded-xl">
                        No rating data
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {details ? (
                    <div className="prose prose-sm max-w-none text-gray-800">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {details.summary}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="mt-5 text-sm text-gray-500 italic">
                      Company insights not available.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
