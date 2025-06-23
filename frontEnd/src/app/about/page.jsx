import Link from "next/link";
import { Heart, Users, BookOpen, Target } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "शांति",
      description: "हम मानते हैं कि आंतरिक शांति ही सच्ची खुशी का आधार है।",
    },
    {
      icon: Users,
      title: "समुदाय",
      description:
        "एक साथ मिलकर हम आध्यात्मिक विकास की यात्रा में एक-दूसरे का साथ देते हैं।",
    },
    {
      icon: BookOpen,
      title: "ज्ञान",
      description:
        "प्राचीन ज्ञान और आधुनिक समझ का संयोजन करके जीवन को बेहतर बनाते हैं।",
    },
    {
      icon: Target,
      title: "उद्देश्य",
      description:
        "हर व्यक्ति को अपने जीवन का सच्चा उद्देश्य खोजने में मदद करना।",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            हमारे बारे में
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-600 leading-relaxed"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            अनंतप्रज्ञा एक आध्यात्मिक मंच है, जहाँ शांति, ज्ञान और आत्म-अन्वेषण
            को महत्व दिया जाता है। हमारा उद्देश्य है सभी के लिए एक शांतिपूर्ण और
            प्रेरणादायक वातावरण प्रदान करना।
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                हमारा मिशन
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                अनंतप्रज्ञा का मिशन है आध्यात्मिक ज्ञान को सभी तक पहुंचाना और
                लोगों को उनकी आंतरिक शक्ति को पहचानने में मदद करना। हम चाहते हैं
                कि हर व्यक्ति अपने जीवन में शांति, खुशी और संतुलन पा सके।
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                हमारे लेख, ध्यान तकनीकें और आध्यात्मिक मार्गदर्शन के माध्यम से
                हम लोगों को एक बेहतर जीवन जीने की दिशा दिखाते हैं।
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl h-80 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span
                  className="text-4xl font-bold text-white"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  अ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              हमारे मूल्य
            </h2>
            <p className="text-gray-600 text-lg">
              जो सिद्धांत हमारे काम और दृष्टिकोण का आधार हैं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3
                  className="text-xl font-semibold text-gray-800 mb-3"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            हमारे साथ जुड़ें
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            अनंतप्रज्ञा के समुदाय का हिस्सा बनें और अपनी आध्यात्मिक यात्रा शुरू
            करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blogs">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                लेख पढ़ना शुरू करें
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all">
                संपर्क करें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
