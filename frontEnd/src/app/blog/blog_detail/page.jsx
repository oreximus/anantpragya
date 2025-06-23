"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  BookOpen,
  Heart,
} from "lucide-react";
import { Suspense } from "react";

// Sample blog data - in a real app, this would come from an API or database
const blogData = {
  inspirational: [
    {
      id: 1,
      title: "सफलता की राह में बाधाएं",
      summary:
        "जीवन में आने वाली चुनौतियों को कैसे अवसर में बदलें। हर बाधा एक नई सीख है।",
      content: `जीवन में आने वाली हर बाधा हमें कुछ सिखाने आती है। सफल लोग वही हैं जो बाधाओं को अवसर में बदल देते हैं।

      जब हम किसी कठिनाई का सामना करते हैं, तो हमारे पास दो विकल्प होते हैं - या तो हम हार मान लें या फिर उस कठिनाई से सीखकर आगे बढ़ें। जो लोग दूसरा विकल्प चुनते हैं, वे ही जीवन में सफल होते हैं।

      बाधाएं हमारी शक्ति को परखती हैं। वे हमें दिखाती हैं कि हम कितने मजबूत हैं। जब हम किसी बाधा को पार करते हैं, तो हमारा आत्मविश्वास बढ़ता है और हम अगली चुनौती के लिए तैयार हो जाते हैं।

      याद रखें, हर सफल व्यक्ति के जीवन में कई बाधाएं आई हैं। लेकिन उन्होंने हार नहीं मानी। उन्होंने हर बाधा को एक सीढ़ी की तरह इस्तेमाल किया और सफलता की ऊंचाइयों तक पहुंचे।

      आज से ही अपनी सोच बदलें। बाधाओं को समस्या न मानकर अवसर मानें। हर कठिनाई में छुपा है एक नया रास्ता, एक नई संभावना।`,
      category: "प्रेरणा",
      readTime: "8 मिनट",
      author: "प्रेरणा गुरु",
      date: "30 दिसंबर 2024",
      image: "/placeholder.svg?height=400&width=800",
    },
    {
      id: 2,
      title: "अपने सपनों को जीवित रखें",
      summary:
        "सपने देखना और उन्हें साकार करने की प्रेरणा। कभी हार न मानने की शक्ति।",
      content: `सपने वो नहीं जो हम सोते समय देखते हैं, बल्कि वो हैं जो हमें सोने नहीं देते। अपने सपनों को जीवित रखना जीवन की सबसे बड़ी कला है।

      हर महान उपलब्धि पहले किसी के सपने में थी। जो लोग अपने सपनों को जीवित रखते हैं, वे ही उन्हें साकार कर पाते हैं।

      सपने देखना आसान है, लेकिन उन्हें जीवित रखना कठिन। जब चारों ओर निराशा हो, जब लोग कहें कि यह असंभव है, तब भी अपने सपनों पर विश्वास रखना - यही सच्ची शक्ति है।

      अपने सपनों को रोज याद करें। उन्हें लिखें, उनके बारे में बात करें, उनकी तस्वीर बनाएं। जितना ज्यादा आप अपने सपनों के साथ जुड़े रहेंगे, उतना ही वे आपको प्रेरित करते रहेंगे।

      याद रखें, हर सपना साकार हो सकता है अगर आप उस पर पूरा विश्वास रखें और उसके लिए मेहनत करते रहें।`,
      category: "सपने और लक्ष्य",
      readTime: "10 मिनट",
      author: "मोटिवेशनल स्पीकर",
      date: "28 दिसंबर 2024",
      image: "/placeholder.svg?height=400&width=800",
    },
  ],
  believe: [
    {
      id: 1,
      title: "विश्वास की अटूट शक्ति",
      summary:
        "जब आप खुद पर विश्वास करते हैं, तो पूरी दुनिया आपका साथ देती है। विश्वास की शक्ति को समझें।",
      content: `विश्वास वह शक्ति है जो पहाड़ों को हिला देती है। जब आप अपने सपनों पर विश्वास करते हैं, तो पूरी दुनिया आपकी मदद करने आ जाती है।

      विश्वास केवल एक भावना नहीं है, यह एक शक्ति है। यह वह शक्ति है जो असंभव को संभव बना देती है। जब आप किसी चीज पर पूरा विश्वास करते हैं, तो आपका पूरा व्यक्तित्व उस दिशा में काम करने लगता है।

      इतिहास गवाह है कि जिन लोगों ने अपने विश्वास को कभी नहीं खोया, उन्होंने असाधारण काम किए हैं। वे लोग जो आज हमारे प्रेरणास्रोत हैं, उन्होंने सबसे पहले खुद पर विश्वास किया था।

      विश्वास का मतलब यह नहीं है कि आप अंधे हो जाएं। विश्वास का मतलब है कि आप अपनी क्षमताओं को पहचानें और उन पर भरोसा करें।

      आज से ही अपने अंदर के विश्वास को जगाएं। खुद से कहें - 'मैं कर सकता हूं, मैं करूंगा, मैं जरूर सफल होऊंगा।'`,
      category: "आत्मविश्वास",
      readTime: "9 मिनट",
      author: "विश्वास गुरु",
      date: "2 जनवरी 2025",
      image: "/placeholder.svg?height=400&width=800",
    },
  ],
  hard_work: [
    {
      id: 1,
      title: "मेहनत का फल मीठा होता है",
      summary:
        "कड़ी मेहनत ही सफलता की कुंजी है। जानें कि कैसे निरंतर प्रयास से बड़े लक्ष्य हासिल करें।",
      content: `मेहनत कभी बेकार नहीं जाती। भले ही परिणाम तुरंत न दिखे, लेकिन निरंतर मेहनत जरूर रंग लाती है।

      जीवन में सफलता पाने का कोई शॉर्टकट नहीं है। केवल कड़ी मेहनत और दृढ़ता से ही बड़े लक्ष्य हासिल किए जा सकते हैं।

      मेहनत करते समय कभी-कभी लगता है कि हम आगे नहीं बढ़ रहे। लेकिन यह सिर्फ एक भ्रम है। हर दिन की मेहनत आपको आपके लक्ष्य के करीब ले जाती है।

      सफल लोगों की कहानियां देखें - सभी में एक बात समान है: निरंतर मेहनत। वे लोग जो आज शिखर पर हैं, उन्होंने कभी मेहनत करने से मना नहीं किया।

      याद रखें, मेहनत का फल हमेशा मीठा होता है। आज की मेहनत कल की सफलता बनती है।`,
      category: "कड़ी मेहनत",
      readTime: "10 मिनट",
      author: "सफलता गुरु",
      date: "5 जनवरी 2025",
      image: "/placeholder.svg?height=400&width=800",
    },
  ],
  guidance: [
    {
      id: 1,
      title: "जीवन की दिशा खोजना",
      summary:
        "जब जीवन में दिशा न दिखे तो क्या करें। अपने जीवन का सही रास्ता खोजने के तरीके।",
      content: `जीवन में कभी-कभी हम दिशाहीन महसूस करते हैं। ऐसे समय में सही मार्गदर्शन मिलना जरूरी है।

      जब आप अपने जीवन की दिशा खो देते हैं, तो सबसे पहले रुकें और अपने अंदर झांकें। अपने दिल की आवाज सुनें। आपका दिल आपको सही रास्ता दिखाएगा।

      अपने मूल्यों को पहचानें। आप किन चीजों को महत्वपूर्ण मानते हैं? आपके लिए सफलता का क्या मतलब है? इन सवालों के जवाब आपको अपनी दिशा दिखाएंगे।

      दूसरों की सलाह लें, लेकिन अंतिम फैसला हमेशा अपना करें। आपका जीवन है, आपको ही इसकी दिशा तय करनी है।

      याद रखें, हर इंसान का अपना रास्ता होता है। दूसरों की नकल न करें, अपना अनूठा रास्ता बनाएं।`,
      category: "जीवन दिशा",
      readTime: "12 मिनट",
      author: "जीवन सलाहकार",
      date: "8 जनवरी 2025",
      image: "/placeholder.svg?height=400&width=800",
    },
  ],
  health: [
    {
      id: 1,
      title: "स्वस्थ जीवनशैली के नियम",
      summary:
        "स्वस्थ रहने के लिए अपनाएं ये सरल नियम। संतुलित आहार, व्यायाम और अच्छी नींद का महत्व।",
      content: `स्वास्थ्य ही सबसे बड़ा धन है। स्वस्थ जीवनशैली अपनाकर आप लंबा और खुशहाल जीवन जी सकते हैं।

      स्वस्थ जीवनशैली के तीन मुख्य स्तंभ हैं: संतुलित आहार, नियमित व्यायाम और पर्याप्त नींद।

      संतुलित आहार का मतलब है सभी पोषक तत्वों को सही मात्रा में लेना। फल, सब्जियां, अनाज, दालें - सभी को अपने भोजन में शामिल करें।

      नियमित व्यायाम न केवल शरीर को स्वस्थ रखता है, बल्कि मन को भी प्रसन्न रखता है। रोज कम से कम 30 मिनट व्यायाम जरूर करें।

      अच्छी नींद स्वास्थ्य के लिए बहुत जरूरी है। 7-8 घंटे की गुणवत्तापूर्ण नींद लें।

      इन सरल नियमों को अपनाकर आप एक स्वस्थ और खुशहाल जीवन जी सकते हैं।`,
      category: "जीवनशैली",
      readTime: "10 मिनट",
      author: "हेल्थ एक्सपर्ट",
      date: "10 जनवरी 2025",
      image: "/placeholder.svg?height=400&width=800",
    },
  ],
};

function BlogDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  // Get the specific blog post
  const categoryData = blogData[category] || [];
  const blog = categoryData.find((item) => item.id === Number.parseInt(id));

  // Get related blogs (other blogs from the same category)
  const relatedBlogs = categoryData
    .filter((item) => item.id !== Number.parseInt(id))
    .slice(0, 3);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            लेख नहीं मिला
          </h1>
          <Link href="/blogs">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              वापस जाएं
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">वापस जाएं</span>
          </Link>

          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            {blog.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>साझा करें</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4" />
              <span>पसंद</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blog Image */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-700 leading-relaxed text-lg whitespace-pre-line"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            {blog.content}
          </div>
        </div>

        {/* Author Info */}
        <div className="bg-gray-50 rounded-2xl p-6 mt-12 mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3
                className="text-xl font-semibold text-gray-800 mb-1"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                {blog.author}
              </h3>
              <p className="text-gray-600">
                अनंतप्रज्ञा के साथ जुड़े विशेषज्ञ लेखक
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                संबंधित लेख
              </h2>
              <p className="text-gray-600">इसी विषय पर और भी रोचक लेख पढ़ें</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <div
                  key={relatedBlog.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                    <img
                      src={relatedBlog.image || "/placeholder.svg"}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {relatedBlog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{relatedBlog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{relatedBlog.readTime}</span>
                      </div>
                    </div>
                    <h3
                      className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors"
                      style={{
                        fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                      }}
                    >
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {relatedBlog.summary}
                    </p>
                    <Link
                      href={`/blog/blog_detail?id=${relatedBlog.id}&category=${category}`}
                    >
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors group">
                        <span>पूरा पढ़ें</span>
                        <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            और भी प्रेरणादायक लेख पढ़ें
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            अनंतप्रज्ञा के साथ अपनी आध्यात्मिक यात्रा जारी रखें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blogs">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                सभी लेख देखें
              </button>
            </Link>
            <Link href="/signup">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
                न्यूज़लेटर सब्सक्राइब करें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogDetail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <BlogDetailContent />
    </Suspense>
  );
}
