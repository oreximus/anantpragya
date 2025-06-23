import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Repeat,
  TrendingUp,
  CheckCircle,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const habitsContent = [
  {
    id: 1,
    title: "21 दिन में नई आदत बनाएं",
    summary:
      "वैज्ञानिक तरीके से नई आदतें कैसे बनाएं। 21 दिन के नियम की सच्चाई और व्यावहारिक तकनीकें।",
    content:
      "आदतें हमारे जीवन का 40% हिस्सा हैं। सही आदतें बनाना सफलता की कुंजी है। जानें कि कैसे...",
    category: "आदत निर्माण",
    readTime: "12 मिनट",
    author: "हैबिट कोच",
    date: "25 दिसंबर 2024",
    icon: Repeat,
  },
  {
    id: 2,
    title: "बुरी आदतों को छोड़ने का तरीका",
    summary:
      "नकारात्मक आदतों से कैसे छुटकारा पाएं। व्यावहारिक रणनीतियां और मानसिक तकनीकें।",
    content:
      "बुरी आदतें छोड़ना आसान नहीं, लेकिन असंभव भी नहीं। सही तकनीक और दृढ़ता से कुछ भी संभव है...",
    category: "आदत परिवर्तन",
    readTime: "10 मिनट",
    author: "व्यवहार विशेषज्ञ",
    date: "23 दिसंबर 2024",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "सुबह की दिनचर्या की शक्ति",
    summary:
      "एक बेहतरीन सुबह कैसे शुरू करें। मॉर्निंग रूटीन के फायदे और इसे बनाने के तरीके।",
    content:
      "दिन की शुरुआत कैसी हो, इससे पूरा दिन प्रभावित होता है। एक अच्छी सुबह की दिनचर्या जीवन बदल देती है...",
    category: "दैनिक दिनचर्या",
    readTime: "8 मिनट",
    author: "लाइफस्टाइल कोच",
    date: "21 दिसंबर 2024",
    icon: Star,
  },
  {
    id: 4,
    title: "आदतों का विज्ञान",
    summary:
      "मस्तिष्क में आदतें कैसे बनती हैं। न्यूरोसाइंस के आधार पर आदत निर्माण की समझ।",
    content:
      "आदतें हमारे मस्तिष्क में कैसे बनती हैं? इस वैज्ञानिक समझ से आप बेहतर आदतें बना सकते हैं...",
    category: "न्यूरोसाइंस",
    readTime: "15 मिनट",
    author: "न्यूरोसाइंटिस्ट",
    date: "19 दिसंबर 2024",
    icon: CheckCircle,
  },
  {
    id: 5,
    title: "छोटी आदतें, बड़े बदलाव",
    summary:
      "माइक्रो हैबिट्स की शक्ति। छोटी-छोटी आदतें कैसे बड़े परिवर्तन लाती हैं।",
    content:
      "बड़े बदलाव छोटी शुरुआत से होते हैं। एक मिनट की आदत भी जीवन में क्रांति ला सकती है...",
    category: "माइक्रो हैबिट्स",
    readTime: "7 मिनट",
    author: "मिनिमलिस्ट कोच",
    date: "17 दिसंबर 2024",
    icon: TrendingUp,
  },
  {
    id: 6,
    title: "आदत ट्रैकिंग की कला",
    summary:
      "अपनी आदतों को कैसे ट्रैक करें। प्रगति को मापने और प्रेरणा बनाए रखने के तरीके।",
    content:
      "जो मापा जाता है, वह बेहतर होता है। आदत ट्रैकिंग आपकी सफलता की संभावना बढ़ाता है...",
    category: "ट्रैकिंग सिस्टम",
    readTime: "9 मिनट",
    author: "प्रोडक्टिविटी एक्सपर्ट",
    date: "15 दिसंबर 2024",
    icon: CheckCircle,
  },
];

export default function Habits() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">वापस जाएं</span>
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              आदतें
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              सकारात्मक आदतें अपनाएं और अपने जीवन में बदलाव लाएं। यहाँ सीखें कि
              कैसे छोटी आदतें बड़े परिवर्तन लाती हैं।
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              आदत निर्माण की संपूर्ण गाइड
            </h2>
            <p className="text-gray-600 text-lg">
              वैज्ञानिक तरीकों से बेहतर आदतें बनाएं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {habitsContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-purple-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors"
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.summary}
                  </p>
                  <Link
                    href={`/blog/blog_detail?id=${item.id}&category=habits`}
                  >
                    <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1 transition-colors group">
                      <span>पूरा पढ़ें</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            आज से ही नई आदत शुरू करें
          </h2>
          <p className="text-purple-100 text-lg mb-8 leading-relaxed">
            छोटी शुरुआत करें, बड़े बदलाव देखें। आपकी सफलता की यात्रा यहीं से
            शुरू होती है
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                आदत ट्रैकर शुरू करें
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-all">
                पर्सनल कोचिंग
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
