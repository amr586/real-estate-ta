import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Bed, Bath, Maximize2, Phone, Building2, ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

const properties = [
  {
    id: '1',
    title: 'شقة حديثة في مدينة نصر',
    description: 'شقة فاخرة مع إطلالة رائعة على المدينة، تشطيب سوبر لوكس. الشقة تتميز بموقعها الاستراتيجي القريب من جميع الخدمات والمواصلات. مساحات واسعة ومريحة مع تصميم داخلي عصري يجمع بين الأناقة والراحة.',
    propertyType: 'شقة',
    price: 3500000,
    location: 'مدينة نصر، القاهرة',
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    listingType: 'sale',
    image: '/properties/modern-apartment.jpg',
    features: ['تكييف مركزي', 'شرفة واسعة', 'جراج خاص', 'أمن 24 ساعة', 'مصعد'],
    year: 2023,
  },
  {
    id: '2',
    title: 'فيلا فاخرة بحديقة واسعة',
    description: 'فيلا مستقلة بحديقة واسعة وحمام سباحة خاص، موقع مميز في أرقى مناطق المعادي. تصميم كلاسيكي أنيق مع مساحات خضراء محيطة توفر الخصوصية والهدوء.',
    propertyType: 'فيلا',
    price: 7800000,
    location: 'المعادي، القاهرة',
    area: 500,
    bedrooms: 5,
    bathrooms: 4,
    listingType: 'sale',
    image: '/properties/villa-exterior.jpg',
    features: ['حمام سباحة', 'حديقة خاصة', 'جراج 2 سيارة', 'غرفة خادمة', 'مطبخ مجهز'],
    year: 2022,
  },
  {
    id: '3',
    title: 'بنتهاوس بإطلالة بانورامية',
    description: 'بنتهاوس فاخر بإطلالة 360 درجة على المدينة في قلب الزمالك. تصميم عصري فاخر مع تشطيبات من أعلى المستويات وتراس واسع للاستمتاع بالمناظر الخلابة.',
    propertyType: 'بنتهاوس',
    price: 5200000,
    location: 'الزمالك، القاهرة',
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    listingType: 'sale',
    image: '/properties/penthouse.jpg',
    features: ['تراس واسع', 'إطلالة بانورامية', 'جاكوزي', 'مطبخ إيطالي', 'نظام ذكي'],
    year: 2024,
  },
  {
    id: '4',
    title: 'مكتب تجاري في القاهرة الجديدة',
    description: 'مكتب إداري مجهز بالكامل في منطقة حيوية. موقع استراتيجي قريب من الطرق الرئيسية ومراكز الأعمال. مناسب للشركات الصغيرة والمتوسطة.',
    propertyType: 'تجاري',
    price: 2500000,
    location: 'القاهرة الجديدة',
    area: 120,
    bedrooms: 0,
    bathrooms: 2,
    listingType: 'sale',
    image: '/properties/office-space.jpg',
    features: ['تكييف مركزي', 'إنترنت فائق السرعة', 'غرفة اجتماعات', 'مطبخ صغير', 'أمن'],
    year: 2023,
  },
  {
    id: '5',
    title: 'فيلا عصرية في الشيخ زايد',
    description: 'فيلا مستقلة بتصميم عصري وحديقة خاصة في كمبوند راقي بالشيخ زايد. تتميز بالخصوصية التامة والهدوء مع كافة الخدمات والمرافق.',
    propertyType: 'فيلا',
    price: 9500000,
    location: 'الشيخ زايد، الجيزة',
    area: 600,
    bedrooms: 6,
    bathrooms: 5,
    listingType: 'sale',
    image: '/properties/luxury-house.jpg',
    features: ['حمام سباحة', 'نادي صحي', 'حديقة كبيرة', 'جراج 3 سيارات', 'غرفة سينما'],
    year: 2024,
  },
  {
    id: '6',
    title: 'استوديو مفروش للإيجار',
    description: 'استوديو مفروش بالكامل في موقع مميز قريب من المترو والخدمات. مثالي للأفراد أو الطلاب الباحثين عن سكن مريح وعملي.',
    propertyType: 'استوديو',
    price: 6000,
    location: 'مصر الجديدة، القاهرة',
    area: 60,
    bedrooms: 1,
    bathrooms: 1,
    listingType: 'rent',
    image: '/properties/studio-apartment.jpg',
    features: ['مفروش بالكامل', 'تكييف', 'إنترنت', 'قريب من المترو', 'أمن'],
    year: 2022,
  },
  {
    id: '7',
    title: 'شقة دوبلكس في التجمع الخامس',
    description: 'دوبلكس فاخر مع روف خاص وتراس واسع في أرقى مناطق التجمع الخامس. تصميم داخلي حديث ومساحات واسعة توفر الراحة للعائلة.',
    propertyType: 'دوبلكس',
    price: 4800000,
    location: 'التجمع الخامس، القاهرة',
    area: 280,
    bedrooms: 4,
    bathrooms: 3,
    listingType: 'sale',
    image: '/properties/modern-apartment.jpg',
    features: ['روف خاص', 'تراس', 'جراج', 'أمن 24 ساعة', 'نادي اجتماعي'],
    year: 2023,
  },
  {
    id: '8',
    title: 'شقة للإيجار في الدقي',
    description: 'شقة مفروشة بموقع ممتاز قريب من المترو والخدمات. مناسبة للعائلات الصغيرة أو الأزواج الباحثين عن موقع مركزي.',
    propertyType: 'شقة',
    price: 12000,
    location: 'الدقي، الجيزة',
    area: 130,
    bedrooms: 2,
    bathrooms: 1,
    listingType: 'rent',
    image: '/properties/penthouse.jpg',
    features: ['مفروشة', 'تكييف', 'قريب من المترو', 'هادئة', 'خدمات قريبة'],
    year: 2021,
  },
  {
    id: '9',
    title: 'فيلا توين هاوس في أكتوبر',
    description: 'توين هاوس بحديقة خاصة في كمبوند راقي بمدينة 6 أكتوبر. تصميم عصري مع كافة المرافق والخدمات المتكاملة.',
    propertyType: 'توين هاوس',
    price: 5500000,
    location: '6 أكتوبر، الجيزة',
    area: 350,
    bedrooms: 4,
    bathrooms: 3,
    listingType: 'sale',
    image: '/properties/villa-exterior.jpg',
    features: ['حديقة خاصة', 'جراج', 'كمبوند آمن', 'نادي', 'مدارس قريبة'],
    year: 2023,
  },
  {
    id: '10',
    title: 'محل تجاري في وسط البلد',
    description: 'محل تجاري بموقع استراتيجي على شارع رئيسي في قلب القاهرة. مناسب لجميع الأنشطة التجارية مع واجهة كبيرة.',
    propertyType: 'تجاري',
    price: 3200000,
    location: 'وسط البلد، القاهرة',
    area: 80,
    bedrooms: 0,
    bathrooms: 1,
    listingType: 'sale',
    image: '/properties/office-space.jpg',
    features: ['واجهة كبيرة', 'شارع رئيسي', 'كهرباء تجارية', 'مخزن', 'حمام'],
    year: 2020,
  },
];

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    return {
      title: 'عقار غير موجود - Real Estate',
    };
  }

  return {
    title: `${property.title} - Real Estate`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href="/properties" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للعقارات
        </Link>
      </div>

      {/* Property Details */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4">
                {property.listingType === 'sale' ? (
                  <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium">
                    للبيع
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
                    للإيجار
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-purple-300">
                  <MapPin className="w-5 h-5" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-purple-400">
                {property.price.toLocaleString('ar-EG')} {property.listingType === 'rent' ? 'ج.م/شهر' : 'ج.م'}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms > 0 && (
                  <div className="bg-purple-950/30 border border-purple-800/50 rounded-lg p-4 text-center">
                    <Bed className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">{property.bedrooms}</p>
                    <p className="text-purple-300 text-sm">غرف نوم</p>
                  </div>
                )}
                <div className="bg-purple-950/30 border border-purple-800/50 rounded-lg p-4 text-center">
                  <Bath className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">{property.bathrooms}</p>
                  <p className="text-purple-300 text-sm">حمام</p>
                </div>
                <div className="bg-purple-950/30 border border-purple-800/50 rounded-lg p-4 text-center">
                  <Maximize2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">{property.area}</p>
                  <p className="text-purple-300 text-sm">متر مربع</p>
                </div>
                <div className="bg-purple-950/30 border border-purple-800/50 rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">{property.year}</p>
                  <p className="text-purple-300 text-sm">سنة البناء</p>
                </div>
              </div>

              <p className="text-purple-200/80 leading-relaxed text-lg">
                {property.description}
              </p>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-lg py-6" asChild>
                  <a href="tel:+201281378331">
                    <Phone className="w-5 h-5 ml-2" />
                    اتصل الآن: +20 128 137 8331
                  </a>
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg py-6" asChild>
                  <a href="https://wa.me/201281378331" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    تواصل عبر واتساب
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <Card className="mt-12 bg-purple-950/30 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white text-2xl">مميزات العقار</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-purple-200">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="mt-8 bg-gradient-to-r from-purple-700 to-purple-900 border-0">
            <CardContent className="py-8">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-4">مهتم بهذا العقار؟</h3>
                <p className="text-purple-200 mb-6">تواصل معنا الآن للحصول على مزيد من المعلومات أو لترتيب زيارة</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:+201281378331" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span dir="ltr">+20 128 137 8331</span>
                  </a>
                  <a 
                    href="https://wa.me/201281378331" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    واتساب
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 border-t border-purple-800/30 mt-12">
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
