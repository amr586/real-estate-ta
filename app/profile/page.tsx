'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const mockUser = {
  firstName: 'أحمد',
  lastName: 'محمد',
  email: 'ahmed@example.com',
  phone: '+201000000001',
  role: 'owner',
  joinDate: '2026-01-15',
  properties: 2,
  favorites: 5,
  subscription: {
    plan: 'متقدم',
    expiresAt: '2026-05-15',
    listingLimit: 50,
    usedListings: 8,
  },
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  });

  const handleSaveChanges = async () => {
    try {
      // In production, this would call an API
      setUser({
        ...user,
        firstName: editData.firstName,
        lastName: editData.lastName,
        phone: editData.phone,
      });
      setIsEditing(false);
      toast.success('تم حفظ التغييرات بنجاح');
    } catch (error) {
      toast.error('حدث خطأ في حفظ التغييرات');
    }
  };

  const handleChangePassword = async () => {
    try {
      // In production, this would call an API
      toast.success('تم تحديث كلمة المرور بنجاح');
    } catch (error) {
      toast.error('حدث خطأ في تحديث كلمة المرور');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header isLoggedIn={true} user={user} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                الملف الشخصي
              </h1>
              <p className="text-slate-600">إدارة بيانات حسابك</p>
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
              👤
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">بيانات شخصية</TabsTrigger>
            <TabsTrigger value="security">الأمان</TabsTrigger>
            <TabsTrigger value="subscription">الاشتراك</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>البيانات الشخصية</CardTitle>
                    <CardDescription>معلومات حسابك الأساسية</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'إلغاء' : 'تعديل'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">الاسم الأول</label>
                    <Input
                      value={editData.firstName}
                      onChange={(e) =>
                        setEditData({ ...editData, firstName: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">الاسم الأخير</label>
                    <Input
                      value={editData.lastName}
                      onChange={(e) =>
                        setEditData({ ...editData, lastName: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">البريد الإلكتروني</label>
                  <Input value={user.email} disabled />
                  <p className="text-xs text-slate-500 mt-1">لا يمكن تغيير البريد الإلكتروني</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">رقم الهاتف</label>
                  <Input
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <Button className="w-full" onClick={handleSaveChanges}>
                    حفظ التغييرات
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات الحساب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-slate-600">نوع الحساب:</span>
                  <Badge>
                    {user.role === 'owner' ? 'مالك عقار' : 'مستخدم عادي'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-slate-600">تاريخ الانضمام:</span>
                  <span className="text-slate-900 font-medium">{user.joinDate}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-slate-600">العقارات المضافة:</span>
                  <span className="text-slate-900 font-medium">{user.properties}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">العقارات المفضلة:</span>
                  <span className="text-slate-900 font-medium">{user.favorites}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>الأمان</CardTitle>
                <CardDescription>إدارة كلمات المرور والجلسات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">تغيير كلمة المرور</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">كلمة المرور القديمة</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">كلمة المرور الجديدة</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">تأكيد كلمة المرور</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button onClick={handleChangePassword}>تحديث كلمة المرور</Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">الجلسات النشطة</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">المتصفح الحالي</p>
                        <p className="text-sm text-slate-600">آخر نشاط: الآن</p>
                      </div>
                      <Badge>نشطة</Badge>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">المخاطر</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      تسجيل الخروج من جميع الأجهزة
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
                      حذف الحساب
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription */}
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الاشتراك</CardTitle>
                <CardDescription>إدارة خطتك الحالية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">
                        {user.subscription.plan}
                      </h3>
                      <p className="text-sm text-blue-700">خطة حالية</p>
                    </div>
                    <Badge className="bg-blue-600">نشطة</Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-blue-800">تاريخ الانتهاء:</span>
                      <span className="font-semibold text-blue-900">
                        {user.subscription.expiresAt}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">حد الإعلانات:</span>
                      <span className="font-semibold text-blue-900">
                        {user.subscription.usedListings}/{user.subscription.listingLimit}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(user.subscription.usedListings / user.subscription.listingLimit) * 100}%`,
                      }}
                    />
                  </div>

                  <Button className="w-full">ترقية الخطة</Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">فاتورتك</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">فاتورة أبريل 2026</span>
                      <Badge variant="outline">مدفوعة</Badge>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">فاتورة مايو 2026</span>
                      <Badge variant="outline">قادمة</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
