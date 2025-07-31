"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  ArrowLeft,
  Clock,
  Globe,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Add your form submission logic here
    alert("आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "ईमेल पता",
      details: "info@anantpragya.com",
      subDetails: "support@anantpragya.com",
    },
    {
      icon: Phone,
      title: "फोन नंबर",
      details: "+91 98765 43210",
      subDetails: "सुबह 9:00 से शाम 6:00 तक",
    },
    {
      icon: MapPin,
      title: "पता",
      details: "भारत",
      subDetails: "आध्यात्मिक केंद्र",
    },
    {
      icon: Clock,
      title: "समय",
      details: "24/7 उपलब्ध",
      subDetails: "ऑनलाइन सहायता",
    },
  ];

  const faqs = [
    {
      question: "अनंतप्रज्ञा क्या है?",
      answer:
        "अनंतप्रज्ञा एक आध्यात्मिक मंच है जो शांति, ज्ञान और आत्म-अन्वेषण के लिए समर्पित है।",
    },
    {
      question: "क्या यह सेवा निःशुल्क है?",
      answer: "हाँ, हमारे अधिकांश लेख और सामग्री निःशुल्क उपलब्ध है।",
    },
    {
      question: "मैं कैसे योगदान दे सकता हूँ?",
      answer:
        "आप हमारे साथ लेख साझा कर सकते हैं या समुदाय में सक्रिय भागीदारी कर सकते हैं।",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">मुख्य पृष्ठ पर जाएं</span>
          </Link>

          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              अ
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            संपर्क करें
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            आप हमें किसी भी प्रश्न या सुझाव के लिए संपर्क कर सकते हैं। हम आपकी
            सहायता के लिए हमेशा तैयार हैं।
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              संपर्क जानकारी
            </h2>
            <p className="text-gray-600 text-lg">
              हमसे जुड़ने के विभिन्न तरीके
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3
                  className="text-xl font-semibold text-gray-800 mb-3"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  {info.title}
                </h3>
                <p className="text-gray-700 font-medium mb-1">{info.details}</p>
                <p className="text-gray-500 text-sm">{info.subDetails}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              संदेश भेजें
            </h2>
            <p className="text-gray-600 text-lg">
              हमें अपना संदेश भेजें और हम जल्द ही आपसे संपर्क करेंगे
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पूरा नाम *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="आपका पूरा नाम"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ईमेल पता *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="आपका ईमेल पता"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    फोन नंबर
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="आपका फोन नंबर"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    विषय *
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="संदेश का विषय"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  संदेश *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="अपना संदेश यहाँ लिखें..."
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>संदेश भेजें</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <p className="text-gray-600 text-lg">
              आपके सामान्य प्रश्नों के उत्तर
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <h3
                  className="text-xl font-semibold text-gray-800 mb-3"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
            हमारे समुदाय में शामिल हों
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            अनंतप्रज्ञा के साथ अपनी आध्यात्मिक यात्रा शुरू करें और पाएं शांति,
            ज्ञान और प्रेरणा
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                साइन अप करें
              </button>
            </Link>
            <Link href="/blogs">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
                लेख पढ़ें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
