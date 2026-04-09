'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'مجاني',
    price: 0,
    description: 'للبدء',
    features: [
      'إضافة 5 عقارات فقط',
      'البحث الأساسي',
      'عرض محدود',
      'دعم بريد إلكتروني',
    ],
    cta: 'ابدأ مجاناً',
    popular: false,
    duration: 'شهري',
  },
  {
    name: 'متقدم',
    price: 199,
    description: 'للمتخصصين',
    features: [
      'إضافة 50 عقار',
      'بحث متقدم',
      'عرض محسّن',
      'إحصائيات العقارات',
      'دعم أولوي',
      'إزالة الإعلانات',
    ],
    cta: 'اشترك الآن',
    popular: true,
    duration: 'شهري',
  },
  {
    name: 'احترافي',
    price: 499,
    description: 'للوكالات',
    features: [
      'عقارات غير محدودة',
      'بحث متقدم',
      'عرض احترافي',
      'إحصائيات مفصلة',
      'دعم هاتفي',
      'تحليلات متقدمة',
      'API للتكامل',
      'مدير مخصص',
    ],
    cta: 'اشترك الآن',
    popular: false,
    duration: 'شهري',
  },
];

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    // Navigate to payment page
    window.location.href = `/payment?plan=${planName.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 text-balance">
            اختر خطتك المناسبة
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
            ارتقِ بعقاراتك واصل إلى ملايين المشترين المحتملين
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative ${plan.popular ? 'md:scale-105 md:z-10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      الأكثر شهرة
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full flex flex-col ${
                    plan.popular ? 'border-blue-600 border-2' : ''
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-slate-900">
                          {plan.price}
                        </span>
                        <span className="text-slate-600 ml-2">ج.م/{plan.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                      }`}
                      onClick={() => handleSubscribe(plan.name)}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            أسئلة شائعة
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'هل يمكنني تغيير الخطة لاحقاً؟',
                a: 'نعم، يمكنك التحديث أو الترقية إلى أي خطة في أي وقت. التغييرات تسري على الفور.',
              },
              {
                q: 'هل هناك عقد طويل الأجل؟',
                a: 'لا، جميع الخطط شهرية وليس هناك التزام طويل الأجل. يمكنك الإلغاء في أي وقت.',
              },
              {
                q: 'هل يوجد فترة تجريبية مجانية؟',
                a: 'نعم، يمكنك البدء بالخطة المجانية وترقيتها عندما تكون مستعداً.',
              },
              {
                q: 'هل تقدمون استرجاع الأموال؟',
                a: 'نعم، نقدم استرجاع كامل المبلغ خلال 7 أيام من الشراء.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
