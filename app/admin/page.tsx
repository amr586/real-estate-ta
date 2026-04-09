'use client';

import { AdminSidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react';

const mockAdminData = {
  role: 'super_admin',
  stats: {
    totalUsers: 1234,
    totalProperties: 567,
    activeListings: 234,
    monthlyRevenue: 125000,
    userGrowth: 12.5,
    listingGrowth: 8.3,
  },
  revenueData: [
    { month: 'يناير', revenue: 50000 },
    { month: 'فبراير', revenue: 65000 },
    { month: 'مارس', revenue: 75000 },
    { month: 'أبريل', revenue: 85000 },
    { month: 'مايو', revenue: 105000 },
    { month: 'يونيو', revenue: 125000 },
  ],
  userDistribution: [
    { name: 'مستخدمون', value: 800 },
    { name: 'مالكو عقارات', value: 434 },
  ],
};

export default function AdminPage() {
  const data = mockAdminData;

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar userRole={data.role} />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">لوحة التحكم</h1>
            <p className="text-slate-600">مرحباً بك في لوحة تحكم المسؤول</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
                <Users className="w-4 h-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {data.stats.totalUsers}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +{data.stats.userGrowth}% هذا الشهر
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">إجمالي العقارات</CardTitle>
                <Building2 className="w-4 h-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {data.stats.totalProperties}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {data.stats.activeListings} عقار نشط
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">الإيرادات الشهرية</CardTitle>
                <DollarSign className="w-4 h-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {data.stats.monthlyRevenue.toLocaleString('ar-EG')} ج.م
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ {((data.stats.monthlyRevenue / 105000 - 1) * 100).toFixed(1)}% من الشهر السابق
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">نسبة النمو</CardTitle>
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {((data.stats.userGrowth + data.stats.listingGrowth) / 2).toFixed(1)}%
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  متوسط النمو
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>إيرادات المنصة</CardTitle>
                <CardDescription>الإيرادات الشهرية للأشهر الستة الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>توزيع المستخدمين</CardTitle>
                <CardDescription>حسب نوع الحساب</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.userDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#10b981" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>النشاطات الأخيرة</CardTitle>
              <CardDescription>آخر الإضافات والتعديلات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'عقار جديد', description: 'تمت إضافة شقة في المعادي', time: 'منذ ساعة' },
                  { type: 'مستخدم جديد', description: 'تسجيل مستخدم جديد: أحمد محمد', time: 'منذ ساعتين' },
                  { type: 'عقار موافق عليه', description: 'فيلا في الزمالك - موافقة سوبر أدمن', time: 'منذ 3 ساعات' },
                  { type: 'دفعة جديدة', description: 'تم استقبال دفعة بقيمة 25,000 ج.م', time: 'منذ 4 ساعات' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:pb-0 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{activity.type}</p>
                      <p className="text-sm text-slate-600">{activity.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
