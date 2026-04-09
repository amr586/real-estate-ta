import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search, Shield, Zap, Phone, Building2 } from 'lucide-react';

export const metadata = {
  title: 'Real Estate - منصة العقارات الذكية',
  description: 'ابحث عن أفضل العقارات - شقق للبيع والإيجار، فيلات، وأراضي تجارية مع أسعار منافسة وخدمات موثوقة',
};

export default function HomePage() {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'بحث متقدم',
      description: 'ابحث عن العقارات حسب الموقع والسعر والمواصفات',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'أفضل المواقع',
      description: 'اكتشف أفضل المناطق والعقارات المتميزة',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'عمليات آمنة',
      description: 'ضمان التزام كامل بحقوقك كمشتري أو مستأجر',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'خدمة سريعة',
      description: 'دعم فوري ورد سريع على جميع استفساراتك',
    },
  ];

  const properties = [
    { id: '1', name: 'شقة حديثة بموقع مميز', price: '3.5M', image: '/properties/modern-apartment.jpg' },
    { id: '2', name: 'فيلا فاخرة بحديقة', price: '7.8M', image: '/properties/villa-exterior.jpg' },
    { id: '3', name: 'بنتهاوس بإطلالة رائعة', price: '5.2M', image: '/properties/penthouse.jpg' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Parallax */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 parallax-hero">
          <Image
            src="/hero-building.jpg"
            alt="Real Estate"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-900/50 to-black/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-in-down">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building2 className="w-12 h-12 text-purple-400" />
              <h2 className="text-2xl font-bold text-purple-400">Real Estate</h2>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance">
              اعثر على عقارك المثالي
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto text-pretty">
              منصة عقارات حديثة وموثوقة لشراء وبيع وإيجار العقارات. ابحث من بين آلاف الخيارات بسهولة وأمان
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 btn-hover-effect text-lg px-8 py-6" asChild>
              <Link href="/properties">ابحث الآن</Link>
            </Button>
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-6 font-bold" asChild>
              <Link href="/properties?type=new">عروض جديدة</Link>
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <a href="tel:+201281378331" className="flex items-center gap-2 text-white/90 hover:text-purple-400 transition-colors">
              <Phone className="w-5 h-5" />
              <span dir="ltr">+20 128 137 8331</span>
            </a>
            <a href="https://wa.me/201281378331" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>واتساب</span>
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/80 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white animate-slide-in-down">
            العقارات المميزة
          </h2>
          <p className="text-center text-purple-300 mb-16">أفضل الخيارات المتاحة حالياً</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Link href={`/properties/${property.id}`} key={property.id} className="group cursor-pointer animate-slide-in-up block" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative h-72 overflow-hidden rounded-2xl mb-4 bg-purple-900/30">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                    <span className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md font-medium">
                      عرض التفاصيل
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{property.name}</h3>
                <p className="text-2xl font-bold text-purple-400">{property.price} ج.م</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white animate-slide-in-down">
            لماذا تختار منصتنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-purple-800/50 bg-purple-950/30 hover:bg-purple-900/40 hover:border-purple-600 transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="text-purple-400 mb-4 hover:scale-110 transition-transform">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-200/70">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-950">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-purple-700 to-purple-900 rounded-3xl p-12 md:p-16 text-white text-center animate-scale-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">هل أنت مالك عقار؟</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            اعرض عقاراتك على ملايين المشترين والمستأجرين المحتملين بسهولة وآمان
          </p>
          <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 btn-hover-effect text-lg px-8 py-6" asChild>
            <Link href="/register?role=owner">ابدأ الآن مجاناً</Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white animate-slide-in-down">
            كيف يعمل؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'ابحث', description: 'ابحث عن العقارات المناسبة لاحتياجاتك وميزانيتك' },
              { step: 2, title: 'اختر', description: 'اختر من آلاف الخيارات المتاحة والمتحققة' },
              { step: 3, title: 'تواصل', description: 'تواصل مع المالك وأكمل المعاملة بأمان' },
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-slide-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-purple-600/30">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-purple-200/70 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
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
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black to-purple-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-8 h-8 text-purple-400" />
                <h3 className="font-bold text-2xl">Real Estate</h3>
              </div>
              <p className="text-purple-200/70">منصتك الموثوقة والآمنة للعقارات</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-purple-300">الروابط</h4>
              <ul className="space-y-2 text-purple-200/70">
                <li><Link href="/" className="hover:text-purple-400 transition-colors">الرئيسية</Link></li>
                <li><Link href="/properties" className="hover:text-purple-400 transition-colors">العقارات</Link></li>
                <li><Link href="/about" className="hover:text-purple-400 transition-colors">عن الموقع</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-purple-300">القانوني</h4>
              <ul className="space-y-2 text-purple-200/70">
                <li><a href="#" className="hover:text-purple-400 transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">شروط الخدمة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-purple-300">تواصل معنا</h4>
              <p className="text-purple-200/70 mb-2">البريد: amrw4634@gmail.com</p>
              <p className="text-purple-200/70 mb-4" dir="ltr">الهاتف: +20 128 137 8331</p>
              <a 
                href="https://wa.me/201281378331" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
          <div className="border-t border-purple-800/50 pt-8 text-center text-purple-200/70">
            <p>&copy; 2026 Real Estate - منصة العقارات الذكية. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
