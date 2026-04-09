'use client';

import { AdminSidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const analyticsData = {
  userGrowth: [
    { month: 'يناير', users: 150, owners: 30 },
    { month: 'فبراير', users: 220, owners: 45 },
    { month: 'مارس', users: 310, owners: 65 },
    { month: 'أبريل', users: 420, owners: 85 },
    { month: 'مايو', users: 580, owners: 110 },
    { month: 'يونيو', users: 800, owners: 150 },
  ],
  propertyTypes: [
    { name: 'شقات', value: 234 },
    { name: 'فيلات', value: 189 },
    { name: 'أراضي', value: 98 },
    { name: 'تجاري', value: 46 },
  ],
  listingTypes: [
    { name: 'للبيع', value: 380 },
    { name: 'للإيجار', value: 187 },
  ],
  topLocations: [
    { location: 'المعادي', properties: 156 },
    { location: 'مدينة نصر', properties: 142 },
    { location: 'الزمالك', properties: 98 },
    { location: 'النيل الخضراء', properties: 87 },
    { location: 'المنيل', properties: 76 },
  ],
  priceRanges: [
    { range: 'أقل من 500 ألف', count: 234 },
    { range: '500 ألف - 1 مليون', count: 189 },
    { range: '1 - 2 مليون', count: 98 },
    { range: 'أكثر من 2 مليون', count: 46 },
  ],
};

export default function AdminAnalyticsPage() {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar userRole="admin_analytics" />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">التحليلات والمراجعة</h1>
            <p className="text-slate-600">تحليل أداء المنصة والعقارات</p>
          </div>

          {/* User Growth Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>نمو المستخدمين</CardTitle>
              <CardDescription>عدد المستخدمين ومالكي العقارات عبر الأشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="المستخدمون"
                  />
                  <Line
                    type="monotone"
                    dataKey="owners"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="مالكو العقارات"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Property Types */}
            <Card>
              <CardHeader>
                <CardTitle>توزيع أنواع العقارات</CardTitle>
                <CardDescription>حسب نوع العقار</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.propertyTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.propertyTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Listing Types */}
            <Card>
              <CardHeader>
                <CardTitle>توزيع أنواع الإدراج</CardTitle>
                <CardDescription>بيع مقابل إيجار</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.listingTypes}
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

          {/* Price Ranges */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>توزيع أسعار العقارات</CardTitle>
              <CardDescription>حسب نطاقات السعر</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.priceRanges}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="عدد العقارات" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle>أفضل المواقع</CardTitle>
              <CardDescription>المواقع الأكثر طلباً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topLocations.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                        {index + 1}
                      </div>
                      <span className="text-slate-900 font-medium">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{
                            width: `${(item.properties / 156) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-slate-600 font-medium w-16 text-right">
                        {item.properties} عقار
                      </span>
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
