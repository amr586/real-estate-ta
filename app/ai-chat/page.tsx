'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, MessageSquare, Home, DollarSign, MapPin } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! أنا مساعدك الذكي للعقارات. يمكنني مساعدتك في البحث عن العقار المناسب، تحليل السوق، ومعلومات عن الاستثمار العقاري. كيف يمكنني مساعدتك؟',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses: { [key: string]: string } = {
    'أفضل منطقة': 'أفضل المناطق حالياً للاستثمار هي: مدينة نصر، الشيخ زايد، والتجمع الخامس. تتمتع هذه المناطق بأسعار تنافسية وموقع استراتيجي.',
    'سعر الشقة': 'متوسط سعر الشقة يتراوح بين 2-5 مليون جنيه حسب الموقع والمساحة. الشقق في مدينة نصر أغلى من الشقق في مناطق أخرى.',
    'استثمار': 'الاستثمار في العقارات يعتبر من أفضل الاستثمارات طويلة الأجل. العائد السنوي يتراوح بين 7-12% حسب الموقع والنوع.',
    'فيلا': 'الفيلات تتميز بمساحات واسعة وحدائق خاصة. الأسعار تبدأ من 5 ملايين جنيه وتصل إلى 20 مليون وأعلى حسب الموقع.',
    'شقة استوديو': 'الشقق الصغيرة (استوديو) مناسبة للعازبين والعاملين. الأسعار تتراوح بين 800 ألف و 1.5 مليون جنيه.',
    'تمويل': 'يمكنك الحصول على تمويل من البنوك برسوم فائدة تنافسية. معظم البنوك توفر تمويل يصل إلى 80% من قيمة العقار.',
    'default': 'هذا سؤال مهم! دعني أساعدك بمعلومات دقيقة عن السوق العقاري والخيارات المتاحة لك.',
  };

  const suggestedQuestions = [
    { icon: <MapPin className="w-5 h-5" />, text: 'أفضل منطقة للاستثمار' },
    { icon: <DollarSign className="w-5 h-5" />, text: 'سعر الشقة المتوسط' },
    { icon: <Home className="w-5 h-5" />, text: 'معلومات عن الفيلات' },
    { icon: <Sparkles className="w-5 h-5" />, text: 'نصائح الاستثمار العقاري' },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      let responseText = aiResponses['default'];
      const lowerInput = inputValue.toLowerCase();

      for (const key in aiResponses) {
        if (lowerInput.includes(key)) {
          responseText = aiResponses[key];
          break;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-8 pt-4 animate-slide-in-down">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-black dark:text-white" />
            <h1 className="text-4xl font-bold text-black dark:text-white">مساعد العقارات الذكي</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">استخدم الذكاء الاصطناعي للبحث عن العقار المناسب</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4 bg-gray-50 dark:bg-neutral-900 rounded-xl p-6">
          {messages.length === 1 && (
            <div className="flex flex-col gap-3 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">الأسئلة المقترحة:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(q.text)}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors text-left animate-slide-in-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <span className="text-black dark:text-white">{q.icon}</span>
                    <span className="text-black dark:text-white font-medium">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } animate-slide-in-up`}
            >
              <div
                className={`max-w-xl px-6 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-white dark:bg-neutral-800 text-black dark:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString('ar-EG', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-neutral-800 px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="اسأل عن العقارات..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="flex-1 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white px-6"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            size="lg"
            className="bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 btn-hover-effect"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
