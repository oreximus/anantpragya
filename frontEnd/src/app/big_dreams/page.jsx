import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Target,
  Lightbulb,
  Star,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const bigDreamsContent = [
  {
    id: 1,
    title: "सपनों को साकार करने की कला",
    summary:
      "बड़े सपने देखना और उन्हें हकीकत में बदलने के लिए व्यावहारिक रणनीतियां। जानें कि कैसे अपने लक्ष्यों को प्राप्त करें।",
    content:
      "सपने वो नहीं जो हम सोते समय देखते हैं, बल्कि वो हैं जो हमें सोने नहीं देते। बड़े सपने देखना जीवन की सबसे खूबसूरत बात है...",
    category: "लक्ष्य निर्धारण",
    readTime: "8 मिनट",
    author: "प्रेरणा गुरु",
    date: "20 दिसंबर 2024",
    icon: Target,
  },
  {
    id: 2,
    title: "असंभव को संभव बनाने की शक्ति",
    summary:
      "इतिहास के महान व्यक्तित्वों से सीखें कि कैसे उन्होंने असंभव लगने वाले सपनों को साकार किया।",
    content:
      "हर महान उपलब्धि पहले असंभव लगती थी। लेकिन दृढ़ संकल्प और निरंतर प्रयास से कुछ भी संभव है...",
    category: "प्रेरणा",
    readTime: "10 मिनट",
    author: "सफलता कोच",
    date: "18 दिसंबर 2024",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "विज़न बोर्ड की शक्ति",
    summary:
      "अपने सपनों को दृश्य रूप देकर उन्हें साकार करने की तकनीक। विज़न बोर्ड कैसे बनाएं और उसका उपयोग करें।",
    content:
      "जब आप अपने सपनों को देख सकते हैं, तो वे साकार होने की संभावना बढ़ जाती है। विज़न बोर्ड एक शक्तिशाली उपकरण है...",
    category: "तकनीक",
    readTime: "6 मिनट",
    author: "लाइफ कोच",
    date: "16 दिसंबर 2024",
    icon: Star,
  },
  {
    id: 4,
    title: "डर को जीतकर सपने पूरे करें",
    summary:
      "सफलता के रास्ते में आने वाले डर और संदेह को कैसे पार करें। साहस और आत्मविश्वास बढ़ाने के तरीके।",
    content:
      "डर हमारे सपनों का सबसे बड़ा दुश्मन है। लेकिन जब हम डर का सामना करते हैं, तो हम अपनी असली शक्ति को पहचानते हैं...",
    category: "मानसिक शक्ति",
    readTime: "7 मिनट",
    author: "मोटिवेशनल स्पीकर",
    date: "14 दिसंबर 2024",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "छोटे कदम, बड़े सपने",
    summary:
      "बड़े लक्ष्यों को छोटे, प्राप्त करने योग्य कदमों में बांटने की कला। प्रगति को मापने और बनाए रखने के तरीके।",
    content:
      "हर बड़ी यात्रा एक छोटे कदम से शुरू होती है। सफलता का रहस्य निरंतरता में है, न कि तेज़ी में...",
    category: "रणनीति",
    readTime: "9 मिनट",
    author: "सक्सेस मेंटर",
    date: "12 दिसंबर 2024",
    icon: Target,
  },
  {
    id: 6,
    title: "सपनों की डायरी",
    summary:
      "अपने सपनों और लक्ष्यों को लिखने का महत्व। जर्नलिंग के माध्यम से स्पष्टता और फोकस पाने के तरीके।",
    content:
      "जो सपने लिखे जाते हैं, वे सिर्फ सपने नहीं रह जाते, बल्कि लक्ष्य बन जाते हैं। लेखन की शक्ति अद्भुत है...",
    category: "व्यक्तिगत विकास",
    readTime: "5 मिनट",
    author: "जर्नलिंग एक्सपर्ट",
    date: "10 दिसंबर 2024",
    icon: BookOpen,
  },
];

export default function BigDreams() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              बड़े सपने
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              अपने सपनों को साकार करने की यात्रा शुरू करें। यहाँ मिलेंगे वे सभी
              उपकरण और प्रेरणा जो आपको अपने लक्ष्यों तक पहुंचने में मदद करेंगे।
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
              सपनों को साकार करने की गाइड
            </h2>
            <p className="text-gray-600 text-lg">
              व्यावहारिक सुझाव और प्रेरणादायक कहानियां
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bigDreamsContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-blue-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors"
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
                    href={`/blog/blog_detail?id=${item.id}&category=big_dreams`}
                  >
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors group">
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            अपने सपनों की यात्रा शुरू करें
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            आज ही अपने बड़े सपनों को साकार करने की दिशा में पहला कदम उठाएं
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                शुरुआत करें
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
                सलाह लें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
