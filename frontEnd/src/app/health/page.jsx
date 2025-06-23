import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Activity,
  Apple,
  Brain,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const healthContent = [
  {
    id: 1,
    title: "स्वस्थ जीवनशैली के नियम",
    summary:
      "स्वस्थ रहने के लिए अपनाएं ये सरल नियम। संतुलित आहार, व्यायाम और अच्छी नींद का महत्व।",
    content:
      "स्वास्थ्य ही सबसे बड़ा धन है। स्वस्थ जीवनशैली अपनाकर आप लंबा और खुशहाल जीवन जी सकते हैं...",
    category: "जीवनशैली",
    readTime: "10 मिनट",
    author: "हेल्थ एक्सपर्ट",
    date: "10 जनवरी 2025",
    icon: Heart,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "योग और ध्यान के फायदे",
    summary:
      "योग और ध्यान से शारीरिक और मानसिक स्वास्थ्य में सुधार। तनाव मुक्त जीवन के लिए योग।",
    content:
      "योग केवल शारीरिक व्यायाम नहीं, बल्कि संपूर्ण स्वास्थ्य का साधन है। नियमित योग से जीवन में संतुलन आता है...",
    category: "योग और ध्यान",
    readTime: "8 मिनट",
    author: "योग गुरु",
    date: "8 जनवरी 2025",
    icon: Activity,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "संतुलित आहार की गाइड",
    summary:
      "क्या खाएं और क्या न खाएं। संतुलित आहार से स्वस्थ रहने के तरीके और पोषण की जानकारी।",
    content:
      "आहार ही औषधि है। सही आहार से न केवल शरीर स्वस्थ रहता है, बल्कि मन भी प्रसन्न रहता है...",
    category: "पोषण",
    readTime: "9 मिनट",
    author: "न्यूट्रिशनिस्ट",
    date: "6 जनवरी 2025",
    icon: Apple,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "मानसिक स्वास्थ्य की देखभाल",
    summary: "मानसिक स्वास्थ्य का महत्व। तनाव, चिंता और अवसाद से बचने के उपाय।",
    content:
      "मानसिक स्वास्थ्य उतना ही महत्वपूर्ण है जितना शारीरिक स्वास्थ्य। मन की शांति के लिए सही तकनीकें अपनाएं...",
    category: "मानसिक स्वास्थ्य",
    readTime: "11 मिनट",
    author: "साइकोलॉजिस्ट",
    date: "4 जनवरी 2025",
    icon: Brain,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "नींद का महत्व",
    summary:
      "अच्छी नींद क्यों जरूरी है। गुणवत्तापूर्ण नींद के लिए टिप्स और नींद की समस्याओं का समाधान।",
    content:
      "अच्छी नींद स्वास्थ्य की आधारशिला है। गुणवत्तापूर्ण नींद से शरीर और मन दोनों को आराम मिलता है...",
    category: "नींद और आराम",
    readTime: "7 मिनट",
    author: "स्लीप स्पेशलिस्ट",
    date: "2 जनवरी 2025",
    icon: Heart,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "प्राकृतिक उपचार",
    summary:
      "घरेलू नुस्खे और प्राकृतिक उपचार। आयुर्वेदिक तरीकों से स्वास्थ्य सुधार।",
    content:
      "प्रकृति में हर बीमारी का इलाज छुपा है। प्राकृतिक उपचार से बिना साइड इफेक्ट के स्वस्थ रहें...",
    category: "प्राकृतिक चिकित्सा",
    readTime: "12 मिनट",
    author: "आयुर्वेद डॉक्टर",
    date: "31 दिसंबर 2024",
    icon: Apple,
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function Health() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-teal-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              स्वास्थ्य
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              स्वस्थ जीवन जीने के लिए संपूर्ण गाइड। यहाँ मिलेंगे स्वास्थ्य से
              जुड़े सभी सवालों के जवाब और व्यावहारिक सुझाव।
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
              स्वास्थ्य गाइड
            </h2>
            <p className="text-gray-600 text-lg">
              शारीरिक और मानसिक स्वास्थ्य के लिए संपूर्ण जानकारी
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 relative overflow-hidden flex items-center justify-center">
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
                    href={`/blog/blog_detail?id=${item.id}&category=health`}
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
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            स्वस्थ जीवन की शुरुआत करें
          </h2>
          <p className="text-green-100 text-lg mb-8 leading-relaxed">
            आज से ही अपने स्वास्थ्य की देखभाल शुरू करें और खुशहाल जीवन जिएं
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                हेल्थ गाइड पाएं
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-all">
                डॉक्टर से सलाह
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
