import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Users,
  Heart,
  Star,
  Clock,
  User,
  Calendar,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "बड़े सपने",
    description: "गहरे ज्ञान और अंतर्दृष्टि से भरे लेख पढ़ें",
    slug: "big_dreams",
  },
  {
    icon: Users,
    title: "निर्णय प्रक्रिया",
    description: "जीवन में सही दिशा पाने के लिए बेहतर निर्णय लेना सीखें",
    slug: "decision_process",
  },
  {
    icon: Star,
    title: "आदतें",
    description: "सकारात्मक आदतें अपनाएं और अपने जीवन में बदलाव लाएं",
    slug: "habits",
  },
  {
    icon: Heart,
    title: "संबंध",
    description: "रिश्तों में प्रेम, समझ और सामंजस्य स्थापित करें",
    slug: "relationship",
  },
];

const articles = [
  {
    title: "आत्मा की शांति",
    summary:
      "आत्मा की शांति कैसे प्राप्त करें। जीवन की भागदौड़ में मन को शांत रखने के सरल और प्रभावी तरीके।",
    excerpt: "जीवन की भागदौड़ में शांति पाने के सरल उपाय...",
    id: 1,
    category: "आध्यात्म",
    readTime: "5 मिनट",
    author: "गुरु जी",
    date: "15 दिसंबर 2024",
  },
  {
    title: "ध्यान का महत्व",
    summary:
      "ध्यान से जीवन में सकारात्मकता कैसे लाएं। दैनिक ध्यान के फायदे और सही तरीके।",
    excerpt: "ध्यान से जीवन में सकारात्मकता कैसे लाएं...",
    id: 2,
    category: "ध्यान",
    readTime: "7 मिनट",
    author: "आचार्य जी",
    date: "12 दिसंबर 2024",
  },
  {
    title: "सकारात्मक सोच",
    summary:
      "सकारात्मक सोच से जीवन में बदलाव। नकारात्मक विचारों को सकारात्मक में कैसे बदलें।",
    excerpt: "सकारात्मक सोच से जीवन में बदलाव लाने के तरीके...",
    id: 3,
    category: "प्रेरणा",
    readTime: "6 मिनट",
    author: "पंडित जी",
    date: "10 दिसंबर 2024",
  },
  {
    title: "योग और जीवन",
    summary:
      "योग के माध्यम से स्वस्थ और खुशहाल जीवन। योग के शारीरिक और मानसिक लाभ।",
    excerpt: "योग के माध्यम से स्वस्थ जीवन जीने के तरीके...",
    id: 4,
    category: "योग",
    readTime: "8 मिनट",
    author: "योग गुरु",
    date: "8 दिसंबर 2024",
  },
  {
    title: "आत्म-चिंतन की शक्ति",
    summary:
      "आत्म-चिंतन से व्यक्तित्व विकास। अपने अंदर झांकने और खुद को समझने के तरीके।",
    excerpt: "आत्म-चिंतन से व्यक्तित्व विकास के उपाय...",
    id: 5,
    category: "आत्म-विकास",
    readTime: "9 मिनट",
    author: "दार्शनिक जी",
    date: "5 दिसंबर 2024",
  },
  {
    title: "मन की शांति",
    summary:
      "मानसिक तनाव से मुक्ति पाने के उपाय। मन को शांत रखने की प्राचीन तकनीकें।",
    excerpt: "मानसिक तनाव से मुक्ति पाने के प्रभावी उपाय...",
    id: 6,
    category: "मानसिक स्वास्थ्य",
    readTime: "6 मिनट",
    author: "मनोवैज्ञानिक",
    date: "3 दिसंबर 2024",
  },
];

const recentArticles = articles.slice(0, 3);

export default function Blogs() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            लेख / पठन
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-600 leading-relaxed"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            आध्यात्मिक ज्ञान, प्रेरणा और जीवन के गहरे सत्य से भरे हमारे लेख
            पढ़ें। यहाँ आपको मिलेगा शांति, ज्ञान और आत्म-अन्वेषण का खजाना।
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              क्यों चुनें अनंतप्रज्ञा?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              हमारे साथ आध्यात्मिक यात्रा में शामिल हों और जीवन में नई दिशा पाएं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              return (
                <Link key={index} href={`./${feature.slug}`}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:scale-105 border border-gray-100 cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3
                      className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors"
                      style={{
                        fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">और पढ़ें</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              सभी लेख
            </h2>
            <p className="text-gray-600 text-lg">
              आध्यात्मिक ज्ञान और प्रेरणा से भरे हमारे सभी लेख
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 group-hover:from-blue-300/50 group-hover:to-indigo-300/50 transition-all"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors"
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.summary}
                  </p>
                  <Link
                    href={`/blog/blog_detail?id=${article.id}&category=general`}
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

      {/* Recent Articles Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              नवीनतम लेख
            </h2>
            <p className="text-gray-600 text-lg">
              आध्यात्मिक ज्ञान और प्रेरणा से भरे हमारे नवीनतम लेख पढ़ें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {article.readTime}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-800 mb-3"
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/blog/blog_detail?id=${article.id}&category=general`}
                  >
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors">
                      <span>पूरा पढ़ें</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/comments">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                टिप्पणियाँ देखें
              </button>
            </Link>
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
            आज ही शुरू करें अपनी आध्यात्मिक यात्रा
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            हमारे समुदाय में शामिल हों और पाएं दैनिक प्रेरणा, शांति और आत्मिक
            विकास के लिए मार्गदर्शन
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                साइन अप करें
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
                संपर्क करें
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/">
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2 mx-auto transition-colors">
              <span>मुख्य पृष्ठ पर जाएं</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
