import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Users2,
  MessageCircle,
  Handshake,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const relationshipsContent = [
  {
    id: 1,
    title: "प्रेम और समझ का रिश्ता",
    summary:
      "रिश्तों में प्रेम और समझ कैसे बनाए रखें। पार्टनर के साथ गहरा जुड़ाव बनाने के तरीके।",
    content:
      "सच्चा प्रेम समझ से शुरू होता है। जब हम अपने साथी को समझते हैं, तो रिश्ता मजबूत होता...",
    category: "प्रेम संबंध",
    readTime: "10 मिनट",
    author: "रिलेशनशिप काउंसलर",
    date: "28 दिसंबर 2024",
    icon: Heart,
  },
  {
    id: 2,
    title: "संवाद की कला",
    summary:
      "रिश्तों में बेहतर संवाद कैसे करें। सुनने और बोलने की तकनीकें जो रिश्तों को मजबूत बनाती हैं।",
    content:
      "अच्छा संवाद रिश्तों की आत्मा है। जानें कि कैसे प्रभावी तरीके से बात करें और सुनें...",
    category: "संवाद कौशल",
    readTime: "8 मिनट",
    author: "कम्युनिकेशन एक्सपर्ट",
    date: "26 दिसंबर 2024",
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "पारिवारिक रिश्तों में सामंजस्य",
    summary:
      "परिवार के सदस्यों के साथ बेहतर रिश्ते कैसे बनाएं। पीढ़ियों के बीच समझ बढ़ाने के उपाय।",
    content:
      "परिवार हमारी पहली पाठशाला है। यहाँ सीखे गए रिश्ते जीवन भर काम आते हैं...",
    category: "पारिवारिक रिश्ते",
    readTime: "12 मिनट",
    author: "फैमिली थेरेपिस्ट",
    date: "24 दिसंबर 2024",
    icon: Users2,
  },
  {
    id: 4,
    title: "दोस्ती के नियम",
    summary:
      "सच्ची दोस्ती कैसे करें और बनाए रखें। मित्रता में विश्वास और वफादारी का महत्व।",
    content:
      "दोस्ती जीवन का सबसे खूबसूरत रिश्ता है। यह बिना शर्त प्रेम और समर्थन देता है...",
    category: "मित्रता",
    readTime: "7 मिनट",
    author: "सोशल साइकोलॉजिस्ट",
    date: "22 दिसंबर 2024",
    icon: Handshake,
  },
  {
    id: 5,
    title: "रिश्तों में सीमाएं",
    summary:
      "स्वस्थ रिश्तों के लिए सीमाएं क्यों जरूरी हैं। अपनी और दूसरों की सीमाओं का सम्मान करना।",
    content:
      "सीमाएं रिश्तों को नष्ट नहीं करतीं, बल्कि उन्हें मजबूत बनाती हैं। जानें कि कैसे...",
    category: "स्वस्थ सीमाएं",
    readTime: "9 मिनट",
    author: "बाउंड्री कोच",
    date: "20 दिसंबर 2024",
    icon: Users2,
  },
  {
    id: 6,
    title: "माफी और क्षमा",
    summary:
      "रिश्तों में माफी का महत्व। कैसे माफ करें और माफी मांगें। क्षमा की शक्ति को समझें।",
    content:
      "माफी रिश्तों की दवा है। यह न केवल दूसरों को, बल्कि खुद को भी शांति देती है...",
    category: "क्षमा और माफी",
    readTime: "11 मिनट",
    author: "स्पिरिचुअल काउंसलर",
    date: "18 दिसंबर 2024",
    icon: Heart,
  },
];

export default function Relationships() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-red-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              संबंध
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              रिश्तों में प्रेम, समझ और सामंजस्य स्थापित करें। यहाँ सीखें कि
              कैसे बेहतर रिश्ते बनाएं और बनाए रखें।
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
              रिश्तों की संपूर्ण गाइड
            </h2>
            <p className="text-gray-600 text-lg">
              प्रेम, समझ और सामंजस्य से भरे रिश्ते बनाएं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relationshipsContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-rose-100 to-red-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-rose-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors"
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
                    href={`/blog/blog_detail?id=${item.id}&category=relationship`}
                  >
                    <button className="text-rose-600 hover:text-rose-700 font-medium flex items-center space-x-1 transition-colors group">
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
      <section className="py-20 px-4 bg-gradient-to-r from-rose-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            बेहतर रिश्ते बनाना शुरू करें
          </h2>
          <p className="text-rose-100 text-lg mb-8 leading-relaxed">
            आज से ही अपने रिश्तों में प्रेम, समझ और खुशी लाना शुरू करें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-rose-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                रिलेशनशिप गाइड पाएं
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-rose-600 transition-all">
                काउंसलिंग बुक करें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
