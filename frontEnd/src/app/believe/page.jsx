import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Shield,
  Mountain,
  Compass,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const believeContent = [
  {
    id: 1,
    title: "विश्वास की अटूट शक्ति",
    summary:
      "जब आप खुद पर विश्वास करते हैं, तो पूरी दुनिया आपका साथ देती है। विश्वास की शक्ति को समझें।",
    content:
      "विश्वास वह शक्ति है जो पहाड़ों को हिला देती है। जब आप अपने सपनों पर विश्वास करते हैं...",
    category: "आत्मविश्वास",
    readTime: "9 मिनट",
    author: "विश्वास गुरु",
    date: "2 जनवरी 2025",
    icon: Heart,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "अपनी क्षमताओं पर भरोसा",
    summary:
      "हर इंसान में अनंत संभावनाएं हैं। अपनी छुपी हुई क्षमताओं को पहचानें और उन पर भरोसा करें।",
    content:
      "आप जितना सोचते हैं उससे कहीं ज्यादा शक्तिशाली हैं। अपनी क्षमताओं पर भरोसा रखें...",
    category: "आत्मशक्ति",
    readTime: "8 मिनट",
    author: "पावर कोच",
    date: "31 दिसंबर 2024",
    icon: Shield,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "कठिन समय में विश्वास",
    summary:
      "जब सब कुछ अंधकारमय लगे, तब भी विश्वास न खोएं। कठिन समय में विश्वास ही आपका सहारा है।",
    content:
      "जीवन में कठिन समय आते रहते हैं, लेकिन विश्वास वह रोशनी है जो अंधेरे में भी राह दिखाती है...",
    category: "कठिन समय",
    readTime: "10 मिनट",
    author: "जीवन सलाहकार",
    date: "29 दिसंबर 2024",
    icon: Mountain,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "सपनों पर अटूट विश्वास",
    summary:
      "सपने तभी साकार होते हैं जब आप उन पर पूरा विश्वास करते हैं। अपने सपनों को जीवित रखें।",
    content:
      "सपने देखना आसान है, लेकिन उन पर विश्वास करना कठिन। जो लोग अपने सपनों पर विश्वास करते हैं...",
    category: "सपने और विश्वास",
    readTime: "7 मिनट",
    author: "ड्रीम कोच",
    date: "27 दिसंबर 2024",
    icon: Compass,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "विश्वास और धैर्य",
    summary:
      "सफलता के लिए विश्वास के साथ धैर्य भी जरूरी है। जानें कि कैसे धैर्य रखकर विश्वास को मजबूत बनाएं।",
    content:
      "विश्वास और धैर्य दोनों मिलकर चमत्कार करते हैं। जब आप धैर्य के साथ विश्वास रखते हैं...",
    category: "धैर्य और विश्वास",
    readTime: "11 मिनट",
    author: "धैर्य गुरु",
    date: "25 दिसंबर 2024",
    icon: Shield,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "विश्वास की जीत",
    summary:
      "इतिहास गवाह है कि विश्वास हमेशा जीतता है। विश्वास की शक्ति से जीती गई लड़ाइयों की कहानियां।",
    content:
      "महान लोगों की सफलता के पीछे उनका अटूट विश्वास था। विश्वास की शक्ति से कैसे जीतें...",
    category: "विजय की कहानियां",
    readTime: "12 मिनट",
    author: "इतिहासकार",
    date: "23 दिसंबर 2024",
    icon: Mountain,
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function Believe() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              विश्वास
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              अपने आप पर और अपने सपनों पर विश्वास करना सीखें। विश्वास की शक्ति
              से जीवन में असंभव को संभव बनाएं।
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
              विश्वास की शक्ति
            </h2>
            <p className="text-gray-600 text-lg">
              आत्मविश्वास और दृढ़ विश्वास से भरे प्रेरणादायक लेख
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {believeContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-emerald-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors"
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
                    href={`/blog/blog_detail?id=${item.id}&category=believe`}
                  >
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1 transition-colors group">
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
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            विश्वास की शक्ति को जगाएं
          </h2>
          <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
            आज से ही अपने अंदर की अनंत शक्ति पर विश्वास करना शुरू करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                विश्वास बढ़ाएं
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-emerald-600 transition-all">
                मार्गदर्शन लें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
