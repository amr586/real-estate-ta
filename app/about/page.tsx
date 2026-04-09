import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Building2, Target, Eye, Shield, Zap, Users, Award } from 'lucide-react';

export const metadata = {
  title: 'من نحن - Real Estate',
  description: 'تعرف على منصة Real Estate الرائدة للعقارات',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6 animate-slide-in-down">
            <Building2 className="w-12 h-12 text-purple-400" />
            <h2 className="text-2xl font-bold text-purple-400">Real Estate</h2>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance animate-slide-in-down">
            عن منصة العقارات
          </h1>
          <p className="text-xl text-purple-200/80 max-w-2xl mx-auto text-pretty animate-slide-in-up">
            منصة موثوقة وآمنة لتسهيل عمليات البيع والإيجار والاستثمار العقاري
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-purple-950/50 to-black border-purple-800/50 animate-slide-in-left">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white text-2xl">رسالتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200/70 leading-relaxed text-lg">
                نسعى لتطوير منصة عقارات شاملة تجمع بين البائعين والمشترين والمستأجرين بطريقة آمنة وموثوقة، مما يسهل عملية البحث عن العقار المناسب ويقلل الوقت والجهد المبذول.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-950/50 to-black border-purple-800/50 animate-slide-in-right">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white text-2xl">رؤيتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200/70 leading-relaxed text-lg">
                أن تكون منصتنا الخيار الأول والموثوق به لجميع احتياجات العقارات في المنطقة، وتوفير خدمات متميزة تساعد على تسهيل الصفقات العقارية.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white animate-slide-in-down">
            لماذا تختار منصتنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6 text-purple-400" />,
                title: 'أمان وموثوقية',
                description: 'جميع المعاملات آمنة وموثوقة مع ضمان حماية بيانات المستخدمين',
              },
              {
                icon: <Building2 className="w-6 h-6 text-purple-400" />,
                title: 'تنوع واسع',
                description: 'آلاف العقارات المتنوعة من شقق وفيلات وأراضي وعقارات تجارية',
              },
              {
                icon: <Zap className="w-6 h-6 text-purple-400" />,
                title: 'بحث ذكي',
                description: 'محرك بحث متقدم يساعدك في العثور على العقار المناسب بسهولة',
              },
              {
                icon: <Users className="w-6 h-6 text-purple-400" />,
                title: 'فريق دعم متميز',
                description: 'فريق دعم متاح 24/7 للإجابة على جميع استفساراتك',
              },
              {
                icon: <Award className="w-6 h-6 text-purple-400" />,
                title: 'واجهة سهلة الاستخدام',
                description: 'منصة بسيطة وسهلة الاستخدام للجميع',
              },
              {
                icon: <MapPin className="w-6 h-6 text-purple-400" />,
                title: 'تغطية شاملة',
                description: 'عقارات في جميع المناطق والمدن الرئيسية',
              },
            ].map((item, index) => (
              <Card key={index} className="bg-purple-950/30 border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600 transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-200/70">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white animate-slide-in-down">
            إنجازاتنا
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '5000+', label: 'عقار متاح' },
              { number: '10000+', label: 'مستخدم نشط' },
              { number: '500+', label: 'عملية يومية' },
              { number: '100%', label: 'رضا العملاء' },
            ].map((stat, index) => (
              <div key={index} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <h3 className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{stat.number}</h3>
                <p className="text-purple-200/70 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white animate-slide-in-down">
            تواصل معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-purple-950/30 border-purple-800/50 hover:border-purple-600 transition-all duration-300">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-3 text-lg">الهاتف</h3>
                <a href="tel:+201281378331" className="text-purple-300 hover:text-purple-400 transition-colors" dir="ltr">
                  +20 128 137 8331
                </a>
              </CardContent>
            </Card>

            <Card className="bg-purple-950/30 border-purple-800/50 hover:border-purple-600 transition-all duration-300">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-3 text-lg">البريد الإلكتروني</h3>
                <a href="mailto:amrw4634@gmail.com" className="text-purple-300 hover:text-purple-400 transition-colors">
                  amrw4634@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-purple-950/30 border-purple-800/50 hover:border-purple-600 transition-all duration-300">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-3 text-lg">العنوان</h3>
                <p className="text-purple-300">القاهرة، مصر</p>
              </CardContent>
            </Card>
          </div>
          
          {/* WhatsApp Button */}
          <div className="text-center mt-12">
            <a 
              href="https://wa.me/201281378331" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full transition-colors text-lg font-semibold"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>تواصل معنا عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 border-t border-purple-800/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-lg">Real Estate</span>
          </div>
          <p className="text-purple-200/70">&copy; 2026 Real Estate - منصة العقارات الذكية. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
