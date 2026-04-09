'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PropertyRequest {
  id: number;
  title: string;
  propertyType: string;
  listingType: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  status: string;
  createdAt: string;
  email: string;
  description: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<PropertyRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PropertyRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Mock data for demo
      const mockRequests: PropertyRequest[] = [
        {
          id: 1,
          title: 'شقة حديثة بموقع استراتيجي',
          propertyType: 'apartment',
          listingType: 'sale',
          location: 'مدينة نصر',
          budgetMin: 1000000,
          budgetMax: 3000000,
          status: 'pending',
          createdAt: new Date().toISOString(),
          email: 'user@example.com',
          description: 'أبحث عن شقة حديثة بموقع قريب من العمل',
        },
        {
          id: 2,
          title: 'فيلا للإيجار',
          propertyType: 'villa',
          listingType: 'rent',
          location: 'الشيخ زايد',
          budgetMin: 5000,
          budgetMax: 10000,
          status: 'approved',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          email: 'user2@example.com',
          description: 'فيلا بحديقة واسعة',
        },
      ];
      setRequests(mockRequests);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'موافق عليه';
      case 'rejected':
        return 'مرفوض';
      case 'pending':
        return 'قيد المراجعة';
      default:
        return 'غير معروف';
    }
  };

  const filteredRequests =
    filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  const handleApprove = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    setSelectedRequest(null);
  };

  const handleReject = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 animate-slide-in-down">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-2">طلبات العقارات</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">إدارة ومراجعة طلبات العقارات من المستخدمين</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['all', 'pending', 'approved', 'rejected'].map((s) => (
            <Button
              key={s}
              onClick={() => setFilter(s)}
              variant={filter === s ? 'default' : 'outline'}
              className={filter === s ? 'bg-black dark:bg-white text-white dark:text-black' : ''}
            >
              {s === 'all' ? 'الكل' : s === 'pending' ? 'قيد المراجعة' : s === 'approved' ? 'موافق عليه' : 'مرفوض'}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requests List */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>لا توجد طلبات بهذا الفلتر</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request, index) => (
                  <Card
                    key={request.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow animate-slide-in-up border-gray-200 dark:border-gray-800"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-black dark:text-white">{request.title}</CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-400">
                            {request.email}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusLabel(request.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">نوع العقار</p>
                          <p className="font-semibold text-black dark:text-white">{request.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">الموقع</p>
                          <p className="font-semibold text-black dark:text-white">{request.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">الميزانية</p>
                          <p className="font-semibold text-black dark:text-white">
                            {request.budgetMin.toLocaleString()} - {request.budgetMax.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Details Panel */}
          {selectedRequest && (
            <div className="animate-scale-in">
              <Card className="sticky top-24 border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-black dark:text-white">
                    {getStatusIcon(selectedRequest.status)}
                    التفاصيل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">العنوان</p>
                    <p className="font-semibold text-black dark:text-white">{selectedRequest.title}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">البريد الإلكتروني</p>
                    <p className="font-semibold text-black dark:text-white">{selectedRequest.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">نوع العقار</p>
                    <p className="font-semibold text-black dark:text-white">{selectedRequest.propertyType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">نوع الإدراج</p>
                    <p className="font-semibold text-black dark:text-white">
                      {selectedRequest.listingType === 'sale' ? 'بيع' : 'إيجار'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الموقع</p>
                    <p className="font-semibold text-black dark:text-white">{selectedRequest.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الميزانية</p>
                    <p className="font-semibold text-black dark:text-white">
                      {selectedRequest.budgetMin.toLocaleString()} - {selectedRequest.budgetMax.toLocaleString()} ج.م
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الوصف</p>
                    <p className="text-black dark:text-white">{selectedRequest.description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">تاريخ الطلب</p>
                    <p className="font-semibold text-black dark:text-white">
                      {new Date(selectedRequest.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                  </div>

                  {selectedRequest.status === 'pending' && (
                    <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <Button
                        onClick={() => handleApprove(selectedRequest.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        موافقة
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedRequest.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        رفض
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
