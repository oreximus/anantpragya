import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Map,
  Navigation,
  Route,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const guidanceContent = [
  {
    id: 1,
    title: "जीवन की दिशा खोजना",
    summary:
      "जब जीवन में दिशा न दिखे तो क्या करें। अपने जीवन का सही रास्ता खोजने के तरीके।",
    content:
      "जीवन में कभी-कभी हम दिशाहीन महसूस करते हैं। ऐसे समय में सही मार्गदर्शन मिलना जरूरी है...",
    category: "जीवन दिशा",
    readTime: "12 मिनट",
    author: "जीवन सलाहकार",
    date: "8 जनवरी 2025",
    icon: Compass,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "करियर में सही निर्णय",
    summary:
      "करियर के मामले में सही फैसला कैसे लें। अपनी रुचि और क्षमता के अनुसार करियर चुनने की गाइड।",
    content:
      "करियर का चुनाव जीवन का सबसे महत्वपूर्ण निर्णय है। सही मार्गदर्शन से बेहतर करियर बनाएं...",
    category: "करियर गाइडेंस",
    readTime: "10 मिनट",
    author: "करियर काउंसलर",
    date: "6 जनवरी 2025",
    icon: Map,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "रिश्तों में मार्गदर्शन",
    summary:
      "पारिवारिक और व्यक्तिगत रिश्तों में आने वाली समस्याओं का समाधान। बेहतर रिश्ते बनाने की सलाह।",
    content:
      "रिश्ते जीवन की खुशी का आधार हैं। सही मार्गदर्शन से रिश्तों को मजबूत और खुशहाल बनाएं...",
    category: "रिश्ते की सलाह",
    readTime: "9 मिनट",
    author: "रिलेशनशिप एक्सपर्ट",
    date: "4 जनवरी 2025",
    icon: Navigation,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "वित्तीय योजना और सलाह",
    summary:
      "पैसे के मामले में स्मार्ट निर्णय कैसे लें। बचत, निवेश और वित्तीय सुरक्षा की गाइड।",
    content:
      "वित्तीय स्वतंत्रता पाने के लिए सही योजना जरूरी है। पैसे के मामले में सही मार्गदर्शन लें...",
    category: "वित्तीय सलाह",
    readTime: "11 मिनट",
    author: "फाइनेंशियल एडवाइजर",
    date: "2 जनवरी 2025",
    icon: Route,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "स्वास्थ्य और जीवनशैली",
    summary:
      "स्वस्थ जीवन जीने के लिए सही आदतें। शारीरिक और मानसिक स्वास्थ्य के लिए मार्गदर्शन।",
    content:
      "स्वास्थ्य ही सबसे बड़ा धन है। स्वस्थ जीवनशैली अपनाने के लिए सही मार्गदर्शन जरूरी है...",
    category: "स्वास्थ्य सलाह",
    readTime: "8 मिनट",
    author: "हेल्थ कोच",
    date: "31 दिसंबर 2024",
    icon: Compass,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "आध्यात्मिक मार्गदर्शन",
    summary:
      "आंतरिक शांति और आध्यात्मिक विकास के लिए मार्गदर्शन। जीवन में संतुलन और अर्थ खोजना।",
    content:
      "आध्यात्मिक विकास जीवन को पूर्णता देता है। सही मार्गदर्शन से आंतरिक शांति पाएं...",
    category: "आध्यात्मिक सलाह",
    readTime: "13 मिनट",
    author: "आध्यात्मिक गुरु",
    date: "29 दिसंबर 2024",
    icon: Navigation,
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function Guidance() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Compass className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              मार्गदर्शन
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              जीवन की हर समस्या का समाधान और सही दिशा पाएं। यहाँ मिलेगा
              विशेषज्ञों का मार्गदर्शन और व्यावहारिक सलाह।
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
              विशेषज्ञ मार्गदर्शन
            </h2>
            <p className="text-gray-600 text-lg">
              जीवन के हर क्षेत्र में सही दिशा और समाधान
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guidanceContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden flex items-center justify-center">
                  <item.icon className="w-16 h-16 text-indigo-600 opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors"
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
                    href={`/blog/blog_detail?id=${item.id}&category=guidance`}
                  >
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1 transition-colors group">
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
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            व्यक्तिगत मार्गदर्शन पाएं
          </h2>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            अपनी समस्याओं का समाधान और सही दिशा पाने के लिए विशेषज्ञों से सलाह
            लें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                मार्गदर्शन पाएं
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-all">
                सलाह बुक करें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
