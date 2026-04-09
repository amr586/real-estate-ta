import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export const metadata = {
  title: 'تسجيل الدخول - منصة العقارات',
  description: 'ادخل إلى حسابك على منصة العقارات',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">العقارات</h1>
          <p className="text-slate-400">منصتك الموثوقة للعقارات</p>
        </div>

        <LoginForm />

        <p className="text-center text-slate-400 mt-6">
          ليس لديك حساب؟{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
