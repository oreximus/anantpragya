"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span
                className="text-3xl font-bold text-white"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                अ
              </span>
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              अनंतप्रज्ञा
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              शांति, ज्ञान और आत्म-अन्वेषण का स्थान। जहाँ आपकी आत्मा को सुकून
              मिलता है और मन को शांति प्राप्त होती है।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/blogs">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
                  <span>लेख पढ़ना शुरू करें</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/about">
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all">
                  हमारे बारे में जानें
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
