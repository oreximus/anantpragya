import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="shadow-warm-lg">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold font-hindi text-saffron-600 mb-6">हमारे बारे में</h1>
          
          <div className="prose prose-lg max-w-none font-hindi text-gray-700 leading-relaxed">
            <p className="text-xl mb-6">
              अनंत प्रज्ञा एक आध्यात्मिक ब्लॉगिंग प्लेटफॉर्म है जो प्राचीन भारतीय ज्ञान परंपरा और आधुनिक जीवन के बीच सेतु का काम करता है।
            </p>
            
            <h2 className="text-2xl font-semibold text-saffron-600 mt-8 mb-4">हमारा उद्देश्य</h2>
            <p className="mb-6">
              हमारा मुख्य उद्देश्य है आधुनिक युग में व्यस्त जीवन जीने वाले लोगों को भारतीय दर्शन, योग, ध्यान और आयुर्वेद की शिक्षाओं से परिचित कराना। हम मानते हैं कि प्राचीन ज्ञान आज भी उतना ही प्रासंगिक है जितना हजारों साल पहले था।
            </p>
            
            <h2 className="text-2xl font-semibold text-saffron-600 mt-8 mb-4">हमारी विशेषताएं</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>प्रामाणिक और शोधित आध्यात्मिक सामग्री</li>
              <li>अनुभवी गुरुओं और आचार्यों के लेख</li>
              <li>व्यावहारिक योग और ध्यान की तकनीकें</li>
              <li>आयुर्वेदिक जीवनशैली की जानकारी</li>
              <li>दैनिक जीवन में आध्यात्म का समावेश</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-saffron-600 mt-8 mb-4">हमारी टीम</h2>
            <p className="mb-6">
              हमारी टीम में अनुभवी योग शिक्षक, आयुर्वेद विशेषज्ञ, दर्शनशास्त्र के विद्वान और आध्यात्मिक गुरु शामिल हैं। सभी लेखक अपने-अपने क्षेत्र में गहरा अनुभव रखते हैं और इनका उद्देश्य सच्चे ज्ञान को सरल भाषा में प्रस्तुत करना है।
            </p>
            
            <div className="bg-saffron-50 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold text-saffron-700 mb-3">संपर्क करें</h3>
              <p>यदि आपके कोई प्रश्न हैं या आप हमारे साथ जुड़ना चाहते हैं, तो कृपया हमसे संपर्क करें।</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
