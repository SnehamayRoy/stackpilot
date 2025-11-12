import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              {/* SVG logo from /public */}
              <div className="flex justify-center items-center gap-0 mb-6">
                <Image
                  src="/test2.svg"
                  alt="StackSense logo"
                  width={50}
                  height={60}
                  priority
                />
                <span className="text-4xl font-bold text-white tracking-tight">
                  Stack<span className="text-blue-600">Sense</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Let data guide your dream stack. Get personalized tech stack
              recommendations for students and professionals in India.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/student"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Student Zone
                </Link>
              </li>
              <li>
                <Link
                  href="/professional"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Professional Zone
                </Link>
              </li>
              <li>
                <Link
                  href="/trends"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Market Trends
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Data Sources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Methodology
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 StackPilot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
