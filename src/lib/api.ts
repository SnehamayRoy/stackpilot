// API helper functions for StackPilot
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface StackRecommendation {
  stack: string;
  stackScore: number;
  medianSalary: number;
  learningPath: string[];
  demandTrend: number;
  description: string;
}

export interface CareerRecommendation {
  role: string;
  fitScore: number;
  medianSalary: number;
  salaryRange: { min: number; max: number };
  recommendedSkills: string[];
  companies: string[];
  growthPotential: number;
  description: string;
}

export interface TrendData {
  year: string;
  web: number;
  ai: number;
  cloud: number;
  mobile: number;
  data: number;
}

export interface SalaryData {
  role: string;
  bangalore: number;
  mumbai: number;
  delhi: number;
  hyderabad: number;
}

// Student recommendations API
export async function getStudentRecommendations(data: {
  city: string;
  domains: string[];
  learningTime: string;
  skillLevel: string;
}): Promise<StackRecommendation[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/recommend/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch student recommendations");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    // Return mock data for development
    return getMockStudentRecommendations(data);
  }
}

// Professional recommendations API
export async function getProfessionalRecommendations(data: {
  currentRole: string;
  skills: string[];
  experience: string;
  city: string;
}): Promise<CareerRecommendation[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/recommend/professional`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch professional recommendations");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    // Return mock data for development
    return getMockProfessionalRecommendations(data);
  }
}

// Trends data API
export async function getTrendsData(
  year: string,
  city: string = "All"
): Promise<{
  stackTrends: TrendData[];
  salaryData: SalaryData[];
  demandData: any[];
}> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/trends?year=${year}&city=${city}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trends data");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    // Return mock data for development
    return getMockTrendsData();
  }
}

// Mock data functions for development
function getMockStudentRecommendations(data: any): StackRecommendation[] {
  const recommendations: StackRecommendation[] = [
    {
      stack: "MERN Stack",
      stackScore: 0.85,
      medianSalary: 820000,
      learningPath: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"],
      demandTrend: 12,
      description:
        "Full-stack JavaScript development with MongoDB, Express, React, and Node.js",
    },
    {
      stack: "Python Data Science",
      stackScore: 0.78,
      medianSalary: 950000,
      learningPath: [
        "Python Basics",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "TensorFlow",
      ],
      demandTrend: 18,
      description: "Data analysis and machine learning with Python ecosystem",
    },
    {
      stack: "AWS Cloud",
      stackScore: 0.82,
      medianSalary: 1100000,
      learningPath: [
        "Linux Basics",
        "AWS Fundamentals",
        "Docker",
        "Kubernetes",
        "Terraform",
      ],
      demandTrend: 25,
      description: "Cloud infrastructure and DevOps with Amazon Web Services",
    },
  ];

  // Filter based on selected domains
  if (data.domains.includes("web")) {
    recommendations.push({
      stack: "React Native",
      stackScore: 0.75,
      medianSalary: 780000,
      learningPath: [
        "JavaScript",
        "React",
        "React Native",
        "Mobile Development",
      ],
      demandTrend: 15,
      description: "Cross-platform mobile development with React Native",
    });
  }

  if (data.domains.includes("ai-ml")) {
    recommendations.push({
      stack: "TensorFlow ML",
      stackScore: 0.88,
      medianSalary: 1200000,
      learningPath: [
        "Python",
        "Machine Learning",
        "TensorFlow",
        "Deep Learning",
      ],
      demandTrend: 22,
      description: "Machine learning and deep learning with TensorFlow",
    });
  }

  return recommendations.slice(0, 3);
}

function getMockProfessionalRecommendations(data: any): CareerRecommendation[] {
  const recommendations: CareerRecommendation[] = [
    {
      role: "Senior Data Engineer",
      fitScore: 0.84,
      medianSalary: 1800000,
      salaryRange: { min: 1500000, max: 2200000 },
      recommendedSkills: [
        "Apache Airflow",
        "Apache Spark",
        "ETL Pipelines",
        "Data Warehousing",
      ],
      companies: ["Amazon", "Microsoft", "Google", "Flipkart", "Swiggy"],
      growthPotential: 15,
      description:
        "Design and build scalable data pipelines for large-scale data processing",
    },
    {
      role: "Cloud Solutions Architect",
      fitScore: 0.78,
      medianSalary: 2200000,
      salaryRange: { min: 1800000, max: 2800000 },
      recommendedSkills: [
        "AWS Solutions",
        "Terraform",
        "Kubernetes",
        "System Design",
      ],
      companies: ["AWS", "Google Cloud", "Microsoft Azure", "TCS", "Infosys"],
      growthPotential: 22,
      description:
        "Design cloud-native solutions and lead technical architecture decisions",
    },
    {
      role: "Machine Learning Engineer",
      fitScore: 0.72,
      medianSalary: 1600000,
      salaryRange: { min: 1300000, max: 2000000 },
      recommendedSkills: [
        "MLOps",
        "TensorFlow",
        "Kubernetes",
        "Model Deployment",
      ],
      companies: ["Fractal Analytics", "Zeta", "Razorpay", "Paytm", "PhonePe"],
      growthPotential: 18,
      description: "Build and deploy machine learning models at scale",
    },
  ];

  return recommendations;
}

function getMockTrendsData() {
  return {
    stackTrends: [
      { year: "2023", web: 45, ai: 25, cloud: 30, mobile: 20, data: 35 },
      { year: "2024", web: 48, ai: 32, cloud: 38, mobile: 18, data: 42 },
      { year: "2025", web: 50, ai: 40, cloud: 45, mobile: 15, data: 48 },
    ],
    salaryData: [
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
    ],
    demandData: [
      { name: "JavaScript", worked: 65, want: 45, delta: 20 },
      { name: "Python", worked: 48, want: 52, delta: -4 },
      { name: "React", worked: 42, want: 38, delta: 4 },
      { name: "AWS", worked: 35, want: 48, delta: -13 },
      { name: "Docker", worked: 28, want: 42, delta: -14 },
      { name: "Kubernetes", worked: 18, want: 35, delta: -17 },
    ],
  };
}

// Utility functions
export function formatSalary(salary: number): string {
  if (salary >= 100000) {
    return `₹${(salary / 100000).toFixed(1)}L`;
  }
  return `₹${salary.toLocaleString()}`;
}

export function formatStackScore(score: number): string {
  return `${(score * 100).toFixed(0)}`;
}

export function getStackScoreColor(score: number): string {
  if (score >= 0.8) return "text-green-600";
  if (score >= 0.6) return "text-yellow-600";
  return "text-red-600";
}
