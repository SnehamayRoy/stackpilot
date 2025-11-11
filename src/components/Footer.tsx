import Link from "next/link";
import { Compass, Github, Twitter, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Compass className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                StackPilot
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Let data guide your dream stack. Get personalized tech stack
              recommendations for students and professionals in India.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/student"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors block py-1"
                >
                  Student Zone
                </Link>
              </li>
              <li>
                <Link
                  href="/professional"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors block py-1"
                >
                  Professional Zone
                </Link>
              </li>
              <li>
                <Link
                  href="/trends"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors block py-1"
                >
                  Market Trends
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors block py-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors block py-1"
                >
                  Data Sources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors block py-1"
                >
                  Methodology
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2024 StackPilot. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 md:mt-0 flex items-center">
              Built with <Heart className="h-4 w-4 text-red-500 mx-1" /> for the
              Indian developer community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
