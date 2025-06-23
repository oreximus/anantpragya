import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Star,
  Zap,
  Sunrise,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const inspirationalContent = [
  {
    id: 1,
    title: "सफलता की राह में बाधाएं",
    summary:
      "जीवन में आने वाली चुनौतियों को कैसे अवसर में बदलें। हर बाधा एक नई सीख है।",
    content:
      "जीवन में आने वाली हर बाधा हमें कुछ सिखाने आती है। सफल लोग वही हैं जो बाधाओं को अवसर में बदल देते हैं...",
    category: "प्रेरणा",
    readTime: "8 मिनट",
    author: "प्रेरणा गुरु",
    date: "30 दिसंबर 2024",
    icon: Lightbulb,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "अपने सपनों को जीवित रखें",
    summary:
      "सपने देखना और उन्हें साकार करने की प्रेरणा। कभी हार न मानने की शक्ति।",
    content:
      "सपने वो नहीं जो हम सोते समय देखते हैं, बल्कि वो हैं जो हमें सोने नहीं देते। अपने सपनों को जीवित रखें...",
    category: "सपने और लक्ष्य",
    readTime: "10 मिनट",
    author: "मोटिवेशनल स्पीकर",
    date: "28 दिसंबर 2024",
    icon: Star,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "आत्मविश्वास की शक्ति",
    summary:
      "खुद पर भरोसा रखना सफलता की पहली शर्त है। आत्मविश्वास कैसे बढ़ाएं।",
    content:
      "आत्मविश्वास वह जादुई शक्ति है जो असंभव को संभव बना देती है। जब आप खुद पर भरोसा करते हैं...",
    category: "आत्मविकास",
    readTime: "7 मिनट",
    author: "सेल्फ हेल्प कोच",
    date: "26 दिसंबर 2024",
    icon: Zap,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "नई शुरुआत का साहस",
    summary:
      "जीवन में नई शुरुआत करने का साहस। पुराने को छोड़कर नए की तरफ बढ़ना।",
    content:
      "हर सूर्योदय एक नई शुरुआत का संदेश देता है। जीवन में भी नई शुरुआत करने का साहस रखें...",
    category: "नई शुरुआत",
    readTime: "9 मिनट",
    author: "लाइफ कोच",
    date: "24 दिसंबर 2024",
    icon: Sunrise,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "असफलता से सफलता तक",
    summary:
      "असफलता को सफलता की सीढ़ी कैसे बनाएं। हर गिरावट में छुपा है उठने का मौका।",
    content:
      "असफलता सफलता की सबसे बड़ी शिक्षक है। जो लोग असफलता से सीखते हैं, वे जरूर सफल होते हैं...",
    category: "असफलता और सफलता",
    readTime: "11 मिनट",
    author: "सक्सेस मेंटर",
    date: "22 दिसंबर 2024",
    icon: Star,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "खुशी का राज",
    summary: "सच्ची खुशी कहाँ मिलती है। छोटी चीजों में खुशी खोजने की कला।",
    content:
      "खुशी बाहर नहीं, अंदर मिलती है। जो लोग छोटी चीजों में खुशी खोजते हैं, वे हमेशा खुश रहते हैं...",
    category: "खुशी और संतुष्टि",
    readTime: "6 मिनट",
    author: "हैप्पीनेस कोच",
    date: "20 दिसंबर 2024",
    icon: Lightbulb,
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function Inspirational() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              प्रेरणादायक
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              जीवन में प्रेरणा और उत्साह भरने वाले लेख। यहाँ मिलेगी वह शक्ति जो
              आपको आगे बढ़ने के लिए प्रेरित करेगी।
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
              प्रेरणादायक लेख संग्रह
            </h2>
            <p className="text-gray-600 text-lg">
              जीवन को बदल देने वाली प्रेरणादायक कहानियां और विचार
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inspirationalContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-yellow-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors"
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
                    href={`/blog/blog_detail?id=${item.id}&category=inspirational`}
                  >
                    <button className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center space-x-1 transition-colors group">
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
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            प्रेरणा की यात्रा शुरू करें
          </h2>
          <p className="text-yellow-100 text-lg mb-8 leading-relaxed">
            आज से ही अपने जीवन में सकारात्मक बदलाव लाना शुरू करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                प्रेरणा पाएं
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-yellow-600 transition-all">
                सलाह लें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
