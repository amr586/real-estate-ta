'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Upload, AlertCircle } from 'lucide-react';

const planPrices: { [key: string]: number } = {
  advanced: 199,
  professional: 499,
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planParam = searchParams.get('plan') || 'advanced';
  const planPrice = planPrices[planParam] || 199;

  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'vodafone' | 'transfer' | ''>('');
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [transferDetails, setTransferDetails] = useState({
    bankName: '',
    accountNumber: '',
    referenceNumber: '',
  });

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      toast.success('تم تحميل الصورة بنجاح');
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error('اختر طريقة دفع');
      return;
    }

    if (paymentMethod === 'instapay' || paymentMethod === 'vodafone') {
      if (!screenshot) {
        toast.error('يجب تحميل صورة التحويل');
        return;
      }
    }

    if (paymentMethod === 'transfer') {
      if (!transferDetails.bankName || !transferDetails.accountNumber || !transferDetails.referenceNumber) {
        toast.error('يجب ملء جميع بيانات التحويل');
        return;
      }
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('plan', planParam);
      formData.append('amount', planPrice.toString());
      formData.append('paymentMethod', paymentMethod);

      if (screenshot) {
        formData.append('screenshot', screenshot);
      }

      if (paymentMethod === 'transfer') {
        formData.append('bankName', transferDetails.bankName);
        formData.append('accountNumber', transferDetails.accountNumber);
        formData.append('referenceNumber', transferDetails.referenceNumber);
      }

      const response = await fetch('/api/payments', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'حدث خطأ في الدفع');
        return;
      }

      toast.success('تم إرسال طلب الدفع بنجاح!');
      router.push('/dashboard?subscriptionPending=true');
    } catch (error) {
      console.error('[Payment] Error:', error);
      toast.error('حدث خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ملخص الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">الخطة المختارة:</span>
                <span className="font-semibold text-slate-900 capitalize">
                  {planParam === 'advanced' ? 'متقدم' : 'احترافي'}
                </span>
              </div>
              <div className="flex justify-between pb-4 border-b">
                <span className="text-slate-600">السعر:</span>
                <span className="font-semibold text-slate-900">
                  {planPrice.toLocaleString('ar-EG')} ج.م
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-slate-900">الإجمالي:</span>
                <span className="font-bold text-blue-600">
                  {planPrice.toLocaleString('ar-EG')} ج.م
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>طريقة الدفع</CardTitle>
            <CardDescription>اختر طريقة الدفع المناسبة لك</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="instapay" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="instapay">Instapay</TabsTrigger>
                <TabsTrigger value="vodafone">Vodafone Cash</TabsTrigger>
                <TabsTrigger value="transfer">التحويل البنكي</TabsTrigger>
              </TabsList>

              {/* Instapay */}
              <TabsContent value="instapay" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold">خطوات الدفع:</p>
                      <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>افتح تطبيق Instapay</li>
                        <li>انقل المبلغ {planPrice.toLocaleString('ar-EG')} ج.م</li>
                        <li>رقم الهاتف: +20 100 000 0000</li>
                        <li>خذ لقطة شاشة للتحويل</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">صورة التحويل</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                      id="instapay-upload"
                    />
                    <label htmlFor="instapay-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">
                        {screenshot ? screenshot.name : 'انقر أو اسحب الصورة هنا'}
                      </p>
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setPaymentMethod('instapay');
                    handlePayment();
                  }}
                  disabled={loading || !screenshot}
                >
                  {loading ? 'جاري المعالجة...' : 'تأكيد الدفع'}
                </Button>
              </TabsContent>

              {/* Vodafone Cash */}
              <TabsContent value="vodafone" className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-800">
                      <p className="font-semibold">خطوات الدفع:</p>
                      <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>افتح Vodafone Cash</li>
                        <li>انقل المبلغ {planPrice.toLocaleString('ar-EG')} ج.م</li>
                        <li>رقم الهاتف: +20 100 000 0000</li>
                        <li>خذ لقطة شاشة للتحويل</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">صورة التحويل</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-green-500 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                      id="vodafone-upload"
                    />
                    <label htmlFor="vodafone-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">
                        {screenshot ? screenshot.name : 'انقر أو اسحب الصورة هنا'}
                      </p>
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setPaymentMethod('vodafone');
                    handlePayment();
                  }}
                  disabled={loading || !screenshot}
                >
                  {loading ? 'جاري المعالجة...' : 'تأكيد الدفع'}
                </Button>
              </TabsContent>

              {/* Bank Transfer */}
              <TabsContent value="transfer" className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">بيانات التحويل البنكي:</span>
                    <br />
                    البنك الأهلي - الحساب: 123456789
                    <br />
                    اسم المستقبل: منصة العقارات
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">اسم البنك</label>
                  <Input
                    placeholder="مثال: البنك الأهلي"
                    value={transferDetails.bankName}
                    onChange={(e) =>
                      setTransferDetails({
                        ...transferDetails,
                        bankName: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">رقم الحساب</label>
                  <Input
                    placeholder="أدخل رقم حسابك"
                    value={transferDetails.accountNumber}
                    onChange={(e) =>
                      setTransferDetails({
                        ...transferDetails,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">رقم المرجع/التحويل</label>
                  <Input
                    placeholder="رقم المرجع من البنك"
                    value={transferDetails.referenceNumber}
                    onChange={(e) =>
                      setTransferDetails({
                        ...transferDetails,
                        referenceNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setPaymentMethod('transfer');
                    handlePayment();
                  }}
                  disabled={loading}
                >
                  {loading ? 'جاري المعالجة...' : 'تأكيد التحويل'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Security Note */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              🔒 <span className="font-semibold">آمان مضمون:</span> جميع عمليات الدفع محمية وآمنة. نحن
              لا نحتفظ بأي بيانات بطاقات ائتمان.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
