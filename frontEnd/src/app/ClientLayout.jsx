"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import SplashScreen from "../app/components/splash-screen";
import ReduxProvider from "../lib/providers/ReduxProvider";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
      setIsLoading(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setIsLoading(false);
    sessionStorage.setItem("splashShown", "true");
  };

  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/logo.png" />
        <title>अनंतप्रज्ञा - शांति, ज्ञान और आत्म-अन्वेषण का स्थान</title>
        <meta
          name="description"
          content="अनंतप्रज्ञा - शांति, ज्ञान और आत्म-अन्वेषण का स्थान। आध्यात्मिक लेख, ध्यान, योग और जीवन शैली के बारे में जानें।"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <ReduxProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

          {!isLoading && (
            <div className="flex">
              {/* Side Menu */}
              <div
                className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ width: "320px" }}
              >
                {/* This will be populated by the Header component */}
              </div>

              {/* Main Content Area */}
              <div
                className={`flex-1 min-h-screen transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "ml-80 mr-0" : "ml-0"
                }`}
              >
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <main>{children}</main>
                <Footer />
              </div>

              {/* Overlay for mobile */}
              {isMenuOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
            </div>
          )}
        </ReduxProvider>
      </body>
    </html>
  );
}
