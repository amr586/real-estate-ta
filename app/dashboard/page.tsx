'use client';

import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddPropertyForm } from '@/components/properties/AddPropertyForm';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Eye, Heart, MessageCircle } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  views: number;
  likes: number;
  messages: number;
  status: string;
}

const mockUserData = {
  user: {
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@example.com',
  },
  properties: [
    {
      id: '1',
      title: 'شقة في مدينة نصر',
      price: 1200000,
      location: 'مدينة نصر',
      views: 156,
      likes: 23,
      messages: 5,
      status: 'نشطة',
    },
    {
      id: '2',
      title: 'فيلا في المعادي',
      price: 3500000,
      location: 'المعادي',
      views: 324,
      likes: 45,
      messages: 12,
      status: 'نشطة',
    },
  ] as Property[],
  stats: {
    totalListings: 2,
    totalViews: 480,
    activeMessages: 17,
  },
};

const chartData = [
  { month: 'يناير', views: 120, messages: 5 },
  { month: 'فبراير', views: 200, messages: 8 },
  { month: 'مارس', views: 340, messages: 12 },
  { month: 'أبريل', views: 480, messages: 17 },
];

export default function DashboardPage() {
  const user = mockUserData.user;
  const properties = mockUserData.properties;
  const stats = mockUserData.stats;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header isLoggedIn={true} user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            أهلا وسهلا، {user.firstName}!
          </h1>
          <p className="text-slate-600">إدارة عقاراتك وتتبع أدائك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                إجمالي الإدراجات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {stats.totalListings}
              </div>
              <p className="text-sm text-slate-500 mt-2">عقار نشط</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                إجمالي المشاهدات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {stats.totalViews}
              </div>
              <p className="text-sm text-slate-500 mt-2">في هذا الشهر</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                الرسائل الفعالة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {stats.activeMessages}
              </div>
              <p className="text-sm text-slate-500 mt-2">بانتظار الرد</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="properties" className="bg-white rounded-lg border">
          <TabsList className="border-b rounded-none">
            <TabsTrigger value="properties">العقارات</TabsTrigger>
            <TabsTrigger value="add">إضافة عقار</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="p-6">
            <div className="space-y-4">
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">لم تضف أي عقارات بعد</p>
                  <Button asChild>
                    <a href="#add">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة عقار
                    </a>
                  </Button>
                </div>
              ) : (
                properties.map((property) => (
                  <Card key={property.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {property.title}
                          </h3>
                          <p className="text-sm text-slate-600">{property.location}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                          {property.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">المشاهدات</p>
                            <p className="font-semibold text-slate-900">{property.views}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">الإعجابات</p>
                            <p className="font-semibold text-slate-900">{property.likes}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">الرسائل</p>
                            <p className="font-semibold text-slate-900">{property.messages}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">السعر</p>
                          <p className="font-semibold text-slate-900">
                            {property.price.toLocaleString('ar-EG')}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">تحرير</Button>
                        <Button variant="outline" className="text-red-600">
                          حذف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Add Property Tab */}
          <TabsContent value="add" className="p-6">
            <AddPropertyForm />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>أداء عقاراتك</CardTitle>
                <CardDescription>إحصائيات المشاهدات والرسائل</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#3b82f6" name="المشاهدات" />
                    <Bar dataKey="messages" fill="#10b981" name="الرسائل" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="p-6">
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">لا توجد رسائل جديدة</p>
              <p className="text-sm text-slate-500">ستظهر رسائل المشترين هنا</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
