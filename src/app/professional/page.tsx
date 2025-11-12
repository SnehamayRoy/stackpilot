"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Globe,
  Code,
  Sparkles,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Search,
  Upload,
  FileText,
} from "lucide-react";

interface Recommendation {
  stack: string;
  score: number;
  reason: string;
  learn_next: string[];
  top_techs: string[];
}

export default function ProfessionalZone() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    country: "",
    currentRole: "",
    experience: "",
    skills: [] as string[],
    resume: null as File | null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [fitRecommendations, setFitRecommendations] = useState<
    Recommendation[]
  >([]);
  const [growthRecommendations, setGrowthRecommendations] = useState<
    Recommendation[]
  >([]);
  const [frameworks, setFrameworks] = useState<string[]>([]);

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

  const roles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Data Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "ML Engineer",
    "Product Manager",
    "Tech Lead",
    "Solution Architect",
  ];

  const experienceLevels = [
    "0-1 years (Fresher)",
    "2-3 years (Junior)",
    "4-6 years (Mid-level)",
    "7-10 years (Senior)",
    "10+ years (Lead/Architect)",
  ];

  const allSkills = [
    "APL",
    "APT",
    "ASP.NET",
    "ASP.NET CORE",
    "ASP.NET Core",
    "AWS",
    "Ada",
    "Alibaba Cloud",
    "Amazon Redshift",
    "Amazon Web Services (AWS)",
    "Angular",
    "Angular.js",
    "AngularJS",
    "Ansible",
    "Apex",
    "Assembly",
    "Astro",
    "Axum",
    "Bash",
    "BigQuery",
    "Blazor",
    "Bun",
    "C",
    "C#",
    "C++",
    "COBOL",
    "CSS",
    "Cargo",
    "Cassandra",
    "Chocolatey",
    "Clickhouse",
    "Clojure",
    "Cloud Firestore",
    "Cloudflare",
    "Cobol",
    "Cockroachdb",
    "CodeIgniter",
    "Colocation",
    "Composer",
    "Cosmos DB",
    "Couch DB",
    "CouchDB",
    "Couchbase",
    "Crystal",
    "Dart",
    "Databricks",
    "Databricks SQL",
    "Datadog",
    "Datomic",
    "Delphi",
    "Deno",
    "Digital Ocean",
    "DigitalOcean",
    "Django",
    "Docker",
    "Drupal",
    "DuckDB",
    "DynamoDB",
    "Dynamodb",
    "Elasticsearch",
    "Elixir",
    "Elm",
    "Erlang",
    "EventStoreDB",
    "Express",
    "F#",
    "FastAPI",
    "Fastify",
    "Firebase",
    "Firebase Realtime Database",
    "Firebird",
    "Flask",
    "Flow",
    "Fly.io",
    "Fortran",
    "GDScript",
    "Gatsby",
    "Gleam",
    "Go",
    "Google Cloud",
    "Google Cloud Platform",
    "Gradle",
    "Groovy",
    "H2",
    "HTML",
    "Haskell",
    "Heroku",
    "Hetzner",
    "Homebrew",
    "Htmx",
    "IBM Cloud",
    "IBM Cloud Or Watson",
    "IBM Cloud or Watson",
    "IBM DB2",
    "InfluxDB",
    "Java",
    "JavaScript",
    "Julia",
    "Keras",
    "Kotlin",
    "Kubernetes",
    "LISP",
    "Laravel",
    "Linode",
    "Lisp",
    "Lit",
    "Lua",
    "MATLAB",
    "MSBuild",
    "Make",
    "Managed Hosting",
    "MariaDB",
    "Matlab",
    "Maven (build tool)",
    "MicroPython",
    "Microsoft Access",
    "Microsoft Azure",
    "Microsoft SQL Server",
    "Mojo",
    "MongoDB",
    "MySQL",
    "Neo4J",
    "Neo4j",
    "NestJS",
    "Netlify",
    "New Relic",
    "Next.js",
    "Nim",
    "Ninja",
    "Node.js",
    "NuGet",
    "NumPy",
    "Nuxt.js",
    "OCaml",
    "OVH",
    "Objective-C",
    "OpenShift",
    "OpenStack",
    "Oracle",
    "Oracle Cloud Infrastructure",
    "Oracle Cloud Infrastructure (OCI)",
    "PHP",
    "Pacman",
    "Pandas",
    "Perl",
    "Phoenix",
    "Pip",
    "Play Framework",
    "Pocketbase",
    "Podman",
    "Poetry",
    "PostgreSQL",
    "PowerShell",
    "Presto",
    "Prolog",
    "Prometheus",
    "PyTorch",
    "Python",
    "PythonAnywhere",
    "Qwik",
    "R",
    "Railway",
    "Raku",
    "RavenDB",
    "React",
    "React.js",
    "Redis",
    "Remix",
    "Render",
    "Ruby",
    "Ruby on Rails",
    "Rust",
    "SAS",
    "SQL",
    "SQLite",
    "Scala",
    "Scaleway",
    "Scikit-learn",
    "Shell",
    "Shell (all shells)",
    "Snowflake",
    "Solid.js",
    "Solidity",
    "Solr",
    "Splunk",
    "Spring",
    "Spring Boot",
    "Strapi",
    "Supabase",
    "Svelte",
    "Swift",
    "Symfony",
    "TensorFlow",
    "Terraform",
    "TiDB",
    "TypeScript",
    "Unity",
    "Unreal Engine",
    "VBA",
    "VMware",
    "Valkey",
    "Vercel",
    "Visual Basic (.Net)",
    "Vite",
    "Vue.js",
    "Vultr",
    "Webpack",
    "WordPress",
    "Yandex Cloud",
    "Yarn",
    "Yii 2",
    "Zephyr",
    "Zig",
    "jQuery",
    "now Akamai",
    "npm",
    "pnpm",
  ];

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };
  // 🔹 Step 1: Send PDF to Resume Parser API
  const uploadResumeAndExtractSkills = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("🚀 Uploading resume:", file.name);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      console.log("📦 Raw proxy response:", text);

      if (!response.ok) {
        console.error("❌ Resume parsing failed:", response.status, text);
        throw new Error("Resume parsing failed");
      }

      const data = JSON.parse(text);
      console.log("🧠 Parsed resume data:", data);
      return data.skills?.all_skills || [];
    } catch (error) {
      console.error("🚨 Error uploading resume:", error);
      return [];
    }
  };

  // 🔹 Step 2: Send extracted skills to Recommender API
  const getRecommendations = async (skills: string[]) => {
    const response = await fetch(
      "https://stackrecommenderproto.onrender.com/recommend/professional",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          all_skills: skills.map((s) => s.toLowerCase()),
          topk: 5,
          prefer_low_barrier: false,
        }),
      }
    );

    if (!response.ok) throw new Error("Recommender API failed");
    const data = await response.json();
    console.log("Recommendations:", data);
    setFrameworks(data.frameworks_by_language || []);
    setRecommendations(data.results || []);
    setFitRecommendations(data.fit_recommendations || []);
    setGrowthRecommendations(data.growth_recommendations || []);
    return data.results || [];
  };

  const handleSubmit = async () => {
    const formValid =
      formData.country &&
      formData.currentRole &&
      formData.experience &&
      formData.skills.length > 0;

    if (!formValid && !formData.resume) return;

    setIsLoading(true);
    setShowResults(false);

    try {
      let skillsToUse: string[] = [];

      if (formData.resume) {
        // Step 1: Extract skills from PDF resume
        skillsToUse = await uploadResumeAndExtractSkills(formData.resume);
        if (!skillsToUse.length)
          throw new Error("No skills extracted from resume");
      } else {
        // Step 2: Use manually selected skills
        skillsToUse = formData.skills;
      }

      // Step 3: Get recommendations
      const results = await getRecommendations(skillsToUse);

      setRecommendations(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error in recommendation flow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit =
    formData.resume ||
    (formData.country &&
      formData.currentRole &&
      formData.experience &&
      formData.skills.length > 0);

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
                <Briefcase className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Professional Zone
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Upload your resume <span className="font-semibold">or</span> fill in
            your details to get personalized career recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Professional Profile
              </h2>
            </div>

            <div className="space-y-8">
              {/* Country */}
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
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Current Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Briefcase className="inline h-4 w-4 mr-2" />
                  Current Role
                </label>
                <select
                  value={formData.currentRole}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentRole: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                >
                  <option value="">Select your current role</option>
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <TrendingUp className="inline h-4 w-4 mr-2" />
                  Experience Level
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                >
                  <option value="">Select your experience</option>
                  {experienceLevels.map((exp) => (
                    <option key={exp}>{exp}</option>
                  ))}
                </select>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Upload className="inline h-4 w-4 mr-2" />
                  Upload Your Resume (optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resumeUpload"
                  />
                  <label
                    htmlFor="resumeUpload"
                    className="cursor-pointer px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" /> Choose File
                  </label>
                  {formData.resume && (
                    <span className="text-gray-600 text-sm">
                      {formData.resume.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  <Code className="inline h-4 w-4 mr-2" />
                  Skills (Search & Select Multiple)
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for a skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 max-h-56 overflow-y-auto border border-gray-200 rounded-xl p-3">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                        formData.skills.includes(skill)
                          ? "border-blue-400 bg-gradient-to-br from-blue-100 to-blue-300 text-blue-800 shadow-md"
                          : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !canSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Get Career Recommendations</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {/* Results Section */}
          <div className="space-y-6">
            {showResults &&
            (frameworks.length > 0 || recommendations.length > 0) ? (
              <>
                {/* 🧩 Frameworks Section */}
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

                {/* 💡 Recommended Tech Stacks */}
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

                        {/* 🔹 Top Tech Buttons */}
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Top Techs:
                        </h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rec.top_techs.map((tech, techIndex) => (
                            <button
                              key={techIndex}
                              onClick={() =>
                                (window.location.href = `/tech/${encodeURIComponent(
                                  tech
                                )}`)
                              }
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm hover:scale-105 hover:from-blue-200 hover:to-purple-200 transition-all"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>

                        {/* 🔹 Learn Next */}
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Learn Next:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {rec.learn_next.map((tech, techIndex) => (
                            <button
                              key={techIndex}
                              onClick={() =>
                                (window.location.href = `/tech/${encodeURIComponent(
                                  tech
                                )}`)
                              }
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm hover:scale-105 hover:from-blue-200 hover:to-purple-200 transition-all"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {/* 💼 What Fits You Best */}
                {fitRecommendations.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-800">
                        What Fits You Best
                      </h3>
                    </div>

                    {fitRecommendations.slice(0, 1).map((rec, index) => (
                      <div
                        key={rec.stack}
                        className="bg-white/80 rounded-2xl border border-gray-200 p-5 mb-4 hover:border-blue-400 transition-all duration-300 hover:shadow-xl"
                      >
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {index + 1}. {rec.stack}
                        </h4>

                        {/* 🔹 Top Techs */}
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Top Techs:
                        </h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rec.top_techs.map((tech, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                (window.location.href = `/tech/${encodeURIComponent(
                                  tech
                                )}`)
                              }
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm hover:scale-105 hover:from-blue-200 hover:to-purple-200 transition-all"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>

                        {/* 🔹 Learn Next */}
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Learn Next:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {rec.learn_next.map((tech, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                (window.location.href = `/tech/${encodeURIComponent(
                                  tech
                                )}`)
                              }
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm hover:scale-105 hover:from-blue-200 hover:to-purple-200 transition-all"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 🌱 Best for Growth */}
                {growthRecommendations.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      <h3 className="text-2xl font-bold text-gray-800">
                        Best for Growth
                      </h3>
                    </div>

                    {growthRecommendations.slice(0, 1).map((rec, index) => (
                      <div
                        key={rec.stack}
                        className="bg-white/80 rounded-2xl border border-gray-200 p-5 mb-4 hover:border-green-400 transition-all duration-300 hover:shadow-xl"
                      >
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {index + 1}. {rec.stack}
                        </h4>

                        {/* 🔹 Top Techs */}
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Top Techs:
                        </h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rec.top_techs.map((tech, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                (window.location.href = `/tech/${encodeURIComponent(
                                  tech
                                )}`)
                              }
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm hover:scale-105 hover:from-blue-200 hover:to-purple-200 transition-all"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>

                        {/* 🔹 Learn Next */}
                        <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Learn Next:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {rec.learn_next.map((tech, techIndex) => (
                            <button
                              key={techIndex}
                              onClick={() =>
                                (window.location.href = `/tech/${encodeURIComponent(
                                  tech
                                )}`)
                              }
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm hover:scale-105 hover:from-blue-200 hover:to-purple-200 transition-all"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 border border-gray-200">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  {/* Animated Professional Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-full">
                      <Briefcase className="h-16 w-16 text-blue-600" />
                    </div>
                  </div>

                  {/* Title + Description */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Advance Your Professional Journey
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      Upload your resume or fill in your role, skills, and
                      experience. We will recommend the best tech stacks and
                      tools to accelerate your career growth.
                    </p>
                  </div>

                  {/* Steps Section */}
                  <div className="grid grid-cols-3 gap-6 w-full max-w-xl mt-4">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        1
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800">
                          Upload Resume
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Extract your professional skills
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        2
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800">
                          Add Details
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Role, experience & country
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        3
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-800">
                          Get Recommendations
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Tailored stacks for your growth
                        </p>
                      </div>
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
