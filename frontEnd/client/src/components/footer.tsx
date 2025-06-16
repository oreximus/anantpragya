import { Link } from "wouter";
import { Clover, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-saffron-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-gold-500 rounded-full flex items-center justify-center">
                <Clover className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-hindi text-saffron-600">अनंत प्रज्ञा</h3>
                <p className="text-sm text-terracotta-600 font-english">Infinite Wisdom</p>
              </div>
            </div>
            <p className="text-gray-600 font-hindi leading-relaxed mb-4">
              आध्यात्मिक ज्ञान और जीवन के सत्य की खोज में आपका साथी। प्राचीन भारतीय परंपरा और आधुनिक विज्ञान का संगम।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-saffron-600 hover:text-saffron-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-saffron-600 hover:text-saffron-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-saffron-600 hover:text-saffron-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-saffron-600 hover:text-saffron-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-hindi text-gray-800 mb-4">त्वरित लिंक</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  होम
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  ब्लॉग
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  संपर्क
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold font-hindi text-gray-800 mb-4">श्रेणियां</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  ध्यान
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  योग
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  दर्शन
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-saffron-600 font-hindi transition-colors">
                  आयुर्वेद
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-saffron-100 mt-8 pt-8 text-center">
          <p className="text-gray-600 font-hindi">
            © 2024 अनंत प्रज्ञा। सभी अधिकार सुरक्षित।
          </p>
        </div>
      </div>
    </footer>
  );
}
