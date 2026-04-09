import { Metadata } from 'next';
import VerifyPhoneForm from '@/components/auth/VerifyPhoneForm';

export const metadata: Metadata = {
  title: 'التحقق من الهاتف',
  description: 'تحقق من هاتفك عبر كود WhatsApp',
};

export default function VerifyPhonePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">التحقق من الهاتف</h1>
            <p className="text-slate-400">أدخل الكود الذي تلقيته على WhatsApp</p>
          </div>
          <VerifyPhoneForm />
        </div>
      </div>
    </div>
  );
}
