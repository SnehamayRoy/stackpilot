"use client";

import { useState } from "react";
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
  technologies: string[];
}

export default function StudentZone() {
  const [formData, setFormData] = useState({
    country: "",
    interests: [] as string[],
  });

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

  const interests = [
    { id: "web", name: "Web", icon: "🌐", color: "from-blue-400 to-cyan-400" },
    {
      id: "cloud",
      name: "Cloud",
      icon: "☁️",
      color: "from-purple-400 to-pink-400",
    },
    {
      id: "database",
      name: "Database",
      icon: "🗄️",
      color: "from-green-400 to-emerald-400",
    },
    {
      id: "systems",
      name: "Systems",
      icon: "⚙️",
      color: "from-gray-400 to-slate-500",
    },
    {
      id: "devtools",
      name: "DevTools",
      icon: "🔧",
      color: "from-orange-400 to-red-400",
    },
    {
      id: "ai-ml",
      name: "AI/ML",
      icon: "🤖",
      color: "from-indigo-400 to-purple-500",
    },
    {
      id: "scripting",
      name: "Scripting",
      icon: "📜",
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: "gamedev",
      name: "GameDev",
      icon: "🎮",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: "📱",
      color: "from-teal-400 to-cyan-500",
    },
    {
      id: "desktop",
      name: "Desktop",
      icon: "🖥️",
      color: "from-slate-500 to-zinc-600",
    },
    {
      id: "visualization",
      name: "Visualization",
      icon: "📊",
      color: "from-violet-400 to-fuchsia-500",
    },
    {
      id: "testing",
      name: "Testing",
      icon: "🧪",
      color: "from-lime-400 to-green-500",
    },
    {
      id: "blockchain",
      name: "Blockchain",
      icon: "⛓️",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "security",
      name: "Security",
      icon: "🔒",
      color: "from-red-500 to-rose-600",
    },
    {
      id: "ar-vr",
      name: "AR/VR",
      icon: "🥽",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleSubmit = () => {
    if (!formData.country || formData.interests.length === 0) return;

    setIsLoading(true);
    setShowResults(false);

    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          stack: "MERN Stack",
          technologies: [
            "MongoDB",
            "Express.js",
            "React",
            "Node.js",
            "TypeScript",
            "Tailwind CSS",
          ],
        },
        {
          stack: "Python ML Stack",
          technologies: [
            "Python",
            "TensorFlow",
            "PyTorch",
            "Pandas",
            "NumPy",
            "Scikit-learn",
          ],
        },
        {
          stack: "AWS Cloud Stack",
          technologies: [
            "AWS",
            "Docker",
            "Kubernetes",
            "Terraform",
            "Jenkins",
            "Linux",
          ],
        },
        {
          stack: "Mobile Development Stack",
          technologies: [
            "React Native",
            "Flutter",
            "Swift",
            "Kotlin",
            "Firebase",
            "Redux",
          ],
        },
        {
          stack: "DevOps Stack",
          technologies: [
            "Git",
            "GitHub Actions",
            "Ansible",
            "Prometheus",
            "Grafana",
            "Nginx",
          ],
        },
      ];

      setRecommendations(mockRecommendations);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
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
          {/* Form Section */}
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
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interest Selection */}
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
                          : "border-gray-300 bg-white hover:bg-gray-50 shadow-sm text-gray-700"
                      }`}
                    >
                      <div className="text-2xl mb-1">{interest.icon}</div>
                      <div
                        className={`text-xs font-medium ${
                          formData.interests.includes(interest.id)
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {interest.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  !formData.country ||
                  formData.interests.length === 0
                }
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
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

          {/* Results Section */}
          <div className="space-y-6">
            {showResults && recommendations.length > 0 ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Your Recommended Tech Stacks
                  </h3>
                </div>
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.stack}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                          {index + 1}.
                        </span>
                        {rec.stack}
                      </h4>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Technologies to Learn:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {rec.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-gray-200">
                <div className="text-gray-400 mb-6">
                  <GraduationCap className="h-20 w-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Ready to discover your path?
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Select your country and areas of interest to get personalized
                  tech stack recommendations tailored just for you.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
