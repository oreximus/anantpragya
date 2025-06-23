import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Brain,
  Scale,
  Compass,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const decisionProcessContent = [
  {
    id: 1,
    title: "सही निर्णय लेने की कला",
    summary:
      "जीवन में आने वाली कठिन परिस्थितियों में सही निर्णय कैसे लें। व्यावहारिक तकनीकें और रणनीतियां।",
    content:
      "हर दिन हम सैकड़ों निर्णय लेते हैं। कुछ छोटे, कुछ बड़े। लेकिन सही निर्णय लेना एक कला है जो सीखी जा सकती है...",
    category: "निर्णय विज्ञान",
    readTime: "10 मिनट",
    author: "निर्णय विशेषज्ञ",
    date: "22 दिसंबर 2024",
    icon: Brain,
  },
  {
    id: 2,
    title: "भावना बनाम तर्क",
    summary:
      "निर्णय लेते समय भावनाओं और तर्क के बीच संतुलन कैसे बनाएं। दिल और दिमाग दोनों की सुनें।",
    content:
      "कभी-कभी दिल कुछ और कहता है और दिमाग कुछ और। सही निर्णय वह है जो दोनों को संतुष्ट करे...",
    category: "मानसिक संतुलन",
    readTime: "8 मिनट",
    author: "मनोवैज्ञानिक",
    date: "20 दिसंबर 2024",
    icon: Scale,
  },
  {
    id: 3,
    title: "समय प्रबंधन और निर्णय",
    summary:
      "तुरंत निर्णय कब लें और कब सोच-विचार करें। समय के अनुसार निर्णय लेने की रणनीति।",
    content:
      "कुछ निर्णय तुरंत लेने पड़ते हैं, कुछ के लिए समय मिलता है। जानें कि कौन सा निर्णय कब लेना चाहिए...",
    category: "समय प्रबंधन",
    readTime: "7 मिनट",
    author: "टाइम मैनेजमेंट कोच",
    date: "18 दिसंबर 2024",
    icon: Clock,
  },
  {
    id: 4,
    title: "टीम के साथ निर्णय लेना",
    summary:
      "सामूहिक निर्णय कैसे लें। टीम वर्क में सभी की राय का सम्मान करते हुए बेहतर निर्णय लेने के तरीके।",
    content:
      "अकेले लिया गया निर्णय और टीम के साथ लिया गया निर्णय में अंतर होता है। सामूहिक बुद्धि का उपयोग करें...",
    category: "टीम वर्क",
    readTime: "9 मिनट",
    author: "लीडरशिप कोच",
    date: "16 दिसंबर 2024",
    icon: Users,
  },
  {
    id: 5,
    title: "गलत निर्णयों से सीखना",
    summary:
      "गलत निर्णय भी सिखाते हैं। अपनी गलतियों से कैसे सीखें और भविष्य में बेहतर निर्णय लें।",
    content:
      "गलत निर्णय जीवन का हिस्सा हैं। महत्वपूर्ण यह है कि हम उनसे क्या सीखते हैं और कैसे आगे बढ़ते हैं...",
    category: "व्यक्तिगत विकास",
    readTime: "6 मिनट",
    author: "लाइफ कोच",
    date: "14 दिसंबर 2024",
    icon: Compass,
  },
  {
    id: 6,
    title: "निर्णय लेने के उपकरण",
    summary:
      "प्रैक्टिकल टूल्स और तकनीकें जो निर्णय लेने में मदद करती हैं। SWOT विश्लेषण से लेकर प्रो-कॉन लिस्ट तक।",
    content:
      "सही उपकरण सही निर्णय लेने में मदद करते हैं। जानें कि कौन से टूल्स कब और कैसे उपयोग करें...",
    category: "उपकरण और तकनीक",
    readTime: "11 मिनट",
    author: "बिजनेस एनालिस्ट",
    date: "12 दिसंबर 2024",
    icon: Brain,
  },
];

export default function DecisionProcess() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              निर्णय प्रक्रिया
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              जीवन में सही दिशा पाने के लिए बेहतर निर्णय लेना सीखें। यहाँ
              मिलेंगे व्यावहारिक तकनीकें और विशेषज्ञों की सलाह।
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
              निर्णय लेने की मास्टर गाइड
            </h2>
            <p className="text-gray-600 text-lg">
              विज्ञान और अनुभव पर आधारित निर्णय तकनीकें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {decisionProcessContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-green-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors"
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
                    href={`/blog/blog_detail?id=${item.id}&category=decision_process`}
                  >
                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 transition-colors group">
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
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            बेहतर निर्णय लेना सीखें
          </h2>
          <p className="text-green-100 text-lg mb-8 leading-relaxed">
            आज से ही अपनी निर्णय लेने की क्षमता को बेहतर बनाना शुरू करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                अभ्यास शुरू करें
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-all">
                विशेषज्ञ सलाह
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
