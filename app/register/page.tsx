import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';

export const metadata = {
  title: 'التسجيل - منصة العقارات',
  description: 'انضم إلى منصة العقارات الرائدة',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">العقارات</h1>
          <p className="text-slate-400">منصتك الموثوقة للعقارات</p>
        </div>

        <RegisterForm />

        <p className="text-center text-slate-400 mt-6">
          لديك حساب بالفعل؟{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
