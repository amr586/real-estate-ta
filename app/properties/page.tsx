'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Bed, Bath, Maximize2, Phone, Heart, Building2 } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  listingType: string;
  image: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    listingType: 'all',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: '1',
        title: 'شقة حديثة في مدينة نصر',
        description: 'شقة فاخرة مع إطلالة رائعة على المدينة، تشطيب سوبر لوكس',
        propertyType: 'apartment',
        price: 3500000,
        location: 'مدينة نصر',
        area: 150,
        bedrooms: 3,
        bathrooms: 2,
        listingType: 'sale',
        image: '/properties/modern-apartment.jpg',
      },
      {
        id: '2',
        title: 'فيلا فاخرة بحديقة واسعة',
        description: 'فيلا بحديقة واسعة وحمام سباحة، موقع مميز',
        propertyType: 'villa',
        price: 7800000,
        location: 'المعادي',
        area: 500,
        bedrooms: 5,
        bathrooms: 4,
        listingType: 'sale',
        image: '/properties/villa-exterior.jpg',
      },
      {
        id: '3',
        title: 'بنتهاوس بإطلالة بانورامية',
        description: 'بنتهاوس فاخر بإطلالة 360 درجة على المدينة',
        propertyType: 'apartment',
        price: 5200000,
        location: 'الزمالك',
        area: 250,
        bedrooms: 4,
        bathrooms: 3,
        listingType: 'sale',
        image: '/properties/penthouse.jpg',
      },
      {
        id: '4',
        title: 'مكتب تجاري في القاهرة الجديدة',
        description: 'مكتب إداري مجهز بالكامل في منطقة حيوية',
        propertyType: 'commercial',
        price: 2500000,
        location: 'القاهرة الجديدة',
        area: 120,
        bedrooms: 0,
        bathrooms: 2,
        listingType: 'sale',
        image: '/properties/office-space.jpg',
      },
      {
        id: '5',
        title: 'فيلا عصرية في الشيخ زايد',
        description: 'فيلا مستقلة بتصميم عصري وحديقة خاصة',
        propertyType: 'villa',
        price: 9500000,
        location: 'الشيخ زايد',
        area: 600,
        bedrooms: 6,
        bathrooms: 5,
        listingType: 'sale',
        image: '/properties/luxury-house.jpg',
      },
      {
        id: '6',
        title: 'استوديو مفروش للإيجار',
        description: 'استوديو مفروش بالكامل في موقع مميز',
        propertyType: 'apartment',
        price: 6000,
        location: 'مصر الجديدة',
        area: 60,
        bedrooms: 1,
        bathrooms: 1,
        listingType: 'rent',
        image: '/properties/studio-apartment.jpg',
      },
      {
        id: '7',
        title: 'شقة دوبلكس في التجمع الخامس',
        description: 'دوبلكس فاخر مع روف خاص وتراس واسع',
        propertyType: 'apartment',
        price: 4800000,
        location: 'التجمع الخامس',
        area: 280,
        bedrooms: 4,
        bathrooms: 3,
        listingType: 'sale',
        image: '/properties/modern-apartment.jpg',
      },
      {
        id: '8',
        title: 'شقة للإيجار في الدقي',
        description: 'شقة مفروشة بموقع قريب من المترو',
        propertyType: 'apartment',
        price: 12000,
        location: 'الدقي',
        area: 130,
        bedrooms: 2,
        bathrooms: 1,
        listingType: 'rent',
        image: '/properties/penthouse.jpg',
      },
      {
        id: '9',
        title: 'فيلا توين هاوس في أكتوبر',
        description: 'توين هاوس بحديقة خاصة في كمبوند راقي',
        propertyType: 'villa',
        price: 5500000,
        location: '6 أكتوبر',
        area: 350,
        bedrooms: 4,
        bathrooms: 3,
        listingType: 'sale',
        image: '/properties/villa-exterior.jpg',
      },
      {
        id: '10',
        title: 'محل تجاري في وسط البلد',
        description: 'محل تجاري بموقع استراتيجي على شارع رئيسي',
        propertyType: 'commercial',
        price: 3200000,
        location: 'وسط البلد',
        area: 80,
        bedrooms: 0,
        bathrooms: 1,
        listingType: 'sale',
        image: '/properties/office-space.jpg',
      },
    ];

    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let result = properties;

    if (currentFilters.search) {
      result = result.filter(
        (p) =>
          p.title.includes(currentFilters.search) ||
          p.location.includes(currentFilters.search)
      );
    }

    if (currentFilters.type !== 'all') {
      result = result.filter((p) => p.propertyType === currentFilters.type);
    }

    if (currentFilters.listingType !== 'all') {
      result = result.filter((p) => p.listingType === currentFilters.listingType);
    }

    if (currentFilters.minPrice) {
      result = result.filter((p) => p.price >= parseInt(currentFilters.minPrice));
    }
    if (currentFilters.maxPrice) {
      result = result.filter((p) => p.price <= parseInt(currentFilters.maxPrice));
    }

    setFilteredProperties(result);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Filters Section */}
      <section className="sticky top-16 z-40 bg-purple-950/95 backdrop-blur-sm border-b border-purple-800/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">بحث العقارات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="ابحث عن الموقع أو العنوان..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="col-span-1 md:col-span-2 lg:col-span-1 bg-black/50 border-purple-800/50 text-white placeholder:text-purple-400/50"
            />

            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger className="bg-black/50 border-purple-800/50 text-white">
                <SelectValue placeholder="نوع العقار" />
              </SelectTrigger>
              <SelectContent className="bg-purple-950 border-purple-800/50">
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="apartment">شقة</SelectItem>
                <SelectItem value="villa">فيلا</SelectItem>
                <SelectItem value="land">أرض</SelectItem>
                <SelectItem value="commercial">تجاري</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.listingType} onValueChange={(value) => handleFilterChange('listingType', value)}>
              <SelectTrigger className="bg-black/50 border-purple-800/50 text-white">
                <SelectValue placeholder="نوع الإدراج" />
              </SelectTrigger>
              <SelectContent className="bg-purple-950 border-purple-800/50">
                <SelectItem value="all">الجميع</SelectItem>
                <SelectItem value="sale">بيع</SelectItem>
                <SelectItem value="rent">إيجار</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="السعر من"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="bg-black/50 border-purple-800/50 text-white placeholder:text-purple-400/50"
            />

            <Input
              placeholder="السعر إلى"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="bg-black/50 border-purple-800/50 text-white placeholder:text-purple-400/50"
            />
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950 to-black">
        <div className="max-w-7xl mx-auto">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-purple-300">لم نجد عقارات تطابق معاييرك</p>
            </div>
          ) : (
            <>
              <p className="text-purple-300 mb-6">
                وجدنا {filteredProperties.length} عقار
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden bg-purple-950/30 border-purple-800/50 hover:border-purple-600 transition-all duration-300 group">
                    <Link href={`/properties/${property.id}`}>
                      <div className="relative aspect-video bg-purple-900/30 overflow-hidden">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          {property.listingType === 'sale' ? (
                            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                              للبيع
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
                              للإيجار
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link href={`/properties/${property.id}`}>
                            <CardTitle className="text-lg mb-1 text-white hover:text-purple-400 transition-colors">{property.title}</CardTitle>
                          </Link>
                          <CardDescription className="flex items-center gap-1 text-purple-300">
                            <MapPin className="w-4 h-4" />
                            {property.location}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:bg-red-950/50"
                        >
                          <Heart className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-2xl font-bold text-purple-400">
                        {property.price.toLocaleString('ar-EG')} {property.listingType === 'rent' ? 'ج.م/شهر' : 'ج.م'}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-2 text-purple-200/70">
                            <Bed className="w-4 h-4" />
                            <span>{property.bedrooms} غرفة نوم</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-purple-200/70">
                          <Bath className="w-4 h-4" />
                          <span>{property.bathrooms} حمام</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-200/70">
                          <Maximize2 className="w-4 h-4" />
                          <span>{property.area} متر مربع</span>
                        </div>
                      </div>

                      <p className="text-sm text-purple-200/70 line-clamp-2">
                        {property.description}
                      </p>

                      <div className="flex gap-2 pt-4">
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" asChild>
                          <a href="tel:+201281378331">
                            <Phone className="w-4 h-4 ml-2" />
                            اتصال
                          </a>
                        </Button>
                        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" asChild>
                          <a href="https://wa.me/201281378331" target="_blank" rel="noopener noreferrer">
                            <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            واتساب
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
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
