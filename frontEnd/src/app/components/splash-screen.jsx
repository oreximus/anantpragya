"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoAnant from "../../../public/logo_4.png"; // Adjust the path as per your project structure

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4" // Added p-4 for some padding on smaller screens
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              {/* Replaced the 'अ' div with the Image component */}
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto flex items-center justify-center">
                <Image
                  src={logoAnant} // Adjust the path as per your project structure
                  alt="Anantpragya Logo"
                  width={192} // Base width for mobile (w-32 ~ 128px, scaling up)
                  height={192} // Base height for mobile
                  layout="responsive" // Makes the image responsive to its parent div's width
                  objectFit="contain" // Ensures the entire image is visible within its bounds
                  className="max-w-full h-auto" // Ensures image doesn't overflow and maintains aspect ratio
                />
              </div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg lg:text-xl text-gray-600 px-4" // Adjusted text sizes and added horizontal padding
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                शांति, ज्ञान और आत्म-अन्वेषण का स्थान
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
