"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  GraduationCap,
  Globe,
  Target,
  Sparkles,
  TrendingUp,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface Recommendation {
  stack: string;
  score: number;
  reason: string;
  learn_next: string[];
  top_techs: string[];
}

export default function StudentZone() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    country: "",
    interests: [] as string[],
    languages_known: [] as string[],
  });

  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "India",
    "Australia",
    "Singapore",
    "Netherlands",
    "France",
    "Japan",
    "Other",
  ];

  const languages = [
    "Python",
    "C",
    "C++",
    "Java",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "SQL",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "R",
    "Swift",
    "Kotlin",
  ];

  const interests = [
    { id: "web", name: "Web", icon: "🌐" },
    { id: "cloud", name: "Cloud", icon: "☁️" },
    { id: "database", name: "Database", icon: "🗄️" },
    { id: "systems", name: "Systems", icon: "⚙️" },
    { id: "devtools", name: "DevTools", icon: "🔧" },
    { id: "ai-ml", name: "AI/ML", icon: "🤖" },
    { id: "scripting", name: "Scripting", icon: "📜" },
    { id: "gamedev", name: "GameDev", icon: "🎮" },
    { id: "mobile", name: "Mobile", icon: "📱" },
    { id: "desktop", name: "Desktop", icon: "🖥️" },
    { id: "visualization", name: "Visualization", icon: "📊" },
    { id: "testing", name: "Testing", icon: "🧪" },
    { id: "blockchain", name: "Blockchain", icon: "⛓️" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "ar-vr", name: "AR/VR", icon: "🥽" },
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages_known: prev.languages_known.includes(lang)
        ? prev.languages_known.filter((l) => l !== lang)
        : [...prev.languages_known, lang],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.country || formData.interests.length === 0) return;

    setIsLoading(true);
    setShowResults(false);

    try {
      console.log("Form data:", formData);

      const response = await fetch(
        "https://stackrecommenderproto.onrender.com/recommend/new-entrant",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            languages_known: formData.languages_known,
            interests: formData.interests.join(" "),
            topk: 5,
            entrant_boost: true,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Request Failed:", response.status, errorText);
        alert(`Request failed: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("API JSON:", data);

      // ✅ Defensive: ensure arrays exist
      setFrameworks(
        Array.isArray(data.frameworks_by_language)
          ? data.frameworks_by_language
          : []
      );
      setRecommendations(Array.isArray(data.results) ? data.results : []);

      // ✅ Now we show results once both are handled
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ The return must be INSIDE the function
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-40"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full shadow-xl">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Student Tech Zone
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover your perfect tech stack based on your interests and
            location. Start your journey to becoming a skilled developer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ====================== FORM ====================== */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Tell us about yourself
              </h2>
            </div>

            <div className="space-y-8">
              {/* Country Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Globe className="inline h-4 w-4 mr-2" />
                  Select Your Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition-all shadow-sm"
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  🧠 Languages You Know
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageToggle(lang)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        formData.languages_known.includes(lang)
                          ? "border-green-400 bg-gradient-to-br from-green-100 to-green-300 text-green-800 shadow-md"
                          : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  <Target className="inline h-4 w-4 mr-2" />
                  Areas of Interest (Select multiple)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                        formData.interests.includes(interest.id)
                          ? "border-blue-400 bg-gradient-to-br from-blue-100 to-blue-300 text-blue-800 shadow-md"
                          : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="text-2xl mb-1">{interest.icon}</div>
                      <div className="text-xs font-medium">{interest.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  !formData.country ||
                  formData.interests.length === 0
                }
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Get My Recommendations</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* ====================== RESULTS ====================== */}
          <div className="space-y-6">
            {showResults &&
            (frameworks.length > 0 || recommendations.length > 0) ? (
              <>
                {/* Frameworks Section */}
                {frameworks.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      Frameworks Recommended Based on Your Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {frameworks.map((fw, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            router.push(`/tech/${encodeURIComponent(fw)}`)
                          }
                          className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-green-300 shadow-sm hover:scale-105 hover:from-green-200 hover:to-teal-200 transition-all"
                        >
                          {fw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Recommendations */}
                {recommendations.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      <h3 className="text-2xl font-bold text-gray-800">
                        Recommended Tech Stacks
                      </h3>
                    </div>

                    {recommendations.map((rec, index) => (
                      <div
                        key={rec.stack}
                        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl"
                      >
                        <h4 className="text-xl font-bold text-gray-800 mb-4">
                          {index + 1}. {rec.stack}
                        </h4>

                        {/* Top Tech Buttons */}
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Top Techs:
                        </h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rec.top_techs.map((tech, techIndex) => (
                            <button
                              key={techIndex}
                              onClick={() =>
                                router.push(`/tech/${encodeURIComponent(tech)}`)
                              }
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm hover:scale-105 hover:from-blue-200 hover:to-purple-200 transition-all"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>

                        {/* 💡 Reason Section */}
                        <div className="mt-4">
                          <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" /> Why this is
                            recommended:
                          </h5>
                          <p className="text-gray-600 text-sm bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-3 leading-relaxed shadow-sm">
                            {rec.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 border border-gray-200">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-full">
                      <Sparkles className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Ready to Discover Your Path?
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      Select your country, choose the languages you know, and
                      pick your interests to get personalized tech stack
                      recommendations tailored just for you.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        1
                      </div>
                      <span>Choose Location</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                        2
                      </div>
                      <span>Select Skills</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center text-pink-600 font-semibold">
                        3
                      </div>
                      <span>Get Results</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
