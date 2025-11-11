"use client";

import { useState } from "react";
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
  role: string;
  skills: string[];
  description: string;
}

export default function ProfessionalZone() {
  const [formData, setFormData] = useState({
    country: "",
    currentRole: "",
    experience: "",
    skills: [] as string[],
    resume: null as File | null,
  });

  const [searchTerm, setSearchTerm] = useState("");
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
    "JavaScript",
    "Python",
    "TypeScript",
    "Java",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "C++",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Machine Learning",
    "TensorFlow",
    "PyTorch",
    "Git",
    "Linux",
    "CI/CD",
    "Terraform",
    "Ansible",
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

  const handleSubmit = () => {
    // user can submit if either resume uploaded OR form filled
    const formValid =
      formData.country &&
      formData.currentRole &&
      formData.experience &&
      formData.skills.length > 0;

    if (!formValid && !formData.resume) return;

    setIsLoading(true);
    setShowResults(false);

    setTimeout(() => {
      let mockRecommendations: Recommendation[] = [];

      if (formData.resume) {
        // Simulate resume parsing and recommendations
        mockRecommendations = [
          {
            role: "AI/ML Engineer",
            description:
              "Analyze data and develop machine learning models for predictive insights.",
            skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
          },
          {
            role: "Cloud DevOps Engineer",
            description:
              "Automate deployments and manage cloud infrastructure efficiently.",
            skills: ["AWS", "Docker", "Terraform", "CI/CD", "Linux"],
          },
        ];
      } else {
        // Manual form-based mock recommendation
        mockRecommendations = [
          {
            role: "Senior Cloud Engineer",
            description:
              "Design, deploy, and optimize cloud infrastructure for scalable enterprise applications.",
            skills: [
              "AWS",
              "Docker",
              "Terraform",
              "Linux",
              "CI/CD",
              "Kubernetes",
            ],
          },
          {
            role: "Full Stack Developer",
            description:
              "Develop dynamic web applications using modern frontend and backend frameworks.",
            skills: [
              "React",
              "Node.js",
              "TypeScript",
              "MongoDB",
              "Next.js",
              "Tailwind CSS",
            ],
          },
        ];
      }

      setRecommendations(mockRecommendations);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
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

          {/* Results */}
          <div className="space-y-6">
            {showResults && recommendations.length > 0 ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Recommended Career Roles
                  </h3>
                </div>
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.role}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl"
                  >
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {index + 1}. {rec.role}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {rec.description}
                    </p>
                    <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Recommended Skills:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {rec.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-300 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-gray-200">
                <div className="text-gray-400 mb-6">
                  <Briefcase className="h-20 w-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Ready to advance your career?
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Upload your resume or fill in your country, experience, and
                  skills to get personalized career role recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
