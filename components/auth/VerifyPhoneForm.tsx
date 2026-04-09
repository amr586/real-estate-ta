'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VerifyPhoneForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('الكود يجب أن يكون 6 أرقام');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل التحقق');
        return;
      }

      setSuccess(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setError('حدث خطأ في الاتصال');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل إرسال الكود');
        return;
      }

      // Set 60 second cooldown
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('حدث خطأ في الاتصال');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <div>
        <p className="text-sm text-slate-400 mb-2">الهاتف: {phone}</p>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          أدخل الكود
        </label>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="000000"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 text-center text-2xl tracking-widest"
          disabled={loading || success}
        />
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700/30 rounded p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900/20 border border-green-700/30 rounded p-3 text-green-400 text-sm">
          تم التحقق بنجاح! جاري التحويل...
        </div>
      )}

      <Button
        type="submit"
        disabled={loading || success || otp.length !== 6}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
      >
        {loading ? 'جاري التحقق...' : 'تحقق من الكود'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={resendCooldown > 0 || loading}
          className="text-sm text-purple-400 hover:text-purple-300 disabled:text-slate-500 disabled:cursor-not-allowed"
        >
          {resendCooldown > 0
            ? `إعادة الإرسال خلال ${resendCooldown}s`
            : 'لم تتلق الكود؟ إعادة الإرسال'}
        </button>
      </div>
    </form>
  );
}
