import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Award,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const hardWorkContent = [
  {
    id: 1,
    title: "मेहनत का फल मीठा होता है",
    summary:
      "कड़ी मेहनत ही सफलता की कुंजी है। जानें कि कैसे निरंतर प्रयास से बड़े लक्ष्य हासिल करें।",
    content:
      "मेहनत कभी बेकार नहीं जाती। भले ही परिणाम तुरंत न दिखे, लेकिन निरंतर मेहनत जरूर रंग लाती है...",
    category: "कड़ी मेहनत",
    readTime: "10 मिनट",
    author: "सफलता गुरु",
    date: "5 जनवरी 2025",
    icon: Zap,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "लक्ष्य और दृढ़ता",
    summary:
      "स्पष्ट लक्ष्य और अटूट दृढ़ता के साथ मेहनत करना। सफलता के लिए फोकस्ड एफर्ट की जरूरत।",
    content:
      "बिना लक्ष्य के मेहनत दिशाहीन होती है। स्पष्ट लक्ष्य के साथ की गई मेहनत हमेशा सफल होती है...",
    category: "लक्ष्य निर्धारण",
    readTime: "8 मिनट",
    author: "गोल सेटिंग कोच",
    date: "3 जनवरी 2025",
    icon: Target,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "निरंतरता की शक्ति",
    summary:
      "रोज थोड़ी-थोड़ी मेहनत बड़े बदलाव लाती है। निरंतरता ही सफलता का सबसे बड़ा राज है।",
    content:
      "बूंद-बूंद से घड़ा भरता है। रोजाना की छोटी मेहनत मिलकर बड़ी सफलता बनती है...",
    category: "निरंतरता",
    readTime: "9 मिनट",
    author: "कंसिस्टेंसी एक्सपर्ट",
    date: "1 जनवरी 2025",
    icon: TrendingUp,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "स्मार्ट वर्क vs हार्ड वर्क",
    summary:
      "केवल कड़ी मेहनत नहीं, स्मार्ट तरीके से मेहनत करना भी जरूरी है। दोनों का संतुलन सीखें।",
    content:
      "आज के युग में केवल कड़ी मेहनत काफी नहीं। स्मार्ट तरीके से मेहनत करना भी उतना ही जरूरी है...",
    category: "स्मार्ट वर्क",
    readTime: "11 मिनट",
    author: "प्रोडक्टिविटी गुरु",
    date: "30 दिसंबर 2024",
    icon: Award,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "मेहनत में आनंद खोजें",
    summary:
      "जब आप अपने काम से प्रेम करते हैं, तो मेहनत मेहनत नहीं लगती। पैशन के साथ काम करने का महत्व।",
    content:
      "जो काम आपको पसंद है, उसमें मेहनत करना आसान होता है। अपने पैशन को खोजें और उसमें मेहनत करें...",
    category: "पैशन और मेहनत",
    readTime: "7 मिनट",
    author: "पैशन कोच",
    date: "28 दिसंबर 2024",
    icon: Zap,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "असफलता के बाद भी मेहनत",
    summary:
      "असफलता के बाद हार न मानकर और भी कड़ी मेहनत करना। रिजिलिएंस और पर्सिस्टेंस का महत्व।",
    content:
      "असफलता मेहनत रुकने का कारण नहीं, बल्कि और कड़ी मेहनत करने का कारण होनी चाहिए...",
    category: "दृढ़ता",
    readTime: "12 मिनट",
    author: "रेजिलिएंस कोच",
    date: "26 दिसंबर 2024",
    icon: TrendingUp,
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function HardWork() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              कड़ी मेहनत
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              मेहनत की शक्ति को समझें और सफलता की राह पर आगे बढ़ें। यहाँ सीखें
              कि कैसे कड़ी मेहनत से बड़े सपने साकार करें।
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
              मेहनत की महिमा
            </h2>
            <p className="text-gray-600 text-lg">
              कड़ी मेहनत और दृढ़ता से भरे प्रेरणादायक लेख
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hardWorkContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-red-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-red-600 transition-colors"
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
                    href={`/blog/blog_detail?id=${item.id}&category=hard_work`}
                  >
                    <button className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 transition-colors group">
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
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            मेहनत की यात्रा शुरू करें
          </h2>
          <p className="text-red-100 text-lg mb-8 leading-relaxed">
            आज से ही अपने लक्ष्यों की दिशा में कड़ी मेहनत करना शुरू करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                मेहनत शुरू करें
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-red-600 transition-all">
                गाइडेंस लें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
