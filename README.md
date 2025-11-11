# StackPilot - AI-Powered Career & Tech Stack Recommendations

🚀 **Let data guide your dream stack** - A Next.js platform that uses real developer data, salary insights, and ML models to guide both freshers and experienced professionals in India toward better career and tech stack decisions.

## 🎯 Features

### For Students

- **Personalized Tech Stack Recommendations** based on market demand and salary data
- **Learning Paths** with step-by-step guidance
- **Salary Expectations** by city and tech stack
- **3-Year Demand Forecasts** with interactive charts

### For Professionals

- **Career Transition Recommendations** based on current skills
- **Salary Benchmarks** and growth potential analysis
- **Company Recommendations** and upskilling paths
- **Skill Gap Analysis** with targeted learning suggestions

### Market Insights

- **Interactive Trend Charts** showing tech stack adoption over time
- **Salary Comparisons** across Indian cities
- **Demand vs Desire Analysis** for different technologies
- **Real-time Market Data** from Stack Overflow surveys

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Framer Motion, Lucide React, Radix UI
- **Charts**: Recharts for data visualization
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stackpilot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
stackpilot/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── student/           # Student Zone
│   │   ├── professional/      # Professional Zone
│   │   ├── trends/           # Market Trends
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── Footer.tsx        # Footer component
│   └── lib/                  # Utility functions
│       └── api.ts           # API helpers and mock data
├── public/                   # Static assets
└── package.json
```

## 🎨 Design System

### Colors

- **Primary**: Blue (#3b82f6) - Trust and technology
- **Secondary**: Green (#10b981) - Growth and success
- **Accent**: Purple (#8b5cf6) - Innovation and creativity
- **Warning**: Orange (#f59e0b) - Attention and highlights

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible contrast

### Components

- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Smooth transitions, hover effects
- **Forms**: Clean inputs with focus states
- **Charts**: Interactive, responsive visualizations

## 🔧 API Integration

The application includes a comprehensive API layer with mock data for development:

### Student Recommendations

```typescript
POST /api/recommend/student
{
  "city": "Bangalore",
  "domains": ["web", "ai-ml"],
  "learningTime": "3-4",
  "skillLevel": "beginner"
}
```

### Professional Recommendations

```typescript
POST /api/recommend/professional
{
  "currentRole": "Software Engineer",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "2-3",
  "city": "Mumbai"
}
```

### Trends Data

```typescript
GET /api/trends?year=2024&city=Bangalore
```

## 📊 Data Sources

- **Stack Overflow Developer Survey** (2023-2025)
- **Indian Salary Datasets** from various job portals
- **Market Demand Analysis** from job postings
- **Technology Adoption Trends** from industry reports

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms

- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **AWS Amplify**: Scalable hosting

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for code formatting (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stack Overflow for developer survey data
- Indian tech community for insights and feedback
- Open source contributors and maintainers

## 📞 Support

For support, email support@stackpilot.com or join our community discussions.

---

**Built with ❤️ for the Indian developer community**
