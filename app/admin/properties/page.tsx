'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, XCircle, AlertCircle, Trash2, Edit2 } from 'lucide-react';

const mockProperties = [
  {
    id: '1',
    title: 'شقة فاخرة في مدينة نصر',
    owner: 'أحمد محمد',
    price: 1200000,
    location: 'مدينة نصر',
    status: 'pending',
    date: '2026-04-05',
  },
  {
    id: '2',
    title: 'فيلا في المعادي',
    owner: 'فاطمة علي',
    price: 3500000,
    location: 'المعادي',
    status: 'approved',
    date: '2026-04-01',
  },
  {
    id: '3',
    title: 'شقة بحي راقي',
    owner: 'محمد إبراهيم',
    price: 850000,
    location: 'الزمالك',
    status: 'rejected',
    date: '2026-03-28',
  },
  {
    id: '4',
    title: 'أرض تجارية',
    owner: 'سارة حسن',
    price: 2500000,
    location: 'النيل الخضراء',
    status: 'pending',
    date: '2026-04-03',
  },
];

interface Property {
  id: string;
  title: string;
  owner: string;
  price: number;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProperties = filterStatus === 'all'
    ? properties
    : properties.filter(p => p.status === filterStatus);

  const handleApprove = (id: string) => {
    setProperties(properties.map(p =>
      p.id === id ? { ...p, status: 'approved' } : p
    ));
  };

  const handleReject = (id: string) => {
    setProperties(properties.map(p =>
      p.id === id ? { ...p, status: 'rejected' } : p
    ));
  };

  const handleDelete = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'موافق عليه';
      case 'rejected':
        return 'مرفوض';
      case 'pending':
        return 'قيد الانتظار';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar userRole="admin_properties" />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">إدارة العقارات</h1>
            <p className="text-slate-600">مراجعة وإدارة العقارات المُضافة</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">إجمالي العقارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{properties.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {properties.filter(p => p.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">موافق عليها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {properties.filter(p => p.status === 'approved').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">مرفوضة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {properties.filter(p => p.status === 'rejected').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter and Search */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>البحث والتصفية</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="ابحث عن العنوان أو المالك..."
                  className="flex-1"
                />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="approved">موافق عليه</SelectItem>
                    <SelectItem value="rejected">مرفوض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Properties Table */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة العقارات</CardTitle>
              <CardDescription>
                {filteredProperties.length} عقار
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        العنوان
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        المالك
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        السعر
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        الموقع
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        الحالة
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.map((property) => (
                      <tr key={property.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4 text-slate-900">{property.title}</td>
                        <td className="py-4 px-4 text-slate-600">{property.owner}</td>
                        <td className="py-4 px-4 text-slate-900 font-medium">
                          {property.price.toLocaleString('ar-EG')} ج.م
                        </td>
                        <td className="py-4 px-4 text-slate-600">{property.location}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(property.status)}
                            <span className="text-sm text-slate-600">
                              {getStatusLabel(property.status)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            {property.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                  onClick={() => handleApprove(property.id)}
                                >
                                  موافقة
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => handleReject(property.id)}
                                >
                                  رفض
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(property.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
