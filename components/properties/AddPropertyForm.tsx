'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export function AddPropertyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    listingType: 'sale',
    price: '',
    location: '',
    areaSqm: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'حدث خطأ في إضافة العقار');
        return;
      }

      toast.success('تمت إضافة العقار بنجاح!');
      setFormData({
        title: '',
        description: '',
        propertyType: 'apartment',
        listingType: 'sale',
        price: '',
        location: '',
        areaSqm: '',
        bedrooms: '',
        bathrooms: '',
      });
    } catch (error) {
      console.error('[AddPropertyForm] Error:', error);
      toast.error('حدث خطأ في الاتصال');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إضافة عقار جديد</CardTitle>
        <CardDescription>أضف تفاصيل عقارك بالكامل</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">عنوان العقار</label>
            <Input
              name="title"
              placeholder="مثال: شقة فاخرة في المعادي"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">الوصف</label>
            <textarea
              name="description"
              placeholder="اكتب وصف مفصل للعقار..."
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Property Type and Listing Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">نوع العقار</label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => handleSelectChange('propertyType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">شقة</SelectItem>
                  <SelectItem value="villa">فيلا</SelectItem>
                  <SelectItem value="land">أرض</SelectItem>
                  <SelectItem value="commercial">تجاري</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">نوع الإدراج</label>
              <Select
                value={formData.listingType}
                onValueChange={(value) => handleSelectChange('listingType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">بيع</SelectItem>
                  <SelectItem value="rent">إيجار</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">السعر</label>
              <Input
                name="price"
                type="number"
                placeholder="1200000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">الموقع</label>
              <Input
                name="location"
                placeholder="المعادي"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Area, Bedrooms, Bathrooms */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">المساحة (متر مربع)</label>
              <Input
                name="areaSqm"
                type="number"
                placeholder="150"
                value={formData.areaSqm}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">غرف النوم</label>
              <Input
                name="bedrooms"
                type="number"
                placeholder="3"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">الحمامات</label>
              <Input
                name="bathrooms"
                type="number"
                placeholder="2"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'جاري الإضافة...' : 'إضافة العقار'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
