import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "अधूरी जानकारी",
        description: "कृपया सभी आवश्यक फील्ड भरें।",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "संदेश भेजा गया",
      description: "आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे।",
    });

    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="shadow-warm-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-hindi text-saffron-600">
              संपर्क करें
            </CardTitle>
            <p className="text-gray-600 font-hindi">
              हमसे जुड़ें और अपने विचार साझा करें
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                  नाम <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="आपका नाम"
                  className="font-hindi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                  ईमेल <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="आपका ईमेल"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                  विषय
                </label>
                <Input
                  value={form.subject}
                  onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="संदेश का विषय"
                  className="font-hindi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                  संदेश <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="अपना संदेश यहाँ लिखें..."
                  className="font-hindi"
                  rows={5}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-saffron-500 hover:bg-saffron-600 font-hindi"
              >
                संदेश भेजें
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="shadow-warm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-saffron-600" />
                </div>
                <div>
                  <h3 className="font-semibold font-hindi text-gray-800">ईमेल</h3>
                  <p className="text-gray-600">contact@anantpragya.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold font-hindi text-gray-800">फोन</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-terracotta-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-terracotta-600" />
                </div>
                <div>
                  <h3 className="font-semibold font-hindi text-gray-800">पता</h3>
                  <p className="text-gray-600 font-hindi">
                    आध्यात्म केंद्र<br />
                    ऋषिकेश, उत्तराखंड<br />
                    भारत - 249137
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-saffron-50 border-saffron-200 shadow-warm">
            <CardContent className="p-6">
              <h3 className="font-semibold font-hindi text-saffron-700 mb-3">
                सामाजिक संपर्क
              </h3>
              <p className="text-saffron-600 font-hindi text-sm">
                हमारे सामाजिक माध्यमों पर हमसे जुड़ें और नवीनतम अपडेट पाएं।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
