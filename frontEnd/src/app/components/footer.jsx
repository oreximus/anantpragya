import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span
                  className="text-xl font-bold text-white"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  अ
                </span>
              </div>
              <h3
                className="text-xl font-bold text-gray-800"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                अनंतप्रज्ञा
              </h3>
            </div>
            <p
              className="text-gray-600 text-sm leading-relaxed"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              शांति, ज्ञान और आत्म-अन्वेषण का स्थान। हमारा उद्देश्य है सभी के
              लिए एक शांतिपूर्ण और प्रेरणादायक वातावरण प्रदान करना।
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Twitter className="w-4 h-4 text-blue-600" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Instagram className="w-4 h-4 text-blue-600" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Youtube className="w-4 h-4 text-blue-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              त्वरित लिंक
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  लेख / पठन
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  संपर्क करें
                </Link>
              </li>
              <li>
                <Link
                  href="/comments"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  टिप्पणियाँ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              श्रेणियाँ
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  आध्यात्म
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  ध्यान
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  योग
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  जीवन शैली
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              संपर्क जानकारी
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600 text-sm">
                  info@anantpragya.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                <span className="text-gray-600 text-sm">भारत</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 अनंतप्रज्ञा. सभी अधिकार सुरक्षित।
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
            >
              गोपनीयता नीति
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
            >
              नियम और शर्तें
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
