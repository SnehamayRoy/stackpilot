"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SimpleTechTest() {
  const { tech } = useParams();
  const decodedTech = decodeURIComponent(tech as string).toLowerCase();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!decodedTech) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        console.log("🚀 Sending request for:", decodedTech);

        // ✅ Using native fetch API
        const response = await fetch(
          "https://company-recommender.onrender.com/recommend",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ skills: [decodedTech] }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const json = await response.json();
        console.log("✅ API Response:", json);
        setData(json);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedTech]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Testing API for <span className="text-purple-600">{decodedTech}</span>
      </h1>

      {loading && (
        <p className="text-blue-500 font-medium">
          Loading data, please wait...
        </p>
      )}

      {error && (
        <p className="text-red-500 font-medium">
          ❌ Error: {error}
          <br />
          (This might be due to CORS — check the console)
        </p>
      )}

      {data && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Response:</h2>
          <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
