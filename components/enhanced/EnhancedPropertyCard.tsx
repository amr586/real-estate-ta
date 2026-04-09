'use client';

import Image from 'next/image';
import { MapPin, Bed, Ruler, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface EnhancedPropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  priceType: 'monthly' | 'total';
  bedrooms: number;
  area: number;
  image: string;
  featured?: boolean;
  discount?: number;
}

export function EnhancedPropertyCard({
  id,
  title,
  location,
  price,
  priceType,
  bedrooms,
  area,
  image,
  featured = false,
  discount = 0,
}: EnhancedPropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const priceLabel = priceType === 'monthly' ? '/شهر' : 'ج.م';

  return (
    <div className="group h-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in">
      {/* Image Section */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {featured && (
            <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              مميز
            </div>
          )}
          {discount > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>

        {/* Action Buttons on Hover */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
          <Button
            className="flex-1 bg-white dark:bg-black text-black dark:text-white font-semibold hover:opacity-90 btn-hover-effect"
            onClick={() => {}}
          >
            عرض التفاصيل
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-black dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">السعر</div>
          <div className="text-2xl font-bold text-black dark:text-white">
            {price.toLocaleString('ar-EG')}
            <span className="text-sm ml-1">{priceLabel}</span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
            <Bed className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {bedrooms} غرف
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
            <Ruler className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {area} م²
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 py-3 btn-hover-effect"
          onClick={() => {}}
        >
          تواصل الآن
        </Button>
      </div>
    </div>
  );
}
