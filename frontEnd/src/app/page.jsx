"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import logoAnant from "../../public/logo_4.png"; // Adjust the path as per your project structure

export default function Home() {
  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@ceobrahmendragupta",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/BrahmendraGuptaG",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/BrahmendraGupta",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/brahmendraguptain?igsh=MXB6MHFwYmNrc2RuOA==",
    },
  ];

  return (
    // CHANGED: Removed min-h-screen to allow footer to be closer if content is short, added overflow-x-hidden to prevent horizontal scroll issues.
    <div className="bg-white flex flex-col items-center overflow-x-hidden">
      {/* New Top Section */}
      {/* CHANGED: Adjusted vertical padding to be smaller on mobile devices */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-20 px-4 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            {/* This responsive logo setup is already great, no changes needed here */}
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto flex items-center justify-center">
              <Image
                src={logoAnant}
                alt="Anantpragya Logo"
                width={192}
                height={192}
                priority // ADDED: Mark image as priority to load faster (LCP)
                className="w-full h-auto" // CHANGED: Simplified image classes for modern Next.js
              />
            </div>
            {/* CHANGED: Adjusted font size and margin for better mobile readability */}
            <p
              className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              शांति, ज्ञान और आत्म-अन्वेषण का स्थान। जहाँ आपकी आत्मा को सुकून
              मिलता है और मन को शांति प्राप्त होती है।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/blogs">
                {/* CHANGED: Made button padding and text size responsive */}
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium text-base transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <span>लेख पढ़ना शुरू करें</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/about">
                {/* CHANGED: Made button padding and text size responsive */}
                <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium text-base hover:bg-blue-600 hover:text-white transition-all">
                  हमारे बारे में जानें
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      {/* CHANGED: Adjusted padding and negative margin for better responsive behavior */}
      <section className="relative py-12 md:py-16 w-full max-w-4xl rounded-lg shadow-xl -mt-12 md:-mt-16 bg-white z-10 mb-8 mx-4 sm:mx-0">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Circular Image is already responsive, no changes needed */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg mb-6">
              <Image
                src="/image.png"
                alt="Brahmendra Gupta"
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Name */}
            {/* CHANGED: Made font size scale more smoothly across breakpoints */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Brahmendra Gupta
            </h1>

            {/* Expanded Description */}
            {/* CHANGED: Adjusted font size for better mobile readability */}
            <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ब्रह्मेंद्र गुप्ता जी एक प्रतिष्ठित आध्यात्मिक गुरु और लेखक हैं,
              जो मूल रूप से दतिया जिले के निवासी हैं। उन्होंने भौतिकी में
              एम.एससी. और एक दूरस्थ विश्वविद्यालय से एम.फिल. शोध डिग्री प्राप्त
              की है। 1996 में मध्य प्रदेश लोक सेवा आयोग की राज्य सेवा परीक्षा
              में चयन के बाद उन्होंने खंड विकास अधिकारी के रूप में अपनी सरकारी
              सेवा शुरू की। वे अपने लेखन और शिक्षाओं के माध्यम से आंतरिक शांति
              और आत्म-खोज के लिए ज्ञान साझा करने के लिए समर्पित हैं।
            </p>

            {/* More Information Button */}
            <div className="flex justify-center mb-8">
              <Link href="/about" passHref>
                {/* CHANGED: Made button padding and text size responsive */}
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium text-base hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
                  <span>और जानकारी</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="w-full max-w-xl mx-auto overflow-x-auto py-4 scrollbar-hide">
              {/* CHANGED: Adjusted gap for different screen sizes */}
              <div className="flex flex-nowrap justify-center gap-6 sm:gap-8 md:gap-12 whitespace-nowrap">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                  >
                    {/* Icon size is already responsive, no changes needed */}
                    <link.icon className="w-8 h-8 md:w-10 md:h-10 mb-2 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
