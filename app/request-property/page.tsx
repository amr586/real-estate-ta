'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle2, Home } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RequestPropertyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    listingType: 'sale',
    location: '',
    budgetMin: '',
    budgetMax: '',
    areaMin: '',
    areaMax: '',
    bedrooms: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/property-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          title: '',
          description: '',
          propertyType: 'apartment',
          listingType: 'sale',
          location: '',
          budgetMin: '',
          budgetMax: '',
          areaMin: '',
          areaMax: '',
          bedrooms: '',
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-down">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home className="w-10 h-10 text-black dark:text-white" />
            <h1 className="text-5xl font-bold text-black dark:text-white">طلب عقار</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">أخبرنا عن العقار الذي تبحث عنه وسنساعدك في العثور عليه</p>
        </div>

        {/* Success Alert */}
        {isSubmitted && (
          <Alert className="mb-8 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 animate-slide-in-down">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              تم استقبال طلبك بنجاح! سيقوم الفريق بمراجعتها والتواصل معك قريباً.
            </AlertDescription>
          </Alert>
        )}

        {/* Form Card */}
        <Card className="border border-gray-200 dark:border-gray-800 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">معلومات الطلب</CardTitle>
            <CardDescription>ملء جميع التفاصيل يساعدنا في العثور على الخيار الأنسب</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-black dark:text-white">عنوان الطلب</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="مثال: شقة حديثة بموقع استراتيجي"
                    required
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-black dark:text-white">الموقع المفضل</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="مثال: مدينة نصر، الشيخ زايد"
                    required
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-black dark:text-white">نوع العقار</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleSelectChange('propertyType', value)}>
                    <SelectTrigger className="border-gray-300 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">شقة</SelectItem>
                      <SelectItem value="villa">فيلا</SelectItem>
                      <SelectItem value="land">أرض</SelectItem>
                      <SelectItem value="townhouse">تاون هاوس</SelectItem>
                      <SelectItem value="studio">استوديو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listingType" className="text-black dark:text-white">نوع الإدراج</Label>
                  <Select value={formData.listingType} onValueChange={(value) => handleSelectChange('listingType', value)}>
                    <SelectTrigger className="border-gray-300 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">بيع</SelectItem>
                      <SelectItem value="rent">إيجار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin" className="text-black dark:text-white">الميزانية من (جنيه)</Label>
                  <Input
                    id="budgetMin"
                    name="budgetMin"
                    type="number"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    placeholder="500000"
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetMax" className="text-black dark:text-white">الميزانية إلى (جنيه)</Label>
                  <Input
                    id="budgetMax"
                    name="budgetMax"
                    type="number"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    placeholder="3000000"
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="areaMin" className="text-black dark:text-white">المساحة من (م²)</Label>
                  <Input
                    id="areaMin"
                    name="areaMin"
                    type="number"
                    value={formData.areaMin}
                    onChange={handleChange}
                    placeholder="100"
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="areaMax" className="text-black dark:text-white">المساحة إلى (م²)</Label>
                  <Input
                    id="areaMax"
                    name="areaMax"
                    type="number"
                    value={formData.areaMax}
                    onChange={handleChange}
                    placeholder="300"
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms" className="text-black dark:text-white">عدد الغرف</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="2"
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-black dark:text-white">وصف إضافي</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="أخبرنا عن احتياجاتك الخاصة والميزات التي تبحث عنها..."
                  rows={4}
                  className="border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Info Alert */}
              <Alert className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  سيقوم فريقنا بمراجعة طلبك خلال 24 ساعة وسيتواصلون معك للتحقق من التفاصيل.
                </AlertDescription>
              </Alert>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 py-6 text-lg font-semibold btn-hover-effect"
              >
                {isLoading ? 'جاري الإرسال...' : 'إرسال الطلب'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
